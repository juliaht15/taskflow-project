const express = require('express');
const router = express.Router();
const TaskService = require('../services/task.service');

// GET /api/tasks
router.get('/', (req, res) => {
  const tasks = TaskService.findAll();
  res.json(tasks);
});

// POST /api/tasks
router.post('/', (req, res) => {
  try {
    const newTask = TaskService.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

module.exports = router;