import React, { useState } from "react";
import { Task, Project } from "../types";
import { Calendar, CheckCircle2, Circle, Clock, AlignLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const CreateTaskModule: React.FC<{ projects: Project[] }> = ({
  projects,
}) => {
  const { addTask } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSave = async () => {
    if (!title) return alert("Ponle un título a la tarea");
    await addTask({
      title,
      description,
      completed: false,
      dueDate: date,
      projectId: projectId || undefined,
    });
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-lg font-bold mb-6">Nueva Tarea</h3>
      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="¿Qué hay que hacer?"
          className="w-full bg-transparent border-b-2 border-slate-100 dark:border-slate-800 py-2 text-xl focus:border-emerald-500 outline-none transition-all"
        />

        <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
          <AlignLeft className="w-5 h-5 text-slate-400 mt-1" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añade una descripción detallada..."
            className="w-full bg-transparent outline-none text-sm resize-none h-20"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-medium outline-none"
            >
              <option value="">Carpeta...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
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
      className="group flex flex-col bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5"
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
        <p className="text-xs text-slate-500 mt-2 ml-9 line-clamp-1">
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
          className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-full transition-transform hover:translate-x-1 cursor-default"
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
