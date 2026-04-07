let tasks = [
  { id: 1, title: 'Bienvenida a TaskFlow Pro', priority: 'Media', completed: false, createdAt: new Date() }
];
let nextId = 2;

const TaskService = {
  findAll: () => [...tasks],

  create: ({ title, priority = 'Media' }) => {
    if (!title?.trim()) throw new Error('El título es obligatorio');
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
    const task = tasks.find(t => t.id === Number(id));
    if (!task) throw new Error('Tarea no encontrada');
    Object.assign(task, updates);
    return { ...task };
  },

  delete: (id) => {
    const index = tasks.findIndex(t => t.id === Number(id));
    if (index === -1) throw new Error('Tarea no encontrada');
    tasks.splice(index, 1);
    return true;
  }
};

module.exports = TaskService;