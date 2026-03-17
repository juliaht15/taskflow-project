/**
 * TASKFLOW PRO - Environment Configuration
 */
require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
};

/**
 * Strict Validation: 
 * Ensures critical environment variables are loaded before starting.
 */
if (!process.env.PORT && process.env.NODE_ENV === 'production') {
    console.error('❌ CRITICAL ERROR: PORT is not defined in environment variables.');
    throw new Error('Server configuration failed: Missing critical variables.');
}

module.exports = config;