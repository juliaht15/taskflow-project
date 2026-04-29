import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, Calendar } from "lucide-react";

export const TaskForm = () => {
  const { addTask, projects } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask({
      title,
      description: "",
      completed: false,
      priority: "medium",
      projectId: projectId || projects[0]?.id || "",
      createdAt: new Date().toISOString(),
      dueDate: dueDate || new Date().toISOString(),
    });

    setTitle("");
    setDueDate("");
    setIsExpanded(false);
  };

  return (
    <div
      className={`card-style transition-all duration-300 overflow-hidden ${isExpanded ? "ring-2 ring-emerald-500 shadow-lg" : "hover:border-emerald-200"}`}
    >
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className="p-4 flex items-center gap-3 cursor-pointer"
        >
          <Plus className="text-emerald-500" size={20} />
          <span className="text-slate-400 text-sm font-medium">
            Añadir una nueva tarea...
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <input
            type="text"
            placeholder="Título de la tarea"
            className="w-full text-lg font-bold bg-transparent border-none focus:ring-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">
                <Calendar size={12} /> Fecha de entrega
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded-md border-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                Proyecto
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded-md border-none"
              >
                <option value="">Seleccionar...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-xs font-bold text-slate-400 px-4"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary text-xs">
              Guardar Tarea
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
