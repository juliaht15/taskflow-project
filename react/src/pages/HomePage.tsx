import { useApp } from '../context/AppContext';
import { Layout, TaskForm, TaskList, ProjectWidget, UrgentTasksWidget, StatsWidget } from '../components';

export default function HomePage() {
  const { state: { tasks, projects } } = useApp();

  return (
    <Layout>
      {/* Estadísticas */}
      <StatsWidget tasks={tasks} />

      {/* Grid principal - 3 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Izquierda - Proyectos */}
        <div className="lg:col-span-1">
          <ProjectWidget projects={projects} />
        </div>

        {/* Centro - Formulario y Lista de Tareas */}
        <div className="lg:col-span-2 space-y-6">
          <TaskForm />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Mis Tareas ({tasks.length})
            </h2>
            <TaskList />
          </div>
        </div>

        {/* Derecha - Tareas Urgentes */}
        <div className="lg:col-span-1">
          <UrgentTasksWidget tasks={tasks} />
        </div>
      </div>
    </Layout>
  );
}