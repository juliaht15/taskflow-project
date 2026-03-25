const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

// Middleware: Validación de ID limpia
const validateId = (req, res, next) => {
  if (isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).json({ error: 'ID numérico inválido' });
  }
  next();
};

// Rutas base: /api/v1/tasks
router.route('/')
  .get(controller.getTasks)
  .post(controller.createTask);

// Rutas con ID: /api/v1/tasks/:id
router.route('/:id')
  .all(validateId) // Aplica a todos los verbos en esta ruta
  .patch(controller.updateTask)
  .delete(controller.deleteTask);

module.exports = router;