require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    // Aquí podrías añadir más variables en el futuro (DB_URL, API_KEYS, etc.)
};

// Validación estricta: Si no existe el puerto, lanzamos un error que detiene el proceso
if (!process.env.PORT) {
    console.error('❌ ERROR CRÍTICO: El puerto (PORT) no está definido en las variables de entorno.');
    throw new Error('La configuración del servidor ha fallado por falta de variables críticas.');
}

module.exports = config;