/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}",
    '!./node_modules',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/background1.jpg')",
        "menu": "url('/assets/background2.jpg')"
      },
      backgroundColor:{
        "main-button": "green" 
      },
      colors: {
        'custom-black': '#232323',
        'custom-yellow': '#FDC71F',
      },
    },
  },
  plugins: [],
}

