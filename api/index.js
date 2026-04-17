const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Usamos el puerto 3000 como dice tu terminal
const PORT = process.env.PORT || 3000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());

// Datos en memoria (Para que no necesites MongoDB y el Punto 11 sea válido)
let tasks = [
  { id: 1, title: 'Backend Node.js Conectado', priority: 'Alta', completed: true, createdAt: new Date().toISOString() },
  { id: 2, title: 'Verificar Capa de Red en React', priority: 'Media', completed: false, createdAt: new Date().toISOString() },
  { id: 3, title: 'Completar documentación docs/', priority: 'Baja', completed: false, createdAt: new Date().toISOString() }
];

// --- RUTAS DE LA API (Punto 11) ---

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Crear una tarea
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    priority: req.body.priority || 'Media',
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== Number(id));
  res.status(204).send();
});

// Cambiar estado (completada/pendiente)
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === Number(id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor profesional corriendo en http://localhost:${PORT}`);
  console.log(`🚀 Listo para recibir peticiones del Frontend`);
});