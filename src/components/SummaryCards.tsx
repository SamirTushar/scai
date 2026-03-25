import { Info } from "lucide-react";
import { useActiveModule } from "../hooks/useActiveModule";
import { CardConfig } from "../config/modules";

export default function SummaryCards() {
  const { config } = useActiveModule();
  const cards = config.summaryCards;

  return (
    <div className="grid grid-cols-5 gap-5 px-8 py-6">
      {cards.map((card: CardConfig) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          {/* Colored top border */}
          <div className={`h-[3px] w-full ${card.topBorderColor.replace('border-', 'bg-')}`} />

          {/* Card Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <h3 className="text-[14px] font-semibold text-text-primary">
              {card.title}
            </h3>
            <Info size={15} className="text-text-secondary/30 hover:text-text-secondary cursor-pointer shrink-0" />
          </div>

          {/* Card Body — key/value pairs */}
          <div className="px-6 pb-5 space-y-3">
            {card.items.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between">
                <span className="text-[13px] text-text-secondary">{item.label}:</span>
                <span
                  className={`text-[15px] font-bold tabular-nums ${item.color || "text-text-primary"}`}
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
