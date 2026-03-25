import { BarChart3, TrendingUp, Truck } from "lucide-react";

const navItems = [
  { icon: BarChart3, label: "S&OP", active: false },
  { icon: TrendingUp, label: "Demand", active: false },
  { icon: Truck, label: "Supply", active: true },
];

export default function Sidebar() {
  return (
    <aside className="w-[60px] bg-white border-r border-card-border flex flex-col items-center py-3 shrink-0">
      {/* 3SC Logo */}
      <div className="mb-6">
        <svg width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Back square - dark */}
          <rect x="30" y="5" width="65" height="65" rx="4" fill="#1F2937" />
          {/* Middle square - orange */}
          <rect x="15" y="20" width="55" height="55" rx="4" fill="#E8453C" />
          {/* Front square - dark */}
          <rect x="0" y="38" width="42" height="42" rx="4" fill="#1F2937" />
        </svg>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col items-center gap-1 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors relative ${
                item.active
                  ? "text-accent bg-red-50"
                  : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-accent rounded-r" />
              )}
              <Icon size={20} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
