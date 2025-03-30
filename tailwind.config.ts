/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      desktop: '1024px',
    },
    extend: {
      colors: {
        'point-blue': '#146EF5',
        'btn-gray': '#5A5C63',
        'btn-disabled': '#4E5157',
      },
      fontFamily: {
        pretendard: ['pretendard'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};
