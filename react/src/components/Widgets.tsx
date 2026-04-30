import React, { useState } from "react";
import { Task, Project } from "../types";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  AlignLeft,
  Folder,
} from "lucide-react"; // Eliminado 'Plus' aquí
import { useAppContext } from "../context/AppContext";

export const CreateTaskModule: React.FC<{ projects: Project[] }> = ({
  projects,
}) => {
  const { addTask } = useAppContext();

  // ESTADOS para capturar la información de los inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSave = async () => {
    // Validación profesional: si no hay título, no hacemos nada
    if (!title.trim()) return;

    await addTask({
      title,
      description,
      completed: false,
      dueDate: date,
      projectId: projectId || undefined,
    });

    // Limpiar el formulario después de guardar
    setTitle("");
    setDescription("");
    setDate("");
    setProjectId("");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">
        Nueva Tarea
      </h3>
      <div className="space-y-4">
        {/* TÍTULO */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="¿Qué hay que hacer?"
          className="w-full bg-transparent border-b-2 border-slate-100 dark:border-slate-800 py-3 text-xl font-medium focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
        />

        {/* DESCRIPCIÓN */}
        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <AlignLeft className="w-5 h-5 text-slate-400 mt-1" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añade una descripción detallada (opcional)..."
            className="w-full bg-transparent outline-none text-sm resize-none h-20 text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
          />
        </div>

        {/* BOTONES DE ACCIÓN Y SELECCIÓN */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
          <div className="flex gap-3">
            {/* Fecha */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
            {/* Carpeta */}
            <div className="relative">
              <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 pl-9 pr-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors appearance-none"
              >
                <option value="">Seleccionar Carpeta...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BOTÓN GUARDAR (Lógica real) */}
          <button
            onClick={handleSave}
            disabled={!title.trim()} // Deshabilitado si no hay título
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:bg-slate-300 disabled:shadow-none"
          >
            Guardar Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTask } = useAppContext();
  return (
    <div
      onClick={() => toggleTask(task.id)}
      className="group flex flex-col bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
          )}
          <span
            className={`text-sm font-semibold ${task.completed ? "line-through text-slate-400" : ""}`}
          >
            {task.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-3 h-3" />
          <span className="text-[10px] font-bold">{task.dueDate || "Hoy"}</span>
        </div>
      </div>
      {task.description && (
        <p className="text-xs text-slate-500 mt-2 ml-9 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}
    </div>
  );
};

export const UpcomingTasksModule: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
  <div className="space-y-6">
    <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">
      Próximas
    </h2>
    {tasks
      .filter((t) => !t.completed)
      .slice(0, 5)
      .map((task) => (
        <div
          key={task.id}
          className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-full transition-all hover:translate-x-1 cursor-default hover:text-emerald-600"
        >
          <p className="text-[10px] font-black text-emerald-600 mb-1">
            {task.dueDate || "Pendiente"}
          </p>
          <p className="text-sm font-semibold leading-tight text-slate-700 dark:text-slate-200">
            {task.title}
          </p>
        </div>
      ))}
  </div>
);
