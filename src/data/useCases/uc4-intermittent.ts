import { UseCaseData } from "../../types";

export const uc4: UseCaseData = {
  id: "uc4",
  title: "Data Insights — Intermittent Demand",
  subtitle: "Low forecastability SKU with lumpy demand pattern",
  skuCode: "WPM-0987",
  sourceId: "Cheb DC",
  destinationId: "Prague Dist.",
  inputs: {
    sections: [
      {
        title: "Distributor Demand",
        columns: [
          { key: "distributor", label: "Distributor" },
          { key: "region", label: "Region" },
          { key: "primaryDC", label: "Primary DC" },
          { key: "demand14Day", label: "14-Day Demand" },
          { key: "forecastMethod", label: "Forecast Method" },
          { key: "cv", label: "CV" },
          { key: "classification", label: "Classification" },
        ],
        rows: [
          { distributor: "Prague Dist.", region: "Czech Rep.", primaryDC: "Cheb", demand14Day: 18, forecastMethod: "Croston (intermittent)", cv: 0.82, classification: "Lumpy / Slow-moving" },
          { distributor: "Munich Dist.", region: "South Germany", primaryDC: "Berlin", demand14Day: 6, forecastMethod: "Croston", cv: 0.91, classification: "Lumpy / Slow-moving" },
        ],
      },
      {
        title: "Demand History (Last 12 Weeks — Prague)",
        columns: [
          { key: "week", label: "Week" },
          { key: "qty", label: "Qty" },
        ],
        rows: [
          { week: "W1", qty: 0 },
          { week: "W2", qty: 0 },
          { week: "W3", qty: 4 },
          { week: "W4", qty: 0 },
          { week: "W5", qty: 0 },
          { week: "W6", qty: 0 },
          { week: "W7", qty: 8 },
          { week: "W8", qty: 0 },
          { week: "W9", qty: 0 },
          { week: "W10", qty: 3 },
          { week: "W11", qty: 0 },
          { week: "W12", qty: 0 },
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
          { key: "ssMethod", label: "SS Method" },
        ],
        rows: [
          { dc: "Cheb", gih: 52, committed: "0", atp: 52, safetyStock: 22, ssMethod: "Elevated SS (CV > 0.7)" },
          { dc: "Berlin", gih: 31, committed: "6 (Munich)", atp: 25, safetyStock: 14, ssMethod: "Elevated SS (CV > 0.7)" },
        ],
      },
    ],
  },
  configuration: [
    { rule: "Forecast Method", setting: "Croston / SBA (auto-selected for CV > 0.5)" },
    { rule: "Safety Stock Method", setting: "Elevated SS — 1.8x standard multiplier for intermittent SKUs" },
    { rule: "Reorder Trigger", setting: "Distributor projected stock < SS within planning horizon" },
    { rule: "Min Replenishment Qty", setting: "Higher of: forecast demand OR min order qty (avoids tiny uneconomic shipments)" },
    { rule: "Service Level Target", setting: "95% (same as fast-movers — no service penalty for niche parts)" },
  ],
  optimizer: {
    trigger: "Prague projected to breach SS within 14 days based on Croston forecast.",
    options: [
      { id: "A", plan: "Cheb ships 18", fillRate: "100%", cost: "€9.90", status: "selected" },
      { id: "B", plan: "Cheb ships 8 (moving avg forecast)", fillRate: "44%", cost: "€4.40", status: "rejected", reason: "Moving avg understates lumpy demand" },
      { id: "C", plan: "Cheb ships 30 (buffer extra)", fillRate: "167%", cost: "€16.50", status: "rejected", reason: "Overstocks a slow-mover, ties capital" },
    ],
    whySelected: [
      "Croston method correctly captures the intermittent pattern — demand comes in bursts of 3-8 units every 3-5 weeks.",
      "18 units covers the next cycle.",
      "Moving average would underforecast. Overstocking a niche Porsche part is expensive dead stock.",
    ],
    whyNotRejected: [
      { option: "Option B: Cheb ships 8", reason: "Moving average smooths out the zero-demand weeks, yielding only 8 units. Croston correctly predicts 18 — undershipping risks stockout." },
      { option: "Option C: Cheb ships 30", reason: "Over-provisioning a slow-mover ties up capital. At 0.82 CV, demand is unpredictable — extra stock may sit for months." },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-250326-WPM0987-001", sku: "WPM-0987", from: "Cheb DC", to: "Prague Dist.", qty: 18, dispatch: "26-Mar", delivery: "27-Mar", cost: "€9.90" },
    ],
    postPlan: [
      { dc: "Cheb", newAvailable: "34", vsSS: "✅ +12 above SS", impact: "Adequate for this demand profile" },
    ],
    networkFillRate: "100% across all distributors",
  },
};
