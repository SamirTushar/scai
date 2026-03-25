import { ArrowUp, ArrowDown } from "lucide-react";
import { ColumnDef } from "../../config/modules";

interface Props {
  columns: ColumnDef[];
  visibleIds: string[];
  selectedRowIds: Set<string>;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  onToggleAll: (ids: string[]) => void;
}

export default function TableHeader({
  columns,
  visibleIds,
  selectedRowIds,
  sortColumn,
  sortDirection,
  onSort,
  onToggleAll,
}: Props) {
  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedRowIds.has(id));

  return (
    <thead>
      <tr className="bg-accent-subtle border-b border-accent-medium/30">
        <th className="w-10 px-3 py-3.5 text-center">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => onToggleAll(visibleIds)}
            className="w-3.5 h-3.5 rounded border-gray-300 accent-accent cursor-pointer"
          />
        </th>
        <th className="w-10 px-2 py-3.5 text-[11px] font-semibold text-text-primary/60 uppercase tracking-wider text-center">
          Info
        </th>
        {columns.map((col) => (
          <th
            key={col.key}
            className={`px-3 py-3.5 text-[11px] font-semibold text-text-primary/60 uppercase tracking-wider cursor-pointer hover:bg-accent-light select-none whitespace-nowrap ${
              col.align === "right" ? "text-right" : "text-left"
            }`}
            style={{ minWidth: col.width }}
            onClick={() => onSort(col.key)}
          >
            <div className={`flex items-center gap-1 ${col.align === "right" ? "justify-end" : ""}`}>
              {col.label}
              {sortColumn === col.key && (
                sortDirection === "asc" ? (
                  <ArrowUp size={12} />
                ) : (
                  <ArrowDown size={12} />
                )
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
