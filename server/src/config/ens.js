/**
 * TASKFLOW PRO - Environment Configuration
 */
require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
};

/**
 * Validación de Seguridad:
 * En producción (Vercel), no bloqueamos si falta el PORT porque 
 * la plataforma lo asigna dinámicamente. Solo avisamos.
 */
if (!process.env.PORT && config.nodeEnv === 'production') {
    console.warn('⚠️ Nota: PORT no definido, usando asignación dinámica de Vercel.');
}

module.exports = config;