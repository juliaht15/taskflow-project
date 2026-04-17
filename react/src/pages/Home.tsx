import { useState, useEffect } from 'react'; // Añadimos useEffect
import { useTaskContext } from '../context/TaskContext';
import { DataTable } from '../components/DataTable';
import type { Task, Column } from '../types';

export default function Home() {
  const { tasks, addTask, deleteTask, toggleTask } = useTaskContext();
  const [input, setInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Task['priority']>('Media');
  const [search, setSearch] = useState('');
  
  // ESTADOS DE RED (Punto 12)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una llamada a la API de 1 segundo
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (): void => {
    if (!input.trim()) return;
    addTask(input, selectedPriority);
    setInput('');
  };

  const columns: Column<Task>[] = [
    {
      key: 'title',
      label: 'Descripción',
      render: (task) => (
        <span className={task.completed ? 'line-through text-slate-300 italic' : 'font-medium text-slate-700'}>
          {task.title}
        </span>
      ),
    },
    {
      key: 'priority',
      label: 'Prioridad',
      render: (task) => {
        const colors: Record<Task['priority'], string> = {
          Alta: 'bg-red-50 text-red-600 border-red-100',
          Media: 'bg-amber-50 text-amber-600 border-amber-100',
          Baja: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        };
        return (
          <span className={`px-2 py-1 rounded-md text-[10px] font-black border ${colors[task.priority]}`}>
            {task.priority.toUpperCase()}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (task) => (
        <div className="flex gap-2">
          <button onClick={() => toggleTask(task.id)} className="text-[10px] font-bold text-indigo-600 hover:underline">
            {task.completed ? 'DESHACER' : 'COMPLETAR'}
          </button>
          <button onClick={() => deleteTask(task.id)} className="text-[10px] font-bold text-red-400 hover:underline">
            ELIMINAR
          </button>
        </div>
      ),
    },
  ];

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Input de tareas */}
      <section className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-50 outline-none"
          placeholder="¿Qué hay que hacer?"
        />
        <select 
          value={selectedPriority} 
          onChange={(e) => setSelectedPriority(e.target.value as Task['priority'])}
          className="bg-slate-50 px-4 rounded-xl text-sm font-bold outline-none"
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <button onClick={handleAddTask} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold">
          Añadir
        </button>
      </section>

      {/* Tabla con estado de carga */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-4 border-b border-slate-50">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs px-4 py-2 text-xs rounded-lg border border-slate-200 outline-none"
          />
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-slate-400 text-sm animate-pulse">Cargando flujo de tareas...</p>
          </div>
        ) : (
          <DataTable<Task> data={filteredTasks} columns={columns} />
        )}
      </div>
    </div>
  );
}