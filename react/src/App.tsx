import { useState } from 'react';
import { DataTable } from './components/DataTable';
import './App.css';

interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: 'Configurar Arquitectura TaskFlow Pro', prioridad: 'Alta' },
    { id: 2, titulo: 'Despliegue final en Vercel', prioridad: 'Media' },
    { id: 3, titulo: 'Limpieza de archivos duplicados', prioridad: 'Baja' },
  ]);
  
  const [input, setInput] = useState('');
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [busqueda, setBusqueda] = useState(''); // Estado para la barra de búsqueda

  const agregarTarea = () => {
    if (!input.trim()) return;
    const nueva: Tarea = { 
      id: Date.now(), 
      titulo: input, 
      prioridad: prioridadSeleccionada 
    };
    setTareas([...tareas, nueva]);
    setInput('');
  };

  // LÓGICA DE FILTRADO: Filtramos las tareas según lo que escribas
  const tareasFiltradas = tareas.filter(t => 
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // COLUMNAS: He quitado la columna 'id' para que no salgan esos números largos
  const columnas: { key: keyof Tarea; label: string }[] = [
    { key: 'titulo', label: 'Descripción de la Tarea' },
    { key: 'prioridad', label: 'Prioridad' },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-12 font-sans text-slate-900 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12 flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-indigo-600 uppercase">
              TaskFlow <span className="text-slate-400">Pro</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
              Management System
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              JULIA PROJECT
            </span>
          </div>
        </header>

        {/* SECCIÓN DE ENTRADA Y BÚSQUEDA */}
        <section className="space-y-4 mb-8">
          <div className="glass-card p-2 rounded-2xl flex flex-wrap gap-2 shadow-xl shadow-slate-200/50">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
              className="flex-1 min-w-[200px] px-6 py-4 rounded-xl bg-white/50 border-none focus:ring-2 ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
              placeholder="¿Qué tienes pendiente hoy, Julia?"
            />
            
            {/* Selector de Prioridad */}
            <select 
              value={prioridadSeleccionada}
              onChange={(e) => setPrioridadSeleccionada(e.target.value as any)}
              className="px-4 py-4 rounded-xl bg-white/50 border-none text-slate-600 font-bold outline-none cursor-pointer hover:bg-white transition-colors"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>

            <button 
              onClick={agregarTarea} 
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
            >
              Añadir
            </button>
          </div>

          {/* Barra de Búsqueda / Filtro */}
          <div className="px-2">
            <input 
              type="text"
              placeholder="🔍 Buscar tareas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 bg-transparent focus:border-indigo-400 outline-none text-slate-500 transition-all"
            />
          </div>
        </section>

        <main className="glass-card rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-white">
          <DataTable data={tareasFiltradas} columns={columnas} />
        </main>

        <footer className="mt-16 text-center">
          <p className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
            © 2026 Fullstack Architect Edition
          </p>
        </footer>
      </div>
    </div>
  );
}