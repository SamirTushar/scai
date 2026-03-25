import { X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useActiveModule } from "../../hooks/useActiveModule";
import { useCaseMap } from "../../data/useCases";
import { procurementUseCaseMap } from "../../data/procurementUseCases";
import TabInputs from "./TabInputs";
import TabConfiguration from "./TabConfiguration";
import TabOptimizer from "./TabOptimizer";
import TabResult from "./TabResult";
import RMTabInputs from "./RMTabInputs";
import RMTabConfiguration from "./RMTabConfiguration";
import RMTabOptimizer from "./RMTabOptimizer";
// RMTabResult removed — Result tab not shown for RM module
import PlannerActions from "./PlannerActions";

const repTabs = ["Inputs", "Configuration", "Optimizer Output", "Result"];
const rmTabs = ["Inputs", "Configuration", "Optimizer Output"];

export default function ExplainDrawer() {
  const { state, dispatch } = useAppContext();
  const am = useActiveModule();
  const isRM = am.module === "rm";

  const drawerOpen = am.drawerOpen;
  const drawerRowId = am.drawerRowId;
  const drawerTab = am.drawerTab;

  // Find the row in the appropriate data source
  const row = drawerRowId
    ? am.rows.find((r: Record<string, unknown>) => String(r[am.config.idField]) === drawerRowId)
    : null;

  // Get use case data based on module
  const useCaseData = isRM
    ? (row?.use_case ? procurementUseCaseMap[row.use_case as string] : null)
    : (row?.useCaseId ? useCaseMap[row.useCaseId as string] : null);

  const closeDrawer = () => {
    dispatch({ type: am.actions.closeDrawer } as never);
  };

  const setTab = (tab: number) => {
    dispatch({ type: am.actions.setDrawerTab, tab } as never);
  };

  // Badge pills based on module
  const renderBadgePills = () => {
    if (!row) return null;
    if (isRM) {
      return (
        <div className="flex flex-wrap gap-2.5">
          <Pill label="SKU Code" value={String(row.sku_code || "")} />
          <Pill label="Supplier" value={String(row.supplier || "")} />
          <Pill label="Dest DC" value={String(row.destination_dc || "")} />
          <Pill label="Planned Qty" value={String(row.planned_qty || "")} />
        </div>
      );
    }
    return (
      <div className="flex flex-wrap gap-2.5">
        <Pill label="SKU Code" value={String(row.skuCode || "")} />
        <Pill label="Source ID" value={String(row.startNode || "")} />
        <Pill label="Destination ID" value={String(row.locationEnd || "")} />
        <Pill label="Planned Qty" value={String(row.plannedReplenishmentQty || "")} />
      </div>
    );
  };

  const renderTabContent = () => {
    if (!useCaseData) return null;

    if (isRM) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rmData = useCaseData as any;
      switch (drawerTab) {
        case 0: return <RMTabInputs data={rmData} />;
        case 1: return <RMTabConfiguration data={rmData} />;
        case 2: return <RMTabOptimizer data={rmData} />;
        default: return null;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repData = useCaseData as any;
    switch (drawerTab) {
      case 0: return <TabInputs data={repData} />;
      case 1: return <TabConfiguration data={repData} />;
      case 2: return <TabOptimizer data={repData} />;
      case 3: return <TabResult data={repData} />;
      default: return null;
    }
  };

  const fallbackMessage = isRM
    ? "Standard procurement — no special conditions. This PO was generated through the standard planning cycle."
    : "Standard replenishment — no node balancing required. This STO was generated through standard planning with sufficient stock at the primary DC.";

  const fallbackEmoji = isRM ? "🏭" : "📦";
  const fallbackTitle = isRM ? "Standard Procurement" : "Standard Replenishment";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-[60vw] bg-white z-50 shadow-[-6px_0_20px_rgba(0,0,0,0.12)] transform transition-transform duration-300 ease-in-out flex flex-col ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {row && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between px-8 py-5 border-b border-card-border">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={closeDrawer}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-[18px] font-bold text-text-primary">
                    {useCaseData ? (useCaseData as unknown as { title: string }).title : `Data Insights — Standard`}
                  </h2>
                </div>
                {useCaseData && (
                  <p className="text-[14px] text-text-secondary ml-10">
                    {(useCaseData as unknown as { subtitle: string }).subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* SKU Badge Pills */}
            <div className="px-8 py-5 border-b border-card-border bg-gray-50/50">
              {renderBadgePills()}
            </div>

            {useCaseData ? (
              <>
                {/* Tabs */}
                <div className="px-8 border-b border-card-border">
                  <div className="flex gap-8">
                    {(isRM ? rmTabs : repTabs).map((tab, i) => (
                      <button
                        key={tab}
                        onClick={() => setTab(i)}
                        className={`py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                          drawerTab === i
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
                <div className="flex-1 overflow-y-auto px-8 py-8">
                  {!state.editMode && renderTabContent()}
                </div>

                {/* Planner Actions */}
                {!state.editMode && (
                  <PlannerActions
                    row={row as Record<string, unknown>}
                    statusField={am.config.statusField}
                    onApprove={() => {
                      if (isRM) {
                        dispatch({ type: "RM_OPEN_APPROVE_MODAL", rowId: String(row[am.config.idField]) });
                      } else {
                        // For replenishment: direct approve
                        dispatch({ type: "UPDATE_ROW_STATUS", ids: [String(row[am.config.idField])], status: "approved" } as never);
                      }
                    }}
                    onReject={() => {
                      if (isRM) {
                        dispatch({ type: "RM_OPEN_REJECT_MODAL", rowId: String(row[am.config.idField]) });
                      } else {
                        dispatch({ type: "UPDATE_ROW_STATUS", ids: [String(row[am.config.idField])], status: "rejected" } as never);
                      }
                    }}
                    onEdit={() => {
                      if (isRM) {
                        dispatch({ type: "RM_START_EDIT", rowId: String(row[am.config.idField]) });
                      }
                    }}
                  />
                )}
              </>
            ) : (
              /* Generic row - no detailed explainability */
              <div className="flex-1 flex items-center justify-center px-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <span className="text-3xl">{fallbackEmoji}</span>
                  </div>
                  <p className="text-[16px] font-semibold text-text-primary mb-3">
                    {fallbackTitle}
                  </p>
                  <p className="text-[14px] text-text-secondary max-w-sm leading-relaxed">
                    {fallbackMessage}
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

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-light text-accent rounded-lg text-[13px] font-medium">
      {label} <span className="font-bold">{value}</span>
    </span>
  );
}
