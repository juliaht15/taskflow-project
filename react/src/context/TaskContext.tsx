import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string, priority: Task['priority']) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // IMPORTANTE: Puerto 3000 para coincidir con tu servidor Node.js
  const API_URL = 'http://localhost:3000/api/tasks';

  // 1. Obtener tareas (GET) - Punto 12: Estado de carga y éxito
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('No se pudo obtener la lista del servidor');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('Error de conexión: ¿Está el servidor Node.js encendido?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Crear tarea (POST)
  const addTask = async (title: string, priority: Task['priority']) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority }),
      });
      if (!response.ok) throw new Error('Error al crear la tarea');
      const newTask = await response.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError('No se pudo añadir la tarea al servidor');
    }
  };

  // 3. Eliminar tarea (DELETE)
  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar');
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea');
    }
  };

  // 4. Actualizar estado (PATCH)
  const toggleTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
      if (!response.ok) throw new Error('Error al actualizar');
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      setError('Error al cambiar el estado de la tarea');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de un TaskProvider');
  }
  return context;
};