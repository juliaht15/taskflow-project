import { useTasks } from '../context/TaskContext';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { Hero } from '../components/layout/Hero';

export const HomePage = () => {
  useTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
};