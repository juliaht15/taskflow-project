let tasks = [
  { id: 1, title: 'Tarea ejemplo', priority: 'Alta', completed: false, createdAt: new Date(), updatedAt: new Date() }
];
let nextId = 2;
const VALID_PRIORITIES = ['Baja', 'Media', 'Alta'];

class TaskError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.status = code === 'TASK_NOT_FOUND' ? 404 : 400;
  }
}

const findTask = (id) => tasks.find(t => t.id === parseInt(id, 10));

const validateTask = (data, isUpdate = false) => {
  if (!isUpdate || data.title !== undefined) {
    if (!data.title?.trim()) throw new TaskError('INVALID_TITLE', 'Título obligatorio');
  }
  if (data.priority !== undefined && !VALID_PRIORITIES.includes(data.priority)) {
    throw new TaskError('INVALID_PRIORITY', 'Prioridad inválida');
  }
};

module.exports = {
  getAllTasks: () => tasks.map(t => ({ ...t })),
  
  createTask: (data) => {
    validateTask(data);
    const task = {
      id: nextId++,
      title: data.title.trim(),
      priority: data.priority || 'Media',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(task);
    return { ...task };
  },
  
  updateTask: (id, updates) => {
    const task = findTask(id);
    if (!task) throw new TaskError('TASK_NOT_FOUND', 'Tarea no encontrada');
    validateTask(updates, true);
    Object.assign(task, updates, { updatedAt: new Date() });
    return { ...task };
  },
  
  deleteTask: (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id, 10));
    if (index === -1) throw new TaskError('TASK_NOT_FOUND', 'Tarea no encontrada');
    tasks.splice(index, 1);
    return true;
  },
  
  TaskError
};