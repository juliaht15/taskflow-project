import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configuración de alias para importaciones limpias (ej. import { Task } from "@/types")
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Redirige las llamadas locales /api al servidor backend para evitar bloqueos de CORS
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Genera sourcemaps para facilitar la depuración en producción si fuera necesario
    sourcemap: true,
  },
});
