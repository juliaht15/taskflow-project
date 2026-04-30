// react/src/context/AppContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Task, Project, AppContextType } from "../types";
import { taskService, projectService } from "../lib/api";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tData = await taskService.getAll();
        const pData = await projectService.getAll();
        setTasks(tData);
        setProjects(pData);
      } catch (e) {
        console.error("Error cargando datos:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTask = async (data: Omit<Task, "id" | "createdAt">) => {
    try {
      const newTask = await taskService.create(data);
      setTasks((prev) => [newTask, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const addProject = async (name: string) => {
    try {
      const newProj = await projectService.create(name);
      setProjects((prev) => [...prev, newProj]);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const updated = await taskService.update(id, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        projects,
        loading,
        addTask,
        addProject,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Esta línea de abajo es el truco de magia para eliminar el aviso amarillo de Fast Refresh
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
