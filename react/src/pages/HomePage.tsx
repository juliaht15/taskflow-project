import { useAppContext } from "../context/AppContext";
import {
  Layout,
  TaskForm,
  TaskList,
  ProjectWidget,
  UrgentTasksWidget,
  StatsWidget,
} from "../components";

export default function HomePage() {
  const { tasks, projects, addTask } = useAppContext();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Sección superior: Estadísticas rápidas */}
        <StatsWidget tasks={tasks} />

        {/* Grid principal responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna Izquierda: Gestión de Proyectos */}
          <aside className="lg:col-span-1 space-y-6">
            <ProjectWidget projects={projects} tasks={tasks} />
          </aside>

          {/* Columna Central: El "Feed" de trabajo */}
          <main className="lg:col-span-2 space-y-6">
            <TaskForm onTaskCreated={addTask} projects={projects} />

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    📋
                  </span>
                  Mis Tareas
                </h2>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-full">
                  {tasks.length} en total
                </span>
              </header>

              <TaskList />
            </div>
          </main>

          {/* Columna Derecha: Prioridades */}
          <aside className="lg:col-span-1">
            <UrgentTasksWidget tasks={tasks} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}
