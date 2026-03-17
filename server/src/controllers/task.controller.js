/**
 * TASKFLOW PRO - Task Controller
 * Handles incoming HTTP requests and sends responses.
 */

const taskService = require('../services/task.service');

/**
 * Fetch all tasks
 * GET /api/v1/tasks
 */
const getTasks = (req, res) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

/**
 * Create a new task
 * POST /api/v1/tasks
 */
const createTask = (req, res) => {
    const { title, priority } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ 
            error: "Title must be at least 3 characters long." 
        });
    }

    try {
        const newTask = taskService.createTask({ title, priority }); 
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

/**
 * Update a task
 * PATCH /api/v1/tasks/:id
 */
const updateTask = (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updated = taskService.updateTask(id, updates);
        res.status(200).json(updated);
    } catch (error) {
        if (error.message === 'TASK_NOT_FOUND') {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(500).json({ error: 'Error updating task' });
    }
};

/**
 * Delete a task
 * DELETE /api/v1/tasks/:id
 */
const deleteTask = (req, res) => {
    const { id } = req.params;
    try {
        taskService.deleteTask(id);
        res.status(204).send(); 
    } catch (error) {
        if (error.message === 'TASK_NOT_FOUND') {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};