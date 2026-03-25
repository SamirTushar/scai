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
    <aside className="w-[54px] bg-white border-r border-card-border flex flex-col items-center pt-3 shrink-0">
      {/* 3SC Logo — smaller, fully visible */}
      <div className="mb-8">
        <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="5" width="65" height="65" rx="4" fill="#1F2937" />
          <rect x="15" y="20" width="55" height="55" rx="4" fill="#E8453C" />
          <rect x="0" y="38" width="42" height="42" rx="4" fill="#1F2937" />
        </svg>
      </div>

      {/* Nav Items — pushed down with gaps */}
      <nav className="flex flex-col items-center gap-2 w-full">
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
              className={`w-full flex flex-col items-center gap-1 py-2.5 text-[9px] font-medium transition-colors relative ${
                isActive
                  ? "text-accent bg-red-50"
                  : isClickable
                  ? "text-text-secondary hover:text-text-primary hover:bg-gray-50 cursor-pointer"
                  : "text-text-secondary/50 cursor-default"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-accent rounded-r" />
              )}
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
