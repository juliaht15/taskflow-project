import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { Task, Project } from '../types';

type Theme = 'light' | 'dark';

interface AppState {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  theme: Theme;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
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
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'TOGGLE_THEME': {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return { ...state, theme: newTheme };
    }
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | null>(null);

interface AppContextType {
  state: AppState;
  toggleTheme: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Inicializar tema y cargar datos
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    if (savedTheme === 'dark') {
      dispatch({ type: 'TOGGLE_THEME' });
    }
    
    // Cargar proyectos iniciales
    dispatch({
      type: 'SET_PROJECTS',
      payload: [
        { id: '1', name: 'Proyecto Personal', color: 'bg-blue-500', createdAt: new Date().toISOString() },
        { id: '2', name: 'Trabajo', color: 'bg-purple-500', createdAt: new Date().toISOString() }
      ]
    });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, ...updates }
    });
  }, [state.tasks]);

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const toggleTask = useCallback((id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, completed: !task.completed }
    });
  }, [state.tasks]);

  return (
    <AppContext.Provider value={{ state, toggleTheme, addTask, updateTask, deleteTask, toggleTask }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};