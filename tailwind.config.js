/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
      }
    },
  },
  plugins: [],
}