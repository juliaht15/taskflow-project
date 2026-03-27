// Simulamos una base de datos en memoria
let tasks = [
  { id: 1, title: 'Bienvenida a TaskFlow Pro', priority: 'Media', completed: false, createdAt: new Date() }
];
let nextId = 2;

const PRIORITIES = ['Baja', 'Media', 'Alta'];

class TaskError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const TaskService = {
  // Obtener todas las tareas
  findAll: () => [...tasks],

  // Crear una nueva tarea
  create: ({ title, priority = 'Media' }) => {
    if (!title?.trim()) throw new TaskError(400, 'El título es obligatorio');
    if (!PRIORITIES.includes(priority)) throw new TaskError(400, 'Prioridad no válida');

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

  // Actualizar (marcar como completada o cambiar prioridad)
  update: (id, updates) => {
    const task = tasks.find(t => t.id === Number(id));
    if (!task) throw new TaskError(404, 'Tarea no encontrada');

    if (updates.priority && !PRIORITIES.includes(updates.priority)) {
      throw new TaskError(400, 'Prioridad no válida');
    }

    // Actualizamos solo los campos permitidos
    Object.assign(task, updates, { updatedAt: new Date() });
    return { ...task };
  },

  // Eliminar tarea
  delete: (id) => {
    const index = tasks.findIndex(t => t.id === Number(id));
    if (index === -1) throw new TaskError(404, 'Tarea no encontrada');
    
    tasks.splice(index, 1);
    return true;
  },

  TaskError
};

module.exports = TaskService;