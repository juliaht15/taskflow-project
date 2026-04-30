import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Sun, Moon, FolderPlus, X, Trash2 } from "lucide-react";
import {
  CreateTaskModule,
  TaskItem,
  UpcomingTasksModule,
} from "../components/Widgets";

const HomePage: React.FC = () => {
  const { tasks, projects, loading, addProject, deleteProject } =
    useAppContext();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = async () => {
    if (!newProjectName.trim()) return;
    await addProject(newProjectName);
    setNewProjectName("");
    setIsAddingProject(false);
  };

  // FILTRADO DE TAREAS
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder
      ? t.projectId === selectedFolder
      : true;
    return matchesSearch && matchesFolder;
  });

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold text-emerald-600">
        Cargando TaskFlow...
      </div>
    );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
        <header className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-50">
          <h1
            className="text-xl font-black text-emerald-600 cursor-pointer"
            onClick={() => setSelectedFolder(null)}
          >
            TASKFLOW
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-64 bg-slate-100 dark:bg-slate-800 rounded-full py-2 pl-10 pr-4 text-sm outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
          >
            {darkMode ? (
              <Sun className="text-amber-400" />
            ) : (
              <Moon className="text-slate-500" />
            )}
          </button>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <aside className="w-64 border-r dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Carpetas
              </h2>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="text-emerald-600"
              >
                {isAddingProject ? <X /> : <FolderPlus />}
              </button>
            </div>

            {isAddingProject && (
              <div className="mb-4 space-y-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-sm"
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
              <div
                onClick={() => setSelectedFolder(null)}
                className={`px-3 py-2 text-sm font-medium rounded-xl cursor-pointer ${!selectedFolder ? "bg-emerald-50 text-emerald-600" : "hover:bg-slate-100"}`}
              >
                Todas las tareas
              </div>
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="group flex items-center justify-between"
                >
                  <div
                    onClick={() => setSelectedFolder(p.id)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl cursor-pointer ${selectedFolder === p.id ? "bg-emerald-50 text-emerald-600" : "hover:bg-slate-100"}`}
                  >
                    {p.name}
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("¿Borrar carpeta?")) deleteProject(p.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </nav>
          </aside>

          <section className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-10">
              <CreateTaskModule projects={projects} />
              <div className="grid gap-3">
                {filteredTasks.map((t) => (
                  <TaskItem key={t.id} task={t} />
                ))}
              </div>
            </div>
          </section>

          <aside className="w-80 border-l dark:border-slate-800 p-8 hidden xl:block">
            <UpcomingTasksModule tasks={tasks} />
          </aside>
        </main>

        <footer className="h-10 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            creado por <span className="text-emerald-600">Julia Huertas</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
