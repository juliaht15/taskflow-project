const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

// Validar ID
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, error: 'ID inválido' });
  }
  next();
};

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.patch('/:id', validateId, controller.updateTask);
router.delete('/:id', validateId, controller.deleteTask);

module.exports = router;