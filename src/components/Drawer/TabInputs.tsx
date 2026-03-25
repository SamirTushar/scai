import { UseCaseData } from "../../types";
import DrawerTable from "./DrawerTable";

interface Props {
  data: UseCaseData;
}

export default function TabInputs({ data }: Props) {
  return (
    <div className="space-y-10">
      <h3 className="text-[15px] font-semibold text-text-primary">
        What the System Saw
      </h3>
      {data.inputs.sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-accent rounded-full" />
            <h4 className="text-[13px] font-semibold text-text-primary tracking-wide">
              {section.title}
            </h4>
          </div>
          <DrawerTable columns={section.columns} rows={section.rows} />
        </div>
      ))}
    </div>
  );
}
