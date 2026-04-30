import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Sun, Moon, FolderPlus } from "lucide-react";
import {
  CreateTaskModule,
  UpcomingTasksModule,
  TaskItem,
} from "../components/Widgets";

const HomePage: React.FC = () => {
  const { tasks, projects, loading } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-slate-950">
        Cargando...
      </div>
    );

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col">
        {/* HEADER */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-xl font-black tracking-tighter text-emerald-600">
            TASKFLOW
          </h1>
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-80 bg-slate-100 dark:bg-slate-800 rounded-full py-2 pl-10 pr-4 text-sm outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </header>

        <main className="flex flex-1 overflow-hidden">
          {/* IZQUIERDA: CARPETAS */}
          <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Carpetas
              </h2>
              <FolderPlus className="w-4 h-4 text-emerald-600 cursor-pointer" />
            </div>
            <nav className="space-y-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                  {p.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* CENTRO: TAREAS */}
          <section className="flex-1 p-10 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-12">
              <CreateTaskModule projects={projects} />
              <div className="grid gap-3">
                {filteredTasks.map((t) => (
                  <TaskItem key={t.id} task={t} />
                ))}
              </div>
            </div>
          </section>

          {/* DERECHA: PRÓXIMAS */}
          <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 overflow-y-auto">
            <UpcomingTasksModule tasks={tasks} />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
