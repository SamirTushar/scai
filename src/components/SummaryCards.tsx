import { Package, BarChart3, Clock, TrendingUp, TrendingDown, Info } from "lucide-react";

interface CardConfig {
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  topBorder: string;
  hero: { value: string; color: string };
  items: { label: string; value: string | number; color?: string }[];
}

const cards: CardConfig[] = [
  {
    title: "Plan Summary",
    icon: Package,
    iconBg: "bg-accent-light",
    iconColor: "text-accent",
    topBorder: "border-t-accent",
    hero: { value: "42", color: "text-accent" },
    items: [
      { label: "SKU Count", value: 42, color: "#E8453C" },
      { label: "Destinations", value: 12 },
      { label: "Sources", value: 4 },
    ],
  },
  {
    title: "Plan Metrics",
    icon: BarChart3,
    iconBg: "bg-accent-light",
    iconColor: "text-accent",
    topBorder: "border-t-accent",
    hero: { value: "847", color: "text-text-primary" },
    items: [
      { label: "SKU Orders", value: 847 },
    ],
  },
  {
    title: "Approval Status",
    icon: Clock,
    iconBg: "bg-badge-amber-bg",
    iconColor: "text-status-pending",
    topBorder: "border-t-status-pending",
    hero: { value: "847", color: "text-status-pending" },
    items: [
      { label: "Pending", value: 847, color: "#F59E0B" },
      { label: "Approved", value: 0, color: "#10B981" },
      { label: "Rejected", value: 0, color: "#EF4444" },
    ],
  },
  {
    title: "Demand Fulfillment Rate",
    icon: TrendingUp,
    iconBg: "bg-badge-green-bg",
    iconColor: "text-status-approved",
    topBorder: "border-t-status-approved",
    hero: { value: "91.34%", color: "text-status-approved" },
    items: [
      { label: "Demand Value", value: 0 },
      { label: "Fulfilled Value", value: "2,845,612.50", color: "#10B981" },
    ],
  },
  {
    title: "Lost Sales %",
    icon: TrendingDown,
    iconBg: "bg-badge-red-bg",
    iconColor: "text-status-rejected",
    topBorder: "border-t-status-rejected",
    hero: { value: "3.21%", color: "text-status-rejected" },
    items: [
      { label: "Volume", value: "18,420" },
      { label: "Value", value: 0 },
    ],
  },
];

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-5 gap-5 px-8 py-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`bg-white rounded-xl border border-card-border border-t-[3px] ${card.topBorder} shadow-sm hover:shadow-md transition-shadow`}
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
            <div className="px-5 py-3">
              <span className={`text-[28px] font-bold ${card.hero.color} leading-none`}>
                {card.hero.value}
              </span>
            </div>

            {/* Sub Items */}
            <div className="px-5 pb-4 pt-1 border-t border-card-border/50">
              <div className="space-y-1.5 pt-2.5">
                {card.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-[12px]">
                    <span className="text-text-secondary">{item.label}</span>
                    <span
                      className="font-semibold tabular-nums"
                      style={{ color: item.color || "#1F2937" }}
                    >
                      {item.value}
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
