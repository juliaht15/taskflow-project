import { useState, FormEvent } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, X } from 'lucide-react';
import { Priority, TaskStatus } from '../../types';

export const TaskForm = () => {
  const { addTask } = useTasks();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium' as Priority, status: 'pending' as TaskStatus, dueDate: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addTask({ title: formData.title, description: formData.description, priority: formData.priority, status: formData.status, dueDate: formData.dueDate || undefined, completed: false });
      setFormData({ title: '', description: '', priority: 'medium', status: 'pending', dueDate: '' });
      setIsExpanded(false);
    } catch (error) { console.error('Failed to add task:', error); }
  };

  if (!isExpanded) {
    return (
      <Card gradient={true} className="mb-6 cursor-pointer" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center justify-center gap-2 py-4"><Plus className="w-5 h-5" /><span className="font-medium">Create New Task</span></div>
      </Card>
    );
  }

  return (
    <Card gradient={false} className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
        <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wix-accent focus:ring-2 focus:ring-wix-accent/20 outline-none transition-all" placeholder="Enter task title" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wix-accent focus:ring-2 focus:ring-wix-accent/20 outline-none transition-all resize-none" rows={3} placeholder="Enter task description" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wix-accent focus:ring-2 focus:ring-wix-accent/20 outline-none transition-all">
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wix-accent focus:ring-2 focus:ring-wix-accent/20 outline-none transition-all">
              <option value="pending">Pending</option><option value="inProgress">In Progress</option><option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wix-accent focus:ring-2 focus:ring-wix-accent/20 outline-none transition-all" />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1"><Plus className="w-4 h-4 mr-2" /> Create Task</Button>
          <Button type="button" variant="secondary" onClick={() => setIsExpanded(false)}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
};