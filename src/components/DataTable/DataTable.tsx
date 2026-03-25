import { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import { useActiveModule } from "../../hooks/useActiveModule";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

export default function DataTable() {
  const { dispatch } = useAppContext();
  const am = useActiveModule();
  const { rows, sortColumn, sortDirection, currentPage, pageSize, config } = am;

  const sortedRows = useMemo(() => {
    if (!sortColumn) return rows;
    return [...rows].sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [rows, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const start = currentPage * pageSize;
  const paginatedRows = sortedRows.slice(start, start + pageSize);
  const idField = config.idField;

  return (
    <div className="px-8 pb-8">
      <div className="bg-white rounded-xl border border-card-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[14px]">
            <TableHeader
              columns={config.tableColumns}
              visibleIds={paginatedRows.map((r: Record<string, unknown>) => String(r[idField]))}
              selectedRowIds={am.selectedRowIds}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={(col) => dispatch({ type: am.actions.setSort, column: col } as never)}
              onToggleAll={(ids) => dispatch({ type: am.actions.toggleAll, ids } as never)}
            />
            <tbody>
              {paginatedRows.map((row: Record<string, unknown>, i: number) => (
                <TableRow
                  key={String(row[idField])}
                  row={row}
                  index={i}
                  columns={config.tableColumns}
                  idField={idField}
                  statusField={config.statusField}
                  isSelected={am.selectedRowIds.has(String(row[idField]))}
                  hasUseCase={am.module === "replenishment" ? !!(row as Record<string, unknown>).useCaseId : !!(row as Record<string, unknown>).use_case}
                  onToggle={() => dispatch({ type: am.actions.toggleRow, id: String(row[idField]) } as never)}
                  onOpenDrawer={() => dispatch({ type: am.actions.openDrawer, rowId: String(row[idField]) } as never)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
