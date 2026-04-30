import React from "react";
import { Task, Project } from "../types";
import { Calendar, CheckCircle2, Circle, Clock } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const CreateTaskModule: React.FC<{ projects: Project[] }> = ({
  projects,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
      <h3 className="text-lg font-bold mb-6">Nueva Tarea</h3>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="¿Qué hay que hacer?"
          className="w-full bg-transparent border-b-2 border-slate-100 dark:border-slate-800 py-2 text-xl focus:border-emerald-500 outline-none transition-all"
        />
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <input type="date" className="bg-transparent outline-none" />
            </div>
            <select className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-medium outline-none">
              <option value="">General</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-full text-sm font-bold transition-all">
            Guardar
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
      className="group flex items-center justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all cursor-pointer"
    >
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
  );
};

// ESTE ES EL QUE FALTABA Y CAUSA EL ERROR ROJO
export const UpcomingTasksModule: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
  <div className="space-y-6">
    <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">
      Próximas
    </h2>
    {tasks
      .filter((t) => !t.completed)
      .slice(0, 4)
      .map((task) => (
        <div
          key={task.id}
          className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-full"
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
