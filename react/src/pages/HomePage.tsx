import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { AppContextType } from "../types";

// Importación desde tu archivo Widgets.tsx según Captura_4.PNG
import {
  StatsWidget,
  UrgentTasksWidget,
  ProjectWidget,
} from "../components/Widgets";

const HomePage: React.FC = () => {
  // Eliminamos 'Task' de la importación de arriba porque no se usa aquí (así quitamos los warnings amarillos)
  const { tasks, projects, loading } = useAppContext() as AppContextType;
  const [filter, setFilter] = useState<string>("all");

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Panel de Control
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Gestiona tus proyectos y tareas
            </p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">Todas las tareas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <StatsWidget tasks={tasks} />
          </div>
          <div className="lg:col-span-1">
            <UrgentTasksWidget
              tasks={tasks.filter((t) => !t.completed).slice(0, 5)}
            />
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Proyectos Activos
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {/* 
               CORRECCIÓN ERROR ts(2322): 
               Tu componente ProjectWidget espera 'projects' (plural) y 'tasks'.
            */}
            {projects.map((project) => (
              <ProjectWidget
                key={project.id}
                projects={[project]}
                tasks={tasks.filter((t) => t.projectId === project.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
