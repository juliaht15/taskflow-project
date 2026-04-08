import type { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | string; // ← Cambiado: ahora acepta string también
  label: string;
  render?: (item: T) => ReactNode; // ← Añadido: para contenido personalizado
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  
  const renderCellContent = (row: T, column: Column<T>): ReactNode => {
    // Si hay una función render personalizada, la usamos
    if (column.render) {
      return column.render(row);
    }

    // Si no, obtenemos el valor normal
    const value = (row as Record<string, any>)[String(column.key)];
    
    // Si es un objeto de React (botones, spans), lo devolvemos
    if (typeof value === 'object' && value !== null) {
      return value as ReactNode;
    }

    const valStr = String(value);

    // Prioridades con colores
    if (String(column.key).toLowerCase() === 'prioridad' || String(column.key).toLowerCase() === 'priority') {
      const colors: Record<string, string> = {
        alta: "bg-red-100 text-red-700 border-red-200",
        media: "bg-amber-100 text-amber-700 border-amber-200",
        baja: "bg-emerald-100 text-emerald-700 border-emerald-200",
      };
      const style = colors[valStr.toLowerCase()] || "bg-slate-100 text-slate-600";
      return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${style}`}>
          {valStr.toUpperCase()}
        </span>
      );
    }

    return valStr;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-separate border-spacing-0">
        <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0">
          <tr>
            {columns.map((col) => (
              <th 
                key={String(col.key)} 
                className="px-6 py-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="group hover:bg-blue-50/40 transition-all duration-200">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4 text-slate-600 font-medium">
                    {renderCellContent(row, col)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400 italic">
                No hay tareas disponibles...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}