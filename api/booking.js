// Vercel serverless function — POST /api/booking
// Validates a booking enquiry, blocks bots/abuse, then emails the crew an
// HTML summary PLUS a CSV attachment (headers row + values row).
// Secrets live in env vars only and are never exposed to the browser.

import { bookingSchema } from '../src/lib/bookingSchema.js';

// --- best-effort in-memory rate limit ---------------------------------------
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, start: now };
  if (now - rec.start > WINDOW_MS) {
    rec.count = 0;
    rec.start = now;
  }
  rec.count += 1;
  hits.set(ip, rec);
  return rec.count > MAX_PER_WINDOW;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || 'unknown';
}

// Escape for HTML email body.
function esc(v = '') {
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Escape a single CSV cell (RFC 4180: wrap in quotes, double internal quotes).
function csvCell(v = '') {
  const s = String(v ?? '');
  return `"${s.replace(/"/g, '""')}"`;
}

function allowedOrigin(req) {
  const allow = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (allow.length === 0) return null;
  return origin && allow.includes(origin) ? origin : false;
}

export default async function handler(req, res) {
  const origin = allowedOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (origin === false) return res.status(403).json({ error: 'Origin not allowed' });

  const ip = clientIp(req);
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many requests' });

  let body = req.body;
  try {
    if (typeof body === 'string') body = JSON.parse(body || '{}');
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid body' });

  // Honeypot: hidden field filled = bot. Silently accept, don't process.
  if (body.company) return res.status(200).json({ ok: true });

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return res.status(422).json({ error: 'Validation failed' });
  const data = parsed.data;

  // Ordered [Header, Value] pairs — drives both the email table and the CSV.
  const submittedAt = new Date().toISOString();
  const fields = [
    ['Full Name', data.fullName],
    ['Email', data.email],
    ['WhatsApp / Phone', data.whatsapp],
    ['Nationality', data.nationality],
    ['Preferred Language', data.language],
    ['Booking Type', data.bookingType],
    ['Package / Experience', data.package],
    ['Preferred Arrival Date', data.arrivalDate],
    ['Number of Guests', data.guests],
    ['Kite Experience Level', data.experience],
    ['Bringing Own Equipment', data.ownEquipment],
    ['How did you hear about us?', data.referral],
    ['Injuries / Medical', data.medical],
    ['Message / Special Requests', data.message],
    ['Submitted At', submittedAt],
  ];

  // CSV: row 1 = headers, row 2 = values.
  const csv =
    fields.map(([k]) => csvCell(k)).join(',') +
    '\r\n' +
    fields.map(([, v]) => csvCell(v)).join(',') +
    '\r\n';
  const csvBase64 = Buffer.from(csv, 'utf8').toString('base64');
  const safeName = (data.fullName || 'booking').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  const filename = `booking-${safeName}-${submittedAt.slice(0, 10)}.csv`;

  const rows = fields
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`)
    .join('');
  const html = `<h2>New booking enquiry</h2><table cellpadding="6" style="border-collapse:collapse">${rows}</table><p style="color:#888">CSV attached.</p>`;

  const to = process.env.BOOKING_TO_EMAIL || 'kitepirateseg@gmail.com';
  const from = process.env.BOOKING_FROM_EMAIL || 'bookings@kitepirateshurghada.com';
  const apiKey = process.env.BOOKING_EMAIL_API_KEY;

  if (!apiKey) {
    console.warn('[booking] BOOKING_EMAIL_API_KEY not set — enquiry received but not emailed.');
    return res.status(200).json({ ok: true, note: 'received' });
  }

  try {
    // Resend transactional email API, with the CSV as an attachment.
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `New booking — ${data.fullName} (${data.package || data.bookingType || 'enquiry'})`,
        html,
        attachments: [{ filename, content: csvBase64 }],
      }),
    });
    if (!r.ok) throw new Error(`Email provider responded ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[booking] send failed:', err.message);
    return res.status(502).json({ error: 'Could not send enquiry' });
  }
}
