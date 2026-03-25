import { LayoutGrid, Table, Filter, Bell, ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useActiveModule } from "../hooks/useActiveModule";

const navItems = [
  "Integrated Business Planning",
  "Enterprise Data Management",
  "Risk Management & Digital Twin",
  "Market Place",
];

export default function TopBar() {
  const { state, dispatch } = useAppContext();
  const { config } = useActiveModule();

  return (
    <header className="bg-white border-b border-card-border shrink-0">
      {/* Top nav */}
      <div className="flex items-center justify-between px-8 h-14">
        <nav className="flex items-center gap-2">
          {navItems.map((item, i) => (
            <button
              key={item}
              className={`px-4 py-4 text-[14px] border-b-2 transition-colors ${
                i === 0
                  ? "border-accent text-text-primary font-semibold"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100">
            <Bell size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
            BU
          </div>
        </div>
      </div>

      {/* Breadcrumb bar */}
      <div className="flex items-center justify-between px-8 h-11 border-t border-gray-100">
        <div className="flex items-center gap-2 text-[14px]">
          <span className="text-text-secondary font-medium">{config.breadcrumb.period}</span>
          <ChevronRight size={16} className="text-text-secondary" />
          <span className="text-accent font-semibold">{config.breadcrumb.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-text-secondary">Status :</span>
            <span className="text-accent font-semibold">{config.statusLabel}</span>
          </div>
          <div className="flex items-center border border-card-border rounded-lg overflow-hidden">
            <button
              onClick={() => dispatch({ type: "SET_VIEW_MODE", mode: "table" })}
              className={`px-4 py-2 text-[13px] font-medium flex items-center gap-2 transition-colors ${
                state.viewMode === "table"
                  ? "bg-accent text-white"
                  : "bg-white text-text-secondary hover:bg-accent-light"
              }`}
            >
              <Table size={15} />
              Table only
            </button>
            <button
              onClick={() => dispatch({ type: "SET_VIEW_MODE", mode: "chart" })}
              className={`px-4 py-2 text-[13px] font-medium flex items-center gap-2 transition-colors ${
                state.viewMode === "chart"
                  ? "bg-accent text-white"
                  : "bg-white text-text-secondary hover:bg-accent-light"
              }`}
            >
              <LayoutGrid size={15} />
              Table with charts
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-[13px] text-text-secondary border border-card-border rounded-lg hover:bg-gray-50 font-medium">
            <Filter size={15} />
            Filters
          </button>
        </div>
      </div>
    </header>
  );
}
