import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskCard } from '../components/tasks/TaskCard';
import { Card } from '../components/ui/Card';
import { Inbox } from 'lucide-react';
import { TaskTimeframe } from '../types';

export const TasksPage = () => {
  const { state, deleteTask, toggleTask, getTasksByTimeframe } = useApp();
  const [activeFilter, setActiveFilter] = useState<TaskTimeframe>('general');

  const filters: { key: TaskTimeframe; label: string }[] = [
    { key: 'general', label: 'Todas' },
    { key: 'daily', label: 'Diarias' },
    { key: 'weekly', label: 'Semanales' },
    { key: 'monthly', label: 'Mensuales' },
  ];

  const filteredTasks = getTasksByTimeframe(activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tareas</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestiona tus tareas por periodo.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeFilter === f.key
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <TaskForm defaultTimeframe={activeFilter} />
        
        {filteredTasks.length === 0 ? (
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center py-12">
              <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay tareas {filters.find(f => f.key === activeFilter)?.label.toLowerCase()}</h3>
              <p className="text-gray-500 dark:text-gray-400">Crea una nueva tarea para este periodo.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};