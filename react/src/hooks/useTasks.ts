import { useState, useEffect } from 'react';
import type { Task } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskflow_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Configurar Arquitectura TaskFlow Pro', priority: 'Alta', completed: true, createdAt: new Date().toISOString() },
      { id: 2, title: 'Despliegue final en Vercel', priority: 'Media', completed: false, createdAt: new Date().toISOString() }
    ];
  });

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Task['priority']) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return { tasks, addTask, deleteTask, toggleTask };
};