// src/components/DataTable.tsx
// Definimos qué necesita la tabla para funcionar
interface Column<T> {
  key: keyof T; // Esto obliga a que la columna sea una propiedad real del objeto
  header: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

// Usamos <T> para que la tabla sea "comodín"
export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {String(row[col.key])} {/* Convertimos a String para poder pintarlo en pantalla */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}