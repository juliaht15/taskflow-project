/**
 * TASKFLOW PRO - Task Controller
 */
const taskService = require('../services/task.service');

/**
 * Fetch all tasks
 */
const getTasks = (req, res) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json({ 
            success: true,
            data: tasks,
            count: tasks.length 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * Create a new task
 */
const createTask = (req, res) => {
    try {
        const { title, priority } = req.body;
        const newTask = taskService.createTask({ title, priority });
        
        res.status(201).json({ 
            success: true,
            data: newTask 
        });
    } catch (err) {
        const status = err.status || 400;
        res.status(status).json({ success: false, error: err.message });
    }
};

/**
 * Update a task
 */
const updateTask = (req, res) => {
    try {
        const { id } = req.params;
        const updated = taskService.updateTask(id, req.body);
        
        res.status(200).json({ 
            success: true,
            data: updated 
        });
    } catch (err) {
        const status = err.status || 404;
        res.status(status).json({ success: false, error: err.message });
    }
};

/**
 * Delete a task
 */
const deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        taskService.deleteTask(id);
        
        res.status(200).json({ 
            success: true,
            message: `Tarea ${id} eliminada` 
        });
    } catch (err) {
        const status = err.status || 404;
        res.status(status).json({ success: false, error: err.message });
    }
};

// EXPORTACIÓN CORRECTA PARA NODE.JS
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};