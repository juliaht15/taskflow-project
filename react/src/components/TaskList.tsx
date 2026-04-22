import { useApp } from '../context/AppContext';

export const TaskList = () => {
  const { state: { tasks }, toggleTask, deleteTask } = useApp();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-500';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay tareas</h3>
        <p className="text-gray-500 dark:text-gray-400">¡Crea tu primera tarea usando el formulario!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-50' : ''} transition-all hover:shadow-md`}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <div className="flex-1">
            <h4 className={`font-semibold text-gray-900 dark:text-white ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {task.priority === 'high' ? '🔴 Alta' : task.priority === 'medium' ? '🟡 Media' : '🟢 Baja'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {task.timeframe === 'today' ? '📅 Hoy' : task.timeframe === 'thisWeek' ? '📆 Esta semana' : '📅 Este mes'}
              </span>
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};