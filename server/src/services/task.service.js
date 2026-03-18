/**
 * TASKFLOW PRO - Task Service
 * Business logic and in-memory persistence.
 */

// Datos iniciales (Mock Data)
let tasks = [
    { id: 1, title: 'Completar Fase 1 y 2', priority: 'Alta', completed: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Master Node.js Backend', priority: 'Media', completed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 3, title: 'Comprar Pan', priority: 'Baja', completed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 4, title: 'Revisar README', priority: 'Media', completed: false, createdAt: new Date(), updatedAt: new Date() }
];

// El siguiente ID debe ser 5 porque ya existen del 1 al 4
let nextId = 5;

const VALID_PRIORITIES = ['Baja', 'Media', 'Alta'];

/**
 * Clase para manejo de errores de negocio
 */
class TaskError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.status = code === 'TASK_NOT_FOUND' ? 404 : 400;
    }
}

/**
 * Validación defensiva de datos
 */
const validateTask = (taskData) => {
    if (!taskData.title || taskData.title.trim().length === 0) {
        throw new TaskError('INVALID_TITLE', 'El título no puede estar vacío');
    }
    // Validamos que la prioridad sea una de las permitidas en español
    if (taskData.priority && !VALID_PRIORITIES.includes(taskData.priority)) {
        throw new TaskError('INVALID_PRIORITY', `Prioridad debe ser: ${VALID_PRIORITIES.join(', ')}`);
    }
};

/**
 * Obtener todas las tareas
 */
const getAllTasks = () => {
    return tasks.map(t => ({ ...t }));
};

/**
 * Crear una nueva tarea
 */
const createTask = (taskData) => {
    validateTask(taskData);
    
    const newTask = {
        id: nextId++,
        title: taskData.title.trim(),
        priority: taskData.priority || 'Media', // Por defecto en español
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    tasks.push(newTask);
    return { ...newTask };
};

/**
 * Actualizar campos de una tarea
 */
const updateTask = (id, updates) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new TaskError('TASK_NOT_FOUND', `Tarea con ID ${id} no encontrada`);
    }

    const updatedTask = {
        ...tasks[index],
        ...updates,
        id: tasks[index].id, // El ID no cambia
        createdAt: tasks[index].createdAt, // La fecha de creación no cambia
        updatedAt: new Date()
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
};

/**
 * Eliminar una tarea por ID
 */
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new TaskError('TASK_NOT_FOUND', `Tarea con ID ${id} no encontrada`);
    }

    tasks.splice(index, 1);
    return true;
};

// EXPORTACIÓN PARA NODE.JS (CommonJS)
module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};