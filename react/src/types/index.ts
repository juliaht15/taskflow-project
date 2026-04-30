export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  projectId?: string;
  dueDate?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  color?: string;
}

export interface AppContextType {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  addTask: (task: Omit<Task, "id" | "createdAt">) => Promise<void>;
  addProject: (name: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
