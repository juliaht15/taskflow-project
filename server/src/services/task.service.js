/**
 * SERVICIO DE TAREAS - TASKFLOW PRO
 * Gestiona la lógica de negocio y la persistencia en memoria.
 */

// Simulamos una base de datos con un array en memoria
let tasks = [
    { id: 1, title: 'Completar Fase 1 y 2', priority: 'Alta', completed: true },
    { id: 2, title: 'Dominar el Backend con Node', priority: 'Media', completed: false }
];

/**
 * Retorna todas las tareas actuales
 */
const getAllTasks = () => {
    return tasks;
};

/**
 * Crea una nueva tarea con ID único y prioridad
 * @param {Object} taskData - Contiene title y priority
 */
const createTask = (taskData) => {
    const newTask = {
        id: Date.now(), // Generamos un ID basado en el timestamp actual
        title: taskData.title,
        priority: taskData.priority || 'Media', // Valor por defecto si no viene del Front
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};

/**
 * Actualiza parcialmente una tarea (PATCH)
 * @param {string|number} id 
 * @param {Object} updates - Campos a actualizar (ej: { completed: true })
 */
const updateTask = (id, updates) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new Error('NOT_FOUND'); 
    }

    // Fusionamos la tarea existente con los nuevos cambios (Spread Operator)
    tasks[index] = { ...tasks[index], ...updates };
    
    return tasks[index];
};

/**
 * Elimina una tarea por su ID
 * @param {string|number} id 
 */
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new Error('NOT_FOUND'); 
    }

    tasks.splice(index, 1);
    return true;
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};