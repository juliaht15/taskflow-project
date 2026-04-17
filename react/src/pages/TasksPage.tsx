import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';

export const TasksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tareas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualiza y gestiona todas tus tareas
          </p>
        </div>
        
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};