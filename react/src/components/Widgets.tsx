import { Task, Project } from '../types';

export const StatsWidget = ({ tasks }: { tasks: Task[] }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Totales</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⏳</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pending}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pendientes</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{completed}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Completadas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectWidget = ({ projects }: { projects: Project[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Proyectos</h3>
      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">+ Nuevo</button>
    </div>
    <div className="space-y-3">
      {projects.map((project) => (
        <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
          <div className={`w-3 h-3 rounded-full ${project.color}`} />
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white text-sm">{project.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">0 tareas</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const UrgentTasksWidget = ({ tasks }: { tasks: Task[] }) => {
  const urgentTasks = tasks.filter(t => t.priority === 'high' && !t.completed).slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔥 Urgentes</h3>
        <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs font-bold px-2 py-1 rounded-full">
          {urgentTasks.length}
        </span>
      </div>
      {urgentTasks.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">¡No hay tareas urgentes! 🎉</p>
      ) : (
        <div className="space-y-2">
          {urgentTasks.map((task) => (
            <div key={task.id} className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {task.timeframe === 'today' ? '📅 Hoy' : '⏰ Esta semana'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};