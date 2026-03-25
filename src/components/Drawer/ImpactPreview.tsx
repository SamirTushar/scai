import { ProcurementRow } from "../../types/procurement";

interface Props {
  original: ProcurementRow;
  edited: Partial<ProcurementRow>;
}

export default function ImpactPreview({ original, edited }: Props) {
  const newQty = Number(edited.planned_qty ?? original.planned_qty);
  const origQty = original.planned_qty;
  const qtyChanged = newQty !== origQty;

  const origTotal = original.total_cost;
  const newTotal = newQty * original.landed_cost;
  const costDelta = newTotal - origTotal;

  const supplierChanged = edited.supplier && edited.supplier !== original.supplier;

  // Determine warning level
  const warnings: string[] = [];
  if (qtyChanged && newQty < origQty) {
    const gap = origQty - newQty;
    warnings.push(`${gap} unit gap at ${edited.destination_dc || original.destination_dc}`);
  }
  if (supplierChanged) {
    warnings.push(`Supplier changed to ${edited.supplier} — SoB may shift`);
  }

  const hasChanges = qtyChanged || supplierChanged || (edited.transport_mode && edited.transport_mode !== original.transport_mode);

  if (!hasChanges) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
        <p className="text-[13px] text-text-secondary">No changes detected. Modify fields above to see impact.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl px-5 py-4 border-l-4 ${
      warnings.length > 0 ? "bg-amber-50 border-amber-400 border border-amber-200" : "bg-gray-50 border-blue-400 border border-gray-200"
    }`}>
      <h4 className="text-[13px] font-bold text-text-primary mb-4 uppercase tracking-wider">
        Impact Preview
      </h4>

      <div className="space-y-3">
        {/* Cost Impact */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-text-secondary">Original Total Cost</span>
          <span className="font-mono font-medium">€{origTotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-text-secondary">New Total Cost</span>
          <span className={`font-mono font-bold ${costDelta < 0 ? "text-emerald-600" : costDelta > 0 ? "text-red-600" : "text-text-primary"}`}>
            €{newTotal.toFixed(2)}
            {costDelta !== 0 && (
              <span className="ml-2 text-[12px]">
                ({costDelta > 0 ? "↑" : "↓"} €{Math.abs(costDelta).toFixed(2)})
              </span>
            )}
          </span>
        </div>

        {/* Qty Impact */}
        {qtyChanged && (
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text-secondary">Qty Change</span>
            <span className={`font-mono font-medium ${newQty < origQty ? "text-red-600" : "text-emerald-600"}`}>
              {origQty} → {newQty}
            </span>
          </div>
        )}

        {/* Supplier Change */}
        {supplierChanged && (
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text-secondary">Supplier</span>
            <span className="font-medium text-blue-600">
              {original.supplier} → {edited.supplier}
            </span>
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mt-3 pt-3 border-t border-amber-300">
            {warnings.map((w, i) => (
              <p key={i} className="text-[12px] text-amber-700 flex items-start gap-2">
                <span className="mt-0.5">⚠️</span> {w}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
