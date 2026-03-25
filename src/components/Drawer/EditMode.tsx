import { useAppContext } from "../../context/AppContext";
import { ProcurementRow } from "../../types/procurement";
import ImpactPreview from "./ImpactPreview";

const qualifiedSuppliers = ["Brembo", "TRW", "Ferodo"];
const dcOptions = ["Berlin DC", "Szczecin DC", "Ghent DC", "Cheb DC"];
const transportModes = ["Road", "Express", "Rail"];

export default function EditMode() {
  const { state, dispatch } = useAppContext();
  const form = state.editFormData;
  const original = form?.po_id
    ? state.rmRows.find((r) => r.po_id === form.po_id)
    : null;

  if (!form || !original) return null;

  const isModified = (field: keyof ProcurementRow) =>
    form[field] !== undefined && form[field] !== original[field];

  const updateField = (field: string, value: string | number) => {
    dispatch({ type: "RM_UPDATE_EDIT_FIELD", field, value });
  };

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      <h3 className="text-[15px] font-semibold text-text-primary mb-6">
        Edit & Replan — {form.po_id}
      </h3>

      <div className="space-y-5">
        {/* Planned Qty */}
        <FieldRow
          label="Planned Qty"
          modified={isModified("planned_qty")}
        >
          <input
            type="number"
            value={form.planned_qty ?? ""}
            onChange={(e) => updateField("planned_qty", Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-blue-50/30"
          />
        </FieldRow>

        {/* Supplier */}
        <FieldRow
          label="Supplier"
          modified={isModified("supplier")}
        >
          <select
            value={form.supplier ?? ""}
            onChange={(e) => updateField("supplier", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-blue-50/30"
          >
            {qualifiedSuppliers.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FieldRow>

        {/* Destination DC */}
        <FieldRow
          label="Destination DC"
          modified={isModified("destination_dc")}
        >
          <select
            value={form.destination_dc ?? ""}
            onChange={(e) => updateField("destination_dc", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-blue-50/30"
          >
            {dcOptions.map((dc) => (
              <option key={dc} value={dc}>{dc}</option>
            ))}
          </select>
        </FieldRow>

        {/* Expected Delivery */}
        <FieldRow
          label="Expected Delivery"
          modified={isModified("expected_delivery")}
        >
          <input
            type="date"
            value={form.expected_delivery ?? ""}
            onChange={(e) => updateField("expected_delivery", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-blue-50/30"
          />
        </FieldRow>

        {/* Transport Mode */}
        <FieldRow
          label="Transport Mode"
          modified={isModified("transport_mode")}
        >
          <select
            value={form.transport_mode ?? ""}
            onChange={(e) => updateField("transport_mode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-blue-50/30"
          >
            {transportModes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </FieldRow>

        {/* Read-only fields */}
        <div className="border-t border-gray-200 pt-5 mt-6">
          <p className="text-[12px] text-text-secondary font-medium uppercase tracking-wider mb-3">Read-Only</p>
          <div className="grid grid-cols-3 gap-4">
            <ReadOnlyField label="Unit Cost" value={`€${original.unit_cost.toFixed(2)}`} />
            <ReadOnlyField label="MOQ" value={String(original.moq)} />
            <ReadOnlyField label="Lead Time" value={original.lead_time} />
          </div>
        </div>
      </div>

      {/* Impact Preview */}
      <div className="mt-8">
        <ImpactPreview original={original} edited={form} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => dispatch({ type: "RM_SAVE_EDIT" })}
          className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save & Replan
        </button>
        <button
          onClick={() => dispatch({ type: "RM_CANCEL_EDIT" })}
          className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-semibold text-text-secondary border border-card-border rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function FieldRow({
  label,
  modified,
  children,
}: {
  label: string;
  modified: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${modified ? "border-l-4 border-l-blue-500 border-blue-200 bg-blue-50/20" : "border-gray-200"}`}>
      <div className="w-40 shrink-0">
        <span className="text-[13px] font-medium text-text-primary">{label}</span>
        {modified && (
          <span className="ml-2 text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">
            Modified
          </span>
        )}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-4 py-3">
      <p className="text-[11px] text-text-secondary mb-1">{label}</p>
      <p className="text-[14px] font-semibold text-text-primary">{value}</p>
    </div>
  );
}
