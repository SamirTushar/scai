import { ProcurementUseCaseData } from "../../types/procurement";
import DrawerTable from "./DrawerTable";

interface Props {
  data: ProcurementUseCaseData;
}

export default function RMTabInputs({ data }: Props) {
  return (
    <div className="space-y-8">
      <h3 className="text-[15px] font-semibold text-text-primary">
        What the System Saw
      </h3>
      {data.inputs.sections.map((section) => (
        <div key={section.title}>
          <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
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
