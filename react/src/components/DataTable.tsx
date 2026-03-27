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
      <table className="min-w-full divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
        <thead className="bg-slate-50/50">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100/50">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-150">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                  {col.key === 'prioridad' ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item[col.key] === 'Alta' 
                        ? 'bg-red-50 text-red-700' : 
                      item[col.key] === 'Media' 
                        ? 'bg-amber-50 text-amber-700' : 
                        'bg-emerald-50 text-emerald-700'
                    }`}>
                      {String(item[col.key])}
                    </span>
                  ) : (
                    String(item[col.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}