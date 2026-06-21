// Brand glyphs not available in lucide-react (TikTok, WhatsApp, X).
// Inherit colour via currentColor; sized with className like other icons.

export function TikTokIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.86a2.45 2.45 0 1 1-2.45-2.45c.24 0 .47.04.69.1v-3.3a5.62 5.62 0 0 0-.69-.04A5.6 5.6 0 1 0 15.49 16V9.01a7.5 7.5 0 0 0 4.4 1.41V7.2a4.28 4.28 0 0 1-3.29-1.38z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.06c-.27.76-1.56 1.45-2.19 1.54-.56.08-1.27.12-2.05-.13-.47-.15-1.08-.35-1.86-.69-3.28-1.42-5.42-4.72-5.58-4.94-.16-.22-1.33-1.76-1.33-3.36s.84-2.38 1.14-2.71c.3-.33.65-.41.87-.41l.63.01c.2.01.47-.08.74.56.27.66.93 2.28 1.01 2.44.08.16.14.35.03.57-.11.22-.17.36-.33.55-.16.19-.34.42-.49.57-.16.17-.33.34-.14.67.19.33.85 1.41 1.83 2.28 1.26 1.12 2.32 1.47 2.65 1.63.33.17.52.14.71-.08.19-.22.82-.95 1.04-1.28.22-.32.44-.27.74-.16.3.11 1.89.9 2.22 1.06.33.17.55.25.63.38.08.13.08.78-.19 1.54z" />
    </svg>
  );
}

export function XIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.1 8.1L23.3 22h-6.6l-5.2-6.8L5.6 22H2.5l7.6-8.7L1 2h6.8l4.7 6.2L18.9 2zm-1.16 18h1.83L7.36 3.9H5.4l12.34 16.1z" />
    </svg>
  );
}
