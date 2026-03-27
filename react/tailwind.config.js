/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aquí podrías añadir colores personalizados de "Julia Project" si quisieras
      colors: {
        brand: {
          light: '#818cf8',
          DEFAULT: '#4f46e5',
          dark: '#3730a3',
        }
      }
    },
  },
  plugins: [],
}