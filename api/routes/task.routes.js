const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

// Middleware para validar que el ID sea un número
const validateId = (req, res, next) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json({ error: 'El ID debe ser un número válido' });
  }
  next();
};

// Rutas principales: /api/tasks
router.route('/')
  .get(controller.getTasks)
  .post(controller.createTask);

// Rutas con ID: /api/tasks/:id
router.route('/:id')
  .all(validateId) // Se aplica a todos los métodos que usen :id
  .patch(controller.updateTask)
  .delete(controller.deleteTask);

module.exports = router;