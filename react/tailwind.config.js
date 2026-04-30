/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: "#10b981",
          purple: "#9333ea",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  safelist: [
    "bg-blue-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-red-500",
    "bg-amber-500",
    "bg-slate-500",
  ],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
