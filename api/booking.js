// Vercel serverless function — POST /api/booking
// Receives a booking enquiry, validates it server-side (defence in depth),
// blocks bots/abuse, and emails the crew. Secrets live in env vars only and
// are never exposed to the browser.

import { bookingSchema } from '../src/lib/bookingSchema.js';

// --- best-effort in-memory rate limit ---------------------------------------
// Note: serverless instances are ephemeral and not shared, so this slows
// casual abuse but is NOT a substitute for an edge/WAF rate limiter in prod.
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

// Escape values before placing them in an HTML email (prevents HTML/script
// injection into the inbox).
function esc(v = '') {
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function allowedOrigin(req) {
  const allow = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = req.headers.origin;
  if (allow.length === 0) return null; // same-origin only; no CORS header emitted
  return origin && allow.includes(origin) ? origin : false;
}

export default async function handler(req, res) {
  // CORS: only echo back explicitly allow-listed origins.
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

  // Parse body safely (Vercel usually parses JSON; guard for raw strings).
  let body = req.body;
  try {
    if (typeof body === 'string') body = JSON.parse(body || '{}');
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid body' });

  // Honeypot: if the hidden field is filled, silently accept (don't tip off bots).
  if (body.company) return res.status(200).json({ ok: true });

  // Server-side validation — identical rules to the client.
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(422).json({ error: 'Validation failed' });
  }
  const data = parsed.data;

  const to = process.env.BOOKING_TO_EMAIL || 'kitepirateseg@gmail.com';
  const from = process.env.BOOKING_FROM_EMAIL || 'bookings@kitepirateshurghada.com';
  const apiKey = process.env.BOOKING_EMAIL_API_KEY;

  const rows = [
    ['Name', data.fullName],
    ['Email', data.email],
    ['WhatsApp', data.whatsapp],
    ['Nationality', data.nationality],
    ['Language', data.language],
    ['Booking type', data.bookingType],
    ['Package', data.package],
    ['Arrival', data.arrivalDate],
    ['Guests', data.guests],
    ['Experience', data.experience],
    ['Own equipment', data.ownEquipment],
    ['Referral', data.referral],
    ['Medical', data.medical],
    ['Message', data.message],
  ]
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`)
    .join('');

  const html = `<h2>New booking enquiry</h2><table>${rows}</table>`;

  // If no provider key is configured, don't hard-fail the user; log for now.
  if (!apiKey) {
    console.warn('[booking] BOOKING_EMAIL_API_KEY not set — enquiry not emailed:', data.email);
    return res.status(200).json({ ok: true, note: 'received' });
  }

  try {
    // Example: Resend transactional email API.
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `New booking — ${data.fullName} (${data.package || data.bookingType || 'enquiry'})`,
        html,
      }),
    });
    if (!r.ok) throw new Error(`Email provider responded ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[booking] send failed:', err.message);
    return res.status(502).json({ error: 'Could not send enquiry' });
  }
}
