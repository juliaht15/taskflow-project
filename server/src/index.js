/**
 * TASKFLOW PRO - Server Entry Point
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config/ens.js';
import taskRoutes from './routes/task.routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// API Routes
app.use('/api/v1/tasks', taskRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: 'TaskFlow API is online' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({ error: err.message || 'Error interno' });
});

export default app;

// Start server in development
if (config.isDevelopment) {
    app.listen(config.port, () => {
        console.log(`✅ Server running on http://localhost:${config.port}`);
    });
}