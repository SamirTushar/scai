import { Info } from "lucide-react";
import { useActiveModule } from "../hooks/useActiveModule";
import { CardConfig } from "../config/modules";

export default function SummaryCards() {
  const { config } = useActiveModule();
  const cards = config.summaryCards;

  return (
    <div className="grid grid-cols-5 gap-4 px-8 py-5">
      {cards.map((card: CardConfig) => (
        <div
          key={card.title}
          className="bg-white rounded-lg border border-gray-200 px-5 py-4"
        >
          {/* Title row */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-text-primary">
              {card.title}
            </h3>
            <Info size={13} className="text-gray-300 hover:text-gray-400 cursor-pointer shrink-0" />
          </div>

          {/* Key/value pairs — uniform subtle style */}
          <div className="space-y-1.5">
            {card.items.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between">
                <span className="text-[12px] text-gray-500">{item.label}:</span>
                <span
                  className={`text-[12px] font-semibold tabular-nums ${item.color || "text-gray-700"}`}
                >
                  {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
