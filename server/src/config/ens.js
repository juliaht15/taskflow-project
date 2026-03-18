/**
 * TASKFLOW PRO - Environment Configuration
 */

// Configuración por defecto para evitar que el servidor se caiga si faltan variables
const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    apiVersion: 'v1'
};

// Log de ayuda para saber que el servidor arrancó
console.log(`Configuración cargada en modo: ${config.nodeEnv}`);

// EXPORTACIÓN CORRECTA PARA NODE.JS (CommonJS)
module.exports = config;