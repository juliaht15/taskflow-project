const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Configuración de CORS profesional
const allowedOrigins = [
  "http://localhost:5173",
  "https://taskflow-project-jht.vercel.app", // Tu URL real de Vercel
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

// Datos en memoria iniciales
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

// Helper para respuestas consistentes
const sendResponse = (res, status, data) => res.status(status).json(data);

// RUTAS
app.get("/", (req, res) => res.send("🚀 API de TaskFlow funcionando"));

// --- TAREAS ---
app.get("/api/tasks", (req, res) => res.json(tasks)); // Devuelve el array directamente para facilitar el frontend

app.post("/api/tasks", (req, res) => {
  const { title, description, projectId, priority, timeframe, dueDate } =
    req.body;

  if (!title)
    return res.status(400).json({ error: "El título es obligatorio" });

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || "",
    projectId: projectId || "1",
    priority: priority || "medium",
    timeframe: timeframe || "today",
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  sendResponse(res, 201, newTask);
});

app.patch("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.status(204).send();
});

// --- PROYECTOS ---
app.get("/api/projects", (req, res) => res.json(projects));

app.post("/api/projects", (req, res) => {
  const { name, color } = req.body;
  if (!name) return res.status(400).json({ error: "Nombre obligatorio" });

  const newProject = {
    id: Date.now().toString(),
    name,
    color: color || "bg-slate-500",
    createdAt: new Date().toISOString(),
  };

  projects.push(newProject);
  sendResponse(res, 201, newProject);
});

app.listen(PORT, () => console.log(`✅ Servidor en puerto ${PORT}`));

module.exports = app;
