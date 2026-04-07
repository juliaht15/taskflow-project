const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

// El rewrite de Vercel ya nos quita el '/api', así que usamos '/tasks'
app.use('/tasks', taskRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', worker: 'Vercel Node Runtime' });
});

module.exports = app;