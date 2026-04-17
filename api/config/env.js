require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  // Puerto del servidor
  port: process.env.PORT || 3000,
  
  // Entorno actual
  nodeEnv,
  isProduction: nodeEnv === 'production',

  // Configuración de CORS
  // En local, es vital que coincida con el puerto de Vite (5173)
  corsOrigin: nodeEnv === 'production' 
    ? 'https://juliaht15-taskflow-project.vercel.app' 
    : 'http://localhost:5173',

  // Prefijo de la API
  apiPrefix: '/api'
};