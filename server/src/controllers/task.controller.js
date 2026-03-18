/**
 * TASKFLOW PRO - Task Controller
 * Handles incoming HTTP requests and sends responses.
 */

import * as taskService from '../services/task.service.js';

/**
 * Fetch all tasks
 * GET /api/v1/tasks
 */
export const getTasks = async (req, res, next) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json({ 
            success: true,
            data: tasks,
            count: tasks.length 
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new task
 * POST /api/v1/tasks
 */
export const createTask = async (req, res, next) => {
    try {
        const { title, priority } = req.body;
        
        const newTask = taskService.createTask({ title, priority });
        console.log(`📝 New task created: ${newTask.id}`);
        
        res.status(201).json({ 
            success: true,
            data: newTask 
        });
    } catch (err) {
        if (err.code === 'INVALID_TITLE') {
            return res.status(400).json({ 
                success: false,
                error: err.message 
            });
        }
        next(err);
    }
};

/**
 * Update a task
 * PATCH /api/v1/tasks/:id
 */
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = taskService.updateTask(id, req.body);
        
        res.status(200).json({ 
            success: true,
            data: updated 
        });
    } catch (err) {
        if (err.code === 'TASK_NOT_FOUND') {
            return res.status(404).json({ 
                success: false,
                error: err.message 
            });
        }
        next(err);
    }
};

/**
 * Delete a task
 * DELETE /api/v1/tasks/:id
 */
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        taskService.deleteTask(id);
        
        res.status(200).json({ 
            success: true,
            message: `Tarea ${id} eliminada` 
        });
    } catch (err) {
        if (err.code === 'TASK_NOT_FOUND') {
            return res.status(404).json({ 
                success: false,
                error: err.message 
            });
        }
        next(err);
    }
};

export default {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};