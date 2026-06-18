// Live wind for Hurghada.
//
// DATA SOURCE:
//   - Open-Meteo (ECMWF model) — https://open-meteo.com
//   - Refreshes every 5 minutes
//   - No API key needed
//
// Read-only GET; no secrets involved.

const LAT = 27.2579;
const LNG = 33.8116;
export const REFRESH_MS = 5 * 60 * 1000; // 5 minutes
export const DATA_SOURCE = 'Open-Meteo · ECMWF';
const ENDPOINT =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}` +
  `&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m` +
  `&hourly=wind_speed_10m&models=ecmwf_ifs025` +
  `&wind_speed_unit=kn&timezone=auto&forecast_days=1`;

const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

export function degToCompass(deg) {
  if (deg == null || Number.isNaN(deg)) return '—';
  return COMPASS[Math.round(deg / 22.5) % 16];
}

// Kite-condition label from wind speed (knots).
export function conditionFor(kts) {
  if (kts == null) return { label: '—', sub: 'Loading…', tone: 'aqua' };
  if (kts < 6) return { label: 'Calm', sub: 'No wind yet', tone: 'gray' };
  if (kts < 10) return { label: 'Light', sub: 'Big kite day', tone: 'aqua' };
  if (kts < 15) return { label: 'Good', sub: 'Great session', tone: 'teal' };
  if (kts < 23) return { label: 'Perfect', sub: 'Prime riding', tone: 'teal' };
  if (kts < 31) return { label: 'Strong', sub: 'Small kite / experts', tone: 'coral' };
  return { label: 'Heavy', sub: 'Caution today', tone: 'coral' };
}

// Best 3-hour daytime window from today's hourly forecast.
function bestWindow(times, speeds) {
  if (!times?.length) return '—';
  let best = { avg: -1, start: null };
  for (let i = 0; i < times.length - 2; i++) {
    const h = new Date(times[i]).getHours();
    if (h < 8 || h > 17) continue;
    const avg = (speeds[i] + speeds[i + 1] + speeds[i + 2]) / 3;
    if (avg > best.avg) best = { avg, start: h };
  }
  if (best.start == null) return '—';
  return `${best.start}h – ${best.start + 3}h`;
}

export async function fetchWind(signal) {
  const res = await fetch(ENDPOINT, { signal });
  if (!res.ok) throw new Error(`Weather API ${res.status}`);
  const data = await res.json();
  const c = data.current || {};
  const kts = Math.round(c.wind_speed_10m);
  const gust = Math.round(c.wind_gusts_10m);
  return {
    kts,
    gust,
    dir: degToCompass(c.wind_direction_10m),
    gustPct: Math.min(100, Math.round((gust / 35) * 100)),
    condition: conditionFor(kts),
    bestWindow: bestWindow(data.hourly?.time, data.hourly?.wind_speed_10m),
  };
}
