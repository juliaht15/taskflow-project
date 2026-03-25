require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://taskflow-project-uy2w-au0e40jkb-juliaht15s-projects.vercel.app'] 
    : '*',
  credentials: true
}));

app.use(express.json());

app.get('/api/status', (req, res) => res.json({ status: 'online' }));
app.use('/api/v1/tasks', taskRoutes);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));
}