const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Mapeo de verbos HTTP a métodos del controlador
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;