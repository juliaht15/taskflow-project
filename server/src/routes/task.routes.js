const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

const validateTaskId = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
        return res.status(400).json({ success: false, error: 'ID debe ser un número válido' });
    }
    req.params.id = id;
    next();
};

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.patch('/:id', validateTaskId, taskController.updateTask);
router.delete('/:id', validateTaskId, taskController.deleteTask);

module.exports = router;