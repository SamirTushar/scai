import { SummaryCardData } from "../types";

export const summaryCards: SummaryCardData[] = [
  {
    title: "Plan Summary",
    icon: "info",
    items: [
      { label: "SKU Count", value: 42, color: "#E8453C" },
      { label: "Destination Count", value: 12, color: "#E8453C" },
      { label: "Source Count", value: 4, color: "#E8453C" },
    ],
  },
  {
    title: "Plan Metrics",
    icon: "info",
    items: [
      { label: "SKU Orders", value: 847 },
    ],
  },
  {
    title: "Approval Status",
    icon: "info",
    items: [
      { label: "Pending", value: 847, color: "#F59E0B" },
      { label: "Approved", value: 0, color: "#10B981" },
      { label: "Rejected", value: 0, color: "#EF4444" },
    ],
  },
  {
    title: "Demand Fulfillment Rate",
    icon: "info",
    items: [
      { label: "Percentage", value: "91.34%", color: "#10B981" },
      { label: "Demand Value", value: 0 },
      { label: "Fulfilled Demand Value", value: "2,845,612.50", color: "#10B981" },
    ],
  },
  {
    title: "Lost Sales %",
    icon: "info",
    items: [
      { label: "Percentage", value: "3.21%", color: "#EF4444" },
      { label: "Volume", value: "18,420" },
      { label: "Value", value: 0 },
    ],
  },
];
