// src/App.tsx
import { DataTable } from './components/DataTable';

interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

function App() {
  const misTareas: Tarea[] = [
    { id: 1, titulo: 'Aprender Genéricos en TS', prioridad: 'Alta' },
    { id: 2, titulo: 'Configurar PostCSS v4', prioridad: 'Media' },
    { id: 3, titulo: 'Implementar DataTable Genérica', prioridad: 'Baja' },
    { id: 4, titulo: 'Añadir Estilos Profesionales', prioridad: 'Alta' },
  ];

  const columnas: { key: keyof Tarea; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Descripción de la Tarea' },
    { key: 'prioridad', label: 'Urgencia' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Cabecera Sobria e Impecable */}
        <header className="mb-14 pb-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-slate-950">
              <span className="text-blue-600">TaskFlow</span> Architect
            </h1>
            <p className="mt-2 text-slate-600 font-medium">
              Desarrollo Frontend Estricto & Tipado Genérico
            </p>
          </div>
           <div className="flex gap-2">
             <span className="bg-white text-slate-900 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-slate-200 shadow-inner">v4.1.2</span>
             <span className="bg-blue-50 text-blue-700 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-blue-100">FULL_TS</span>
           </div>
        </header>

        {/* Contenedor Principal (Tarjeta Elegante) */}
        <main className="bg-white rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-950">
               Panel de Control
            </h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md hover:shadow-blue-200">
                + Nueva Entrada
            </button>
          </div>
          
          <DataTable data={misTareas} columns={columnas} />
        </main>

        {/* Footer Minimalista con Firma Discreta */}
        <footer className="mt-16 pt-10 border-t border-slate-100 text-center">
          <div className="space-y-3">
            {/* Firma Julia (Elegante y Sutil) */}
            <p className="text-[13px] font-medium text-slate-400">
              Desarrollado por <span className="font-semibold text-slate-500">Julia</span> • <span className="text-slate-400">TaskFlow Project</span>
            </p>
            
            {/* Cita Inspiradora (Sutil) */}
            <p className="text-xs italic text-slate-400 max-w-lg mx-auto leading-relaxed">
              "La arquitectura es la base de la escalabilidad, la belleza de la simplicidad y la fuerza de la estructura."
            </p>
          </div>

          <div className="mt-10 flex gap-4 justify-center">
             <span className="text-[10px] font-medium text-slate-400 border border-slate-100 px-3 py-1 rounded-full bg-white">React 19</span>
             <span className="text-[10px] font-medium text-slate-400 border border-slate-100 px-3 py-1 rounded-full bg-white">TypeScript 5.x</span>
             <span className="text-[10px] font-medium text-slate-400 border border-slate-100 px-3 py-1 rounded-full bg-white">Tailwind v4</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;