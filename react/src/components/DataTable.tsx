import type { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const renderCell = (row: T, column: Column<T>): ReactNode => {
    if (column.render) return column.render(row);
    
    const value = (row as Record<string, unknown>)[String(column.key)];
    if (typeof value === 'object' && value !== null) return value as ReactNode;
    
    return String(value);
  };

  if (data.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-slate-400 italic">
        No hay tareas disponibles...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-separate border-spacing-0">
        <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0">
          <tr>
            {columns.map(col => (
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
          {data.map((row, index) => (
            <tr key={index} className="group hover:bg-blue-50/40 transition-all duration-200">
              {columns.map(col => (
                <td key={String(col.key)} className="px-6 py-4 text-slate-600 font-medium">
                  {renderCell(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}