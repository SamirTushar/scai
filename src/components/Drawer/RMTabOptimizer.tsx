import { ProcurementUseCaseData } from "../../types/procurement";
import DrawerTable from "./DrawerTable";

interface Props {
  data: ProcurementUseCaseData;
}

export default function RMTabOptimizer({ data }: Props) {
  const { optimizer } = data;

  const optionColumns = [
    { key: "id", label: "#" },
    { key: "allocation", label: "Allocation" },
    { key: "totalCost", label: "Total Cost" },
    { key: "sobCompliance", label: "SoB Compliance" },
    { key: "statusLabel", label: "Status" },
  ];

  const optionRows = optimizer.options.map((opt) => ({
    id: opt.id,
    allocation: opt.allocation,
    totalCost: opt.totalCost,
    sobCompliance: opt.sobCompliance,
    statusLabel: opt.status === "selected" ? "✅ Selected" : `❌ ${opt.reason || "Rejected"}`,
  }));

  return (
    <div className="space-y-8">
      <h3 className="text-[15px] font-semibold text-text-primary">
        What the Engine Did
      </h3>

      {/* Trigger */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
        <p className="text-[13px] text-blue-700 font-medium">
          <span className="font-bold">Trigger:</span> {optimizer.trigger}
        </p>
      </div>

      {/* Options Evaluated */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          Options Evaluated
        </h4>
        <DrawerTable
          columns={optionColumns}
          rows={optionRows}
          highlightRow={(row) => {
            if (String(row.statusLabel).startsWith("✅")) return "bg-emerald-50/80";
            return "opacity-60";
          }}
        />
      </div>

      {/* Why Selected */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
        <h4 className="text-[13px] font-bold text-emerald-700 mb-3">
          Why Option A
        </h4>
        <ul className="space-y-2">
          {optimizer.whySelected.map((reason, i) => (
            <li key={i} className="text-[13px] text-emerald-700 flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Why Not Rejected */}
      {optimizer.whyNotRejected.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <h4 className="text-[13px] font-bold text-red-700 mb-3">
            Why Not Other Options?
          </h4>
          <ul className="space-y-2">
            {optimizer.whyNotRejected.map((item, i) => (
              <li key={i} className="text-[13px] text-red-700 flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>
                  <strong>{item.option}:</strong> {item.reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
