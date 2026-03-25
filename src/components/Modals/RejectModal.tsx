import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Modal from "./Modal";

const rejectReasons = [
  "Supplier quality concern",
  "Price negotiation in progress",
  "Demand forecast changed",
  "Prefer alternate supplier",
  "Other",
];

export default function RejectModal() {
  const { state, dispatch } = useAppContext();
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const row = state.rejectModalRowId
    ? state.rmRows.find((r) => r.po_id === state.rejectModalRowId)
    : null;

  if (!row) return null;

  const handleConfirm = () => {
    dispatch({
      type: "RM_UPDATE_ROW_STATUS",
      ids: [row.po_id],
      status: "rejected",
    });
    setReason("");
    setNotes("");
  };

  return (
    <Modal
      open={state.rejectModalOpen}
      onClose={() => {
        dispatch({ type: "RM_CLOSE_REJECT_MODAL" });
        setReason("");
        setNotes("");
      }}
      title="Reject Purchase Order"
    >
      <div className="space-y-5">
        <p className="text-[14px] text-text-secondary">
          Reject <span className="font-semibold text-text-primary">{row.po_id}</span>?
        </p>

        {/* Gap Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-[13px] text-red-700">
            <span className="font-bold">⚠️ Impact:</span> Rejecting this PO creates a{" "}
            <span className="font-bold">{row.planned_qty}-unit gap</span> at{" "}
            <span className="font-bold">{row.destination_dc}</span>.
          </p>
        </div>

        {/* Reason */}
        <div>
          <label className="text-[13px] font-medium text-text-primary mb-2 block">
            Rejection Reason <span className="text-red-500">*</span>
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400"
          >
            <option value="">Select a reason...</option>
            {rejectReasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Free text */}
        {reason === "Other" && (
          <div>
            <label className="text-[13px] font-medium text-text-primary mb-2 block">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide additional details..."
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 resize-none"
            />
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleConfirm}
            disabled={!reason}
            className="flex-1 px-5 py-2.5 text-[13px] font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Reject PO
          </button>
          <button
            onClick={() => {
              dispatch({ type: "RM_CLOSE_REJECT_MODAL" });
              setReason("");
              setNotes("");
            }}
            className="px-5 py-2.5 text-[13px] font-semibold text-text-secondary border border-card-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
