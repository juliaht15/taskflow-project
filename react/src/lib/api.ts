import axios from "axios";
import { Task, Project, CreateTaskData, CreateProjectData } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para manejar la estructura de respuesta del backend ({ data: ... })
api.interceptors.response.use((response) => response.data);

export const taskService = {
  getAll: () => api.get<any, { data: Task[] }>("/tasks"),
  create: (data: CreateTaskData) =>
    api.post<any, { data: Task }>("/tasks", data),
  update: (id: number | string, data: Partial<Task>) =>
    api.patch<any, { data: Task }>(`/tasks/${id}`, data),
  delete: (id: number | string) => api.delete(`/tasks/${id}`),
};

export const projectService = {
  getAll: () => api.get<any, { data: Project[] }>("/projects"),
  create: (data: CreateProjectData) =>
    api.post<any, { data: Project }>("/projects", data),
};

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

export const generateId = () => Math.random().toString(36).substring(2, 9);
