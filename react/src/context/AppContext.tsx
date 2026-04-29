import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Task, Project, Priority, Timeframe } from "../types";

interface AppContextType {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  theme: "light" | "dark";
  // Acciones de Tareas
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  // Acciones de Proyectos
  addProject: (name: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  // UI
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const API_URL = "http://localhost:5000"; // Asegúrate de que coincida con tu backend

  // 1. Cargar datos iniciales
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        fetch(`${API_URL}/tasks`),
        fetch(`${API_URL}/projects`),
      ]);

      if (!tasksRes.ok || !projectsRes.ok)
        throw new Error("Error en la carga de datos");

      const tasksData = await tasksRes.json();
      const projectsData = await projectsRes.json();

      setTasks(tasksData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error conectando con la API:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Cargar preferencia de tema
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, [fetchData]);

  // 2. Lógica de Tareas
  const addTask = async (taskData: Omit<Task, "id">) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error al añadir tarea:", error);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await response.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  // 3. Lógica de Proyectos (NUEVO)
  const addProject = async (name: string) => {
    const newProject = {
      name,
      color: "#059669", // Verde esmeralda por defecto
    };
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      setProjects((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error al añadir proyecto:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
      // Opcional: eliminar tareas asociadas a ese proyecto
      setTasks((prev) => prev.filter((t) => t.projectId !== id));
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  // 4. Utilidades
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        projects,
        loading,
        theme,
        addTask,
        toggleTask,
        deleteTask,
        addProject,
        deleteProject,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp debe usarse dentro de un AppProvider");
  }
  return context;
};
