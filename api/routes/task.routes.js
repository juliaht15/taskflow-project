const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Obtener todas las tareas -> GET /api/tasks
router.get('/', taskController.getTasks);

// Crear una tarea -> POST /api/tasks
router.post('/', taskController.createTask);

// Actualizar una tarea -> PATCH /api/tasks/:id
router.patch('/:id', taskController.updateTask);

// Eliminar una tarea -> DELETE /api/tasks/:id
router.delete('/:id', taskController.deleteTask);

module.exports = router;