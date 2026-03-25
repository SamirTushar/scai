import { UseCaseData } from "../../types";

export const uc2DemandSensing: UseCaseData = {
  id: "uc2",
  title: "Data Insights — Node Balancing + Demand Sensing",
  subtitle:
    "Fleet recall signal spikes Antwerp demand — Ghent partially depleted, Berlin and Szczecin rebalance",
  skuCode: "ALT-3305",
  sourceId: "Ghent DC",
  destinationId: "Antwerp Dist.",
  inputs: {
    sections: [
      {
        title: "Distributor Demand",
        columns: [
          { key: "distributor", label: "Distributor" },
          { key: "region", label: "Region" },
          { key: "primaryDC", label: "Primary DC" },
          { key: "statisticalForecast", label: "Statistical Forecast" },
          { key: "sensingAdj", label: "Sensing Adj." },
          { key: "finalDemand", label: "Final 14-Day Demand" },
          { key: "signalSource", label: "Signal Source" },
        ],
        rows: [
          { distributor: "Antwerp", region: "Belgium", primaryDC: "Ghent", statisticalForecast: 260, sensingAdj: "+190", finalDemand: 450, signalSource: "Fleet recall advisory" },
          { distributor: "Lyon", region: "France", primaryDC: "Ghent", statisticalForecast: 180, sensingAdj: "0", finalDemand: 180, signalSource: "No adjustment" },
          { distributor: "Hamburg", region: "North Germany", primaryDC: "Berlin", statisticalForecast: 140, sensingAdj: "+20", finalDemand: 160, signalSource: "POS velocity uptick" },
          { distributor: "Munich", region: "South Germany", primaryDC: "Berlin", statisticalForecast: 95, sensingAdj: "0", finalDemand: 95, signalSource: "No adjustment" },
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
          { dc: "Ghent", gih: 580, committed: "130 (Lyon baseline)", atp: 450, safetyStock: 200 },
          { dc: "Berlin", gih: 820, committed: "255 (Hamburg+Munich)", atp: 565, safetyStock: 180 },
          { dc: "Szczecin", gih: 640, committed: "190 (Warsaw)", atp: 450, safetyStock: 150 },
          { dc: "Cheb", gih: 280, committed: "145 (Prague)", atp: 135, safetyStock: 100 },
        ],
      },
      {
        title: "External Signals Consumed",
        columns: [
          { key: "signal", label: "Signal" },
          { key: "source", label: "Source" },
          { key: "systemImpact", label: "System Impact" },
          { key: "confidence", label: "Confidence" },
        ],
        rows: [
          { signal: "Fleet recall advisory — Mercedes C-Class alternator", source: "S&OE / OEM bulletin", systemImpact: "+73% demand uplift at Antwerp", confidence: "High" },
          { signal: "POS velocity increase — Hamburg", source: "S&OE / Retailer POS feed", systemImpact: "+14% demand uplift", confidence: "Medium" },
        ],
      },
    ],
  },
  configuration: [
    { rule: "Demand Input", setting: "Statistical forecast adjusted by S&OE demand sensing signals" },
    { rule: "Signal Integration", setting: "IH integration with APO SNP + internal S&OE component" },
    { rule: "Adjustment Method", setting: "Multiplicative overlay — sensing signal scales base forecast" },
    { rule: "Confidence Threshold", setting: "Only signals with Medium or higher confidence applied" },
    { rule: "Override Policy", setting: "Planner can override sensing adjustment before approval" },
    { rule: "Node Balancing", setting: "When sensing-adjusted demand exceeds primary DC ATP, system sources from alternates" },
  ],
  optimizer: {
    trigger:
      "Demand sensing signal raised Antwerp forecast from 260 to 450 (+73%). Ghent ATP (450) barely covers Antwerp alone — Lyon (180) cannot be served from Ghent.",
    options: [
      {
        id: "A",
        plan: "Ghent 420 to Antwerp, Berlin 30 to Antwerp, Szczecin 180 to Lyon",
        fillRate: "100% Antwerp, 100% Lyon",
        cost: "€282.60",
        status: "selected",
      },
      {
        id: "B",
        plan: "Ghent 450 to Antwerp, Szczecin 180 to Lyon",
        fillRate: "100% Antwerp, 100% Lyon",
        cost: "€293.40",
        status: "rejected",
        reason: "Ghent drops to 0 available — below 200 SS",
      },
      {
        id: "C",
        plan: "Ghent 260 to Antwerp (ignore sensing), Ghent 180 to Lyon",
        fillRate: "58% Antwerp",
        cost: "€123.20",
        status: "rejected",
        reason: "Ignores high-confidence signal, 190 units lost sales on safety-critical part",
      },
    ],
    whySelected: [
      "Fleet recall is high-confidence signal — undershipping risks lost sales on safety-critical part",
      "Ghent ships 420 to Antwerp (retains 30 buffer above SS)",
      "Berlin covers remaining 30 units to Antwerp — minimal cost",
      "Szczecin serves Lyon as alternate — Ghent fully committed to Antwerp",
      "All distributors at 100% fill",
    ],
    whyNotRejected: [
      {
        option: "Option B",
        reason: "Depletes Ghent to 0 available — violates 200 safety stock floor",
      },
      {
        option: "Option C",
        reason: "Ignores validated fleet recall signal. 190 units of lost sales on a safety-critical alternator.",
      },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-011", sku: "ALT-3305", from: "Ghent DC", to: "Antwerp", qty: 420, dispatch: "26-Mar", delivery: "26-Mar", cost: "€117.60" },
      { stoId: "STO-012", sku: "ALT-3305", from: "Berlin DC", to: "Antwerp", qty: 30, dispatch: "26-Mar", delivery: "28-Mar", cost: "€17.40" },
      { stoId: "STO-013", sku: "ALT-3305", from: "Szczecin DC", to: "Lyon", qty: 180, dispatch: "26-Mar", delivery: "29-Mar", cost: "€147.60" },
    ],
    postPlan: [
      { dc: "Ghent", newAvailable: "30 (just above SS)", vsSS: "⚠️ At floor", impact: "Tight — sensing absorbed" },
      { dc: "Berlin", newAvailable: "535", vsSS: "✅ +355", impact: "Healthy" },
      { dc: "Szczecin", newAvailable: "270", vsSS: "✅ +120", impact: "Adequate" },
      { dc: "Cheb", newAvailable: "135", vsSS: "✅ Untouched", impact: "Covers Prague" },
    ],
    networkFillRate: "100% across Antwerp and Lyon",
  },
};

export const uc2 = uc2DemandSensing;
