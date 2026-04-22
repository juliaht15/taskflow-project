import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Servicios de Tareas
export const taskService = {
  getAll: () => api.get('/tasks'),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (data: any) => api.post('/tasks', data),
  update: (id: string, data: any) => api.patch(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`)
};

// Servicios de Proyectos
export const projectService = {
  getAll: () => api.get('/projects'),
  create: (data: any) => api.post('/projects', data)
};

// Servicios de Estadísticas
export const statsService = {
  get: () => api.get('/stats')
};

// Utilidades
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(dateString));
};

export const generateId = (): string => Date.now().toString();

export default api;