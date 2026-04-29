import { useApp } from "../context/AppContext";
import { CheckCircle2, Circle, Trash2, Clock } from "lucide-react";

// 1. Definimos que el componente ahora acepta searchQuery
interface TaskListProps {
  searchQuery?: string;
}

export const TaskList = ({ searchQuery = "" }: TaskListProps) => {
  const { tasks, toggleTask, deleteTask, projects } = useApp();

  // 2. Filtramos las tareas según la búsqueda
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
        <p className="text-slate-400 font-medium text-sm">
          No se encontraron tareas que coincidan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => {
        const project = projects.find((p) => p.id === task.projectId);

        return (
          <div
            key={task.id}
            className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-900/30 hover:shadow-md hover:shadow-emerald-500/5 transition-all"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`transition-colors ${task.completed ? "text-emerald-500" : "text-slate-300 hover:text-emerald-400"}`}
            >
              {task.completed ? (
                <CheckCircle2 size={22} />
              ) : (
                <Circle size={22} />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-sm truncate ${task.completed ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"}`}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                {project && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                    {project.name}
                  </span>
                )}
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock size={10} />
                  <span className="text-[10px]">
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "Sin fecha"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
