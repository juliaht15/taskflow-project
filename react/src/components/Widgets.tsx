import { Task, Project } from "../types";

/**
 * Muestra el resumen numérico del estado de las tareas.
 */
export const StatsWidget = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const stats = [
    {
      label: "Totales",
      value: total,
      icon: "📋",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
    },
    {
      label: "Pendientes",
      value: pending,
      icon: "⏳",
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
    },
    {
      label: "Completadas",
      value: completed,
      icon: "✅",
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="card-container p-5 flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Lista de proyectos con conteo dinámico de tareas.
 */
export const ProjectWidget = ({
  projects,
  tasks,
}: {
  projects: Project[];
  tasks: Task[];
}) => (
  <div className="card-container p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        Proyectos
      </h3>
      <button className="text-xs font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-colors">
        + Nuevo
      </button>
    </div>
    <div className="space-y-2">
      {projects.map((project) => {
        const projectTasks = tasks.filter(
          (t) => t.projectId === project.id,
        ).length;
        return (
          <div
            key={project.id}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all cursor-pointer"
          >
            <div
              className={`w-3 h-3 rounded-full ${project.color} shadow-sm group-hover:scale-125 transition-transform`}
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                {project.name}
              </p>
              <p className="text-xs text-slate-400">{projectTasks} tareas</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/**
 * Lista de tareas con alta prioridad que aún no se han completado.
 */
export const UrgentTasksWidget = ({ tasks }: { tasks: Task[] }) => {
  const urgentTasks = tasks
    .filter((t) => t.priority === "high" && !t.completed)
    .slice(0, 5);

  return (
    <div className="card-container p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🔥</span> Urgentes
        </h3>
        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
          {urgentTasks.length}
        </span>
      </div>

      {urgentTasks.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            ¡Todo bajo control!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {urgentTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-slate-50 dark:bg-slate-700/30 border-l-4 border-red-500 rounded-r-xl group hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-red-600 transition-colors">
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600 text-slate-500">
                  {task.timeframe === "today" ? "📅 Hoy" : "⏰ Esta semana"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
