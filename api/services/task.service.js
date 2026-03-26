let tasks = [
  { id: 1, title: 'Sample Task', priority: 'Media', completed: false, createdAt: new Date() }
];
let nextId = 2;
const PRIORITIES = ['Baja', 'Media', 'Alta'];

class TaskError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  findAll: () => [...tasks],

  create: ({ title, priority = 'Media' }) => {
    if (!title?.trim()) throw new TaskError(400, 'Title is required');
    if (!PRIORITIES.includes(priority)) throw new TaskError(400, 'Invalid priority');

    const task = { 
      id: nextId++, 
      title: title.trim(), 
      priority, 
      completed: false, 
      createdAt: new Date() 
    };
    tasks.push(task);
    return task;
  },

  update: (id, updates) => {
    const task = tasks.find(t => t.id === parseInt(id, 10));
    if (!task) throw new TaskError(404, 'Task not found');

    if (updates.priority && !PRIORITIES.includes(updates.priority)) {
      throw new TaskError(400, 'Invalid priority');
    }

    Object.assign(task, updates, { updatedAt: new Date() });
    return { ...task };
  },

  delete: (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id, 10));
    if (index === -1) throw new TaskError(404, 'Task not found');
    tasks.splice(index, 1);
    return true;
  },

  TaskError
};