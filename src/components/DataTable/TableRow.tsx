import { Info } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { PlanRow } from "../../types";

interface Props {
  row: PlanRow;
  index: number;
}

const statusBorderColor: Record<string, string> = {
  pending: "#F59E0B",
  approved: "#10B981",
  rejected: "#EF4444",
};

export default function TableRow({ row, index }: Props) {
  const { state, dispatch } = useAppContext();
  const isSelected = state.selectedRowIds.has(row.stoId);

  return (
    <tr
      className={`border-b border-table-border hover:bg-table-hover transition-colors ${
        index % 2 === 1 ? "bg-gray-50/40" : ""
      } ${isSelected ? "bg-blue-50/40" : ""}`}
      style={{ borderLeft: `4px solid ${statusBorderColor[row.status]}` }}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => dispatch({ type: "TOGGLE_ROW", id: row.stoId })}
          className="w-4 h-4 rounded border-gray-300 accent-accent cursor-pointer"
        />
      </td>
      <td className="px-3 py-3">
        <button
          onClick={() => dispatch({ type: "OPEN_DRAWER", rowId: row.stoId })}
          className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
            row.useCaseId ? "text-accent" : "text-text-secondary"
          }`}
          title={row.useCaseId ? "View detailed insights" : "Standard replenishment"}
        >
          <Info size={18} />
        </button>
      </td>
      <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap">
        {row.stoId}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{row.productName}</td>
      <td className="px-4 py-3 font-mono text-[13px]">{row.skuCode}</td>
      <td className="px-4 py-3 whitespace-nowrap">{row.startNode}</td>
      <td className="px-4 py-3 whitespace-nowrap">{row.locationEnd}</td>
      <td className="px-4 py-3">{row.manuallyCreated ? "Yes" : "No"}</td>
      <td className="px-4 py-3 text-right tabular-nums">
        {row.demandForecast != null ? row.demandForecast.toLocaleString() : "—"}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        {row.projectedSales.toLocaleString()}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        {row.plannedReplenishmentQty.toLocaleString()}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        €{row.variableCost.toFixed(2)}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">{row.leadTime}</td>
      <td className="px-4 py-3">{row.division}</td>
    </tr>
  );
}
