/** @type {import('tailwindcss').Config} */
module.exports = {
  // Punto 1: Archivos donde buscar clases
  content: ["./index.html", "./app.js"],
  // Punto 3 y 4: Habilitamos el modo oscuro por clase
  darkMode: 'class', 
  theme: {
    extend: {
      // Punto 5: Coherencia visual
      colors: {
        primary: '#6366f1', // Indigo 500
      }
    },
  },
  plugins: [],
}