import { ProcurementUseCaseData } from "../../types/procurement";
import DrawerTable from "./DrawerTable";

interface Props {
  data: ProcurementUseCaseData;
}

export default function RMTabInputs({ data }: Props) {
  return (
    <div className="space-y-8">
      <h3 className="text-[14px] font-semibold text-text-primary mb-6">
        What the System Saw
      </h3>
      {data.inputs.sections.map((section) => (
        <div key={section.title} className="mb-4">
          <h4 className="text-[12px] font-semibold text-text-secondary mb-4 uppercase tracking-wider">
            {section.title}
          </h4>
          <DrawerTable
            columns={section.columns}
            rows={section.rows}
            highlightRow={(row) => {
              if (row.dc === "Total") return "bg-gray-100 font-semibold";
              return undefined;
            }}
          />
        </div>
      ))}
    </div>
  );
}
