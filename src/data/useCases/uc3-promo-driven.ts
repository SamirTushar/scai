import { UseCaseData } from "../../types";

export const uc3: UseCaseData = {
  id: "uc3",
  title: "Data Insights — Promo-Driven Demand",
  subtitle: "Sales-influenced demand with promotional uplift",
  skuCode: "BAT-1104",
  sourceId: "Szczecin DC",
  destinationId: "Warsaw Dist.",
  inputs: {
    sections: [
      {
        title: "Distributor Demand (with Promo Uplift)",
        columns: [
          { key: "distributor", label: "Distributor" },
          { key: "region", label: "Region" },
          { key: "primaryDC", label: "Primary DC" },
          { key: "baseForecast", label: "Base Forecast" },
          { key: "promoUplift", label: "Promo Uplift" },
          { key: "finalDemand", label: "Final 14-Day Demand" },
          { key: "promoDetails", label: "Promo Details" },
        ],
        rows: [
          { distributor: "Warsaw Dist.", region: "Poland", primaryDC: "Szczecin", baseForecast: 240, promoUplift: "+440", finalDemand: 680, promoDetails: "Winter battery campaign — 30% off, starts 28-Mar" },
          { distributor: "Hamburg Dist.", region: "North Germany", primaryDC: "Berlin", baseForecast: 310, promoUplift: "0", finalDemand: 310, promoDetails: "No promo" },
          { distributor: "Prague Dist.", region: "Czech Rep.", primaryDC: "Cheb", baseForecast: 180, promoUplift: "+60", finalDemand: 240, promoDetails: "Same campaign, smaller market" },
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
          { dc: "Szczecin", gih: 2100, committed: "0", atp: 2100, safetyStock: 200 },
          { dc: "Berlin", gih: 1800, committed: "310 (Hamburg)", atp: 1490, safetyStock: 250 },
          { dc: "Cheb", gih: 780, committed: "0", atp: 780, safetyStock: 100 },
        ],
      },
      {
        title: "Promo Configuration",
        columns: [
          { key: "parameter", label: "Parameter" },
          { key: "value", label: "Value" },
        ],
        rows: [
          { parameter: "Campaign", value: "Winter Battery Blitz — Poland + Czech" },
          { parameter: "Duration", value: "28-Mar to 10-Apr (14 days)" },
          { parameter: "Expected Uplift", value: "183% (Warsaw), 33% (Prague)" },
          { parameter: "Uplift Source", value: "RP Sensing module — promo calendar integration" },
          { parameter: "Post-Promo Adjustment", value: "System will auto-reduce forecast 15-Apr onward (hangover effect -20%)" },
        ],
      },
    ],
  },
  configuration: [
    { rule: "Demand Input", setting: "Base forecast + promo uplift from RP Sensing module" },
    { rule: "Promo Handling", setting: "System consumes promo calendar, applies uplift multiplier by SKU-location" },
    { rule: "Pre-positioning", setting: "System generates STOs 2 days before promo start for positioning stock" },
    { rule: "Post-Promo Logic", setting: "Auto-dampens forecast post-promo to prevent overstock" },
    { rule: "Hard Constraint", setting: "DC safety stock maintained even during promo fulfillment" },
  ],
  optimizer: {
    trigger: "Promo calendar event — campaign starts in 2 days. System pre-positions stock.",
    options: [
      { id: "A", plan: "Szczecin ships 680 (promo-adjusted)", fillRate: "100%", cost: "€217.60", status: "selected" },
      { id: "B", plan: "Szczecin ships 240 (base only, ignore promo)", fillRate: "35%", cost: "€76.80", status: "rejected", reason: "440 units lost sales during campaign" },
      { id: "C", plan: "Szczecin 480 + Berlin 200 (split)", fillRate: "100%", cost: "€295.60", status: "rejected", reason: "Costlier, Berlin not primary DC" },
    ],
    whySelected: [
      "Szczecin has 2,100 available — ample headroom.",
      "Single shipment, lowest cost, full promo coverage.",
      "Post-promo dampening already scheduled so no overstock risk.",
    ],
    whyNotRejected: [
      { option: "Option B: Szczecin ships 240", reason: "Ignores promo uplift entirely. 440 units of lost sales during the campaign period." },
      { option: "Option C: Split shipment", reason: "€295.60 vs €217.60 — 36% costlier. Berlin is not the primary DC for Warsaw. Unnecessary complexity." },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-250326-BAT1104-001", sku: "BAT-1104", from: "Szczecin DC", to: "Warsaw Dist.", qty: 680, dispatch: "26-Mar", delivery: "27-Mar", cost: "€217.60" },
    ],
    postPlan: [
      { dc: "Szczecin", newAvailable: "1,420", vsSS: "✅ +1,220", impact: "Healthy, promo absorbed" },
    ],
    networkFillRate: "100% across all distributors. Post-promo forecast dampening (-20%) auto-scheduled from 15-Apr.",
  },
};
