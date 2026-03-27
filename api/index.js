const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Configuración de CORS simplificada y limpia
const allowedOrigins = [
  'https://juliaht15-taskflow-project.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API Status - Útil para saber si el backend responde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', project: 'TaskFlow Pro' });
});

// Rutas de la API
app.use('/api/tasks', taskRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

module.exports = app;