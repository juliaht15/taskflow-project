export type Theme = "light" | "dark";

export type Priority = "low" | "medium" | "high";

export type Timeframe = "today" | "thisWeek" | "thisMonth";

export interface Task {
  id: number | string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: Priority;
  timeframe?: Timeframe;
  projectId: number | string;
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
  searchQuery: string;
}

export type CreateTaskData = Omit<Task, "id" | "createdAt">;
export type CreateProjectData = Omit<Project, "id" | "createdAt">;

export interface AppContextType extends AppState {
  setSearchQuery: (query: string) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  addTask: (task: CreateTaskData) => Promise<void>;
  toggleTask: (id: number | string) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
  addProject: (project: CreateProjectData) => Promise<void>;
  moveTaskToProject: (taskId: number | string, projectId: string) => void;
  updateTaskTitle: (taskId: number | string, newTitle: string) => void;
}
