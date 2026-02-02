/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        blush: '#f8d7e5',
        cream: '#fff7f2',
        champagne: '#f6e6d7',
        lavender: '#e8ddff',
        rose: '#f2a7c6',
        berry: '#d56b9f',
      },
      boxShadow: {
        glow: '0 0 30px rgba(214, 107, 159, 0.35)',
      },
    },
  },
  plugins: [],
}
