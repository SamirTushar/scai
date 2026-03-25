import { UseCaseData } from "../../types";
import DrawerTable from "./DrawerTable";

interface Props {
  data: UseCaseData;
}

export default function TabInputs({ data }: Props) {
  return (
    <div className="space-y-8">
      <h3 className="text-[14px] font-semibold text-text-primary mb-6">
        What the System Saw
      </h3>
      {data.inputs.sections.map((section) => (
        <div key={section.title} className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-accent rounded-full" />
            <h4 className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">
              {section.title}
            </h4>
          </div>
          <DrawerTable columns={section.columns} rows={section.rows} />
        </div>
      ))}
    </div>
  );
}
