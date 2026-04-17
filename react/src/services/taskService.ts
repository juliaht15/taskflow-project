import api from '../api/axios';
import type { Task } from '../types';

export const taskService = {
  // Nota: Estos métodos están listos para cuando tengas un backend
  getAll: async () => {
    const { data } = await api.get<Task[]>('/tasks');
    return data;
  },
  
  create: async (task: Omit<Task, 'id'>) => {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  delete: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  }
};