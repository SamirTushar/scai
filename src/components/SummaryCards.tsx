import {
  Package, BarChart3, Clock, TrendingUp, TrendingDown, Info,
  ClipboardList, CheckCircle, AlertTriangle, Shield,
} from "lucide-react";
import { useActiveModule } from "../hooks/useActiveModule";
import { CardConfig } from "../config/modules";

const iconMap: Record<string, React.ElementType> = {
  Package, BarChart3, Clock, TrendingUp, TrendingDown,
  ClipboardList, CheckCircle, AlertTriangle, Shield, Info,
};

function getIcon(name: string): React.ElementType {
  return iconMap[name] || Package;
}

export default function SummaryCards() {
  const { config } = useActiveModule();
  const cards = config.summaryCards;

  return (
    <div className="grid grid-cols-5 gap-5 px-8 py-5">
      {cards.map((card: CardConfig) => {
        const Icon = getIcon(card.icon);
        return (
          <div
            key={card.title}
            className={`bg-white rounded-xl border border-card-border border-t-[3px] ${card.topBorderColor} shadow-sm hover:shadow-md transition-shadow`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <Icon size={16} className={card.iconColor} />
                </div>
                <h3 className="text-[13px] font-semibold text-text-primary leading-tight">
                  {card.title}
                </h3>
              </div>
              <Info size={14} className="text-text-secondary/40 hover:text-text-secondary cursor-pointer" />
            </div>

            {/* Hero Value */}
            {card.heroValue != null && (
              <div className="px-5 py-3">
                <span className={`text-[28px] font-bold ${card.heroColor || "text-text-primary"} leading-none`}>
                  {typeof card.heroValue === "number" ? card.heroValue.toLocaleString() : card.heroValue}
                </span>
              </div>
            )}

            {/* Sub Items */}
            <div className={`px-5 pb-4 pt-1 ${card.heroValue != null ? "border-t border-card-border/50" : ""}`}>
              <div className="space-y-1.5 pt-2.5">
                {card.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-[12px]">
                    <span className="text-text-secondary">{item.label}</span>
                    <span
                      className={`font-semibold tabular-nums ${item.color || "text-text-primary"}`}
                    >
                      {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
