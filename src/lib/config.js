/**
 * Central, typed access to PUBLIC runtime config.
 * Only VITE_-prefixed vars exist in the client bundle; no secrets here.
 */

// Defensive: strip anything that is not a digit so we never build a broken
// or injectable wa.me URL from a mis-entered env value.
const digits = (v) => (v || '').replace(/\D/g, '');

// Default WhatsApp number (used unless overridden by VITE_WHATSAPP_NUMBER).
export const WHATSAPP_NUMBER = digits(import.meta.env.VITE_WHATSAPP_NUMBER) || '201225099809';

// Per-language WhatsApp contacts (UK / Italy / Germany). Each falls back to the
// main number if a language-specific one is not configured.
export const WHATSAPP_NUMBERS = {
  uk: digits(import.meta.env.VITE_WHATSAPP_NUMBER_UK) || WHATSAPP_NUMBER,
  it: digits(import.meta.env.VITE_WHATSAPP_NUMBER_IT) || WHATSAPP_NUMBER,
  de: digits(import.meta.env.VITE_WHATSAPP_NUMBER_DE) || WHATSAPP_NUMBER,
};

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://kitepirateshurghada.com').replace(
  /\/$/,
  ''
);

export const GA4_ID = import.meta.env.VITE_GA4_ID || '';
export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/kite_pirates?igsh=MXFwNmw0bG1tbzk4OA==',
  tiktok: 'https://www.tiktok.com/@kite.pirates?_r=1&_t=ZS-97JeTsKWF4K',
  facebook: 'https://www.facebook.com/share/18zju8FPL2/',
  whatsapp: 'https://wa.me/201225099809',
};

export const CONTACT = {
  email: 'kitepirateseg@gmail.com',
};

const DEFAULT_WA_MESSAGE = "Hi Kite Pirates, I'd like to book a week";

/**
 * Build a safe wa.me click-to-chat URL with an encoded prefilled message.
 * Pass an explicit `number` to target a language-specific contact.
 */
export function whatsappUrl(message = DEFAULT_WA_MESSAGE, number = WHATSAPP_NUMBER) {
  // If no raw number is configured, fall back to the WhatsApp QR contact link
  // (which can't carry a prefilled message, but opens the right chat).
  if (!number) return SOCIAL.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
