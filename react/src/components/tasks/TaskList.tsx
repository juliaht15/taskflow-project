import { useApp } from '../../context/AppContext'; //
import { TaskCard } from './TaskCard';
import { Card } from '../ui/Card';
import { Loader2, Inbox } from 'lucide-react';

export const TaskList = () => {
  const { state, deleteTask, toggleTask } = useApp(); //

  if (state.loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (state.error) {
    return (
      <Card gradient={false} className="mb-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400 mb-2">Error</p>
          <p className="text-gray-500 dark:text-gray-400">{state.error}</p>
        </div>
      </Card>
    );
  }

  if (state.tasks.length === 0) {
    return (
      <Card gradient={false} className="mb-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center py-12">
          <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aún no hay tareas</h3>
          <p className="text-gray-500 dark:text-gray-400">Crea tu primera tarea para comenzar.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {state.tasks.map((task) => ( // 
        <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </div>
  );
};