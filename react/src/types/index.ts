export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'inProgress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}

// Column NO es genérico - corregido:
export interface Column {
  key: string;
  label: string;
  render?: (item: Task) => React.ReactNode;
}