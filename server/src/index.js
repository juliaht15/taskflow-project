// 1. Importaciones
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/task.routes');

// 2. Configuración
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares de Configuración (Pipeline inicial)
app.use(cors());
app.use(express.json());

// 4. Middleware de Auditoría (Debe ir antes de las rutas para capturarlas todas)
const loggerAcademico = (req, res, next) => {
  const inicio = performance.now();
  res.on('finish', () => { 
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });
  next();
};
app.use(loggerAcademico);

// 5. Rutas
app.get('/api/status', (req, res) => {
  res.json({ message: "Servidor funcionando", status: "OK" });
});

app.use('/api/v1/tasks', taskRoutes);

// 6. Middleware Global de Errores (Siempre al final, después de las rutas)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
});

// 7. Arranque
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});