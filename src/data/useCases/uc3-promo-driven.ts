import { UseCaseData } from "../../types";

export const uc3PromoDriven: UseCaseData = {
  id: "uc3",
  title: "Data Insights — Node Balancing + Promo Spike",
  subtitle:
    "Winter Battery Blitz campaign spikes Warsaw demand — Szczecin can't cover alone, Berlin rebalances",
  skuCode: "BAT-1104",
  sourceId: "Szczecin DC",
  destinationId: "Warsaw Dist.",
  inputs: {
    sections: [
      {
        title: "Distributor Demand",
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
          { distributor: "Warsaw", region: "Poland", primaryDC: "Szczecin", baseForecast: 240, promoUplift: "+480", finalDemand: 720, promoDetails: "Winter Battery Blitz — 30% off" },
          { distributor: "Stockholm", region: "Sweden", primaryDC: "Szczecin", baseForecast: 150, promoUplift: "0", finalDemand: 150, promoDetails: "No promo" },
          { distributor: "Prague", region: "Czech Republic", primaryDC: "Cheb", baseForecast: 180, promoUplift: "+90", finalDemand: 270, promoDetails: "Same campaign, smaller market" },
          { distributor: "Hamburg", region: "North Germany", primaryDC: "Berlin", baseForecast: 200, promoUplift: "0", finalDemand: 200, promoDetails: "Non-promo" },
          { distributor: "Munich", region: "South Germany", primaryDC: "Berlin", baseForecast: 160, promoUplift: "0", finalDemand: 160, promoDetails: "Non-promo" },
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
          { dc: "Szczecin", gih: 980, committed: "0", atp: 980, safetyStock: 150 },
          { dc: "Berlin", gih: 1450, committed: "360 (Hamburg+Munich)", atp: 1090, safetyStock: 250 },
          { dc: "Ghent", gih: 520, committed: "490 (Antwerp+Lyon)", atp: 30, safetyStock: 200 },
          { dc: "Cheb", gih: 640, committed: "0", atp: 640, safetyStock: 100 },
        ],
      },
      {
        title: "Promo Configuration",
        columns: [
          { key: "parameter", label: "Parameter" },
          { key: "value", label: "Value" },
        ],
        rows: [
          { parameter: "Campaign", value: "Winter Battery Blitz — Poland + Czech Republic" },
          { parameter: "Duration", value: "28-Mar to 10-Apr (14 days)" },
          { parameter: "Expected Uplift", value: "200% (Warsaw), 50% (Prague)" },
          { parameter: "Uplift Source", value: "RP Sensing module — promo calendar integration" },
          { parameter: "Pre-positioning", value: "System generates STOs 2 days before campaign start" },
          { parameter: "Post-Promo Adjustment", value: "Auto-reduces forecast 15-Apr onward (hangover effect -20%)" },
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
    { rule: "Node Balancing", setting: "When promo DC cannot cover spike, redistribute from surplus DCs" },
  ],
  optimizer: {
    trigger:
      "Promo calendar event — campaign starts in 2 days. Szczecin ATP (980) < promo demand (720+150 = 870) leaves only 110 buffer. Stockholm gets deprioritized if Szczecin serves Warsaw fully.",
    options: [
      {
        id: "A",
        plan: "Szczecin 530 to Warsaw, Berlin 190 to Warsaw, Berlin 150 to Stockholm, Cheb 270 to Prague, Berlin 200 to Hamburg",
        fillRate: "100% all",
        cost: "€512.70",
        status: "selected",
      },
      {
        id: "B",
        plan: "Szczecin 720 to Warsaw, Szczecin 150 to Stockholm, Cheb 270 to Prague",
        fillRate: "100% Warsaw+Prague, 100% Stockholm",
        cost: "€463.20",
        status: "rejected",
        reason: "Szczecin drops to 110 — below 150 SS",
      },
      {
        id: "C",
        plan: "Szczecin 720 to Warsaw, Berlin 150 to Stockholm, Cheb 270 to Prague",
        fillRate: "100% Warsaw, 100% Stockholm",
        cost: "€481.50",
        status: "rejected",
        reason: "Szczecin at 260 but fully committed — no buffer for demand volatility during promo",
      },
    ],
    whySelected: [
      "Warsaw gets 720 units via split (530 Szczecin + 190 Berlin) — full promo coverage",
      "Szczecin retains 300 above SS — buffer for promo demand volatility",
      "Berlin covers Stockholm as alternate — Szczecin preserved for Warsaw",
      "Cheb handles Prague promo directly — ample stock",
      "Post-promo dampening already scheduled to prevent overstock",
    ],
    whyNotRejected: [
      {
        option: "Option B",
        reason: "Depletes Szczecin to 110 — below 150 SS. During a promo, demand volatility is high and buffer is critical.",
      },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-021", sku: "BAT-1104", from: "Szczecin DC", to: "Warsaw", qty: 530, dispatch: "26-Mar", delivery: "27-Mar", cost: "€169.60" },
      { stoId: "STO-022", sku: "BAT-1104", from: "Berlin DC", to: "Warsaw", qty: 190, dispatch: "26-Mar", delivery: "28-Mar", cost: "€110.20" },
      { stoId: "STO-023", sku: "BAT-1104", from: "Berlin DC", to: "Stockholm", qty: 150, dispatch: "26-Mar", delivery: "28-Mar", cost: "€97.50" },
      { stoId: "STO-024", sku: "BAT-1104", from: "Cheb DC", to: "Prague", qty: 270, dispatch: "26-Mar", delivery: "26-Mar", cost: "€59.40" },
      { stoId: "STO-025", sku: "BAT-1104", from: "Berlin DC", to: "Hamburg", qty: 200, dispatch: "26-Mar", delivery: "27-Mar", cost: "€76.00" },
    ],
    postPlan: [
      { dc: "Szczecin", newAvailable: "300", vsSS: "✅ +150", impact: "Promo buffer maintained" },
      { dc: "Berlin", newAvailable: "540", vsSS: "✅ +290", impact: "Healthy" },
      { dc: "Ghent", newAvailable: "30", vsSS: "⚠️ Below SS", impact: "Untouched (already tight)" },
      { dc: "Cheb", newAvailable: "370", vsSS: "✅ +270", impact: "Healthy" },
    ],
    networkFillRate: "100% across all served distributors",
  },
};

export const uc3 = uc3PromoDriven;
