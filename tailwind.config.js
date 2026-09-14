/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          50:  '#edf4ee',
          100: '#c8dfc9',
          200: '#a2c9a4',
          300: '#7db47f',
          400: '#579f5a',
          500: '#3a8a3d',
          600: '#2e6e31',
          700: '#235225',
          800: '#173619',
          900: '#0c1b0d',
          950: '#060d07',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        cream: {
          50:  '#fdfcf8',
          100: '#faf7ef',
          200: '#f5eedc',
          300: '#ede3c4',
          400: '#dfd0a5',
        },
      },
      fontFamily: {
        cairo:  ['Cairo', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.8s ease forwards',
        'slide-up':   'slideUp 0.9s ease forwards',
        'grow-tree':  'growTree 0.6s ease forwards',
        'leaf-pop':   'leafPop 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        growTree: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'bottom center' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom center' },
        },
        leafPop: {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '60%':  { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
