import { useState } from 'react';
import { DataTable } from './components/DataTable';
import './App.css'; // Importante para cargar el efecto "glass" y las animaciones

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

  const agregarTarea = () => {
    if (!input.trim()) return;
    const nueva: Tarea = { 
      id: Date.now(), 
      titulo: input, 
      prioridad: 'Media' 
    };
    setTareas([...tareas, nueva]);
    setInput('');
  };

  const columnas: { key: keyof Tarea; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Descripción de la Tarea' },
    { key: 'prioridad', label: 'Prioridad' },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado Profesional */}
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

        {/* Input con efecto Glass */}
        <section className="glass-card p-2 rounded-2xl mb-8 flex gap-2 shadow-xl shadow-slate-200/50">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
            className="flex-1 px-6 py-4 rounded-xl bg-white/50 border-none focus:ring-2 ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400 font-medium"
            placeholder="¿Qué tienes pendiente hoy, Julia?"
          />
          <button 
            onClick={agregarTarea} 
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95"
          >
            Añadir
          </button>
        </section>

        {/* Tabla de Datos Principal */}
        <main className="glass-card rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-white">
          <DataTable data={tareas} columns={columnas} />
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