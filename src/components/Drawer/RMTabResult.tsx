import { ProcurementUseCaseData } from "../../types/procurement";
import DrawerTable from "./DrawerTable";

interface Props {
  data: ProcurementUseCaseData;
}

export default function RMTabResult({ data }: Props) {
  const { result } = data;

  const poColumns = [
    { key: "poId", label: "PO ID" },
    { key: "supplier", label: "Supplier" },
    { key: "destDC", label: "Dest DC" },
    { key: "qty", label: "Qty" },
    { key: "landedCost", label: "Landed Cost" },
    { key: "total", label: "Total" },
    { key: "delivery", label: "Delivery" },
  ];

  const sobColumns = [
    { key: "supplier", label: "Supplier" },
    { key: "qty", label: "Qty" },
    { key: "actualPercent", label: "Actual %" },
    { key: "targetPercent", label: "Target %" },
    { key: "band", label: "Band" },
    { key: "status", label: "Status" },
  ];

  const postProcColumns = [
    { key: "dc", label: "DC" },
    { key: "currentGIH", label: "Current GIH" },
    { key: "incoming", label: "Incoming" },
    { key: "projected", label: "Projected" },
    { key: "vsSS", label: "vs Safety Stock" },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-[15px] font-semibold text-text-primary">
        Result
      </h3>

      {/* Purchase Orders */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          Purchase Orders Generated
        </h4>
        <DrawerTable columns={poColumns} rows={result.purchaseOrders} />
      </div>

      {/* SoB Compliance */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          Share-of-Business Compliance
        </h4>
        <DrawerTable
          columns={sobColumns}
          rows={result.sobCompliance}
          highlightRow={(row) => {
            if (String(row.status).includes("✅")) return "bg-emerald-50/60";
            return undefined;
          }}
        />
      </div>

      {/* Post-Procurement DC State */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          Post-Procurement DC State
        </h4>
        <DrawerTable
          columns={postProcColumns}
          rows={result.postProcurementState}
          highlightRow={(row) => {
            if (String(row.vsSS).includes("✅")) return "bg-emerald-50/60";
            return undefined;
          }}
        />
      </div>
    </div>
  );
}
