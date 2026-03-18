/**
 * TASKFLOW PRO - Task Service
 * Business logic and in-memory persistence.
 */

let tasks = [
    { id: 1, title: 'Complete Phase 1 and 2', priority: 'High', completed: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Master Node.js Backend', priority: 'Medium', completed: false, createdAt: new Date(), updatedAt: new Date() }
];

let nextId = 3;

const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

// Clase para errores personalizada
class TaskError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.status = code === 'TASK_NOT_FOUND' ? 404 : 400;
    }
}

const validateTask = (taskData) => {
    if (!taskData.title || taskData.title.trim().length === 0) {
        throw new TaskError('INVALID_TITLE', 'El título no puede estar vacío');
    }
    if (taskData.priority && !VALID_PRIORITIES.includes(taskData.priority)) {
        throw new TaskError('INVALID_PRIORITY', `Prioridad debe ser: ${VALID_PRIORITIES.join(', ')}`);
    }
};

/**
 * Get all tasks
 */
const getAllTasks = () => {
    return tasks.map(t => ({ ...t }));
};

/**
 * Create a new task
 */
const createTask = (taskData) => {
    validateTask(taskData);
    
    const newTask = {
        id: nextId++,
        title: taskData.title.trim(),
        priority: taskData.priority || 'Medium',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    tasks.push(newTask);
    return { ...newTask };
};

/**
 * Update task fields
 */
const updateTask = (id, updates) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new TaskError('TASK_NOT_FOUND', `Tarea ${id} no encontrada`);
    }

    const updatedTask = {
        ...tasks[index],
        ...updates,
        id: tasks[index].id,
        createdAt: tasks[index].createdAt,
        updatedAt: new Date()
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
};

/**
 * Delete task by ID
 */
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new TaskError('TASK_NOT_FOUND', `Tarea ${id} no encontrada`);
    }

    tasks.splice(index, 1);
    return true;
};

// EXPORTACIÓN CORRECTA PARA NODE.JS
module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};