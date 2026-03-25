require('dotenv').config();
const express = require('express');
const cors = require('cors');

// IMPORTANTE: Ruta corregida para la nueva estructura
const taskRoutes = require('./routes/task.routes');

const app = express();

// Configuración de CORS Profesional
app.use(cors({
  origin: [
    'https://taskflow-project-uy2w-au0e40jkb-juliaht15s-projects.vercel.app',
    'http://localhost:5173' // Para que te funcione también en local
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Endpoints de utilidad
app.get('/api/status', (req, res) => res.json({ 
  status: 'online', 
  env: process.env.NODE_ENV || 'dev' 
}));

// Prefijo de API
app.use('/api/v1/tasks', taskRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error' 
  });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Exportar para Vercel (Esto es lo que hace que funcione como Serverless)
module.exports = app;

// Server local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));
}