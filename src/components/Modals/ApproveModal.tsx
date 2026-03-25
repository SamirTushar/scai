import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Modal from "./Modal";

export default function ApproveModal() {
  const { state, dispatch } = useAppContext();
  const [bulkApprove, setBulkApprove] = useState(false);

  const row = state.approveModalRowId
    ? state.rmRows.find((r) => r.po_id === state.approveModalRowId)
    : null;

  if (!row) return null;

  // Find all POs for same SKU
  const skuPOs = state.rmRows.filter(
    (r) => r.sku_code === row.sku_code && r.approval_status === "pending"
  );

  const handleConfirm = () => {
    const ids = bulkApprove
      ? skuPOs.map((r) => r.po_id)
      : [row.po_id];
    dispatch({ type: "RM_UPDATE_ROW_STATUS", ids, status: "approved" });
  };

  return (
    <Modal
      open={state.approveModalOpen}
      onClose={() => dispatch({ type: "RM_CLOSE_APPROVE_MODAL" })}
      title="Approve Purchase Order"
    >
      <div className="space-y-5">
        <p className="text-[14px] text-text-secondary">
          Approve <span className="font-semibold text-text-primary">{row.po_id}</span>?
          This will send the purchase order to the supplier.
        </p>

        <div className="bg-gray-50 rounded-lg px-4 py-3 text-[13px]">
          <div className="flex justify-between mb-1">
            <span className="text-text-secondary">SKU</span>
            <span className="font-medium">{row.sku} ({row.sku_code})</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-text-secondary">Supplier</span>
            <span className="font-medium">{row.supplier}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-text-secondary">Qty</span>
            <span className="font-medium">{row.planned_qty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Total</span>
            <span className="font-medium">€{row.total_cost.toFixed(2)}</span>
          </div>
        </div>

        {skuPOs.length > 1 && (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bulkApprove}
              onChange={(e) => setBulkApprove(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-emerald-600"
            />
            <span className="text-[13px] text-text-secondary">
              Approve all {skuPOs.length} POs for <span className="font-medium">{row.sku_code}</span>
            </span>
          </label>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleConfirm}
            className="flex-1 px-5 py-2.5 text-[13px] font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {bulkApprove ? `Approve All ${skuPOs.length} POs` : "Approve This PO"}
          </button>
          <button
            onClick={() => dispatch({ type: "RM_CLOSE_APPROVE_MODAL" })}
            className="px-5 py-2.5 text-[13px] font-semibold text-text-secondary border border-card-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
