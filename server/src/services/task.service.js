/**
 * TASKFLOW PRO - Task Service
 * Business logic and in-memory persistence.
 */

let tasks = [
    { id: 1, title: 'Complete Phase 1 and 2', priority: 'High', completed: true },
    { id: 2, title: 'Master Node.js Backend', priority: 'Medium', completed: false }
];

/**
 * Get all tasks
 */
const getAllTasks = () => {
    return tasks;
};

/**
 * Create a new task
 * @param {Object} taskData 
 */
const createTask = (taskData) => {
    const newTask = {
        id: Date.now(),
        title: taskData.title,
        priority: taskData.priority || 'Medium',
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};

/**
 * Update task fields
 * @param {number} id 
 * @param {Object} updates 
 */
const updateTask = (id, updates) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new Error('TASK_NOT_FOUND'); 
    }

    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
};

/**
 * Delete task by ID
 * @param {number} id 
 */
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new Error('TASK_NOT_FOUND'); 
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