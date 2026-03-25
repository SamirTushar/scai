import { UseCaseData } from "../../types";

export const uc5MultiEchelon: UseCaseData = {
  id: "uc5",
  title: "Data Insights — Multi-Echelon CDC → DC Allocation",
  subtitle:
    "Duisburg CDC replenishes all 4 DCs — allocation prioritized by downstream demand score and days-of-supply",
  skuCode: "FLT-1190",
  sourceId: "Duisburg CDC",
  destinationId: "Berlin DC",
  inputs: {
    sections: [
      {
        title: "DC Requirements & Days of Supply",
        columns: [
          { key: "dc", label: "DC" },
          { key: "downstream", label: "Downstream" },
          { key: "requirement", label: "Requirement" },
          { key: "currentStock", label: "Current Stock" },
          { key: "dos", label: "Days of Supply" },
          { key: "status", label: "Status" },
        ],
        rows: [
          {
            dc: "Berlin",
            downstream: "Priority A downstream (Hamburg, Munich)",
            requirement: 2400,
            currentStock: 1200,
            dos: "3.5 days",
            status: "Below target (7d)",
          },
          {
            dc: "Ghent",
            downstream: "Priority A downstream (Antwerp, Lyon)",
            requirement: 1900,
            currentStock: 980,
            dos: "3.6 days",
            status: "Below target (7d)",
          },
          {
            dc: "Cheb",
            downstream: "Priority B downstream (Prague)",
            requirement: 1200,
            currentStock: 450,
            dos: "2.6 days",
            status: "Critical (< 3d)",
          },
          {
            dc: "Szczecin",
            downstream: "Priority B downstream (Warsaw, Stockholm)",
            requirement: 1000,
            currentStock: 620,
            dos: "4.3 days",
            status: "Below target (7d)",
          },
        ],
      },
      {
        title: "CDC Inventory",
        columns: [
          { key: "location", label: "Location" },
          { key: "onHand", label: "On Hand" },
          { key: "reserved", label: "Reserved" },
          { key: "available", label: "Available" },
          { key: "safetyStock", label: "Safety Stock" },
        ],
        rows: [
          {
            location: "Duisburg CDC",
            onHand: 8200,
            reserved: 0,
            available: 8200,
            safetyStock: 1500,
          },
        ],
      },
      {
        title: "DC Priority Scoring",
        columns: [
          { key: "dc", label: "DC" },
          { key: "demandWeight", label: "Priority A Demand Weight" },
          { key: "dosWeight", label: "DOS Weight" },
          { key: "combinedScore", label: "Combined Score" },
          { key: "allocationPriority", label: "Allocation Priority" },
        ],
        rows: [
          {
            dc: "Berlin",
            demandWeight: "0.40 (highest A demand)",
            dosWeight: 0.25,
            combinedScore: 0.65,
            allocationPriority: "1st",
          },
          {
            dc: "Ghent",
            demandWeight: 0.35,
            dosWeight: 0.24,
            combinedScore: 0.59,
            allocationPriority: "2nd",
          },
          {
            dc: "Cheb",
            demandWeight: 0.15,
            dosWeight: "0.35 (lowest DOS)",
            combinedScore: 0.5,
            allocationPriority: "3rd",
          },
          {
            dc: "Szczecin",
            demandWeight: 0.1,
            dosWeight: 0.16,
            combinedScore: 0.26,
            allocationPriority: "4th",
          },
        ],
      },
    ],
  },
  configuration: [
    {
      rule: "Objective",
      setting: "Replenish all DCs to target days-of-supply (7 days) from CDC",
    },
    {
      rule: "Allocation Method",
      setting:
        "Priority scoring — weighted combination of downstream demand priority + current DOS",
    },
    {
      rule: "Hard Constraint",
      setting: "CDC retains 1,500 safety stock",
    },
    {
      rule: "Hard Constraint",
      setting:
        "Each DC receives at minimum enough to not drop below their own SS",
    },
    {
      rule: "Priority A DCs",
      setting: "Fully replenished to target first",
    },
    {
      rule: "Priority B DCs",
      setting: "Receive remaining allocation after A DCs served",
    },
    {
      rule: "Capacity",
      setting:
        "CDC can dispatch max 8,000 units per cycle (truck fleet constraint)",
    },
  ],
  optimizer: {
    trigger:
      "All 4 DCs below 7-day DOS target. CDC has 8,200 available. Total DC requirement: 6,500. CDC capacity this cycle: 6,700 (8,200 - 1,500 SS).",
    options: [
      {
        id: "A",
        plan: "Berlin 2,400 + Ghent 1,900 + Cheb 1,200 + Szczecin 1,000 = 6,500",
        fillRate: "100% all DCs",
        cost: "€1,740.00",
        status: "selected",
      },
      {
        id: "B",
        plan: "Berlin 2,400 + Ghent 1,900 + Cheb 1,200 + Szczecin 700 (partial)",
        fillRate: "100% A DCs, 70% Szczecin",
        cost: "€1,608.00",
        status: "rejected",
        reason: "Underfunds Szczecin — Warsaw and Stockholm at risk",
      },
      {
        id: "C",
        plan: "Equal split 1,625 each",
        fillRate:
          "Varies — Berlin/Ghent underfilled, Cheb/Szczecin overfilled",
        cost: "€1,740.00",
        status: "rejected",
        reason: "Ignores priority scoring — Priority A DCs underfunded",
      },
      {
        id: "D",
        plan: "Berlin 3,000 + Ghent 2,200 + Cheb 800 + Szczecin 500",
        fillRate: "Berlin/Ghent overfilled, Cheb critical",
        cost: "€1,740.00",
        status: "rejected",
        reason: "Overstocks A DCs, Cheb drops to critical DOS",
      },
    ],
    whySelected: [
      "All 4 DCs receive their full requirement — 6,500 total within CDC capacity of 6,700",
      "Priority scoring ensures Berlin (score 0.65) and Ghent (0.59) are allocated first",
      "Cheb (lowest DOS at 2.6 days) receives full 1,200 — critical replenishment",
      "Szczecin gets full allocation — Warsaw and Stockholm protected",
      "CDC retains 1,700 (above 1,500 SS) — healthy buffer",
    ],
    whyNotRejected: [
      {
        option: "Option B",
        reason:
          "Saves €132 but leaves Szczecin with only 700 of 1,000 needed. Warsaw (Priority B) would face 30% gap.",
      },
      {
        option: "Option C",
        reason:
          "Equal split ignores that Berlin needs 2,400 and Cheb only 1,200. Would overfund Cheb/Szczecin while underfunding Berlin/Ghent.",
      },
    ],
  },
  result: {
    stos: [
      {
        stoId: "STO-041",
        sku: "FLT-1190",
        from: "Duisburg CDC",
        to: "Berlin DC",
        qty: 2400,
        dispatch: "26-Mar",
        delivery: "27-Mar",
        cost: "€528.00",
      },
      {
        stoId: "STO-042",
        sku: "FLT-1190",
        from: "Duisburg CDC",
        to: "Ghent DC",
        qty: 1900,
        dispatch: "26-Mar",
        delivery: "26-Mar",
        cost: "€342.00",
      },
      {
        stoId: "STO-043",
        sku: "FLT-1190",
        from: "Duisburg CDC",
        to: "Cheb DC",
        qty: 1200,
        dispatch: "26-Mar",
        delivery: "28-Mar",
        cost: "€420.00",
      },
      {
        stoId: "STO-044",
        sku: "FLT-1190",
        from: "Duisburg CDC",
        to: "Szczecin DC",
        qty: 1000,
        dispatch: "26-Mar",
        delivery: "28-Mar",
        cost: "€450.00",
      },
    ],
    postPlan: [
      {
        dc: "Duisburg CDC",
        newAvailable: "1,700",
        vsSS: "✅ +200 above SS",
        impact: "Healthy",
      },
      {
        dc: "Berlin",
        newAvailable: "3,600",
        vsSS: "✅ 10.5 days DOS",
        impact: "Target exceeded",
      },
      {
        dc: "Ghent",
        newAvailable: "2,880",
        vsSS: "✅ 10.6 days DOS",
        impact: "Target exceeded",
      },
      {
        dc: "Cheb",
        newAvailable: "1,650",
        vsSS: "✅ 9.6 days DOS",
        impact: "Target met",
      },
      {
        dc: "Szczecin",
        newAvailable: "1,620",
        vsSS: "✅ 11.3 days DOS",
        impact: "Target exceeded",
      },
    ],
    networkFillRate:
      "100% — all DCs replenished to above 7-day DOS target",
  },
};
