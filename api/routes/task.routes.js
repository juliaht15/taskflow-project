const express = require('express');
const router = express.Router();
// Ruta corregida: subimos un nivel para buscar la carpeta controllers
const controller = require('../controllers/task.controller');

const validateId = (req, res, next) => {
  if (isNaN(parseInt(req.params.id, 10))) return res.status(400).json({ error: 'ID inválido' });
  next();
};

router.route('/')
  .get(controller.getTasks)
  .post(controller.createTask);

router.route('/:id')
  .all(validateId)
  .patch(controller.updateTask)
  .delete(controller.deleteTask);

module.exports = router;