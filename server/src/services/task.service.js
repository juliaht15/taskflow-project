let tasks = [
    { id: 1, title: 'Completar Fase 1 y 2', priority: 'Alta', completed: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Master Node.js Backend', priority: 'Media', completed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 3, title: 'Comprar Pan', priority: 'Baja', completed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: 4, title: 'Revisar README', priority: 'Media', completed: false, createdAt: new Date(), updatedAt: new Date() }
];
let nextId = 5;
const VALID_PRIORITIES = ['Baja', 'Media', 'Alta'];

class TaskError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.status = code === 'TASK_NOT_FOUND' ? 404 : 400;
        this.name = 'TaskError';
    }
}

const findTaskIndex = (id) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId < 1) throw new TaskError('INVALID_ID', 'ID inválido');
    return tasks.findIndex(t => t.id === numericId);
};

const validateTask = (taskData, isUpdate = false) => {
    if (!isUpdate || taskData.title !== undefined) {
        if (!taskData.title || typeof taskData.title !== 'string' || taskData.title.trim().length === 0) {
            throw new TaskError('INVALID_TITLE', 'Título obligatorio (mín. 1 carácter)');
        }
    }
    if (taskData.priority !== undefined) {
        if (typeof taskData.priority !== 'string' || !VALID_PRIORITIES.includes(taskData.priority)) {
            throw new TaskError('INVALID_PRIORITY', `Prioridad debe ser: ${VALID_PRIORITIES.join(', ')}`);
        }
    }
};

const getAllTasks = () => tasks.map(t => ({ ...t }));

const createTask = (taskData) => {
    validateTask(taskData, false);
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
    const index = findTaskIndex(id);
    if (index === -1) throw new TaskError('TASK_NOT_FOUND', `Tarea ${id} no encontrada`);
    validateTask(updates, true);
    const updatedTask = { ...tasks[index], ...updates, id: tasks[index].id, updatedAt: new Date() };
    tasks[index] = updatedTask;
    return { ...updatedTask };
};

const deleteTask = (id) => {
    const index = findTaskIndex(id);
    if (index === -1) throw new TaskError('TASK_NOT_FOUND', `Tarea ${id} no encontrada`);
    tasks.splice(index, 1);
    return true;
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, TaskError };