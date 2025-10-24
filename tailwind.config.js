/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimalist Monochrome Theme
        primary: {
          50: '#F8F8F8',
          100: '#F0F0F0',
          200: '#E4E4E4',
          300: '#D1D1D1',
          400: '#B4B4B4',
          500: '#9A9A9A',
          600: '#818181',
          700: '#6A6A6A',
          800: '#5A5A5A',
          900: '#4A4A4A',
          950: '#0A0A0A',
        },
        accent: {
          DEFAULT: '#0EA5E9', // Electric Blue
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        highlight: {
          DEFAULT: '#10B981', // Neon Green
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        }
      },
      backgroundColor: {
        'app': '#000000',
        'card': '#1C1C1C',
        'card-hover': '#262626',
      },
      borderColor: {
        'default': '#2A2A2A',
      }
    },
  },
  plugins: [],
}
