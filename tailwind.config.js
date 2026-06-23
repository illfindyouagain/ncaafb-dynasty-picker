/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Dynasty Turf — desaturated dark greens as neutrals, gold as accent
        primary: {
          50: '#F5F7F5',
          100: '#E4EAE4',
          200: '#C8D4C8',
          300: '#A0B4A0',
          400: '#7A967A',
          500: '#5A785A',
          600: '#445C44',
          700: '#324432',
          800: '#1E2D1E',
          900: '#131D13',
          950: '#08100A',
        },
        // Dynasty Gold — trophy, stadium lights, championship
        accent: {
          DEFAULT: '#F0B429',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Field green — used for secondary badges and highlights
        highlight: {
          DEFAULT: '#4ADE80',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
      },
      backgroundColor: {
        'app': '#060C06',
        'card': '#0E1A0E',
        'card-hover': '#152015',
      },
      borderColor: {
        'default': '#1B2C1B',
      },
    },
  },
  plugins: [],
}
