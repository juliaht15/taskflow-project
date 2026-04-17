import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Folder, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage = () => {
  const { state, addProject, deleteProject, getTasksByProject } = useApp();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('bg-indigo-500');

  const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500'];

  const handleCreate = async () => {
    if (!newProjectName.trim()) return;
    await addProject(newProjectName, newProjectColor);
    setNewProjectName('');
    setShowCreate(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Proyectos</h1>
            <p className="text-gray-600 dark:text-gray-400">Organiza tus tareas por proyectos.</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nuevo Proyecto
          </button>
        </div>

        {showCreate && (
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Crear Proyecto</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Nombre del proyecto"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                {colors.map(c => (
                  <button key={c} onClick={() => setNewProjectColor(c)} className={`w-10 h-10 rounded-lg ${c} ${newProjectColor === c ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-800' : ''}`} />
                ))}
              </div>
              <button onClick={handleCreate} className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700">Crear</button>
              <button onClick={() => setShowCreate(false)} className="px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Cancelar</button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.projects.map((project) => {
            const taskCount = getTasksByProject(project.id).length;
            return (
              <Card key={project.id} className="dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:scale-[1.02] transition-transform relative group" onClick={() => navigate(`/projects/${project.id}`)}>
                <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${project.color}`}>
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{taskCount} tareas</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};