import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  projectId: string;
  createdAt: string;
  dueDate: string; // Fecha de entrega real
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

interface AppContextType {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addProject: (name: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // CRÍTICO: Cambia esta URL por la de tu backend en producción cuando despliegues
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchData = useCallback(async () => {
    try {
      const [tRes, pRes] = await Promise.all([
        fetch(`${API_URL}/tasks`),
        fetch(`${API_URL}/projects`),
      ]);
      if (tRes.ok && pRes.ok) {
        setTasks(await tRes.json());
        setProjects(await pRes.json());
      }
    } catch (e) {
      console.error("Error API:", e);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = async (task: Omit<Task, "id">) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks((prev) => [...prev, data]);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
  };

  const deleteTask = async (id: string) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addProject = async (name: string) => {
    const res = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color: "#10b981" }),
    });
    const data = await res.json();
    setProjects((prev) => [...prev, data]);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        projects,
        loading,
        addTask,
        updateTask,
        deleteTask,
        addProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp debe usarse dentro de AppProvider");
  return context;
};
