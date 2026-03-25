const taskService = require('../services/task.service');

// Async Handler profesional para evitar try/catch repetitivos
const handle = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  getTasks: handle((req, res) => {
    const tasks = taskService.getAllTasks();
    res.json({ success: true, data: tasks, count: tasks.length });
  }),

  createTask: handle(async (req, res) => {
    const { title, priority } = req.body;
    
    if (!title?.trim() || title.length < 3) {
      return res.status(400).json({ error: 'Título mínimo 3 caracteres' });
    }

    const task = taskService.createTask({ title, priority });
    res.status(201).json({ success: true, data: task });
  }),

  updateTask: handle(async (req, res) => {
    const task = taskService.updateTask(req.params.id, req.body);
    
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    
    res.json({ success: true, data: task });
  }),

  deleteTask: handle(async (req, res) => {
    const deleted = taskService.deleteTask(req.params.id);
    
    if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
    
    res.status(204).send();
  })
};