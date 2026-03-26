require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv,
  isProduction: nodeEnv === 'production',
  corsOrigin: nodeEnv === 'production'
    ? process.env.FRONTEND_URL?.split(',') || [] 
    : '*',
  apiPrefix: `/api/${process.env.API_VERSION || 'v1'}`
};