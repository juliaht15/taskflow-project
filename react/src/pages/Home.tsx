import { useState } from 'react';
import { DataTable } from '../components/DataTable';
import type { Task, Column } from '../types'; 

export default function Home() {
  // 1. Estado inicial con la propiedad createdAt añadida para cumplir con la interfaz Task
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: 'Configurar Arquitectura TaskFlow Pro', 
      priority: 'Alta', 
      completed: true, 
      createdAt: new Date().toISOString() 
    },
    { 
      id: 2, 
      title: 'Despliegue final en Vercel', 
      priority: 'Media', 
      completed: false, 
      createdAt: new Date().toISOString() 
    },
    { 
      id: 3, 
      title: 'Limpieza de archivos duplicados', 
      priority: 'Baja', 
      completed: false, 
      createdAt: new Date().toISOString() 
    },
  ]);

  const [input, setInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Task['priority']>('Media');
  const [search, setSearch] = useState('');

  // 2. Función para añadir tareas incluyendo la fecha obligatoria
  const addTask = (): void => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: input,
      priority: selectedPriority,
      completed: false,
      createdAt: new Date().toISOString(),
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
          <button
            onClick={() => toggleTask(task.id)}
            className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all border ${
              task.completed
                ? 'bg-slate-100 text-slate-400 border-slate-200'
                : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            {task.completed ? 'DESHACER' : 'COMPLETAR'}
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 rounded-lg bg-white text-red-400 border border-red-100 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black"
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sección de entrada */}
      <section className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="flex flex-wrap gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 min-w-50 px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
            placeholder="¿Cuál es el siguiente paso?"
          />
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as Task['priority'])}
            className="px-4 py-3 rounded-xl bg-slate-50 border-transparent text-slate-500 font-bold outline-none cursor-pointer hover:bg-white transition-colors text-sm"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
          >
            Añadir
          </button>
        </div>
      </section>

      {/* Buscador y Tabla */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        <div className="p-4 border-b border-slate-50 bg-slate-50/30">
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:border-indigo-400 outline-none transition-all"
            />
          </div>
        </div>
        
        <DataTable<Task> data={filteredTasks} columns={columns} />
        
        {filteredTasks.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm italic">No se encontraron tareas en el flujo.</p>
          </div>
        )}
      </div>
    </div>
  );
}