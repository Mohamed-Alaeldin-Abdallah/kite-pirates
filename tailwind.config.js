/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // --- Ocean / beach palette ---------------------------------------
        teal: {
          DEFAULT: '#00B4C6', // turquoise — primary accent / CTAs
          dark: '#007A87',
        },
        aqua: '#5FE3DA', // light aqua — highlights, glows
        ocean: {
          DEFAULT: '#0A3D5C', // ocean blue
          deep: '#062236', // deep ocean — surfaces
        },
        sand: {
          DEFAULT: '#E7D3A9', // sandy beige
          light: '#F4E8CF',
        },
        coral: {
          DEFAULT: '#FF6B4A', // coral / sunset orange — secondary accent
          deep: '#E8513A',
        },
        sunset: '#FF9E4A',
        foam: '#EAFBF8', // sea-foam white
        yellow: { DEFAULT: '#FFD600' }, // kept for legacy badges
        // --- Legacy dark surfaces (re-pointed toward ocean blue) ----------
        dark: {
          DEFAULT: '#04161F', // page background (deep sea)
          2: '#082734', // card backgrounds
          3: '#0C3346', // featured card backgrounds
        },
        mid: '#16465C', // dividers
        gray: {
          DEFAULT: '#5E8597', // muted text
          light: '#9FC2CE', // secondary body text
        },
        ink: '#EAF7FB', // primary text
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
        arabic: ['Cairo', 'Tajawal', 'Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '20px' },
      boxShadow: {
        teal: '0 16px 40px rgba(0,180,198,0.18)',
        card: '0 8px 28px rgba(2,18,30,0.45)',
        aqua: '0 18px 50px rgba(95,227,218,0.22)',
        coral: '0 16px 40px rgba(255,107,74,0.22)',
      },
      maxWidth: { prose: '820px', content: '1200px' },
      keyframes: {
        pulseLine: {
          '0%, 100%': { opacity: '0.25', transform: 'scaleY(0.6)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        floatDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.7)' },
        },
        // Gentle vertical bob for floating props (kite, seagull)
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-3deg)' },
        },
        // Slow horizontal drift across the sky
        drift: {
          '0%': { transform: 'translateX(-8vw)' },
          '100%': { transform: 'translateX(108vw)' },
        },
        // Rising bubble
        rise: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '0' },
          '15%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-120px) scale(1.1)', opacity: '0' },
        },
        // Palm-leaf sway
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        // Horizontal wave scroll for SVG dividers
        waveX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Kite figure-eight-ish sway
        kiteSway: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '25%': { transform: 'translate(10px,-12px) rotate(4deg)' },
          '50%': { transform: 'translate(2px,-20px) rotate(-2deg)' },
          '75%': { transform: 'translate(-8px,-8px) rotate(3deg)' },
        },
      },
      animation: {
        pulseLine: 'pulseLine 2.4s ease-in-out infinite',
        floatDot: 'floatDot 1.8s ease-in-out infinite',
        bob: 'bob 6s ease-in-out infinite',
        drift: 'drift 38s linear infinite',
        rise: 'rise 7s ease-in infinite',
        sway: 'sway 5s ease-in-out infinite',
        waveX: 'waveX 12s linear infinite',
        kiteSway: 'kiteSway 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
