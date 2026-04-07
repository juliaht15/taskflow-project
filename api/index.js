const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
// Al usar /api/(.*) en vercel.json, aquí registramos solo '/tasks'
app.use('/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// Manejo de error 404 para la API
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta de API no encontrada' });
});

module.exports = app;