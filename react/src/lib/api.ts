import axios from 'axios';

// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const taskService = {
  getAll: () => api.get('/tasks'),
  create: (data: any) => api.post('/tasks', data),
  update: (id: string, data: any) => api.patch(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`)
};

export const projectService = {
  getAll: () => api.get('/projects'),
  create: (data: any) => api.post('/projects', data)
};

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date));

export const generateId = () => Date.now().toString();