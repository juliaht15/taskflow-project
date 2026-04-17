const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CONFIGURACIÓN DE CORS: Permitimos tanto local como tu dominio de Vercel
app.use(cors({
  origin: ['http://localhost:5173', 'https://juliaht15-taskflow-project.vercel.app'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Puerto dinámico para Render/Producción
const PORT = process.env.PORT || 3000;

// Datos en memoria
let tasks = [
  { id: 1, title: 'Servidor real funcionando', priority: 'Alta', completed: true, createdAt: new Date().toISOString() },
  { id: 2, title: 'Configurar variables de entorno', priority: 'Media', completed: false, createdAt: new Date().toISOString() }
];

// RUTAS
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { 
    id: Date.now(), 
    ...req.body, 
    completed: false, 
    createdAt: new Date().toISOString() 
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === Number(id));
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).send();
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Servidor producción listo en puerto ${PORT}`);
});