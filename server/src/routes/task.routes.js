const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

const validateId = (req, res, next) => {
  if (isNaN(parseInt(req.params.id))) return res.status(400).json({ error: 'ID inválido' });
  next();
};

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.patch('/:id', validateId, controller.updateTask);
router.delete('/:id', validateId, controller.deleteTask);

module.exports = router;