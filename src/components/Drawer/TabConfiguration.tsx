import { UseCaseData } from "../../types";

interface Props {
  data: UseCaseData;
}

export default function TabConfiguration({ data }: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-[15px] font-semibold text-text-primary">
        Rules the System Followed
      </h3>
      <div className="overflow-x-auto rounded-lg border border-card-border shadow-sm">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-accent-subtle">
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30 w-[220px]">
                Rule
              </th>
              <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30">
                Setting
              </th>
            </tr>
          </thead>
          <tbody>
            {data.configuration.map((rule, i) => (
              <tr
                key={rule.rule}
                className={`border-b border-table-border last:border-b-0 ${
                  i % 2 === 1 ? "bg-gray-50/50" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-text-primary">
                  {rule.rule}
                </td>
                <td className="px-4 py-3 text-text-secondary leading-relaxed">
                  {rule.setting}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
