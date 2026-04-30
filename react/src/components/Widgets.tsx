import React, { useState } from "react";
import { Project } from "../types";
import {
  Calendar,
  CheckCircle2,
  Circle,
  AlignLeft,
  Folder,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const CreateTaskModule: React.FC<{ projects: Project[] }> = ({
  projects,
}) => {
  const { addTask } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      await addTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        dueDate: date || undefined,
        projectId: projectId || "",
        priority: priority,
      });

      setTitle("");
      setDescription("");
      setDate("");
      setProjectId("");
      setPriority("medium");
    } catch {
      console.error("No se pudo crear la tarea.");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all">
      <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">
        Nueva Tarea
      </h3>
      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Qué hay que hacer?"
          className="w-full bg-transparent border-b-2 border-slate-100 dark:border-slate-800 py-3 text-xl focus:border-emerald-500 outline-none transition-all"
        />

        <div className="flex gap-2 items-center py-1">
          <span className="text-xs font-bold text-slate-400 uppercase mr-1">
            Prioridad:
          </span>
          {(["low", "medium", "high"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                priority === p
                  ? "ring-2 ring-emerald-500 ring-offset-2 scale-105"
                  : "opacity-40 hover:opacity-100"
              } ${p === "high" ? "bg-red-500 text-white" : p === "medium" ? "bg-orange-500 text-white" : "bg-blue-500 text-white"}`}
            >
              {p === "low" ? "Baja" : p === "medium" ? "Media" : "Alta"}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <AlignLeft className="w-5 h-5 text-slate-400 mt-1" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añade una descripción..."
            className="w-full bg-transparent outline-none text-sm resize-none h-20"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex gap-3">
            {/* AQUÍ USAMOS EL ICONO CALENDAR PARA QUITAR EL AVISO */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-semibold">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>

            {/* AQUÍ USAMOS EL ICONO FOLDER PARA QUITAR EL AVISO */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
              <Folder className="w-4 h-4 text-emerald-600 mr-2" />
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="bg-transparent text-xs font-semibold outline-none cursor-pointer appearance-none"
              >
                <option value="">Carpeta...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all"
          >
            Guardar Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export const TaskItem: React.FC<{ task: any }> = ({ task }) => {
  const { toggleTask, deleteTask } = useAppContext();
  const pColor =
    task.priority === "high"
      ? "text-red-500"
      : task.priority === "medium"
        ? "text-orange-500"
        : "text-blue-500";

  return (
    <div className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <div onClick={() => toggleTask(task.id)} className="cursor-pointer">
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold ${task.completed ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200"}`}
            >
              {task.title}
            </span>
            <AlertCircle className={`w-3.5 h-3.5 ${pColor}`} />
          </div>
          {task.description && (
            <p className="text-xs text-slate-500 mt-1">{task.description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          if (window.confirm("¿Eliminar esta tarea?")) deleteTask(task.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export const UpcomingTasksModule: React.FC<{ tasks: any[] }> = ({ tasks }) => (
  <div className="space-y-6">
    <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
      Próximas
    </h2>
    <div className="space-y-4">
      {tasks
        .filter((t) => !t.completed)
        .slice(0, 5)
        .map((task) => (
          <div key={task.id} className="pl-4 border-l-2 border-emerald-500">
            <p className="text-[10px] font-black text-emerald-600">
              {task.dueDate || "Sin fecha"}
            </p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {task.title}
            </p>
          </div>
        ))}
    </div>
  </div>
);
