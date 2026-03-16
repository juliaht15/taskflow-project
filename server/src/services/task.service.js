// Simulamos una base de datos con un array en memoria
let tasks = [
  { id: 1, title: 'Completar Fase 1 y 2', completed: true },
  { id: 2, title: 'Dominar el Backend con Node', completed: false }
];

// Lógica para obtener todas las tareas
const getAllTasks = () => {
  return tasks;
};

// Lógica para crear una tarea
const createTask = (taskData) => {
  const newTask = {
    id: Date.now(), // Generamos un ID basado en el tiempo
    title: taskData.title,
    completed: false
  };
  tasks.push(newTask);
  return newTask;
};

// Lógica para eliminar (con manejo de error manual para la Fase C)
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
  deleteTask
};