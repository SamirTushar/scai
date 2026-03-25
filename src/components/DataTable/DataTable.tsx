import { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import { PlanRow } from "../../types";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

export default function DataTable() {
  const { state } = useAppContext();

  const sortedRows = useMemo(() => {
    if (!state.sortColumn) return state.rows;
    return [...state.rows].sort((a, b) => {
      const aVal = a[state.sortColumn as keyof PlanRow];
      const bVal = b[state.sortColumn as keyof PlanRow];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return state.sortDirection === "asc" ? cmp : -cmp;
    });
  }, [state.rows, state.sortColumn, state.sortDirection]);

  const totalPages = Math.ceil(sortedRows.length / state.pageSize);
  const start = state.currentPage * state.pageSize;
  const paginatedRows = sortedRows.slice(start, start + state.pageSize);

  return (
    <div className="px-8 pb-8">
      <div className="bg-white rounded-xl border border-card-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <TableHeader visibleIds={paginatedRows.map((r) => r.stoId)} />
            <tbody>
              {paginatedRows.map((row, i) => (
                <TableRow key={row.stoId} row={row} index={i} />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalRows={sortedRows.length}
          totalPages={totalPages}
          start={start}
          pageSize={state.pageSize}
        />
      </div>
    </div>
  );
}
