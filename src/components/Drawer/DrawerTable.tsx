interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  rows: Record<string, string | number>[];
  highlightRow?: (row: Record<string, string | number>) => string | null | undefined;
}

export default function DrawerTable({ columns, rows, highlightRow }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-card-border shadow-sm">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-accent-subtle">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-[11px] font-bold text-text-primary/60 uppercase tracking-wider whitespace-nowrap border-b border-accent-medium/30"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const hl = highlightRow?.(row);
            return (
              <tr
                key={i}
                className={`border-b border-table-border/60 last:border-b-0 transition-colors ${
                  hl
                    ? hl
                    : i % 2 === 1
                    ? "bg-gray-50/30"
                    : "bg-white"
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2.5 whitespace-nowrap text-text-primary">
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
