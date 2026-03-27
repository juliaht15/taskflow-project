// src/App.tsx
import { DataTable } from './components/DataTable';

// Definimos una interfaz de ejemplo (Tareas)
interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

function App() {
  const misTareas: Tarea[] = [
    { id: 1, titulo: 'Aprender Genéricos', prioridad: 'Alta' },
    { id: 2, titulo: 'Configurar tsconfig', prioridad: 'Media' },
    { id: 3, titulo: 'Hacer el desplegable', prioridad: 'Baja' },
    { id: 4, titulo: 'Prueba de Reactividad', prioridad: 'Alta' },
  ];

  // Definimos qué columnas queremos ver de la Tarea
  const columnasTareas = [
    { key: 'id' as const, header: 'ID' },
    { key: 'titulo' as const, header: 'Nombre de la Tarea' },
    { key: 'prioridad' as const, header: 'Urgencia' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🚀 TaskFlow Pro + TS</h1>
        <p className="text-gray-600">Componentes fuertemente tipados con React</p>
      </header>

      <main>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Mis Tareas (Tabla Genérica)</h2>
        <DataTable data={misTareas} columns={columnasTareas} />
      </main>
    </div>
  );
}

export default App;