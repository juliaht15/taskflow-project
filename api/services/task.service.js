const mongoose = require('mongoose');

// Definimos el Modelo de Datos para MongoDB
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, default: 'Media' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

const TaskService = {
  // Buscar todas las tareas en la base de datos
  findAll: async () => {
    return await Task.find().sort({ createdAt: -1 });
  },

  // Crear una nueva tarea en MongoDB
  create: async (taskData) => {
    if (!taskData.title?.trim()) throw { status: 400, message: 'El título es obligatorio' };
    const task = new Task({
      title: taskData.title.trim(),
      priority: taskData.priority,
      completed: false
    });
    return await task.save();
  },

  // Actualizar por ID (funciona para completar o editar)
  update: async (id, updates) => {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) throw { status: 404, message: 'Tarea no encontrada' };
    return task;
  },

  // Eliminar por ID
  delete: async (id) => {
    const result = await Task.findByIdAndDelete(id);
    if (!result) throw { status: 404, message: 'Tarea no encontrada' };
    return true;
  }
};

module.exports = TaskService;