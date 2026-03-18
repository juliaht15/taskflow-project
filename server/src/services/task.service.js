/**
 * TASKFLOW PRO - Task Service
 * Lógica de negocio y persistencia volátil en memoria.
 */

// 1. Datos iniciales (Mock Data) para que la web no aparezca vacía
let tasks = [
    { 
        id: 1, 
        title: 'Completar Fase 1 y 2', 
        priority: 'Alta', 
        completed: true, 
        createdAt: new Date(), 
        updatedAt: new Date() 
    },
    { 
        id: 2, 
        title: 'Master Node.js Backend', 
        priority: 'Media', 
        completed: false, 
        createdAt: new Date(), 
        updatedAt: new Date() 
    },
    { 
        id: 3, 
        title: 'Comprar Pan', 
        priority: 'Baja', 
        completed: false, 
        createdAt: new Date(), 
        updatedAt: new Date() 
    },
    { 
        id: 4, 
        title: 'Revisar README', 
        priority: 'Media', 
        completed: false, 
        createdAt: new Date(), 
        updatedAt: new Date() 
    }
];

// 2. El siguiente ID debe ser 5 para evitar duplicados con los de arriba
let nextId = 5;

// Definimos las prioridades exactas que acepta nuestro sistema
const VALID_PRIORITIES = ['Baja', 'Media', 'Alta'];

/**
 * Clase para manejar errores específicos de la lógica de tareas
 */
class TaskError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.status = code === 'TASK_NOT_FOUND' ? 404 : 400;
    }
}

/**
 * Validador de datos de entrada
 */
const validateTask = (taskData) => {
    if (!taskData.title || taskData.title.trim().length === 0) {
        throw new TaskError('INVALID_TITLE', 'El título es obligatorio');
    }
    if (taskData.priority && !VALID_PRIORITIES.includes(taskData.priority)) {
        throw new TaskError('INVALID_PRIORITY', `La prioridad debe ser: ${VALID_PRIORITIES.join(', ')}`);
    }
};

/**
 * SERVICIOS EXPORTADOS
 */

const getAllTasks = () => {
    // Retornamos una copia para proteger el array original
    return tasks.map(t => ({ ...t }));
};

const createTask = (taskData) => {
    validateTask(taskData);
    
    const newTask = {
        id: nextId++,
        title: taskData.title.trim(),
        priority: taskData.priority || 'Media',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    tasks.push(newTask);
    return { ...newTask };
};

const updateTask = (id, updates) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new TaskError('TASK_NOT_FOUND', `No existe la tarea con ID ${id}`);
    }

    // Fusionamos la tarea existente con los cambios, manteniendo el ID original
    const updatedTask = {
        ...tasks[index],
        ...updates,
        id: tasks[index].id, 
        updatedAt: new Date()
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
};

const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new TaskError('TASK_NOT_FOUND', `No se puede eliminar: ID ${id} no existe`);
    }

    tasks.splice(index, 1);
    return true;
};

// Exportación usando CommonJS (requerido para Node.js estándar)
module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};