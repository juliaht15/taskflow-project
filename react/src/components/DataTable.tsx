interface Column<T> {
  key: keyof T;
  label: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T>({ data, columns }: Props<T>) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="px-6 py-4">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
            {columns.map((col) => (
              <td key={String(col.key)} className="px-6 py-4 text-slate-600">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}