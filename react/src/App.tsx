import { useState, type ReactNode } from 'react';
import { DataTable } from './components/DataTable';
import './App.css';

// Interfaces con naming en inglés
export interface Task {
  id: number;
  title: string;
  priority: 'Alta' | 'Media' | 'Baja';
  completed: boolean;
}

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Configurar Arquitectura TaskFlow Pro', priority: 'Alta', completed: true },
    { id: 2, title: 'Despliegue final en Vercel', priority: 'Media', completed: false },
    { id: 3, title: 'Limpieza de archivos duplicados', priority: 'Baja', completed: false },
  ]);

  const [input, setInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [search, setSearch] = useState('');

  const addTask = (): void => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: input,
      priority: selectedPriority,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTask = (id: number): void => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const columns: Column<Task>[] = [
    {
      key: 'title',
      label: 'Descripción de la Tarea',
      render: (task: Task) => (
        <span className={task.completed ? 'line-through text-slate-300 italic' : ''}>
          {task.title}
        </span>
      ),
    },
    {
      key: 'priority',
      label: 'Prioridad',
      render: (task: Task) => {
        const colors: Record<string, string> = {
          Alta: 'bg-red-100 text-red-700 border-red-200',
          Media: 'bg-amber-100 text-amber-700 border-amber-200',
          Baja: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${colors[task.priority]}`}>
            {task.priority.toUpperCase()}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (task: Task) => (
        <div className="flex gap-2">
          <button
            onClick={() => toggleTask(task.id)}
            className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${
              task.completed
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            {task.completed ? '✓ LISTO' : 'PENDIENTE'}
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 rounded-lg bg-red-50 text-red-400 border border-red-100 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black"
          >
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
<div className="min-h-screen p-4 sm:p-12 font-sans text-slate-900 bg-linear-to-br from-slate-50 to-slate-100">      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <header className="mb-12 flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">
              TaskFlow <span className="text-slate-400">Pro</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
              Management System
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            JULIA PROJECT
          </span>
        </header>

        {/* INPUT SECTION */}
        <section className="space-y-4 mb-8">
          <div className="glass-card p-2 rounded-2xl flex flex-wrap gap-2 shadow-xl shadow-slate-200/50 border border-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 min-w-50 px-6 py-4 rounded-xl bg-white/50 border-none focus:ring-2 ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
              placeholder="¿Qué tienes pendiente hoy, Julia?"
            />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as 'Alta' | 'Media' | 'Baja')}
              className="px-4 py-4 rounded-xl bg-white/50 border-none text-slate-500 font-bold outline-none cursor-pointer hover:bg-white transition-colors text-sm"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
            <button
              onClick={addTask}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
            >
              Añadir
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="px-2">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Filtrar por descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-transparent focus:border-indigo-400 focus:bg-white outline-none text-slate-500 transition-all"
              />
            </div>
          </div>
        </section>

        {/* TABLE */}
        <main className="glass-card rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-white bg-white/40 backdrop-blur-md">
          <DataTable<Task> data={filteredTasks} columns={columns} />
        </main>

        {/* FOOTER */}
        <footer className="mt-16 text-center">
          <p className="text-[10px] font-bold text-slate-300 tracking-widest uppercase italic">
            © 2026 Fullstack Architect Edition • Designed by Julia
          </p>
        </footer>
      </div>
    </div>
  );
}