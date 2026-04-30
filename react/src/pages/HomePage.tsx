import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Sun, Moon, FolderPlus, User } from "lucide-react";
import {
  CreateTaskModule,
  UpcomingTasksModule,
  TaskItem,
} from "../components/Widgets";

const HomePage: React.FC = () => {
  const { tasks, projects, loading, addProject } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddProject = () => {
    const name = prompt("Nombre de la nueva carpeta:");
    if (name) addProject(name);
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
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black tracking-tighter text-emerald-600">
              TASKFLOW
            </h1>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <User className="w-4 h-4" />
              <span>Julia</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              className="w-80 bg-slate-100 dark:bg-slate-800 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-emerald-500/20 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </header>

        <main className="flex flex-1 overflow-hidden">
          {/* CARPETAS */}
          <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 overflow-y-auto hidden md:block">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Carpetas
              </h2>
              <button
                onClick={handleAddProject}
                className="p-1 hover:bg-emerald-50 rounded text-emerald-600 transition-colors"
              >
                <FolderPlus className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all hover:translate-x-1"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  {p.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* TAREAS PRINCIPALES */}
          <section className="flex-1 p-6 md:p-10 overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-3xl mx-auto space-y-10">
              <CreateTaskModule projects={projects} />

              <div className="space-y-3">
                <h2 className="text-sm font-bold text-slate-400 px-2">
                  Tus Tareas
                </h2>
                <div className="grid gap-3">
                  {tasks
                    .filter((t) =>
                      t.title.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((t) => (
                      <TaskItem key={t.id} task={t} />
                    ))}
                </div>
              </div>
            </div>
          </section>

          {/* DERECHA */}
          <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 overflow-y-auto hidden xl:block">
            <UpcomingTasksModule tasks={tasks} />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
