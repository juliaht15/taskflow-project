export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'inProgress' | 'completed';
export type TaskTimeframe = 'daily' | 'weekly' | 'monthly' | 'general';

export interface Project {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  timeframe: TaskTimeframe;
  projectId?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}