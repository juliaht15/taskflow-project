import { createContext, useContext, type ReactNode } from 'react';
import { useTasks } from '../hooks/useTasks';

// Definimos el tipo basado en el retorno del hook
type TaskContextType = ReturnType<typeof useTasks>;

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const taskData = useTasks();
  return (
    <TaskContext.Provider value={taskData}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  return context;
};