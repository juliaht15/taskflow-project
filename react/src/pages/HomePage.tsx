import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Sun, Moon, FolderPlus, X } from "lucide-react"; // Eliminado 'Plus' aquí
import {
  CreateTaskModule,
  UpcomingTasksModule,
  TaskItem,
} from "../components/Widgets";

const HomePage: React.FC = () => {
  const { tasks, projects, loading, addProject } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  // ESTADOS para la creación profesional de carpetas
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = async () => {
    if (!newProjectName.trim()) return;
    await addProject(newProjectName);
    setNewProjectName("");
    setIsAddingProject(false);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-slate-950 font-bold text-emerald-600">
        Cargando TaskFlow...
      </div>
    );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
        {/* HEADER */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <h1 className="text-xl font-black tracking-tighter text-emerald-600">
            TASKFLOW
          </h1>

          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              className="w-80 bg-slate-100 dark:bg-slate-800 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-emerald-500/20 transition-all placeholder:text-slate-400"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </header>

        {/* CUERPO PRINCIPAL */}
        <main className="flex flex-1 overflow-hidden">
          {/* COLUMNA IZQUIERDA: CARPETAS */}
          <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 overflow-y-auto hidden md:block">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Carpetas
              </h2>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className={`p-1 rounded-lg text-emerald-600 transition-colors ${isAddingProject ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-emerald-50 dark:hover:bg-emerald-950"}`}
              >
                {isAddingProject ? (
                  <X className="w-5 h-5 text-slate-500" />
                ) : (
                  <FolderPlus className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Interfaz profesional de creación de carpeta */}
            {isAddingProject && (
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl mb-4 space-y-2 border border-slate-200 dark:border-slate-700">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Nombre de la carpeta..."
                  className="w-full bg-white dark:bg-slate-900 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 ring-emerald-500/20"
                />
                <button
                  onClick={handleAddProject}
                  disabled={!newProjectName.trim()}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-xs font-bold disabled:bg-slate-300"
                >
                  Crear
                </button>
              </div>
            )}

            <nav className="space-y-1.5">
              {projects.map((p) => (
                <button
                  key={p.id}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all hover:translate-x-1 group"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-transform group-hover:scale-125" />
                  <span className="text-slate-700 dark:text-slate-200">
                    {p.name}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* COLUMNA CENTRAL: TAREAS */}
          <section className="flex-1 p-6 md:p-10 overflow-y-auto bg-white dark:bg-slate-950">
            <div className="max-w-3xl mx-auto space-y-12">
              <CreateTaskModule projects={projects} />

              <div className="space-y-4 pt-4">
                <h2 className="text-[10px] font-black text-slate-400 px-2 uppercase tracking-[0.3em]">
                  Tus Tareas
                </h2>
                <div className="grid gap-3.5">
                  {tasks
                    .filter((t) =>
                      t.title.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((t) => (
                      <TaskItem key={t.id} task={t} />
                    ))}
                  {tasks.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-sm italic">
                      No hay tareas todavía. ¡Crea una arriba!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* COLUMNA DERECHA: PRÓXIMAS */}
          <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 overflow-y-auto hidden xl:block">
            <UpcomingTasksModule tasks={tasks} />
          </aside>
        </main>

        {/* PIE DE PÁGINA: LA FIRMA PROFESIONAL */}
        <footer className="h-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shadow-inner">
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            creado por{" "}
            <span className="text-emerald-600 dark:text-emerald-500">
              Julia Huertas
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
