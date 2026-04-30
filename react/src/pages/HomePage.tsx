import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Sun, Moon, FolderPlus, X } from "lucide-react";
import {
  CreateTaskModule,
  UpcomingTasksModule,
  TaskItem,
} from "../components/Widgets";

const HomePage: React.FC = () => {
  const { tasks, projects, loading, addProject } = useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
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
      <div className="h-screen flex items-center justify-center dark:bg-slate-950 font-bold text-emerald-600 italic">
        Cargando TaskFlow...
      </div>
    );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-xl font-black tracking-tighter text-emerald-600">
            TASKFLOW
          </h1>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-64 bg-slate-100 dark:bg-slate-800 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-emerald-500/20"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Carpetas
              </h2>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="text-emerald-600"
              >
                {isAddingProject ? (
                  <X className="w-5 h-5" />
                ) : (
                  <FolderPlus className="w-5 h-5" />
                )}
              </button>
            </div>

            {isAddingProject && (
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-sm outline-none"
                  placeholder="Nombre..."
                />
                <button
                  onClick={handleAddProject}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg text-xs font-bold"
                >
                  Crear
                </button>
              </div>
            )}

            <nav className="space-y-1">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-all hover:translate-x-1 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                  {p.name}
                </div>
              ))}
            </nav>
          </aside>

          <section className="flex-1 p-8 overflow-y-auto bg-white dark:bg-slate-950">
            <div className="max-w-3xl mx-auto space-y-10">
              <CreateTaskModule projects={projects} />
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
          </section>

          <aside className="w-80 border-l border-slate-200 dark:border-slate-800 p-8 hidden xl:block">
            <UpcomingTasksModule tasks={tasks} />
          </aside>
        </main>

        <footer className="h-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            creado por <span className="text-emerald-600">Julia Huertas</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
