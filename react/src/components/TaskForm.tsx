import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus } from "lucide-react";

export const TaskForm = () => {
  const { addTask, projects } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Se añade createdAt para solucionar el error de TypeScript en errores.PNG
    await addTask({
      title,
      description,
      completed: false,
      priority,
      timeframe: "thisWeek",
      projectId: selectedProject || projects[0]?.id || "",
      createdAt: new Date().toISOString(),
    });

    // Resetear estado
    setTitle("");
    setDescription("");
    setIsExpanded(false);
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 transition-all duration-300 border-2 rounded-xl overflow-hidden ${
        isExpanded
          ? "border-emerald-500 shadow-lg shadow-emerald-500/10"
          : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
      }`}
    >
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className="p-4 flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 p-1.5 rounded-lg group-hover:bg-emerald-100 transition-colors">
            <Plus size={20} />
          </div>
          <span className="text-slate-400 font-medium text-sm">
            Añadir una nueva tarea...
          </span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 animate-in fade-in duration-300"
        >
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la tarea"
            className="w-full text-lg font-semibold bg-transparent border-none focus:ring-0 placeholder-slate-300 dark:text-white dark:placeholder-slate-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añadir notas o detalles adicionales..."
            className="w-full text-sm bg-transparent border-none focus:ring-0 placeholder-slate-400 dark:placeholder-slate-600 resize-none dark:text-slate-300"
            rows={2}
          />

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-700">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Proyecto
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-md border-none focus:ring-1 focus:ring-emerald-500 dark:text-slate-200"
              >
                <option value="">Seleccionar...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Prioridad
              </label>
              <div className="flex gap-1.5">
                {(["low", "medium", "high"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${
                      priority === p
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {p === "low" ? "Baja" : p === "medium" ? "Media" : "Alta"}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 self-end">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 shadow-emerald-500/20"
              >
                Guardar Tarea
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
