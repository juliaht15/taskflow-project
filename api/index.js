const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

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

// Accessible at /api/health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', project: 'TaskFlow Pro' });
});

// Accessible at /api/tasks
app.use('/tasks', taskRoutes);

// Error handler for API
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado en la API' });
});

module.exports = app;