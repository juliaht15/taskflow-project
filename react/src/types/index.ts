export type Theme = 'light' | 'dark';
export type Priority = 'low' | 'medium' | 'high';
export type Timeframe = 'today' | 'thisWeek' | 'thisMonth';

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