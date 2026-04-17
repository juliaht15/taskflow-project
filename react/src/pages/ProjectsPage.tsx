import { Card } from '../components/ui/Card';
import { Folder, Plus } from 'lucide-react';

export const ProjectsPage = () => {
  const projects = [
    { id: '1', name: 'Proyecto Personal', tasks: 5, color: 'bg-blue-500' },
    { id: '2', name: 'Trabajo', tasks: 12, color: 'bg-purple-500' },
    { id: '3', name: 'Estudios', tasks: 8, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Proyectos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organiza tus tareas por proyectos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Project Card */}
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer bg-transparent">
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
              <Plus className="w-12 h-12 mb-2" />
              <span className="font-medium">Nuevo Proyecto</span>
            </div>
          </Card>

          {/* Project Cards */}
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${project.color}`}>
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {project.tasks} tareas
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};