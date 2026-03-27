require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  // Puerto del servidor
  port: Number(process.env.PORT) || 3000,
  
  // Entorno actual
  nodeEnv,
  isProduction: nodeEnv === 'production',

  // Configuración de CORS: En producción usamos la URL de Vercel, en local permitimos todo
  corsOrigin: nodeEnv === 'production' 
    ? 'https://juliaht15-taskflow-project.vercel.app' 
    : 'http://localhost:5173',

  // Prefijo de la API (Consistente con nuestras rutas)
  apiPrefix: '/api'
};