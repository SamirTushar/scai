import { ProcurementUseCaseData } from "../../types/procurement";
import DrawerTable from "./DrawerTable";

interface Props {
  data: ProcurementUseCaseData;
}

export default function RMTabConfiguration({ data }: Props) {
  const columns = [
    { key: "rule", label: "Rule" },
    { key: "setting", label: "Setting" },
  ];

  const rows = data.configuration.map((c) => ({
    rule: c.rule,
    setting: c.setting,
  }));

  return (
    <div className="space-y-8">
      <h3 className="text-[15px] font-semibold text-text-primary">
        Rules System Followed
      </h3>
      <DrawerTable columns={columns} rows={rows} />
    </div>
  );
}
