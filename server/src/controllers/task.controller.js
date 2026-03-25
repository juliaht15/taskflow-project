const taskService = require('../services/task.service');

const getTasks = (req, res, next) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json({ success: true,  tasks, count: tasks.length });
    } catch (err) { next(err); }
};

const createTask = (req, res, next) => {
    try {
        const { title, priority } = req.body;
        if (!title || typeof title !== 'string' || title.trim().length < 3) {
            return res.status(400).json({ success: false, error: 'Título obligatorio (mín. 3 caracteres)' });
        }
        if (priority && typeof priority !== 'string') {
            return res.status(400).json({ success: false, error: 'Prioridad debe ser texto' });
        }
        const newTask = taskService.createTask({ title, priority });
        res.status(201).json({ success: true,  newTask });
    } catch (err) { next(err); }
};

const updateTask = (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.title !== undefined && (typeof updates.title !== 'string' || updates.title.trim().length < 3)) {
            return res.status(400).json({ success: false, error: 'Título debe tener mín. 3 caracteres' });
        }
        const updated = taskService.updateTask(id, updates);
        res.status(200).json({ success: true,  updated });
    } catch (err) { next(err); }
};

const deleteTask = (req, res, next) => {
    try {
        const { id } = req.params;
        taskService.deleteTask(id);
        res.status(204).send();
    } catch (err) { next(err); }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };