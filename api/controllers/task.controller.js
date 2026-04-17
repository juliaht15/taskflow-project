const taskService = require('../services/task.service');

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Crear una tarea
exports.createTask = async (req, res) => {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Actualizar una tarea (completar o editar)
exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.update(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    await taskService.delete(req.params.id);
    res.status(204).send(); 
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};