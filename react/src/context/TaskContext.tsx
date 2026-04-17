import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import api from '@/api/axios';
import { Task } from '@/types';

// Types
type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

type TaskAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Task[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string };

// Initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Reducer
function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, tasks: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    default:
      return state;
  }
}

// Context
interface TaskContextType {
  state: TaskState;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const { data } = await api.get<Task[]>('/tasks');
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Failed to fetch tasks' });
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Generar ID y fechas automáticamente
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Failed to add task' });
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const task = state.tasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      
      const updatedTask: Task = {
        ...task,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Failed to update task' });
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Failed to delete task' });
      throw error;
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;
      
      const updatedTask: Task = {
        ...task,
        completed: !task.completed,
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Failed to toggle task' });
      throw error;
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        state,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};