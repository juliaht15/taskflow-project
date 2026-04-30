import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import { AppContextType } from "./types";
import HomePage from "./pages/HomePage";
import { taskService, projectService } from "./lib/api";

const AppContent: React.FC = () => {
  const { setTasks, setProjects, setLoading } =
    useAppContext() as AppContextType;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          taskService.getAll(),
          projectService.getAll(),
        ]);

        setTasks(tasksRes.data || []);
        if (projectsRes.data && projectsRes.data.length > 0) {
          setProjects(projectsRes.data);
        }
      } catch (err) {
        console.error("Error cargando datos iniciales:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [setTasks, setProjects, setLoading]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => <AppContent />;

export default App;
