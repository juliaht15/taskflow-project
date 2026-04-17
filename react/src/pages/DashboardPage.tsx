import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { CheckCircle2, Clock, Folder, TrendingUp } from 'lucide-react';

export const DashboardPage = () => {
  const { stats } = useApp();

  const statsCards = [
    { label: 'Tareas Totales', value: stats.total, icon: CheckCircle2, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { label: 'Pendientes', value: stats.pending, icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { label: 'Completadas', value: stats.completed, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Proyectos', value: stats.projects, icon: Folder, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Panel de Control</h1>
          <p className="text-gray-600 dark:text-gray-400">Resumen general de tu productividad, Julia.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat) => (
            <Card key={stat.label} hover={false} className="dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actividad Reciente</h3>
            <p className="text-gray-500 dark:text-gray-400">Las últimas tareas completadas aparecerán aquí.</p>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Próximas Fechas Límite</h3>
            <p className="text-gray-500 dark:text-gray-400">Tareas con fecha próxima se mostrarán aquí.</p>
          </Card>
        </div>
      </main>
    </div>
  );
};