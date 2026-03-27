interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-separate border-spacing-0">
        <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0">
          <tr>
            {columns.map((col) => (
              <th 
                key={String(col.key)} 
                className="px-6 py-4 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100"
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
                    className="px-6 py-4 text-slate-600 font-medium group-hover:text-blue-700"
                  >
                    {String(row[col.key])}
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