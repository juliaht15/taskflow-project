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
        console.error("Error al cargar datos:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTask = async (data: any) => {
    try {
      const newTask = await taskService.create(data);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch {
      console.error("Error al añadir tarea");
    }
  };

  const addProject = async (name: string) => {
    try {
      const newProj = await projectService.create(name);
      setProjects((prev) => [...prev, newProj]);
      return newProj;
    } catch {
      console.error("Error al añadir carpeta");
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      const updated = await taskService.update(id, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      console.error("Error al actualizar tarea");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      console.error("Error al borrar tarea");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectService.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setTasks((prev) => prev.filter((t) => t.projectId !== id));
    } catch {
      console.error("Error al borrar carpeta");
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
        deleteProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
