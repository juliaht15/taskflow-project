import axios from "axios";
import { Task, Project } from "../types";

// Forzamos que la URL termine en /api si no lo hace ya
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const CLEAN_URL = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

export const api = axios.create({
  baseURL: CLEAN_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(
      "Error en la llamada:",
      error.response?.status,
      error.message,
    );
    return Promise.reject(error);
  },
);

export const taskService = {
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
