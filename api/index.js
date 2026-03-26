require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

const allowedOrigins = [
  'https://taskflow-project-uy2w-au0e40jkb-juliaht15s-projects.vercel.app',
  'http://localhost:5173'
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

app.get('/api/status', (req, res) => res.json({ 
  status: 'online', 
  env: process.env.NODE_ENV || 'development' 
}));

app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}