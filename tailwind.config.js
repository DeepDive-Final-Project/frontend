/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'point-blue': '#146EF5',
        'btn-gray': '#5A5C63',
        'btn-disabled': '#4E5157',
      },
    },
  },
  plugins: [],
};
