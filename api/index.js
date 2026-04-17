const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const env = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

// Conexión a MongoDB (Importante para que el Service funcione)
mongoose.connect('mongodb://127.0.0.1:27017/taskflow')
  .then(() => console.log('✅ MongoDB Conectado localmente'))
  .catch(err => console.error('❌ Error conexión MongoDB:', err));

// Rutas
// Usamos el prefijo definido en env.js (/api) para que las rutas sean /api/tasks
app.use(`${env.apiPrefix}/tasks`, taskRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: env.nodeEnv,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Para local: Arrancamos el servidor
if (env.nodeEnv !== 'production') {
  app.listen(env.port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${env.port}`);
  });
}

module.exports = app;