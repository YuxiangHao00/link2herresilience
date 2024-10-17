/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        '[#00BD90]': '#00BD90',
        '[#00A77D]': '#00A77D',
      },
    },
  },
  plugins: [],
}

