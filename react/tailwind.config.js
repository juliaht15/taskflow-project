/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#818cf8',
          DEFAULT: '#4f46e5',
          dark: '#3730a3',
        },
        // Un gris azulado elegante para el fondo (opcional)
        surface: '#f8fafc', 
      },
      // Añadimos una transición suave por defecto para los botones
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}