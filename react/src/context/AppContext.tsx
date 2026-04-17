import { createContext, useContext, useReducer, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { Task, Project, Priority, TaskStatus, TaskTimeframe } from '../types';

interface AppState {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { tasks: Task[]; projects: Project[] } }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string };

const initialState: AppState = { tasks: [], projects: [], loading: false, error: null };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'FETCH_START': return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS': return { ...state, loading: false, tasks: action.payload.tasks, projects: action.payload.projects };
    case 'FETCH_ERROR': return { ...state, loading: false, error: action.payload };
    case 'ADD_TASK': return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'ADD_PROJECT': return { ...state, projects: [...state.projects, action.payload] };
    case 'DELETE_PROJECT': return { ...state, projects: state.projects.filter(p => p.id !== action.payload) };
    default: return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  addProject: (name: string, color: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getTasksByTimeframe: (timeframe: TaskTimeframe) => Task[];
  getTasksByProject: (projectId: string) => Task[];
  stats: { total: number; pending: number; completed: number; projects: number };
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    setTimeout(() => {
      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: { 
          tasks: [], 
          projects: [
            { id: '1', name: 'Proyecto Personal', color: 'bg-blue-500', createdAt: new Date().toISOString() },
            { id: '2', name: 'Trabajo', color: 'bg-purple-500', createdAt: new Date().toISOString() },
          ] 
        } 
      });
    }, 300);
  }, []);

  const addTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = { ...taskData, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, ...updates, updatedAt: new Date().toISOString() } });
  }, [state.tasks]);

  const deleteTask = useCallback(async (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } });
  }, [state.tasks]);

  const addProject = useCallback(async (name: string, color: string) => {
    const newProject: Project = { id: crypto.randomUUID(), name, color, createdAt: new Date().toISOString() };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    dispatch({ type: 'FETCH_SUCCESS', payload: { tasks: state.tasks.filter(t => t.projectId !== id), projects: state.projects } });
  }, [state.tasks, state.projects]);

  // useMemo para filtrar tareas por periodo (Requisito Fase 5)
  const getTasksByTimeframe = useCallback((timeframe: TaskTimeframe) => {
    return state.tasks.filter(t => t.timeframe === timeframe);
  }, [state.tasks]);

  const getTasksByProject = useCallback((projectId: string) => {
    return state.tasks.filter(t => t.projectId === projectId);
  }, [state.tasks]);

  // useMemo para estadísticas del dashboard
  const stats = useMemo(() => ({
    total: state.tasks.length,
    pending: state.tasks.filter(t => !t.completed).length,
    completed: state.tasks.filter(t => t.completed).length,
    projects: state.projects.length
  }), [state.tasks, state.projects]);

  return (
    <AppContext.Provider value={{ 
      state, addTask, updateTask, deleteTask, toggleTask, addProject, deleteProject, 
      getTasksByTimeframe, getTasksByProject, stats 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};