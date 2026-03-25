import { UseCaseData } from "../../types";

export const uc5: UseCaseData = {
  id: "uc5",
  title: "Data Insights — Cross-Warehouse Rebalancing",
  subtitle: "Network rebalancing when primary DC cannot fully serve demand",
  skuCode: "BRK-4712",
  sourceId: "Berlin DC + Szczecin DC",
  destinationId: "Hamburg Dist.",
  inputs: {
    sections: [
      {
        title: "Distributor Demand",
        columns: [
          { key: "distributor", label: "Distributor" },
          { key: "region", label: "Region" },
          { key: "primaryDC", label: "Primary DC" },
          { key: "demand14Day", label: "14-Day Demand" },
          { key: "priority", label: "Priority" },
        ],
        rows: [
          { distributor: "Hamburg Dist.", region: "North Germany", primaryDC: "Berlin", demand14Day: 360, priority: "A" },
          { distributor: "Munich Dist.", region: "South Germany", primaryDC: "Berlin", demand14Day: 280, priority: "A" },
          { distributor: "Warsaw Dist.", region: "Poland", primaryDC: "Szczecin", demand14Day: 190, priority: "B" },
          { distributor: "Antwerp Dist.", region: "Belgium", primaryDC: "Ghent", demand14Day: 310, priority: "A" },
          { distributor: "Prague Dist.", region: "Czech Rep.", primaryDC: "Cheb", demand14Day: 145, priority: "B" },
        ],
      },
      {
        title: "DC Inventory Position",
        columns: [
          { key: "dc", label: "DC" },
          { key: "gih", label: "GIH (On Hand)" },
          { key: "committed", label: "Committed" },
          { key: "atp", label: "Available to Promise" },
          { key: "safetyStock", label: "Safety Stock" },
        ],
        rows: [
          { dc: "Berlin", gih: 520, committed: "280 (Munich)", atp: 240, safetyStock: 200 },
          { dc: "Szczecin", gih: 1840, committed: "190 (Warsaw)", atp: 1650, safetyStock: 150 },
          { dc: "Ghent", gih: 620, committed: "310 (Antwerp)", atp: 310, safetyStock: 200 },
          { dc: "Cheb", gih: 410, committed: "145 (Prague)", atp: 265, safetyStock: 100 },
        ],
      },
      {
        title: "Routes to Hamburg",
        columns: [
          { key: "route", label: "Route" },
          { key: "leadTime", label: "Lead Time" },
          { key: "costPerUnit", label: "Cost/Unit" },
          { key: "moq", label: "MOQ" },
        ],
        rows: [
          { route: "Berlin → Hamburg (primary)", leadTime: "1 day", costPerUnit: "€0.38", moq: "—" },
          { route: "Szczecin → Hamburg (alternate)", leadTime: "1.5 days", costPerUnit: "€0.52", moq: "100" },
          { route: "Ghent → Hamburg (alternate)", leadTime: "2 days", costPerUnit: "€0.71", moq: "100" },
        ],
      },
    ],
  },
  configuration: [
    { rule: "Objective", setting: "Maximize distributor fill rate at minimum fulfillment cost" },
    { rule: "Primary DC Assignment", setting: "Each distributor has a default DC based on proximity/cost" },
    { rule: "Alternate Sourcing Trigger", setting: "Primary DC available-to-promise < distributor demand" },
    { rule: "Alternate DC Selection", setting: "1. Lowest cost → 2. Highest surplus → 3. Shortest lead time" },
    { rule: "Hard Constraint", setting: "No DC drops below safety stock" },
    { rule: "Split Shipment Policy", setting: "Allowed — primary DC ships what it can, alternate covers shortfall" },
    { rule: "Priority Ranking", setting: "A > B > C — governs allocation order when distributors compete" },
  ],
  optimizer: {
    trigger: "Berlin ATP (240) < Hamburg demand (360). Shortfall = 120 units.",
    options: [
      { id: "A", plan: "Berlin 240 + Szczecin 120", fillRate: "100%", cost: "€153.60", status: "selected" },
      { id: "B", plan: "Berlin 240 + Ghent 120", fillRate: "100%", cost: "€176.40", status: "rejected", reason: "Costlier, Ghent tighter" },
      { id: "C", plan: "Berlin 240 only (short-ship)", fillRate: "67%", cost: "€91.20", status: "rejected", reason: "Priority A, 120 units lost" },
      { id: "D", plan: "Szczecin ships all 360", fillRate: "100%", cost: "€187.20", status: "rejected", reason: "Ignores Berlin stock, costlier" },
    ],
    whySelected: [
      "Split from Berlin (primary) + Szczecin (cheapest alternate). Full fill.",
      "Ghent untouched — exactly covers Antwerp demand.",
      "Szczecin has massive surplus (1,650 ATP vs 150 SS).",
      "Total cost €153.60 is the lowest among all 100%-fill options.",
    ],
    whyNotRejected: [
      { option: "Option B: Berlin 240 + Ghent 120", reason: "€176.40 vs €153.60 — 15% costlier. Ghent at 310 ATP barely covers Antwerp (310 demand). Using Ghent risks Antwerp stockout." },
      { option: "Option C: Berlin 240 only", reason: "Only 67% fill rate on a Priority A distributor. 120 units of lost sales is unacceptable." },
      { option: "Option D: Szczecin ships all 360", reason: "€187.20 vs €153.60 — 22% costlier. Wastes Berlin's available 240 units. Longer lead time for the full quantity." },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-250326-BRK4712-001", sku: "BRK-4712", from: "Berlin DC", to: "Hamburg Dist.", qty: 240, dispatch: "26-Mar", delivery: "27-Mar", cost: "€91.20" },
      { stoId: "STO-250326-BRK4712-002", sku: "BRK-4712", from: "Szczecin DC", to: "Hamburg Dist.", qty: 120, dispatch: "26-Mar", delivery: "27-Mar", cost: "€62.40" },
    ],
    postPlan: [
      { dc: "Berlin", newAvailable: "0 (at SS)", vsSS: "✅ At floor", impact: "Fully utilized" },
      { dc: "Szczecin", newAvailable: "1,530", vsSS: "✅ +1,380", impact: "Minimal impact" },
      { dc: "Ghent", newAvailable: "310", vsSS: "✅ Untouched", impact: "Covers Antwerp" },
      { dc: "Cheb", newAvailable: "265", vsSS: "✅ Untouched", impact: "Covers Prague" },
    ],
    networkFillRate: "100% across all distributors",
  },
};
