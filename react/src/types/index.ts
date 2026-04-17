import type { ReactNode } from 'react';

// Definimos los tipos de prioridad como un tipo propio para reusarlo
export type Priority = 'Alta' | 'Media' | 'Baja';

export interface Task {
  id: number;
  title: string;
  description?: string; // He añadido descripción opcional, ¡siempre viene bien!
  priority: Priority;
  completed: boolean;
  createdAt: string; // Útil para ordenar las tareas por fecha
}

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
  headerClassName?: string; // Para controlar el ancho de las columnas desde el objeto
}

// Interfaz para el Layout (opcional pero recomendada)
export interface LayoutProps {
  children: ReactNode;
}