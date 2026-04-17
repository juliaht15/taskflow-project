import { useTasks } from '../../context/TaskContext';
import { TaskCard } from './TaskCard';
import { Card } from '../ui/Card';
import { Loader2, Inbox } from 'lucide-react';

export const TaskList = () => {
  const { state, deleteTask, toggleTask } = useTasks();

  if (state.loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-wix-accent" /></div>;
  if (state.error) return <Card gradient={false} className="mb-6"><div className="text-center py-8"><p className="text-red-500 mb-2">Error</p><p className="text-gray-500">{state.error}</p></div></Card>;
  if (state.tasks.length === 0) return <Card gradient={false} className="mb-6"><div className="text-center py-12"><Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300" /><h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3><p className="text-gray-500">Create your first task to get started!</p></div></Card>;

  return <div className="space-y-4">{state.tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />)}</div>;
};