import { ArrowUp, ArrowDown } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { PlanRow } from "../../types";

interface Props {
  visibleIds: string[];
}

const columns: { key: keyof PlanRow; label: string; width?: string }[] = [
  { key: "stoId", label: "STO ID", width: "240px" },
  { key: "productName", label: "Product Name", width: "220px" },
  { key: "skuCode", label: "SKU CODE", width: "110px" },
  { key: "startNode", label: "Start Node", width: "130px" },
  { key: "locationEnd", label: "Location End", width: "130px" },
  { key: "manuallyCreated", label: "Manually Created", width: "130px" },
  { key: "demandForecast", label: "Demand Forecast", width: "140px" },
  { key: "projectedSales", label: "Projected Sales", width: "130px" },
  { key: "plannedReplenishmentQty", label: "Planned Qty", width: "110px" },
  { key: "variableCost", label: "Variable Cost", width: "120px" },
  { key: "leadTime", label: "Lead Time", width: "100px" },
  { key: "division", label: "Division", width: "110px" },
];

export { columns };

export default function TableHeader({ visibleIds }: Props) {
  const { state, dispatch } = useAppContext();

  const allSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => state.selectedRowIds.has(id));

  return (
    <thead>
      <tr className="bg-accent-subtle border-b border-accent-medium/30">
        <th className="w-12 px-4 py-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() =>
              dispatch({ type: "TOGGLE_ALL", ids: visibleIds })
            }
            className="w-4 h-4 rounded border-gray-300 accent-accent cursor-pointer"
          />
        </th>
        <th className="w-12 px-3 py-3 text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider text-left">
          Info
        </th>
        {columns.map((col) => (
          <th
            key={col.key}
            className="px-4 py-3 text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider text-left cursor-pointer hover:bg-accent-light select-none whitespace-nowrap"
            style={{ minWidth: col.width }}
            onClick={() =>
              dispatch({ type: "SET_SORT", column: col.key })
            }
          >
            <div className="flex items-center gap-1.5">
              {col.label}
              {state.sortColumn === col.key && (
                state.sortDirection === "asc" ? (
                  <ArrowUp size={13} />
                ) : (
                  <ArrowDown size={13} />
                )
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
