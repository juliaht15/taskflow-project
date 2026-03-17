const taskService = require('../services/task.service');

/**
 * Obtener todas las tareas
 */
const getTasks = (req, res) => {
    try {
        const tasks = taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

/**
 * Crear una nueva tarea
 */
const createTask = (req, res) => {
    const { title, priority } = req.body; // <-- Ahora capturamos también priority

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ 
            error: "El título debe tener al menos 3 caracteres." 
        });
    }

    try {
        // Pasamos todo el objeto al servicio
        const newTask = taskService.createTask({ title, priority }); 
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

/**
 * Actualizar una tarea (NUEVO)
 * Ruta: PATCH /api/v1/tasks/:id
 */
const updateTask = (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Contiene campos como { completed: true }

    try {
        const updated = taskService.updateTask(id, updates);
        res.status(200).json(updated);
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

/**
 * Eliminar una tarea por ID
 */
const deleteTask = (req, res) => {
    const { id } = req.params;
    try {
        taskService.deleteTask(id);
        res.status(204).send(); 
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask, // <-- Exportamos el nuevo método
    deleteTask
};