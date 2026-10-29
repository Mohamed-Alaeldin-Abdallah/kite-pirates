/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // --- Minimal airy palette -----------------------------------------
        // Accent (sky blue) — buttons, icons, highlights
        teal: { DEFAULT: '#38BDF8', dark: '#0EA5E9' },
        aqua: '#7DD3FC',            // lighter accent — soft borders / rings
        // Deep accent used for coloured text + brand word
        ocean: { DEFAULT: '#0369A1', deep: '#025C8D' },
        coral: { DEFAULT: '#0369A1', deep: '#025C8D' }, // brand word → deep blue
        // Sandy secondary accent (used sparingly, WCAG-safe)
        sand: { DEFAULT: '#C98A2E', light: '#EBD9B3' },
        sunset: '#C98A2E',
        yellow: { DEFAULT: '#B45309' }, // readable amber for badges on white
        // Surfaces — white everywhere, tint as the rare alternate
        dark: { DEFAULT: '#FFFFFF', 2: '#FFFFFF', 3: '#F0F9FF' },
        mid: '#E0F2FE',             // hairline — borders & dividers
        // Text
        gray: { DEFAULT: '#51677A', light: '#5B7083' },
        ink: '#0B2540',             // headings / primary text
        foam: '#EAF6FF',            // light text for use on photos
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: { sm: '6px', md: '8px', lg: '12px', xl: '9999px' },
      // Minimal design — no shadows. Keep names as no-ops so stray usages
      // never reintroduce depth.
      boxShadow: {
        teal: 'none',
        card: 'none',
        aqua: 'none',
        coral: 'none',
      },
      maxWidth: { prose: '720px', content: '1100px' },
      keyframes: {
        // Functional only: live-indicator dot + subtle scroll hairline.
        floatDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.7)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.25', transform: 'scaleY(0.6)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
      },
      animation: {
        floatDot: 'floatDot 1.8s ease-in-out infinite',
        pulseLine: 'pulseLine 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
