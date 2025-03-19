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
