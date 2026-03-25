require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const routes = require('./routes/task.routes');

const app = express();
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', service: 'TaskFlow API' }));
app.get('/api/status', (req, res) => res.json({ status: 'operational', environment: config.nodeEnv }));
app.use(`${config.apiPrefix}/tasks`, routes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.status) return res.status(err.status).json({ success: false, error: err.message });
  res.status(500).json({ success: false, error: config.isProduction ? 'Error interno' : err.message });
});

app.use((req, res) => res.status(404).json({ error: 'Endpoint no encontrado' }));

module.exports = app;
if (config.nodeEnv !== 'production' && require.main === module) {
  app.listen(config.port, () => console.log(`🚀 Server: http://localhost:${config.port}`));
}