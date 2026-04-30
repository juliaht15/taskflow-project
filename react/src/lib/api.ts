import axios from "axios";
import { Task, Project } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para extraer la data
api.interceptors.response.use((response) => response.data);

export const taskService = {
  // El uso de <any, Task[]> mapea la respuesta limpia del interceptor
  getAll: () => api.get<any, Task[]>("/tasks"),
  create: (data: Omit<Task, "id" | "createdAt">) =>
    api.post<any, Task>("/tasks", data),
  update: (id: string, data: Partial<Task>) =>
    api.patch<any, Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export const projectService = {
  getAll: () => api.get<any, Project[]>("/projects"),
  create: (name: string) => api.post<any, Project>("/projects", { name }),
};
