// src/App.tsx
import { useState } from 'react';
import { DataTable } from './components/DataTable';

interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

function App() {
  // ESTADO DINÁMICO: Para que los botones y añadir funcionen
  const [misTareas, setMisTareas] = useState<Tarea[]>([
    { id: 1, titulo: 'Aprender Genéricos en TS', prioridad: 'Alta' },
    { id: 2, titulo: 'Configurar Tailwind v4', prioridad: 'Media' },
  ]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [prioridadSel, setPrioridadSel] = useState<'Alta' | 'Media' | 'Baja'>('Baja');

  const añadirTarea = () => {
    if (!nuevaTarea.trim()) return;
    const item: Tarea = {
      id: misTareas.length + 1,
      titulo: nuevaTarea,
      prioridad: prioridadSel
    };
    setMisTareas([...misTareas, item]);
    setNuevaTarea('');
  };

  const columnas: { key: keyof Tarea; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Descripción de la Tarea' },
    { key: 'prioridad', label: 'Urgencia' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 pb-6 border-b border-slate-100 flex justify-between items-center">
          <h1 className="text-2xl font-black text-slate-900 uppercase">TaskFlow <span className="text-blue-600">Architect</span></h1>
          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">V.PRO</span>
        </header>

        {/* BARRA DE BÚSQUEDA / AÑADIR (Funcional) */}
        <div className="mb-8 flex gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <input 
            type="text" 
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nueva tarea..." 
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <select 
            value={prioridadSel}
            onChange={(e) => setPrioridadSel(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <button 
            onClick={añadirTarea}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
          >
            Añadir
          </button>
        </div>

        <main className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <DataTable data={misTareas} columns={columnas} />
        </main>

        <footer className="mt-16 text-center border-t border-slate-100 pt-8">
          <p className="text-sm font-medium text-slate-400">
            Desarrollado por <span className="font-bold text-slate-600 underline decoration-blue-200">Julia</span>
          </p>
          <p className="mt-2 text-[10px] text-slate-300 uppercase tracking-[0.2em]">TaskFlow Project // 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default App;