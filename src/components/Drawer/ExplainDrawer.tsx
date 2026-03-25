import { X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useCaseMap } from "../../data/useCases";
import TabInputs from "./TabInputs";
import TabConfiguration from "./TabConfiguration";
import TabOptimizer from "./TabOptimizer";
import TabResult from "./TabResult";

const tabs = ["Inputs", "Configuration", "Optimizer Output", "Result"];

export default function ExplainDrawer() {
  const { state, dispatch } = useAppContext();

  const row = state.drawerRowId
    ? state.rows.find((r) => r.stoId === state.drawerRowId)
    : null;

  const useCaseData = row?.useCaseId ? useCaseMap[row.useCaseId] : null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          state.drawerOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[60vw] bg-white z-50 shadow-[-6px_0_20px_rgba(0,0,0,0.12)] transform transition-transform duration-300 ease-in-out flex flex-col ${
          state.drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {row && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between px-8 py-5 border-b border-card-border">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => dispatch({ type: "CLOSE_DRAWER" })}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-[18px] font-bold text-text-primary">
                    {useCaseData ? useCaseData.title : "Data Insights — Standard"}
                  </h2>
                </div>
                {useCaseData && (
                  <p className="text-[14px] text-text-secondary ml-10">
                    {useCaseData.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* SKU Badge Pills */}
            <div className="px-8 py-4 border-b border-card-border bg-gray-50/50">
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-light text-accent rounded-lg text-[13px] font-medium">
                  SKU Code <span className="font-bold">{row.skuCode}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-light text-accent rounded-lg text-[13px] font-medium">
                  Source ID <span className="font-bold">{row.startNode}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-light text-accent rounded-lg text-[13px] font-medium">
                  Destination ID <span className="font-bold">{row.locationEnd}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-light text-accent rounded-lg text-[13px] font-medium">
                  Planned Qty <span className="font-bold">{row.plannedReplenishmentQty}</span>
                </span>
              </div>
            </div>

            {useCaseData ? (
              <>
                {/* Tabs */}
                <div className="px-8 border-b border-card-border">
                  <div className="flex gap-8">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab}
                        onClick={() =>
                          dispatch({ type: "SET_DRAWER_TAB", tab: i })
                        }
                        className={`py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                          state.drawerTab === i
                            ? "border-accent text-accent"
                            : "border-transparent text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  {state.drawerTab === 0 && <TabInputs data={useCaseData} />}
                  {state.drawerTab === 1 && (
                    <TabConfiguration data={useCaseData} />
                  )}
                  {state.drawerTab === 2 && <TabOptimizer data={useCaseData} />}
                  {state.drawerTab === 3 && <TabResult data={useCaseData} />}
                </div>
              </>
            ) : (
              /* Generic row - no detailed explainability */
              <div className="flex-1 flex items-center justify-center px-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">📦</span>
                  </div>
                  <p className="text-[16px] font-semibold text-text-primary mb-3">
                    Standard Replenishment
                  </p>
                  <p className="text-[14px] text-text-secondary max-w-sm leading-relaxed">
                    No special conditions. This STO was generated through the
                    standard planning cycle with no demand sensing, promo, or
                    network rebalancing triggers.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
