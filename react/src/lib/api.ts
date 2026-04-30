import axios from "axios";
import { Task, Project } from "../types";

const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE_URL = rawUrl.trim().replace(/\/+$/, "");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Este interceptor es clave para quitar el envoltorio de AxiosResponse
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export const taskService = {
  // Añadimos <any, Task[]> para que TS sepa que la respuesta es un array de tareas
  getAll: () => api.get<any, Task[]>("/tasks"),
  create: (data: any) => api.post<any, Task>("/tasks", data),
  update: (id: string, data: any) => api.patch<any, Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export const projectService = {
  getAll: () => api.get<any, Project[]>("/projects"),
  create: (name: string) => api.post<any, Project>("/projects", { name }),
  delete: (id: string) => api.delete(`/projects/${id}`),
};
