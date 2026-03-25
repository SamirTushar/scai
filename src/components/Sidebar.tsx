import { BarChart3, TrendingUp, Truck, Package } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ActiveModule } from "../types/procurement";

const navItems: { icon: typeof BarChart3; label: string; module?: ActiveModule }[] = [
  { icon: BarChart3, label: "S&OP" },
  { icon: TrendingUp, label: "Demand" },
  { icon: Truck, label: "Supply", module: "replenishment" },
  { icon: Package, label: "RM", module: "rm" },
];

export default function Sidebar() {
  const { state, dispatch } = useAppContext();

  return (
    <aside className="w-[52px] bg-white border-r border-card-border flex flex-col items-center shrink-0">
      {/* 3SC Logo — sits in the top nav band (h-12 = 48px) */}
      <div className="h-12 flex items-center justify-center w-full border-b border-card-border">
        <svg width="22" height="22" viewBox="-2 0 100 85" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="2" width="60" height="60" rx="6" fill="#1F2937" />
          <rect x="15" y="17" width="50" height="50" rx="6" fill="#E8453C" />
          <rect x="0" y="32" width="40" height="40" rx="6" fill="#1F2937" />
        </svg>
      </div>

      {/* Breadcrumb band spacer (h-10 = 40px) — keeps nav aligned below breadcrumb */}
      <div className="h-10 w-full border-b border-card-border" />

      {/* Nav Items — start at same level as content below breadcrumb */}
      <nav className="flex flex-col items-center gap-1 w-full pt-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.module === state.activeModule;
          const isClickable = !!item.module;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.module) {
                  dispatch({ type: "SET_ACTIVE_MODULE", module: item.module });
                }
              }}
              className={`w-full flex flex-col items-center gap-0.5 py-2 text-[9px] font-medium transition-colors relative ${
                isActive
                  ? "text-accent bg-red-50/60"
                  : isClickable
                  ? "text-text-secondary hover:text-text-primary hover:bg-gray-50 cursor-pointer"
                  : "text-text-secondary/40 cursor-default"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-6 bg-accent rounded-r" />
              )}
              <Icon size={15} strokeWidth={1.6} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
