import axios from "axios";
import { Task, Project, CreateTaskData, CreateProjectData } from "../types";

/**
 * URL base para las peticiones al backend.
 * Al usar Vite, las variables de entorno deben empezar por VITE_.
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Servicio para manejar las tareas con tipos estrictos
export const taskService = {
  getAll: () => api.get<Task[]>("/tasks"),
  create: (data: CreateTaskData) => api.post<Task>("/tasks", data),
  update: (id: string, data: Partial<Task>) =>
    api.patch<Task>(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

// Servicio para manejar los proyectos
export const projectService = {
  getAll: () => api.get<Project[]>("/projects"),
  create: (data: CreateProjectData) => api.post<Project>("/projects", data),
};

/**
 * Utilidad para formatear fechas de forma legible (Ej: 29 abr 2026, 12:20)
 */
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

/**
 * Generador de IDs temporales para la interfaz antes de que el backend responda
 */
export const generateId = () => Math.random().toString(36).substring(2, 9);
