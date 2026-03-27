import { useState } from 'react';
import { DataTable } from './components/DataTable';

interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: 'Configurar Arquitectura TS', prioridad: 'Alta' },
    { id: 2, titulo: 'Desplegar en Vercel', prioridad: 'Media' },
  ]);
  const [input, setInput] = useState('');

  const agregar = () => {
    if (!input.trim()) return;
    const nueva: Tarea = { id: Date.now(), titulo: input, prioridad: 'Baja' };
    setTareas([...tareas, nueva]);
    setInput('');
  };

  const columnas: { key: keyof Tarea; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Tarea' },
    { key: 'prioridad', label: 'Estado' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 border-b pb-4 flex justify-between items-end">
          <h1 className="text-2xl font-black tracking-tight text-indigo-600">TASKFLOW</h1>
          <p className="text-xs font-bold text-slate-400 underline underline-offset-4">JULIA PROJECT</p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 ring-indigo-100 outline-none transition-all"
              placeholder="Escribe una nueva tarea..."
            />
            <button onClick={agregar} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              Añadir
            </button>
          </div>
        </section>

        <main className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <DataTable data={tareas} columns={columnas} />
        </main>
      </div>
    </div>
  );
}