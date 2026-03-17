/**
 * TASKFLOW PRO - Task Routes
 * Maps HTTP verbs to controller methods.
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET /api/v1/tasks - Fetch all tasks
router.get('/', taskController.getTasks);

// POST /api/v1/tasks - Create a new task
router.post('/', taskController.createTask);

// PATCH /api/v1/tasks/:id - Partially update a task
router.patch('/:id', taskController.updateTask); 

// DELETE /api/v1/tasks/:id - Remove a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;