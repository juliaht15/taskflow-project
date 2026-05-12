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
      <div className="h-screen flex items-center justify-center font-bold text-emerald-600 bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p>Cargando TaskFlow...</p>
        </div>
      </div>
    );

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
        {/* HEADER */}
        <header className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 px-8 flex items-center justify-between sticky top-0 z-50">
          <h1
            className="text-xl font-black text-emerald-600 cursor-pointer tracking-tighter"
            onClick={() => setSelectedFolder(null)}
          >
            TASKFLOW
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              className="w-64 bg-slate-100 dark:bg-slate-800 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-emerald-500/20 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            {darkMode ? (
              <Sun className="text-amber-400 w-5 h-5" />
            ) : (
              <Moon className="text-slate-500 w-5 h-5" />
            )}
          </button>
        </header>

        <main className="flex flex-1 overflow-hidden">
          {/* SIDEBAR IZQUIERDO: CARPETAS */}
          <aside className="w-64 border-r dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hidden md:block">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Carpetas
              </h2>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 p-1 rounded-lg transition-colors"
              >
                {isAddingProject ? (
                  <X className="w-5 h-5" />
                ) : (
                  <FolderPlus className="w-5 h-5" />
                )}
              </button>
            </div>

            {isAddingProject && (
              <div className="mb-4 space-y-2 animate-in fade-in slide-in-from-top-1">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-sm outline-none border border-transparent focus:border-emerald-500"
                  placeholder="Nombre del proyecto..."
                />
                <button
                  onClick={handleAddProject}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  Crear Proyecto
                </button>
              </div>
            )}

            <nav className="space-y-1">
              <div
                onClick={() => setSelectedFolder(null)}
                className={`px-3 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                  !selectedFolder
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
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
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl cursor-pointer transition-colors truncate ${
                      selectedFolder === p.id
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p.name}
                  </div>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `¿Estás seguro de borrar la carpeta "${p.name}"?`,
                        )
                      )
                        deleteProject(p.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </nav>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <section className="flex-1 p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950">
            <div className="max-w-3xl mx-auto space-y-10">
              {/* Formulario de creación (Usa la lógica mejorada de Widgets.tsx) */}
              <CreateTaskModule projects={projects} />

              {/* Lista de Tareas */}
              <div className="grid gap-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {selectedFolder ? "Tareas del proyecto" : "Tareas actuales"}
                </h3>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((t) => <TaskItem key={t.id} task={t} />)
                ) : (
                  <div className="text-center py-12 border-2 border-dashed dark:border-slate-800 rounded-3xl">
                    <p className="text-slate-500 text-sm">
                      No se encontraron tareas
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SIDEBAR DERECHO: PRÓXIMAS (Solo en pantallas grandes) */}
          <aside className="w-80 border-l dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hidden xl:block">
            <UpcomingTasksModule tasks={tasks} />
          </aside>
        </main>

        {/* FOOTER */}
        <footer className="h-12 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            creado por <span className="text-emerald-600">Julia Huertas</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
