import { type ReactNode } from 'react';
import type { Column } from '../types';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const renderCell = (row: T, column: Column<T>): ReactNode => {
    if (column.render) return column.render(row);
    const value = (row as Record<string, unknown>)[String(column.key)];
    return typeof value === 'object' && value !== null ? (value as ReactNode) : String(value);
  };

  if (data.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="text-4xl mb-4 opacity-20">📁</div>
        <p className="text-slate-400 italic font-medium">No hay registros disponibles</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-separate border-spacing-0">
        <thead className="bg-slate-50/80 backdrop-blur-md sticky top-0 z-10">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-6 py-4 text-slate-400 font-black uppercase text-[10px] tracking-[0.15em] border-b border-slate-100">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {data.map((row, index) => (
            <tr key={(row as any).id || index} className="group hover:bg-indigo-50/30 transition-all duration-200">
              {columns.map(col => (
                <td key={String(col.key)} className="px-6 py-4 text-slate-600">
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