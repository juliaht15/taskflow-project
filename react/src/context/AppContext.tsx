import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Task,
  Project,
  Theme,
  CreateTaskData,
  CreateProjectData,
} from "../types";

interface ExtendedContextType {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  theme: Theme;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  addTask: (task: CreateTaskData) => Promise<void>;
  toggleTask: (id: number | string) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
  addProject: (project: CreateProjectData) => Promise<void>;
  moveTaskToProject: (taskId: number | string, projectId: string) => void;
  updateTaskTitle: (taskId: number | string, newTitle: string) => void;
}

const AppContext = createContext<ExtendedContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const addTask = async (taskData: CreateTaskData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = async (id: number | string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = async (id: number | string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addProject = async (projectData: CreateProjectData) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const moveTaskToProject = (taskId: number | string, projectId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, projectId: Number(projectId) } : t,
      ),
    );
  };

  const updateTaskTitle = (taskId: number | string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)),
    );
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        projects,
        theme,
        searchQuery,
        loading: false,
        setSearchQuery,
        setTheme,
        toggleTheme,
        addTask,
        toggleTask,
        deleteTask,
        addProject,
        moveTaskToProject,
        updateTaskTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
