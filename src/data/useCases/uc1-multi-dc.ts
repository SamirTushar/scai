import { UseCaseData } from "../../types";

export const uc1NodeBalancing: UseCaseData = {
  id: "uc1",
  title: "Data Insights — Pure Node Balancing",
  subtitle:
    "Berlin DC constrained — network splits across Szczecin and Cheb to fulfill Hamburg, Munich, and Vienna",
  skuCode: "BRK-4712",
  sourceId: "Berlin DC",
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
          { distributor: "Hamburg", region: "North Germany", primaryDC: "Berlin", demand14Day: 360, priority: "A" },
          { distributor: "Munich", region: "South Germany", primaryDC: "Berlin", demand14Day: 280, priority: "A" },
          { distributor: "Vienna", region: "Austria", primaryDC: "Berlin", demand14Day: 280, priority: "B" },
          { distributor: "Warsaw", region: "Poland", primaryDC: "Szczecin", demand14Day: 190, priority: "B" },
          { distributor: "Stockholm", region: "Sweden", primaryDC: "Szczecin", demand14Day: 150, priority: "B" },
          { distributor: "Antwerp", region: "Belgium", primaryDC: "Ghent", demand14Day: 310, priority: "A" },
          { distributor: "Lyon", region: "France", primaryDC: "Ghent", demand14Day: 180, priority: "A" },
          { distributor: "Prague", region: "Czech Republic", primaryDC: "Cheb", demand14Day: 145, priority: "B" },
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
          { dc: "Berlin", gih: 520, committed: "0", atp: 520, safetyStock: 200 },
          { dc: "Szczecin", gih: 1840, committed: "340 (Warsaw+Stockholm)", atp: 1500, safetyStock: 150 },
          { dc: "Ghent", gih: 620, committed: "490 (Antwerp+Lyon)", atp: 130, safetyStock: 200 },
          { dc: "Cheb", gih: 580, committed: "145 (Prague)", atp: 435, safetyStock: 100 },
        ],
      },
      {
        title: "Fulfillment Routes",
        columns: [
          { key: "route", label: "Route" },
          { key: "leadTime", label: "Lead Time" },
          { key: "costPerUnit", label: "Cost/Unit" },
        ],
        rows: [
          { route: "Berlin → Hamburg", leadTime: "1 day", costPerUnit: "€0.38/unit" },
          { route: "Berlin → Munich", leadTime: "1 day", costPerUnit: "€0.45/unit" },
          { route: "Berlin → Vienna", leadTime: "1.5 days", costPerUnit: "€0.52/unit" },
          { route: "Szczecin → Hamburg", leadTime: "1.5 days", costPerUnit: "€0.52/unit" },
          { route: "Szczecin → Munich", leadTime: "2 days", costPerUnit: "€0.78/unit" },
          { route: "Szczecin → Vienna", leadTime: "2.5 days", costPerUnit: "€0.95/unit" },
          { route: "Cheb → Vienna", leadTime: "0.5 day", costPerUnit: "€0.30/unit" },
          { route: "Cheb → Munich", leadTime: "1 day", costPerUnit: "€0.42/unit" },
          { route: "Cheb → Prague", leadTime: "0.5 day", costPerUnit: "€0.25/unit" },
        ],
      },
    ],
  },
  configuration: [
    { rule: "Objective", setting: "Maximize fill rate for Priority A distributors first, then B" },
    { rule: "Allocation Order", setting: "Priority A first, then B — within each tier, largest gap first" },
    { rule: "Qty Logic", setting: "Fill demand up to DC available-to-promise, then seek alternates" },
    { rule: "Hard Constraint", setting: "No DC drops below safety stock" },
    { rule: "Split Shipment", setting: "Allowed when primary DC cannot fulfill full demand" },
    { rule: "Alternate DC Selection", setting: "1. Lowest cost route, 2. Highest surplus, 3. Shortest lead time" },
    { rule: "Dispatch Logic", setting: "Plan dispatch to meet delivery date minus lead time" },
  ],
  optimizer: {
    trigger:
      "Berlin ATP (520) < Berlin-served demand (920). Shortfall = 400 units. System splits across network.",
    options: [
      {
        id: "A",
        plan: "Berlin 180+140 (partial), Szczecin 180+140 (alt), Cheb 280 (Vienna)",
        fillRate: "100% all",
        cost: "€418.20",
        status: "selected",
      },
      {
        id: "B",
        plan: "Berlin 360+160, Szczecin → Munich 120, Cheb → Vienna 280",
        fillRate: "100% Hamburg, 57% Munich",
        cost: "€382.40",
        status: "rejected",
        reason: "Munich Priority A short-shipped 120 units",
      },
      {
        id: "C",
        plan: "Berlin 520 to Hamburg only, Szczecin → Munich 280 + Vienna 280",
        fillRate: "100% Hamburg, 100% Munich",
        cost: "€512.80",
        status: "rejected",
        reason: "Costlier — Szczecin to Vienna expensive, ignores Cheb proximity",
      },
      {
        id: "D",
        plan: "Ghent → Hamburg 180, Berlin → Munich 280, Cheb → Vienna 280",
        fillRate: "100% all",
        cost: "€445.60",
        status: "rejected",
        reason: "Depletes Ghent below safety stock, risks Antwerp/Lyon",
      },
    ],
    whySelected: [
      "All Priority A distributors (Hamburg, Munich) receive 100% fill",
      "Berlin ships what it can (320 total), preserving 200 safety stock",
      "Szczecin covers Hamburg+Munich shortfall — surplus of 1,500 available",
      "Cheb serves Vienna directly — cheapest route at €0.30/unit, 0.5-day delivery",
      "No DC drops below safety stock",
    ],
    whyNotRejected: [
      {
        option: "Option B",
        reason: "Prioritizes Hamburg over Munich but Munich is also Priority A — unfair allocation",
      },
      {
        option: "Option D",
        reason: "Uses Ghent which has only 130 available after commitments — drops below 200 SS",
      },
    ],
  },
  result: {
    stos: [
      { stoId: "STO-001", sku: "BRK-4712", from: "Berlin DC", to: "Hamburg", qty: 180, dispatch: "26-Mar", delivery: "27-Mar", cost: "€68.40" },
      { stoId: "STO-002", sku: "BRK-4712", from: "Berlin DC", to: "Munich", qty: 140, dispatch: "26-Mar", delivery: "27-Mar", cost: "€63.00" },
      { stoId: "STO-003", sku: "BRK-4712", from: "Szczecin DC", to: "Hamburg", qty: 180, dispatch: "26-Mar", delivery: "28-Mar", cost: "€93.60" },
      { stoId: "STO-004", sku: "BRK-4712", from: "Szczecin DC", to: "Munich", qty: 140, dispatch: "26-Mar", delivery: "28-Mar", cost: "€109.20" },
      { stoId: "STO-005", sku: "BRK-4712", from: "Cheb DC", to: "Vienna", qty: 280, dispatch: "26-Mar", delivery: "26-Mar", cost: "€84.00" },
    ],
    postPlan: [
      { dc: "Berlin", newAvailable: "0 (at SS)", vsSS: "✅ At floor", impact: "Fully utilized" },
      { dc: "Szczecin", newAvailable: "1,180", vsSS: "✅ +1,030", impact: "Healthy" },
      { dc: "Ghent", newAvailable: "130", vsSS: "⚠️ At SS-70", impact: "Untouched (preserved for Antwerp/Lyon)" },
      { dc: "Cheb", newAvailable: "155", vsSS: "✅ +55", impact: "Adequate" },
    ],
    networkFillRate: "100% across all served distributors",
  },
};

export const uc1 = uc1NodeBalancing;
