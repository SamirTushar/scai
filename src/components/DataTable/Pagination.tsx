import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useActiveModule } from "../../hooks/useActiveModule";

interface Props {
  totalPages: number;
}

export default function Pagination({ totalPages }: Props) {
  const { dispatch } = useAppContext();
  const am = useActiveModule();

  const pageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (i === 0 || i === totalPages - 1 || Math.abs(i - am.currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-5 border-t border-table-border">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-[13px] text-text-secondary">
          <span className="font-medium">SHOWING_ROWS</span>
          <select
            value={am.pageSize}
            onChange={(e) =>
              dispatch({ type: am.actions.setPageSize, size: Number(e.target.value) } as never)
            }
            className="border border-card-border rounded-lg px-3 py-1.5 text-[13px] bg-white cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-status-approved" />
            Approved
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-status-rejected" />
            Rejected
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-status-pending" />
            Pending
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => dispatch({ type: am.actions.setPage, page: am.currentPage - 1 } as never)}
          disabled={am.currentPage === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>
        {pageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-[13px] text-text-secondary">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => dispatch({ type: am.actions.setPage, page: p as number } as never)}
              className={`min-w-[32px] h-8 rounded-lg text-[13px] font-medium ${
                am.currentPage === p
                  ? "bg-text-primary text-white"
                  : "text-text-secondary hover:bg-gray-100"
              }`}
            >
              {(p as number) + 1}
            </button>
          )
        )}
        <button
          onClick={() => dispatch({ type: am.actions.setPage, page: am.currentPage + 1 } as never)}
          disabled={am.currentPage >= totalPages - 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
