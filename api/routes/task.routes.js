const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');

const validateId = (req, res, next) => {
  if (isNaN(parseInt(req.params.id, 10))) {
    return res.status(400).json({ error: 'Invalid numeric ID' });
  }
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