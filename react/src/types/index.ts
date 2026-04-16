import type { ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  priority: 'Alta' | 'Media' | 'Baja';
  completed: boolean;
}

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
}