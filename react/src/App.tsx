import { useState } from "react";
import { Layout, TaskForm, TaskList } from "./components";
import { useApp } from "./context/AppContext";
import {
  Search,
  Hash,
  Plus,
  Calendar as CalIcon,
  CheckCircle2,
} from "lucide-react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

function App() {
  const { projects, addProject, tasks, updateTask } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica para mover tarea a un proyecto al soltarla
  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    // Si la soltamos sobre un ID de proyecto en la barra lateral
    if (destination.droppableId.startsWith("project-")) {
      const newProjectId = destination.droppableId.replace("project-", "");
      updateTask(draggableId, { projectId: newProjectId });
    }
  };

  // Solo mostrar en "Próximos plazos" tareas REALES con fecha futura
  const upcomingTasks = tasks
    .filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) >= new Date(),
    )
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 3);

  return (
    <Layout>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-[calc(100vh-140px)] gap-8">
          {/* BARRA LATERAL */}
          <aside className="w-64 flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500"
              />
            </div>
            <nav>
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Proyectos
                </span>
                <Plus
                  size={16}
                  className="text-emerald-500 cursor-pointer"
                  onClick={() => addProject(prompt("Nombre:") || "")}
                />
              </div>
              <div className="space-y-1">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-default"
                  >
                    <Hash size={14} className="text-blue-500" />
                    {p.name}
                  </div>
                ))}
              </div>
            </nav>
          </aside>

          {/* CONTENIDO CENTRAL */}
          <main className="flex-1 space-y-6 overflow-y-auto pr-4">
            <TaskForm />
            <TaskList searchQuery={searchQuery} />
          </main>

          {/* CALENDARIO / AGENDA REAL */}
          <aside className="w-80 space-y-6 hidden xl:block">
            <div className="card-style p-6">
              <div className="flex items-center gap-2 mb-6">
                <CalIcon size={18} className="text-blue-600" />
                <h3 className="font-bold text-sm">Calendario de entregas</h3>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Próximos Plazos Reales
                </span>
                {upcomingTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">
                    No hay entregas pendientes
                  </p>
                ) : (
                  upcomingTasks.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
                    >
                      <CheckCircle2 size={14} className="text-blue-500" />
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          {t.title}
                        </p>
                        <p className="text-[10px] text-blue-600 font-medium">
                          {new Date(t.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </DragDropContext>
    </Layout>
  );
}

export default App;
