import { UseCaseData } from "../../types";

export const uc1: UseCaseData = {
  id: "uc1",
  title: "Data Insights — Multi-DC Replenishment",
  subtitle: "Standard flow: Primary DC serves primary distributor",
  skuCode: "CLT-2201",
  sourceId: "Berlin DC",
  destinationId: "Munich Dist.",
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
          { distributor: "Munich Dist.", region: "South Germany", primaryDC: "Berlin", demand14Day: 280, priority: "A" },
          { distributor: "Hamburg Dist.", region: "North Germany", primaryDC: "Berlin", demand14Day: 195, priority: "A" },
          { distributor: "Warsaw Dist.", region: "Poland", primaryDC: "Szczecin", demand14Day: 160, priority: "B" },
          { distributor: "Antwerp Dist.", region: "Belgium", primaryDC: "Ghent", demand14Day: 220, priority: "A" },
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
          { dc: "Berlin", gih: 3200, committed: "195 (Hamburg)", atp: 3005, safetyStock: 350 },
          { dc: "Szczecin", gih: 890, committed: "160 (Warsaw)", atp: 730, safetyStock: 120 },
          { dc: "Ghent", gih: 1100, committed: "220 (Antwerp)", atp: 880, safetyStock: 200 },
          { dc: "Cheb", gih: 540, committed: "0", atp: 540, safetyStock: 80 },
        ],
      },
      {
        title: "Fulfillment Routes",
        columns: [
          { key: "route", label: "Route" },
          { key: "leadTime", label: "Lead Time" },
          { key: "costPerUnit", label: "Cost/Unit" },
          { key: "moq", label: "MOQ" },
        ],
        rows: [
          { route: "Berlin → Munich", leadTime: "1 day", costPerUnit: "€0.45", moq: "—" },
          { route: "Berlin → Hamburg", leadTime: "1 day", costPerUnit: "€0.38", moq: "—" },
          { route: "Szczecin → Warsaw", leadTime: "1 day", costPerUnit: "€0.32", moq: "—" },
          { route: "Ghent → Antwerp", leadTime: "0.5 day", costPerUnit: "€0.28", moq: "—" },
        ],
      },
    ],
  },
  configuration: [
    { rule: "Objective", setting: "Fulfill all distributor demand from primary DC" },
    { rule: "Allocation Order", setting: "Priority A distributors first, then B, then C" },
    { rule: "Qty Logic", setting: "Replenish to cover 14-day demand forecast" },
    { rule: "Hard Constraint", setting: "DC must retain safety stock post-fulfillment" },
    { rule: "Dispatch Logic", setting: "Plan dispatch to meet required delivery date minus lead time" },
  ],
  optimizer: {
    trigger: "Standard planning cycle — all distributors below reorder point.",
    options: [
      { id: "A", plan: "Berlin ships 280 to Munich", fillRate: "100%", cost: "€126.00", status: "selected" },
    ],
    whySelected: [
      "Standard flow. Berlin has 3,005 available, Munich needs 280.",
      "No contention. Primary DC serves primary distributor.",
      "No alternate sourcing needed.",
    ],
    whyNotRejected: [],
  },
  result: {
    stos: [
      { stoId: "STO-250326-CLT2201-001", sku: "CLT-2201", from: "Berlin DC", to: "Munich Dist.", qty: 280, dispatch: "26-Mar", delivery: "27-Mar", cost: "€126.00" },
    ],
    postPlan: [
      { dc: "Berlin", newAvailable: "2,725", vsSS: "✅ +2,375", impact: "Healthy" },
    ],
    networkFillRate: "100% across all distributors",
  },
};
