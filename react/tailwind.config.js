/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Puedes añadir aquí tus colores personalizados si quieres que TaskFlow sea único
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  // Safelist es importante para que los colores de los proyectos no desaparezcan en producción
  safelist: [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-gray-500",
  ],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
