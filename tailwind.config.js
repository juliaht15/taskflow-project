/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Por si mueves archivos a src
    "./app.js",
    "./style.css"
  ],
  theme: {
    extend: {
      colors: {
        // Mantenemos tus colores corporativos indigo
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        // Añadimos el slate oscuro para un dark mode más profundo
        slate: {
          950: '#020617',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}