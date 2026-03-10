/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./app.js",
    "./style.css"
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
    },
  },
  plugins: [],
}