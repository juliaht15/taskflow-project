import React, { useState } from "react";
import { Task, Project } from "../types";
import { useAppContext } from "../context/AppContext";

export const StatsWidget = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const stats = [
    {
      label: "Totales",
      value: total,
      icon: "📋",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "Pendientes",
      value: pending,
      icon: "⏳",
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      label: "Completadas",
      value: completed,
      icon: "✅",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="p-5 flex items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-2xl font-bold dark:text-white leading-tight">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ProjectWidget = ({
  projects,
  tasks,
}: {
  projects: Project[];
  tasks: Task[];
}) => {
  const { addProject, moveTaskToProject } = useAppContext();
  const [isOver, setIsOver] = useState<string | null>(null);

  const handleAddProject = () => {
    const name = prompt("Nombre del proyecto:");
    if (name) addProject({ name, color: "bg-purple-500" });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold dark:text-white">📁 Proyectos</h3>
        <button
          onClick={handleAddProject}
          className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
        >
          + Nuevo
        </button>
      </div>
      <div className="space-y-1">
        {projects.map((project) => (
          <div
            key={project.id}
            onDragOver={(e) => {
              e.preventDefault();
              setIsOver(project.id);
            }}
            onDragLeave={() => setIsOver(null)}
            onDrop={(e) => {
              e.preventDefault();
              setIsOver(null);
              const taskId = e.dataTransfer.getData("taskId");
              if (taskId) moveTaskToProject(Number(taskId), project.id);
            }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              isOver === project.id
                ? "bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500 scale-[1.02]"
                : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
            }`}
          >
            <div className={`w-3 h-3 rounded-full shrink-0 ${project.color}`} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm dark:text-white truncate">
                {project.name}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {tasks.filter((t) => t.projectId === project.id).length} tareas
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UrgentTasksWidget = ({ tasks }: { tasks: Task[] }) => {
  const urgentTasks = tasks
    .filter(
      (t) => !t.completed && (t.priority === "high" || t.timeframe === "today"),
    )
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
      <h3 className="text-lg font-bold mb-4 dark:text-white">🔥 Urgentes</h3>
      <div className="space-y-3">
        {urgentTasks.length > 0 ? (
          urgentTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl transition-transform hover:translate-x-1"
            >
              <p className="text-sm font-bold dark:text-white truncate">
                {task.title}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-red-600 dark:text-red-400 uppercase font-black">
                  {task.priority || "Alta"}
                </span>
                {task.timeframe === "today" && (
                  <span className="text-[10px] bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-1.5 rounded">
                    HOY
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-2">
            Todo bajo control ✨
          </p>
        )}
      </div>
    </div>
  );
};
