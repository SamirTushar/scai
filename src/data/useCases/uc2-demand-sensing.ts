import { UseCaseData } from "../../types";

export const uc2: UseCaseData = {
  id: "uc2",
  title: "Data Insights — Demand Sensing / External Signals",
  subtitle: "S&OE integration adjusts forecast based on external signals",
  skuCode: "ALT-3305",
  sourceId: "Ghent DC",
  destinationId: "Antwerp Dist.",
  inputs: {
    sections: [
      {
        title: "Distributor Demand (with Sensing Adjustments)",
        columns: [
          { key: "distributor", label: "Distributor" },
          { key: "region", label: "Region" },
          { key: "primaryDC", label: "Primary DC" },
          { key: "statForecast", label: "Statistical Forecast" },
          { key: "sensingAdj", label: "Demand Sensing Adj." },
          { key: "finalDemand", label: "Final 14-Day Demand" },
          { key: "signalSource", label: "Signal Source" },
        ],
        rows: [
          { distributor: "Antwerp Dist.", region: "Belgium", primaryDC: "Ghent", statForecast: 220, sensingAdj: "+90", finalDemand: 310, signalSource: "S&OE: fleet recall advisory" },
          { distributor: "Prague Dist.", region: "Czech Rep.", primaryDC: "Cheb", statForecast: 95, sensingAdj: "0", finalDemand: 95, signalSource: "No adjustment" },
          { distributor: "Hamburg Dist.", region: "North Germany", primaryDC: "Berlin", statForecast: 140, sensingAdj: "+20", finalDemand: 160, signalSource: "POS velocity uptick" },
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
          { dc: "Ghent", gih: 1450, committed: "0", atp: 1450, safetyStock: 200 },
          { dc: "Berlin", gih: 980, committed: "160 (Hamburg)", atp: 820, safetyStock: 180 },
          { dc: "Cheb", gih: 420, committed: "95 (Prague)", atp: 325, safetyStock: 80 },
        ],
      },
      {
        title: "External Signals Consumed",
        columns: [
          { key: "signal", label: "Signal" },
          { key: "source", label: "Source System" },
          { key: "impact", label: "Impact" },
          { key: "confidence", label: "Confidence" },
        ],
        rows: [
          { signal: "Fleet recall advisory — Mercedes C-Class alternator", source: "S&OE / OEM bulletin", impact: "+41% demand uplift at Antwerp", confidence: "High" },
          { signal: "POS velocity increase — Hamburg", source: "S&OE / Retailer POS feed", impact: "+14% demand uplift", confidence: "Medium" },
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
  ],
  optimizer: {
    trigger: "Demand sensing signal raised Antwerp forecast from 220 to 310 (+41%).",
    options: [
      { id: "A", plan: "Ghent ships 310 (sensing-adjusted qty)", fillRate: "100%", cost: "€86.80", status: "selected" },
      { id: "B", plan: "Ghent ships 220 (ignore sensing signal)", fillRate: "71%", cost: "€61.60", status: "rejected", reason: "Ignores validated signal, 90 units at risk" },
    ],
    whySelected: [
      "Fleet recall is a high-confidence signal.",
      "Undershipping risks 90 units of lost sales on a safety-critical part.",
      "Ghent has 1,450 available — no constraint.",
    ],
    whyNotRejected: [
      { option: "Option B: Ghent ships 220", reason: "Ignores validated high-confidence signal. 90 units at risk of lost sales on a safety-critical alternator part." },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-250326-ALT3305-001", sku: "ALT-3305", from: "Ghent DC", to: "Antwerp Dist.", qty: 310, dispatch: "26-Mar", delivery: "27-Mar", cost: "€86.80" },
    ],
    postPlan: [
      { dc: "Ghent", newAvailable: "1,140", vsSS: "✅ +940", impact: "Healthy, sensing signal absorbed" },
    ],
    networkFillRate: "100% across all distributors",
  },
};
