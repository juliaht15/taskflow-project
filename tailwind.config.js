/** @type {import('tailwindcss').Config} */
module.exports = {
  // Activa el modo oscuro mediante una clase en el elemento <html>
  darkMode: 'class', 
  content: [
    "./index.html",
    "./app.js",
    "./style.css"
  ],
  theme: {
    extend: {
      // Personalización opcional de la paleta de colores
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