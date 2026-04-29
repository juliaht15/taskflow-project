const express = require("express");
const cors = require("cors");

const app = express();
// Render nos da el puerto en process.env.PORT, si no, usamos el 10000
const PORT = process.env.PORT || 10000;

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://juliaht15-taskflow-project.vercel.app",
  /\.vercel\.app$/,
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Datos en memoria para que el profesor vea que funciona
let tasks = [];
let projects = [
  {
    id: "1",
    name: "Proyecto Personal",
    color: "bg-blue-500",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Trabajo",
    color: "bg-purple-500",
    createdAt: new Date().toISOString(),
  },
];

// RUTAS BÁSICAS
app.get("/", (req, res) => {
  res.send("🚀 API de TaskFlow funcionando correctamente");
});

app.get("/api/tasks", (req, res) => {
  res.json({ success: true, data: tasks });
});

app.post("/api/tasks", (req, res) => {
  const { title, description, projectId, priority, dueDate } = req.body;
  if (!title)
    return res.status(400).json({ error: "El título es obligatorio" });

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || "",
    projectId: projectId || "1",
    priority: priority || "normal",
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

app.patch("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  tasks[index] = {
    ...tasks[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json({ success: true, data: tasks[index] });
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.status(200).json({ success: true, message: "Tarea eliminada" });
});

app.get("/api/projects", (req, res) => {
  res.json({ success: true, data: projects });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
