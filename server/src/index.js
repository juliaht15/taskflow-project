require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors({ origin: config.corsOrigin, methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'], credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    res.on('finish', () => console.log(`→ ${res.statusCode} (${Date.now() - start}ms)`));
    next();
});

app.get('/', (req, res) => res.status(200).json({ status: 'ok', service: 'TaskFlow API', version: '1.0.0' }));
app.get('/api/status', (req, res) => res.status(200).json({ status: 'operational', uptime: process.uptime(), environment: config.nodeEnv }));

app.use(`${config.apiPrefix}/tasks`, taskRoutes);

app.use((err, req, res, next) => {
    console.error('❌ [ERROR]', err.message);
    if (err.code && ['INVALID_TITLE','INVALID_PRIORITY','TASK_NOT_FOUND'].includes(err.code)) {
        return res.status(err.status || 400).json({ success: false, error: err.message, code: err.code });
    }
    res.status(500).json({ success: false, error: config.isProduction ? 'Error interno del servidor' : err.message });
});

app.use((req, res) => res.status(404).json({ success: false, error: 'Endpoint no encontrado' }));

module.exports = app;

if (config.isDevelopment && require.main === module) {
    app.listen(config.port, () => console.log(`🚀 Server running on http://localhost:${config.port}`));
}