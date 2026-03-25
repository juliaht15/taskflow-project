require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: [
    'https://taskflow-project-uy2w-au0e40jkb-juliaht15s-projects.vercel.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Endpoint de salud
app.get('/api/status', (req, res) => res.json({ 
  status: 'online', 
  env: process.env.NODE_ENV || 'development' 
}));

// Rutas de la API
app.use('/api/v1/tasks', taskRoutes);

// Manejo de errores 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// EXPORTAR PARA VERCEL (Crucial)
module.exports = app;

// Solo para ejecución local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
}