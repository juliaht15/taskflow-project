export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  projectId?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export interface AppContextType {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  addTask: (data: Omit<Task, "id" | "createdAt">) => Promise<any>;
  addProject: (name: string) => Promise<any>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
