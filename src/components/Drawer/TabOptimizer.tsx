import { CheckCircle2, XCircle } from "lucide-react";
import { UseCaseData } from "../../types";

interface Props {
  data: UseCaseData;
}

export default function TabOptimizer({ data }: Props) {
  const { optimizer } = data;

  return (
    <div className="space-y-8">
      <h3 className="text-[15px] font-semibold text-text-primary">
        What the Engine Did
      </h3>

      {/* Trigger */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
        <p className="text-[14px] font-medium text-amber-800">
          <span className="font-bold">Trigger:</span> {optimizer.trigger}
        </p>
      </div>

      {/* Options Evaluated */}
      <div>
        <h4 className="text-[13px] font-semibold text-text-secondary mb-3 uppercase tracking-wider">
          Options Evaluated
        </h4>
        <div className="overflow-x-auto rounded-lg border border-card-border shadow-sm">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-accent-subtle">
                <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30 w-12">
                  #
                </th>
                <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30">
                  Fulfillment Plan
                </th>
                <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30 w-[100px]">
                  Fill Rate
                </th>
                <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30 w-[110px]">
                  Cost
                </th>
                <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-text-primary/60 uppercase tracking-wider border-b border-accent-medium/30 w-[220px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {optimizer.options.map((opt) => (
                <tr
                  key={opt.id}
                  className={`border-b border-table-border last:border-b-0 ${
                    opt.status === "selected"
                      ? "bg-emerald-50"
                      : "bg-gray-50 text-text-secondary"
                  }`}
                >
                  <td className="px-4 py-3 font-bold">{opt.id}</td>
                  <td className="px-4 py-3">{opt.plan}</td>
                  <td className="px-4 py-3 font-medium">{opt.fillRate}</td>
                  <td className="px-4 py-3">{opt.cost}</td>
                  <td className="px-4 py-3">
                    {opt.status === "selected" ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <CheckCircle2 size={16} /> Selected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-500 text-[12px]">
                        <XCircle size={15} /> {opt.reason}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Selected */}
      {optimizer.whySelected.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <h4 className="text-[13px] font-bold text-emerald-800 mb-3">
            Why the selected option?
          </h4>
          <ul className="space-y-2">
            {optimizer.whySelected.map((point, i) => (
              <li key={i} className="text-[14px] text-emerald-900 flex items-start gap-2.5">
                <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Why Not Rejected */}
      {optimizer.whyNotRejected.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <h4 className="text-[13px] font-bold text-red-800 mb-3">
            Why not the alternatives?
          </h4>
          <ul className="space-y-3">
            {optimizer.whyNotRejected.map((item, i) => (
              <li key={i} className="text-[14px]">
                <span className="font-semibold text-text-primary">{item.option}:</span>
                <span className="text-text-secondary ml-1.5 leading-relaxed">{item.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
