/**
 * TASKFLOW PRO - Environment Configuration
 */

const requiredEnvVars = ['NODE_ENV'];

// Validate required environment variables
const missing = requiredEnvVars.filter(key => !process.env[key]);
if (missing.length > 0) {
    console.error(`❌ Variables de entorno faltantes: ${missing.join(', ')}`);
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
}

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    apiVersion: 'v1'
};

// Log config on startup
if (config.isDevelopment) {
    console.log('🔧 Config loaded:', {
        port: config.port,
        env: config.nodeEnv,
        corsOrigin: config.corsOrigin
    });
}

export default config;