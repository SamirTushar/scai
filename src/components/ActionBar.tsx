import {
  Info, Check, X, Pencil, Plus, RefreshCw, Save, Download, Columns3,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useActiveModule } from "../hooks/useActiveModule";

export default function ActionBar() {
  const { dispatch } = useAppContext();
  const am = useActiveModule();
  const hasSelection = am.selectedRowIds.size > 0;

  const handleApprove = () => {
    if (hasSelection) {
      dispatch({
        type: am.actions.updateRowStatus,
        ids: Array.from(am.selectedRowIds),
        status: "approved",
      } as never);
    }
  };

  const handleReject = () => {
    if (hasSelection) {
      dispatch({
        type: am.actions.updateRowStatus,
        ids: Array.from(am.selectedRowIds),
        status: "rejected",
      } as never);
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 mt-2">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-[12px] text-text-secondary border border-card-border rounded-lg hover:bg-gray-50 font-medium">
          <Columns3 size={14} />
          LABEL_MANAGE_COLU...
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100">
          <Info size={16} />
        </button>

        {/* Approve / Reject group */}
        <button
          onClick={handleApprove}
          className={`flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium border rounded-lg transition-colors ${
            hasSelection
              ? "border-status-approved text-status-approved hover:bg-badge-green-bg"
              : "border-card-border text-text-secondary opacity-50 cursor-not-allowed"
          }`}
        >
          <Check size={14} />
          Approve
        </button>
        <button
          onClick={handleReject}
          className={`flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium border rounded-lg transition-colors ${
            hasSelection
              ? "border-status-rejected text-status-rejected hover:bg-badge-red-bg"
              : "border-card-border text-text-secondary opacity-50 cursor-not-allowed"
          }`}
        >
          <X size={14} />
          Reject
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-card-border mx-1.5" />

        {/* Edit / Add / Replan / Save group */}
        <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <Pencil size={14} />
          Edit
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <Plus size={14} />
          Add
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <RefreshCw size={14} />
          Replan
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-medium text-text-secondary border border-card-border rounded-lg hover:bg-gray-50">
          <Save size={14} />
          Save
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-card-border mx-1.5" />

        <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100">
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
