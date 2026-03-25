require('dotenv').config();

const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    corsOrigin: process.env.NODE_ENV === 'production'
        ? (process.env.FRONTEND_URL || 'https://taskflow-project-uy2w.vercel.app').split(',')
        : '*',
    apiPrefix: `/api/${process.env.API_VERSION || 'v1'}`
};

module.exports = config;