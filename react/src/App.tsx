import { useState, type ReactNode } from 'react';
import { DataTable } from './components/DataTable';
import './App.css';

// 1. Definimos la interfaz con la nueva propiedad 'completada'
export interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  completada: boolean;
}

// 2. Tipo para las columnas - AHORA CON 'string' para aceptar 'acciones'
export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
}

export default function App() {
  // ESTADO: Lista de tareas iniciales
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: 'Configurar Arquitectura TaskFlow Pro', prioridad: 'Alta', completada: true },
    { id: 2, titulo: 'Despliegue final en Vercel', prioridad: 'Media', completada: false },
    { id: 3, titulo: 'Limpieza de archivos duplicados', prioridad: 'Baja', completada: false },
  ]);

  // ESTADOS: Para el formulario y la búsqueda
  const [input, setInput] = useState<string>('');
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [busqueda, setBusqueda] = useState<string>('');

  // FUNCIÓN: Añadir nueva tarea
  const agregarTarea = (): void => {
    if (!input.trim()) return;
    const nueva: Tarea = {
      id: Date.now(),
      titulo: input,
      prioridad: prioridadSeleccionada,
      completada: false
    };
    setTareas([nueva, ...tareas]);
    setInput('');
  };

  // FUNCIÓN: Borrar tarea
  const borrarTarea = (id: number): void => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  // FUNCIÓN: Alternar estado de completado
  const toggleTarea = (id: number): void => {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  // DEFINICIÓN DE COLUMNAS - Ahora con render personalizado
  const columnas: Column<Tarea>[] = [
    { 
      key: 'titulo', 
      label: 'Descripción de la Tarea',
      render: (tarea: Tarea) => (
        <span className={tarea.completada ? "line-through text-slate-300 italic" : ""}>
          {tarea.titulo}
        </span>
      )
    },
    { 
      key: 'prioridad', 
      label: 'Prioridad' 
    },
    { 
      key: 'acciones', 
      label: 'Acciones',
      render: (tarea: Tarea) => (
        <div className="flex gap-2">
          <button
            onClick={() => toggleTarea(tarea.id)}
            className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${
              tarea.completada
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            {tarea.completada ? '✓ LISTO' : 'PENDIENTE'}
          </button>
          <button
            onClick={() => borrarTarea(tarea.id)}
            className="px-3 py-1 rounded-lg bg-red-50 text-red-400 border border-red-100 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black"
          >
            ELIMINAR
          </button>
        </div>
      )
    },
  ];

  // PREPARACIÓN DE DATOS: Solo filtramos, ya no necesitamos el cast
  const datosFiltrados = tareas.filter(t => 
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-12 font-sans text-slate-900 bg-slate-50">
      <div className="max-w-4xl mx-auto">
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
          <div className="text-right">
            <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              JULIA PROJECT
            </span>
          </div>
        </header>

        {/* INPUT Y SELECTOR (Glass-morphism) */}
        <section className="space-y-4 mb-8">
          <div className="glass-card p-2 rounded-2xl flex flex-wrap gap-2 shadow-xl shadow-slate-200/50 border border-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
              className="flex-1 min-w-50 px-6 py-4 rounded-xl bg-white/50 border-none focus:ring-2 ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
              placeholder="¿Qué tienes pendiente hoy, Julia?"
            />
            <select
              value={prioridadSeleccionada}
              onChange={(e) => setPrioridadSeleccionada(e.target.value as 'Alta' | 'Media' | 'Baja')}
              className="px-4 py-4 rounded-xl bg-white/50 border-none text-slate-500 font-bold outline-none cursor-pointer hover:bg-white transition-colors text-sm"
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

          {/* BARRA DE BÚSQUEDA */}
          <div className="px-2">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Filtrar por descripción..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-transparent focus:border-indigo-400 focus:bg-white outline-none text-slate-500 transition-all"
              />
            </div>
          </div>
        </section>

        {/* TABLA PRINCIPAL */}
        <main className="glass-card rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-white bg-white/40 backdrop-blur-md">
          <DataTable<Tarea> data={datosFiltrados} columns={columnas} />
        </main>

        <footer className="mt-16 text-center">
          <p className="text-[10px] font-bold text-slate-300 tracking-widest uppercase italic">
            © 2026 Fullstack Architect Edition • Designed by Julia
          </p>
        </footer>
      </div>
    </div>
  );
}