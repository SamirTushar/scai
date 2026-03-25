import { Check, Pencil, X } from "lucide-react";

interface Props {
  row: Record<string, unknown>;
  statusField?: string;
  onApprove: () => void;
  onReject: () => void;
  onEdit: () => void;
}

const statusBadge: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "🟡 Pending Review", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  approved: { label: "✅ Approved", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  rejected: { label: "🔴 Rejected", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

export default function PlannerActions({ row, statusField = "approval_status", onApprove, onReject, onEdit }: Props) {
  const status = String(row[statusField] || "pending");
  const badge = statusBadge[status] || statusBadge.pending;

  return (
    <div className="sticky bottom-0 bg-white border-t border-card-border px-8 py-4 flex items-center justify-between z-10">
      <div className={`inline-flex items-center px-4 py-2 rounded-lg border text-[13px] font-medium ${badge.bg} ${badge.color}`}>
        {badge.label}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onApprove}
          disabled={status !== "pending"}
          className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Check size={16} />
          Approve
        </button>
        <button
          onClick={onEdit}
          disabled={status !== "pending"}
          className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Pencil size={16} />
          Edit & Replan
        </button>
        <button
          onClick={onReject}
          disabled={status !== "pending"}
          className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <X size={16} />
          Reject
        </button>
      </div>
    </div>
  );
}
