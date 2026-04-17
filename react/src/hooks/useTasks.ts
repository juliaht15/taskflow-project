import { useState, useEffect } from 'react';
import { Task } from '../types';
import api from '../api/axios';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Task[]>('/tasks');
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err: any) {
      setError(err.message || 'Failed to add task');
      throw err;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          // ✅ Comparar string con string
          task.id === String(id) ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setTasks((prev) => prev.filter((task) => task.id === String(id)));
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === String(id) ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to toggle task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask, toggleTask };
};