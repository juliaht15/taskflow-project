export type Theme = "light" | "dark";
export type Priority = "low" | "medium" | "high";
export type Timeframe = "today" | "thisWeek" | "thisMonth";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  timeframe: Timeframe;
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface AppState {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  theme: Theme;
}

/**
 * Utilidades para la creación de datos (Omiten campos automáticos)
 * Útiles para los formularios antes de enviar a la API
 */
export type CreateTaskData = Omit<Task, "id" | "createdAt">;
export type CreateProjectData = Omit<Project, "id" | "createdAt">;

/**
 * Definición de las acciones del Contexto (opcional pero recomendado)
 */
export interface AppContextType extends AppState {
  addTask: (task: CreateTaskData) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addProject: (project: CreateProjectData) => Promise<void>;
  setTheme: (theme: Theme) => void;
}
