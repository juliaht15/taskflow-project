import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { AppState, Task, Project, Theme } from '../types';

type AppAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_THEME' };

const initialState: AppState = {
  tasks: [],
  projects: [],
  loading: false,
  theme: 'light'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TASKS': return { ...state, tasks: action.payload };
    case 'SET_PROJECTS': return { ...state, projects: action.payload };
    case 'ADD_TASK': return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return { ...state, theme: newTheme };
    }
    default: return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  toggleTheme: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    if (savedTheme === 'dark') dispatch({ type: 'TOGGLE_THEME' });
    dispatch({ type: 'SET_PROJECTS', payload: [
      { id: '1', name: 'Proyecto Personal', color: 'bg-blue-500', createdAt: new Date().toISOString() },
      { id: '2', name: 'Trabajo', color: 'bg-purple-500', createdAt: new Date().toISOString() }
    ]});
  }, []);

  const toggleTheme = useCallback(() => dispatch({ type: 'TOGGLE_THEME' }), []);
  const addTask = useCallback((d: Omit<Task, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_TASK', payload: { ...d, id: Date.now().toString(), createdAt: new Date().toISOString() } });
  }, []);
  const updateTask = useCallback((id: string, u: Partial<Task>) => {
    const t = state.tasks.find(x => x.id === id);
    if (t) dispatch({ type: 'UPDATE_TASK', payload: { ...t, ...u } });
  }, [state.tasks]);
  const deleteTask = useCallback((id: string) => dispatch({ type: 'DELETE_TASK', payload: id }), []);
  const toggleTask = useCallback((id: string) => {
    const t = state.tasks.find(x => x.id === id);
    if (t) dispatch({ type: 'UPDATE_TASK', payload: { ...t, completed: !t.completed } });
  }, [state.tasks]);

  return <AppContext.Provider value={{ state, toggleTheme, addTask, updateTask, deleteTask, toggleTask }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};