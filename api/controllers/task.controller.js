const taskService = require('../services/task.service');

// Obtener todas las tareas
exports.getTasks = (req, res) => {
  try {
    const tasks = taskService.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Crear una tarea
exports.createTask = (req, res) => {
  try {
    const task = taskService.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Actualizar una tarea (completar o editar)
exports.updateTask = (req, res) => {
  try {
    const task = taskService.update(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Eliminar una tarea
exports.deleteTask = (req, res) => {
  try {
    taskService.delete(req.params.id);
    res.status(204).send(); // 204 significa "Éxito, pero no hay contenido que devolver"
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};