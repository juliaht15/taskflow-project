import { useState, FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, X } from 'lucide-react';
import { Priority, TaskStatus, TaskTimeframe } from '../../types';

interface TaskFormProps {
  defaultProjectId?: string;
  defaultTimeframe?: TaskTimeframe;
}

export const TaskForm = ({ defaultProjectId, defaultTimeframe = 'general' }: TaskFormProps) => {
  const { state, addTask } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    status: 'pending' as TaskStatus,
    timeframe: defaultTimeframe as TaskTimeframe,
    projectId: defaultProjectId || '',
    dueDate: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addTask({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        timeframe: formData.timeframe,
        projectId: formData.projectId || undefined,
        dueDate: formData.dueDate || undefined,
        completed: false,
      });
      setFormData({ title: '', description: '', priority: 'medium', status: 'pending', timeframe: defaultTimeframe, projectId: defaultProjectId || '', dueDate: '' });
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  if (!isExpanded) {
    return (
      <Card gradient={true} className="mb-6 cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center justify-center gap-2 py-4">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Crear nueva tarea</span>
        </div>
      </Card>
    );
  }

  return (
    <Card gradient={false} className="mb-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nueva Tarea</h2>
        <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Título *</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Ej: Comprar groceries" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" rows={3} placeholder="Detalles opcionales..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prioridad</label>
            <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="low">Baja</option><option value="medium">Media</option><option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Periodo</label>
            <select value={formData.timeframe} onChange={(e) => setFormData({ ...formData, timeframe: e.target.value as TaskTimeframe })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="general">General</option><option value="daily">Diaria</option><option value="weekly">Semanal</option><option value="monthly">Mensual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proyecto</label>
            <select value={formData.projectId} onChange={(e) => setFormData({ ...formData, projectId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="">Sin proyecto</option>
              {state.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fecha límite</label>
            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1"><Plus className="w-4 h-4 mr-2" /> Crear Tarea</Button>
          <Button type="button" variant="secondary" onClick={() => setIsExpanded(false)} className="dark:bg-gray-700 dark:text-white dark:border-gray-600">Cancelar</Button>
        </div>
      </form>
    </Card>
  );
};