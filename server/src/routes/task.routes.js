/**
 * TASKFLOW PRO - Task Routes
 * Maps HTTP verbs to controller methods.
 */

import express from 'express';
import taskController from '../controllers/task.controller.js';

const router = express.Router();

/**
 * Middleware para validar ID como número
 */
const validateTaskId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID debe ser un número válido' });
    }
    next();
};

/**
 * GET /api/v1/tasks - Fetch all tasks
 */
router.get('/', async (req, res, next) => {
    try {
        await taskController.getTasks(req, res);
    } catch (err) {
        next(err);
    }
});

/**
 * POST /api/v1/tasks - Create a new task
 */
router.post('/', async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: 'El título es requerido' });
        }
        await taskController.createTask(req, res);
    } catch (err) {
        next(err);
    }
});

/**
 * PATCH /api/v1/tasks/:id - Partially update a task
 */
router.patch('/:id', validateTaskId, async (req, res, next) => {
    try {
        await taskController.updateTask(req, res);
    } catch (err) {
        next(err);
    }
});

/**
 * DELETE /api/v1/tasks/:id - Remove a task
 */
router.delete('/:id', validateTaskId, async (req, res, next) => {
    try {
        await taskController.deleteTask(req, res);
    } catch (err) {
        next(err);
    }
});

export default router;