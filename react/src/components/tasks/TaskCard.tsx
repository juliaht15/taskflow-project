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
  const priorityColors: Record<string, string> = { low: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', high: 'bg-red-100 text-red-700' };
  const statusColors: Record<string, string> = { pending: 'bg-gray-100 text-gray-700', inProgress: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700' };

  return (
    <Card hover={true} className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button onClick={() => onToggle(task.id)} className="mt-1 shrink-0">
            {task.completed ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-300 hover:text-wix-accent transition-colors" />}
          </button>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</h3>
            {task.description && <p className="text-gray-500 mb-3">{task.description}</p>}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}><Tag className="w-3 h-3" /> {task.priority}</span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>{task.status}</span>
              {task.dueDate && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"><Calendar className="w-3 h-3" /> {new Date(task.dueDate).toLocaleDateString()}</span>}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
      </div>
    </Card>
  );
};