import { UseCaseData } from "../../types";

export const uc4IntermittentDemand: UseCaseData = {
  id: "uc4",
  title: "Data Insights — Node Balancing + Intermittent Demand",
  subtitle:
    "Porsche water pump burst order — Cheb has only 12 available, all 4 DCs pool stock to fulfill 45 units",
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
          { key: "qty", label: "Qty" },
          { key: "forecastMethod", label: "Forecast Method" },
          { key: "confidence", label: "Confidence" },
          { key: "demandPattern", label: "Demand Pattern" },
        ],
        rows: [
          {
            distributor: "Prague",
            region: "Czech Republic",
            primaryDC: "Cheb",
            qty: 45,
            forecastMethod: "Croston (intermittent)",
            confidence: 0.82,
            demandPattern: "Lumpy/Slow-moving",
          },
          {
            distributor: "Munich",
            region: "South Germany",
            primaryDC: "Berlin",
            qty: 6,
            forecastMethod: "Croston",
            confidence: 0.91,
            demandPattern: "Lumpy/Slow-moving",
          },
        ],
      },
      {
        title: "Demand History (Last 12 Weeks — Prague)",
        columns: [
          { key: "week", label: "Week" },
          { key: "qty", label: "Qty" },
        ],
        rows: [
          { week: 1, qty: 0 },
          { week: 2, qty: 0 },
          { week: 3, qty: 4 },
          { week: 4, qty: 0 },
          { week: 5, qty: 0 },
          { week: 6, qty: 0 },
          { week: 7, qty: 8 },
          { week: 8, qty: 0 },
          { week: 9, qty: 0 },
          { week: 10, qty: 3 },
          { week: 11, qty: 0 },
          { week: 12, qty: 0 },
          { week: "Burst", qty: 45 },
        ],
      },
      {
        title: "DC Inventory",
        columns: [
          { key: "dc", label: "DC" },
          { key: "onHand", label: "On Hand" },
          { key: "reserved", label: "Reserved" },
          { key: "available", label: "Available" },
          { key: "safetyStock", label: "Safety Stock" },
        ],
        rows: [
          {
            dc: "Cheb",
            onHand: 22,
            reserved: 0,
            available: 22,
            safetyStock: 10,
          },
          {
            dc: "Berlin",
            onHand: 18,
            reserved: "6 (Munich)",
            available: 12,
            safetyStock: 8,
          },
          {
            dc: "Szczecin",
            onHand: 14,
            reserved: 0,
            available: 14,
            safetyStock: 6,
          },
          {
            dc: "Ghent",
            onHand: 15,
            reserved: 0,
            available: 15,
            safetyStock: 5,
          },
        ],
      },
      {
        title: "Fulfillment Routes to Prague",
        columns: [
          { key: "route", label: "Route" },
          { key: "leadTime", label: "Lead Time" },
          { key: "costPerUnit", label: "Cost/Unit" },
        ],
        rows: [
          {
            route: "Cheb → Prague",
            leadTime: "0.5 day",
            costPerUnit: "€0.30/unit",
          },
          {
            route: "Berlin → Prague",
            leadTime: "1.5 days",
            costPerUnit: "€0.52/unit",
          },
          {
            route: "Szczecin → Prague",
            leadTime: "2 days",
            costPerUnit: "€0.68/unit",
          },
          {
            route: "Ghent → Prague",
            leadTime: "2.5 days",
            costPerUnit: "€0.85/unit",
          },
        ],
      },
    ],
  },
  configuration: [
    {
      rule: "Forecast Method",
      setting: "Croston/SBA (auto-selected for CV > 0.5)",
    },
    {
      rule: "Safety Stock",
      setting: "Elevated — 1.8x standard multiplier for intermittent SKUs",
    },
    {
      rule: "Reorder Trigger",
      setting: "Distributor projected stock < SS within planning horizon",
    },
    {
      rule: "Min Replenishment",
      setting: "Higher of forecast demand or min order qty",
    },
    {
      rule: "Network Pooling",
      setting:
        "When primary DC cannot fill, system pools stock across all DCs",
    },
    {
      rule: "Service Level Target",
      setting: "95% (same as fast-movers)",
    },
  ],
  optimizer: {
    trigger:
      "Prague burst order: 45 units. Cheb ATP = 22. Total network ATP = 63. System pools from all 4 DCs.",
    options: [
      {
        id: "A",
        plan: "Cheb 12, Berlin 8, Szczecin 8, Ghent 10 (+ Berlin 6 to Munich)",
        fillRate: "84% Prague (38 of 45), 100% Munich",
        cost: "€24.40",
        status: "selected",
      },
      {
        id: "B",
        plan: "Cheb 22, Berlin 12, Szczecin 8 (Prague only)",
        fillRate: "93% Prague (42 of 45)",
        cost: "€23.10",
        status: "rejected",
        reason: "Depletes Cheb and Berlin below safety stock",
      },
      {
        id: "C",
        plan: "Cheb 12 only to Prague, backorder 33",
        fillRate: "27% Prague",
        cost: "€3.60",
        status: "rejected",
        reason: "Massive unfill — 33 units backordered",
      },
      {
        id: "D",
        plan: "All to Prague: Cheb 22+Berlin 12+Szczecin 14+Ghent 15 = 63",
        fillRate: "100% Prague (excess)",
        cost: "€37.85",
        status: "rejected",
        reason: "Depletes entire network below SS for a niche SKU",
      },
    ],
    whySelected: [
      "Pools stock from all 4 DCs while keeping each above safety stock minimum",
      "Cheb ships 12 (retains 10 = SS), Berlin ships 8 (retains 4, slightly below SS but acceptable for niche SKU)",
      "38 of 45 units filled (84%) — remaining 7 backordered for next cycle",
      "Munich still gets 6 units from Berlin — normal demand preserved",
      "Croston method correctly sized the burst — moving average would have suggested only 3 units",
    ],
    whyNotRejected: [
      {
        option: "Option B",
        reason:
          "Fills 93% but depletes Cheb to 0 and Berlin to 0 — both below safety stock. Risk: if another burst hits, zero buffer.",
      },
      {
        option: "Option D",
        reason:
          "100% fill but destroys network-wide safety stock for a slow-moving niche part. Capital tied in transit exceeds the value of 7 extra units.",
      },
    ],
  },
  result: {
    stos: [
      {
        stoId: "STO-031",
        sku: "WPM-0987",
        from: "Cheb DC",
        to: "Prague",
        qty: 12,
        dispatch: "26-Mar",
        delivery: "26-Mar",
        cost: "€3.60",
      },
      {
        stoId: "STO-032",
        sku: "WPM-0987",
        from: "Berlin DC",
        to: "Prague",
        qty: 8,
        dispatch: "26-Mar",
        delivery: "28-Mar",
        cost: "€4.16",
      },
      {
        stoId: "STO-033",
        sku: "WPM-0987",
        from: "Szczecin DC",
        to: "Prague",
        qty: 8,
        dispatch: "26-Mar",
        delivery: "28-Mar",
        cost: "€5.44",
      },
      {
        stoId: "STO-034",
        sku: "WPM-0987",
        from: "Ghent DC",
        to: "Prague",
        qty: 10,
        dispatch: "26-Mar",
        delivery: "29-Mar",
        cost: "€8.50",
      },
      {
        stoId: "STO-035",
        sku: "WPM-0987",
        from: "Berlin DC",
        to: "Munich",
        qty: 6,
        dispatch: "26-Mar",
        delivery: "27-Mar",
        cost: "€2.70",
      },
    ],
    postPlan: [
      {
        dc: "Cheb",
        newAvailable: "10 (at SS)",
        vsSS: "✅ At floor",
        impact: "Fully utilized",
      },
      {
        dc: "Berlin",
        newAvailable: "4",
        vsSS: "⚠️ Below SS by 4",
        impact: "Acceptable for niche SKU",
      },
      {
        dc: "Szczecin",
        newAvailable: "6 (at SS)",
        vsSS: "✅ At floor",
        impact: "Pooled",
      },
      {
        dc: "Ghent",
        newAvailable: "5 (at SS)",
        vsSS: "✅ At floor",
        impact: "Pooled",
      },
    ],
    networkFillRate:
      "84% Prague (38/45 — 7 backordered), 100% Munich. 7 units backordered for next replenishment cycle",
  },
};
