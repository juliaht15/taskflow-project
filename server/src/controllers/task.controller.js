// 1. Importación del Servicio
const taskService = require('../services/task.service');

/**
 * Obtener todas las tareas
 * Ruta: GET /api/v1/tasks
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
 * Ruta: POST /api/v1/tasks
 * Body: { "title": "Nombre de la tarea" }
 */
const createTask = (req, res) => {
    const { title } = req.body;

    // Validación defensiva en tiempo de ejecución
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ 
            error: "El título es obligatorio, debe ser texto y tener al menos 3 caracteres." 
        });
    }

    try {
        const newTask = taskService.createTask({ title });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

/**
 * Eliminar una tarea por ID
 * Ruta: DELETE /api/v1/tasks/:id
 */
const deleteTask = (req, res) => {
    const { id } = req.params;

    try {
        taskService.deleteTask(id);
        res.status(204).send(); // Éxito sin contenido
    } catch (error) {
        // Manejo de error específico si el servicio lanza NOT_FOUND
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// 2. Exportación de los métodos
module.exports = {
    getTasks,
    createTask,
    deleteTask
};