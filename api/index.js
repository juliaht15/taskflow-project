const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ['http://localhost:5173', 'https://juliaht15-taskflow-project.vercel.app'] }));
app.use(express.json());

// Datos en memoria
let tasks = [];
let projects = [
  { id: '1', name: 'Proyecto Personal', color: 'bg-blue-500', createdAt: new Date().toISOString() },
  { id: '2', name: 'Trabajo', color: 'bg-purple-500', createdAt: new Date().toISOString() }
];

// RUTAS - TAREAS
app.get('/api/tasks', (req, res) => res.json({ success: true, data: tasks }));

app.post('/api/tasks', (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body, completed: false, createdAt: new Date().toISOString() };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

app.patch('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'No encontrada' });
  tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json({ success: true, data: tasks[index] });
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(204).send();
});

// RUTAS - PROYECTOS
app.get('/api/projects', (req, res) => res.json({ success: true, data: projects }));

app.post('/api/projects', (req, res) => {
  const newProject = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
  projects.push(newProject);
  res.status(201).json({ success: true, data: newProject });
});

// RUTA - ESTADÍSTICAS
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalTasks: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      totalProjects: projects.length
    }
  });
});

app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));

module.exports = app;