let tasks = [
  { id: 1, title: 'Tarea ejemplo', priority: 'Media', completed: false, createdAt: new Date() }
];
let nextId = 2;
const PRIORITIES = ['Baja', 'Media', 'Alta'];

class TaskError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const findIndex = (id) => tasks.findIndex(t => t.id === parseInt(id, 10));

module.exports = {
  getAllTasks: () => [...tasks],

  createTask: ({ title, priority = 'Media' }) => {
    if (!title?.trim()) throw new TaskError(400, 'Título obligatorio');
    if (!PRIORITIES.includes(priority)) throw new TaskError(400, 'Prioridad inválida');

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

  updateTask: (id, updates) => {
    const task = tasks.find(t => t.id === parseInt(id, 10));
    if (!task) throw new TaskError(404, 'Tarea no encontrada');

    if (updates.priority && !PRIORITIES.includes(updates.priority)) {
      throw new TaskError(400, 'Prioridad inválida');
    }

    Object.assign(task, updates, { updatedAt: new Date() });
    return { ...task };
  },

  deleteTask: (id) => {
    const index = findIndex(id);
    if (index === -1) throw new TaskError(404, 'Tarea no encontrada');
    tasks.splice(index, 1);
    return true;
  },

  TaskError
};