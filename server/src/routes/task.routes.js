const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Mapeo de verbos HTTP a métodos del controlador
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);

// Añadimos PATCH para permitir actualizaciones parciales (como el completado)
router.patch('/:id', taskController.updateTask); 

router.delete('/:id', taskController.deleteTask);

module.exports = router;