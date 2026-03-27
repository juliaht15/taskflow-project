interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  
  // Función interna para dar estilo a las etiquetas de prioridad
  const renderCellContent = (value: any, key: string) => {
    const valStr = String(value);

    // Si la columna es 'prioridad' (o 'priority'), aplicamos colores
    if (key.toLowerCase() === 'prioridad' || key.toLowerCase() === 'priority') {
      const colors: Record<string, string> = {
        alta: "bg-red-100 text-red-700 border-red-200",
        media: "bg-amber-100 text-amber-700 border-amber-200",
        baja: "bg-emerald-100 text-emerald-700 border-emerald-200",
      };
      
      const style = colors[valStr.toLowerCase()] || "bg-slate-100 text-slate-600";
      
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style}`}>
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
              <tr 
                key={rowIndex} 
                className="group hover:bg-blue-50/40 transition-all duration-200"
              >
                {columns.map((col) => (
                  <td 
                    key={String(col.key)} 
                    className="px-6 py-4 text-slate-600 font-medium"
                  >
                    {/* Llamamos a nuestra función mágica de renderizado */}
                    {renderCellContent(row[col.key], String(col.key))}
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