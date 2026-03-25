const taskService = require('../services/task.service');

const handle = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  getTasks: handle((req, res) => {
    const tasks = taskService.getAllTasks();
    res.json({ success: true,  tasks, count: tasks.length });
  }),
  
  createTask: handle(async (req, res) => {
    const { title, priority } = req.body;
    if (!title?.trim() || title.length < 3) {
      return res.status(400).json({ success: false, error: 'Título mínimo 3 caracteres' });
    }
    const task = taskService.createTask({ title, priority });
    res.status(201).json({ success: true,  task });
  }),
  
  updateTask: handle(async (req, res) => {
    const { id } = req.params;
    const task = taskService.updateTask(id, req.body);
    res.json({ success: true,  task });
  }),
  
  deleteTask: handle(async (req, res) => {
    taskService.deleteTask(req.params.id);
    res.status(204).send();
  })
};