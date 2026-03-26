require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

const allowedOrigins = [
  'https://juliaht15-taskflow-project.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS restriction'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Endpoint de salud
app.get('/api/status', (req, res) => res.json({ 
  status: 'online', 
  env: process.env.NODE_ENV || 'development' 
}));

// Rutas
app.use('/api/v1/tasks', taskRoutes);

// Fallback para rutas no encontradas
app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

module.exports = app;