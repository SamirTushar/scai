import { Info } from "lucide-react";
import { ColumnDef } from "../../config/modules";

interface Props {
  row: Record<string, unknown>;
  index: number;
  columns: ColumnDef[];
  idField: string;
  statusField: string;
  isSelected: boolean;
  hasUseCase: boolean;
  onToggle: () => void;
  onOpenDrawer: () => void;
}

const statusBorderColor: Record<string, string> = {
  pending: "#F59E0B",
  approved: "#10B981",
  rejected: "#EF4444",
};

function formatCell(value: unknown, format?: string): string {
  if (value == null) return "—";
  switch (format) {
    case "currency":
      return `€${Number(value).toFixed(2)}`;
    case "number":
      return Number(value).toLocaleString();
    case "boolean":
      return value ? "Yes" : "No";
    case "percent":
      return String(value);
    case "date":
      return String(value);
    default:
      return String(value);
  }
}

export default function TableRow({
  row,
  index,
  columns,
  statusField,
  isSelected,
  hasUseCase,
  onToggle,
  onOpenDrawer,
}: Props) {
  const status = String(row[statusField] || "pending");

  return (
    <tr
      className={`border-b border-table-border hover:bg-table-hover transition-colors ${
        index % 2 === 1 ? "bg-gray-50/40" : ""
      } ${isSelected ? "bg-blue-50/40" : ""} ${status === "rejected" ? "bg-red-50/30" : ""}`}
      style={{ borderLeft: `4px solid ${statusBorderColor[status] || "#F59E0B"}` }}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4 rounded border-gray-300 accent-accent cursor-pointer"
        />
      </td>
      <td className="px-3 py-3">
        <button
          onClick={onOpenDrawer}
          className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
            hasUseCase ? "text-accent" : "text-text-secondary"
          }`}
          title={hasUseCase ? "View detailed insights" : "Standard — no special conditions"}
        >
          <Info size={18} />
        </button>
      </td>
      {columns.map((col, colIdx) => {
        const value = row[col.key];
        const formatted = formatCell(value, col.format);
        const isFirstCol = colIdx === 0;
        return (
          <td
            key={col.key}
            className={`px-4 py-3 whitespace-nowrap ${
              col.align === "right" ? "text-right tabular-nums" : ""
            } ${isFirstCol ? "font-mono text-[13px]" : ""} ${
              status === "rejected" && col.key.includes("qty") ? "line-through text-red-400" : ""
            }`}
          >
            {formatted}
          </td>
        );
      })}
    </tr>
  );
}
