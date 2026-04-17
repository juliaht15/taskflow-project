import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskCard } from '../components/tasks/TaskCard';
import { Card } from '../components/ui/Card';
import { ArrowLeft, Inbox } from 'lucide-react';

export const ProjectViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, deleteTask, toggleTask, getTasksByProject } = useApp();

  if (!id) return null;

  const project = state.projects.find(p => p.id === id);
  const projectTasks = getTasksByProject(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="text-center dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Proyecto no encontrado</p>
          <button onClick={() => navigate('/projects')} className="text-indigo-600 hover:underline">Volver a proyectos</button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a Proyectos
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 rounded-xl ${project.color}`}>
            <div className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{projectTasks.length} tareas asignadas</p>
          </div>
        </div>

        <TaskForm defaultProjectId={id} defaultTimeframe="general" />
        
        {projectTasks.length === 0 ? (
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center py-12">
              <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sin tareas aún</h3>
              <p className="text-gray-500 dark:text-gray-400">Añade tareas a este proyecto.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {projectTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};