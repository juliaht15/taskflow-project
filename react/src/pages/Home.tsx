import { useTasks } from '../context/TaskContext';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';

export const HomePage = () => {
  const { state } = useTasks();

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Panel de Control
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus tareas de forma eficiente y organizada.
          </p>
        </div>
        
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};