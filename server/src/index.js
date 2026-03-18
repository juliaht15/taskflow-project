const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middleware de Auditoría (Logger)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => res.send('TaskFlow API Online'));

// Manejo de errores global
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
}