import { Task } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trash2, CheckCircle2, Circle, Calendar, Tag } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  const priorityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    inProgress: 'En curso',
    completed: 'Completada',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    inProgress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <Card hover={true} className="mb-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button onClick={() => onToggle(task.id)} className="mt-1 shrink-0">
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-indigo-500 transition-colors" />
            )}
          </button>

          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                <Tag className="w-3 h-3" /> {task.priority === 'low' ? 'Baja' : task.priority === 'medium' ? 'Media' : 'Alta'}
              </span>

              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                {statusLabels[task.status]}
              </span>

              {task.dueDate && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  <Calendar className="w-3 h-3" /> {new Date(task.dueDate).toLocaleDateString('es-ES')}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};