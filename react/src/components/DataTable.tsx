import { Task, Column } from '../types'; //
import { Card } from './ui/Card';

interface DataTableProps {
  data: Task[];
  columns: Column[];
  loading?: boolean;
}

export const DataTable = ({ data, columns, loading = false }: DataTableProps) => {
  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando datos...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>;
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th key={col.key} className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};