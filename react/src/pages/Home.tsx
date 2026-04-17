import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { DataTable } from '../components/DataTable';
import type { Task, Column } from '../types';

export default function Home() {
  // Extraemos loading y error del contexto (Punto 12)
  const { tasks, loading, error, addTask, deleteTask, toggleTask } = useTaskContext();
  
  const [input, setInput] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Task['priority']>('Media');
  const [search, setSearch] = useState('');

  const handleAddTask = async (): Promise<void> => {
    if (!input.trim()) return;
    await addTask(input, selectedPriority);
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
        <div className="flex gap-4">
          <button 
            onClick={() => toggleTask(task.id)} 
            className={`text-[10px] font-bold transition-colors ${task.completed ? 'text-slate-400' : 'text-indigo-600 hover:text-indigo-800'}`}
          >
            {task.completed ? 'REABRIR' : 'COMPLETAR'}
          </button>
          <button 
            onClick={() => deleteTask(task.id)} 
            className="text-[10px] font-bold text-red-400 hover:text-red-600"
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
      
      {/* 1. SECCIÓN DE CABECERA Y ERROR */}
      <header>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mis Tareas</h2>
        <p className="text-slate-500 text-sm">Gestiona tu flujo de trabajo en tiempo real.</p>
        
        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-red-800 font-bold text-sm">Error de conexión</p>
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          </div>
        )}
      </header>

      {/* 2. FORMULARIO DE ENTRADA */}
      <section className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          placeholder="Escribe una nueva tarea..."
        />
        <div className="flex gap-2">
          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value as Task['priority'])}
            className="bg-slate-50 px-4 py-3 rounded-xl text-sm font-bold outline-none border-none cursor-pointer"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <button 
            onClick={handleAddTask} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            Añadir
          </button>
        </div>
      </section>

      {/* 3. VISTA DE DATOS (Punto 12: Loading / Data) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs px-4 py-2 text-xs rounded-lg border border-slate-200 outline-none focus:border-indigo-300"
          />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {filteredTasks.length} Tareas encontradas
          </span>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block relative">
              <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-400 text-sm font-medium animate-pulse">
              Consultando servidor Node.js...
            </p>
          </div>
        ) : (
          <DataTable<Task> data={filteredTasks} columns={columns} />
        )}
      </div>
    </div>
  );
}