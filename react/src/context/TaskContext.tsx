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

  // CAMBIO CLAVE: Usa la URL de Render cuando la tengas.
  // Por ahora, para probar localmente, mantén el localhost:3000
  const API_URL = 'http://localhost:3000/api/tasks'; 

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al conectar con la API');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('⚠️ No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (title: string, priority: Task['priority']) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority }),
      });
      const newTask = await response.json();
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError('Error al guardar la tarea');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Error al eliminar');
    }
  };

  const toggleTask = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (err) {
      setError('Error al actualizar');
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
  if (!context) throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  return context;
};