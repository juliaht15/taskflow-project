import { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TaskForm = () => {
  const { addTask, state: { projects } } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [timeframe, setTimeframe] = useState<'today' | 'thisWeek' | 'thisMonth'>('thisWeek');
  const [selectedProject, setSelectedProject] = useState<string>('1');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      completed: false,
      priority: isUrgent ? 'high' : priority,
      timeframe,
      projectId: selectedProject
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setTimeframe('thisWeek');
    setIsUrgent(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">✨</span>
        Crear Nueva Tarea
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añade una descripción (opcional)"
            rows={2}
            className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">📁 Proyecto</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">⏰ Cuándo</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="today">📅 Hoy</option>
              <option value="thisWeek">📆 Esta semana</option>
              <option value="thisMonth">📅 Este mes</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg cursor-pointer" onClick={() => setIsUrgent(!isUrgent)}>
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            className="w-5 h-5 rounded border-red-300 text-red-600 focus:ring-red-500"
          />
          <div className="flex-1">
            <label className="text-sm font-bold text-red-700 dark:text-red-400 cursor-pointer">
              🚨 Marcar como URGENTE
            </label>
            <p className="text-xs text-red-600 dark:text-red-500">Esto establecerá la prioridad al máximo</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-[1.02] shadow-lg"
        >
          ➕ Añadir Tarea
        </button>
      </form>
    </div>
  );
};