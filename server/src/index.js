const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

// 1. EL LOGGER
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// 2. CONFIGURACIÓN BÁSICA
app.use(cors());
app.use(express.json());

// 3. LAS RUTAS
app.use('/api/v1/tasks', taskRoutes);

// 4. EL MANEJADOR DE ERRORES
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('🚀 Server en puerto 3000'));
}