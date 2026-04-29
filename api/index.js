const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS dinámica
const allowedOrigins = [
  "http://localhost:5173",
  "https://juliaht15-taskflow-project.vercel.app",
  /\.vercel\.app$/, // Esto permite cualquier subdominio de vercel para tus pruebas
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Datos en memoria (Nota: En Vercel se reiniciarán al estar inactivo)
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

// RUTAS - TAREAS
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

// RUTAS - PROYECTOS
app.get("/api/projects", (req, res) => {
  res.json({ success: true, data: projects });
});

app.post("/api/projects", (req, res) => {
  const { name, color } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ error: "El nombre del proyecto es obligatorio" });

  const newProject = {
    id: Date.now().toString(),
    name,
    color: color || "bg-gray-500",
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  res.status(201).json({ success: true, data: newProject });
});

// RUTA - ESTADÍSTICAS
app.get("/api/stats", (req, res) => {
  res.json({
    success: true,
    data: {
      totalTasks: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      totalProjects: projects.length,
    },
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`✅ Servidor corriendo en puerto ${PORT}`),
  );
}

module.exports = app;
