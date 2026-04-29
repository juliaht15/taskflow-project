import { useState } from "react";
import { Layout, TaskForm, TaskList } from "./components";
import { useApp } from "./context/AppContext";
import {
  Search,
  Hash,
  Plus,
  Calendar as CalendarIcon,
  FolderOpen,
} from "lucide-react";

function App() {
  const { projects, addProject, tasks } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNewProject = () => {
    const name = prompt("Nombre del nuevo proyecto:");
    if (name) addProject(name);
  };

  // Tareas filtradas para el buscador
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Layout>
      <div className="flex h-[calc(100vh-160px)] gap-8">
        {/* COLUMNA IZQUIERDA: Navegación y Proyectos */}
        <aside className="w-64 flex flex-col gap-8 flex-shrink-0">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all dark:text-slate-200"
            />
          </div>

          <nav className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Proyectos
                </h3>
                <button
                  onClick={handleNewProject}
                  className="text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 p-1 rounded-md transition-colors"
                  title="Nuevo Proyecto"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-0.5">
                {projects.length === 0 ? (
                  <p className="px-2 text-xs text-slate-400 italic">
                    No hay proyectos
                  </p>
                ) : (
                  projects.map((project) => (
                    <button
                      key={project.id}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 group"
                    >
                      <Hash
                        size={16}
                        className="text-slate-300 group-hover:text-emerald-500"
                      />
                      <span className="truncate">{project.name}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </nav>
        </aside>

        {/* COLUMNA CENTRAL: Acción y Lista */}
        <main className="flex-1 flex flex-col gap-6 overflow-hidden">
          <TaskForm />

          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-slate-800 dark:text-white">
              <FolderOpen size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold tracking-tight">
                Todas las tareas
              </h2>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {filteredTasks.length}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <TaskList searchQuery={searchQuery} />
          </div>
        </main>

        {/* COLUMNA DERECHA: Agenda y Calendario */}
        <aside className="w-80 flex-shrink-0 space-y-6 hidden lg:block">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-white">
              <CalendarIcon size={18} className="text-blue-600" />
              <h3 className="font-bold text-sm">Calendario de entregas</h3>
            </div>

            {/* Placeholder de Calendario Estilo Wix */}
            <div className="aspect-square bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center group hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-colors">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <CalendarIcon
                  size={20}
                  className="text-slate-300 group-hover:text-emerald-500"
                />
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                Vista Mensual
              </p>
              <p className="text-[10px] text-slate-300 mt-1 italic">
                Próximamente disponible
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                Próximos plazos
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Entrega de Proyecto
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Mañana, 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default App;
