import axios from "axios";
import { Task, Project } from "../types";

// Usamos la variable de entorno, y si no existe, la de Render (sin espacios)
const rawUrl =
  import.meta.env.VITE_API_URL || "https://taskflow-api-8d6c.onrender.com/api";
const BASE_URL = rawUrl.trim().replace(/\/+$/, "");

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para devolver directamente los datos (data) y no la respuesta completa de Axios
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(
      "Error en la petición API:",
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export const taskService = {
  // TS sabe que la respuesta tras el interceptor es Task[] o Task
  getAll: () => api.get<any, Task[]>("/tasks"),
  create: (data: Partial<Task>) => api.post<any, Task>("/tasks", data),
  update: (id: string, data: Partial<Task>) =>
    api.patch<any, Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export const projectService = {
  getAll: () => api.get<any, Project[]>("/projects"),
  create: (name: string) => api.post<any, Project>("/projects", { name }),
  delete: (id: string) => api.delete(`/projects/${id}`),
};
