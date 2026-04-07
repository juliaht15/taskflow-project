const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Importante: No pongas '/api/tasks', pon solo '/tasks'
app.use('/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', project: 'TaskFlow Pro' });
});

// Manejador de errores para rutas de API no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta de API no encontrada', path: req.url });
});

module.exports = app;