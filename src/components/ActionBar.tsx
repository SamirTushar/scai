import {
  Info,
  Check,
  X,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Download,
  Columns3,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function ActionBar() {
  const { state, dispatch } = useAppContext();
  const hasSelection = state.selectedRowIds.size > 0;

  return (
    <div className="flex items-center justify-between px-8 py-3">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-[13px] text-text-secondary border border-card-border rounded-lg hover:bg-gray-50 font-medium">
          <Columns3 size={15} />
          LABEL_MANAGE_COLU...
        </button>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="p-2.5 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100">
          <Info size={18} />
        </button>
        <button
          onClick={() => {
            if (hasSelection) {
              dispatch({
                type: "UPDATE_ROW_STATUS",
                ids: Array.from(state.selectedRowIds),
                status: "approved",
              });
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-medium border rounded-lg transition-colors ${
            hasSelection
              ? "border-status-approved text-status-approved hover:bg-badge-green-bg"
              : "border-card-border text-text-secondary opacity-50 cursor-not-allowed"
          }`}
        >
          <Check size={15} />
          Approve
        </button>
        <button
          onClick={() => {
            if (hasSelection) {
              dispatch({
                type: "UPDATE_ROW_STATUS",
                ids: Array.from(state.selectedRowIds),
                status: "rejected",
              });
            }
          }}
          className={`flex items-center gap-2 px-4 py-2 text-[13px] font-medium border rounded-lg transition-colors ${
            hasSelection
              ? "border-status-rejected text-status-rejected hover:bg-badge-red-bg"
              : "border-card-border text-text-secondary opacity-50 cursor-not-allowed"
          }`}
        >
          <X size={15} />
          Reject
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <Pencil size={15} />
          Edit
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <Plus size={15} />
          Add
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <RefreshCw size={15} />
          Replan
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <Save size={15} />
          Save
        </button>
        <div className="w-px h-7 bg-card-border mx-1" />
        <button className="p-2.5 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100">
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}
