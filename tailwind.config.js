/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F8F6',
          100: '#E5EFE9',
          200: '#C7DED3',
          300: '#9BC3B3',
          400: '#64A18D',
          500: '#3D7A6F',
          600: '#2E5B53', // Primary sage green
          700: '#244940', // Dark forest green
          800: '#1C3831',
          900: '#142722',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF8F2', // Warm cream
          200: '#F4EFE2',
          300: '#EADEC9',
        },
        peach: {
          50: '#FDF7F3',
          100: '#F8E9DF', // Soft peach
          200: '#F1D3C0',
          300: '#E7B59A',
        },
        lavender: {
          50: '#F7F6FB',
          100: '#EEEAF5', // Muted lavender
          200: '#DED5EB',
          300: '#C5B5DC',
        },
        softYellow: {
          50: '#FDFBF4',
          100: '#F7F0D9', // Soft yellow
          200: '#EFE1B3',
          300: '#E3CC82',
        },
        nurturaText: {
          primary: '#263A35',
          secondary: '#78847E',
          muted: '#9DA8A3',
        },
        darkBg: {
          DEFAULT: '#111816',
          surface: '#1A2320',
          card: '#202D29',
          border: '#2C3E39',
        }
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(46, 91, 83, 0.05)',
        'medium': '0 4px 20px rgba(46, 91, 83, 0.08)',
        'lifted': '0 10px 30px rgba(46, 91, 83, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
