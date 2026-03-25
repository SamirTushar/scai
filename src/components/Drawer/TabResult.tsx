import { UseCaseData } from "../../types";
import DrawerTable from "./DrawerTable";

interface Props {
  data: UseCaseData;
}

export default function TabResult({ data }: Props) {
  const { result } = data;

  const stoColumns = [
    { key: "stoId", label: "STO ID" },
    { key: "sku", label: "SKU" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
    { key: "qty", label: "Qty" },
    { key: "dispatch", label: "Dispatch" },
    { key: "delivery", label: "Delivery" },
    { key: "cost", label: "Cost" },
  ];

  const postPlanColumns = [
    { key: "dc", label: "Node" },
    { key: "newAvailable", label: "New Available" },
    { key: "vsSS", label: "vs Safety Stock" },
    { key: "impact", label: "Impact" },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-[15px] font-semibold text-text-primary">
        Result
      </h3>

      {/* Generated STOs */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          STO(s) Generated
        </h4>
        <DrawerTable
          columns={stoColumns}
          rows={result.stos.map((s) => ({ ...s, qty: s.qty }))}
        />
      </div>

      {/* Post-Plan State */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          Post-Plan State
        </h4>
        <DrawerTable columns={postPlanColumns} rows={result.postPlan} />
      </div>

      {/* Network Fill Rate */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-5">
        <p className="text-[13px] text-emerald-600 font-medium mb-2">Network Fill Rate</p>
        <p className="text-[22px] font-bold text-emerald-700">
          {result.networkFillRate}
        </p>
      </div>
    </div>
  );
}
