export interface ColumnDef {
  key: string;
  label: string;
  width?: string;
  format?: "text" | "number" | "currency" | "date" | "boolean" | "percent";
  align?: "left" | "right" | "center";
}

export interface CardItemConfig {
  label: string;
  value: string | number;
  color?: string;
}

export interface CardConfig {
  title: string;
  icon: string; // lucide icon name
  iconBg: string;
  iconColor: string;
  topBorderColor: string;
  heroValue?: string | number;
  heroColor?: string;
  items: CardItemConfig[];
}

export interface ModuleConfig {
  breadcrumb: { period: string; title: string };
  statusLabel: string;
  summaryCards: CardConfig[];
  tableColumns: ColumnDef[];
  idField: string;
  statusField: string;
}

export const replenishmentConfig: ModuleConfig = {
  breadcrumb: { period: "DEC 2025", title: "Planning Dashboard" },
  statusLabel: "Planned & Executed",
  idField: "stoId",
  statusField: "status",
  summaryCards: [
    {
      title: "Plan Summary",
      icon: "ClipboardList",
      iconBg: "bg-accent-light",
      iconColor: "text-accent",
      topBorderColor: "border-accent",
      items: [
        { label: "SKU Count", value: 42, color: "text-accent" },
        { label: "Destination Count", value: 12, color: "text-blue-600" },
        { label: "Source Count", value: 4, color: "text-blue-600" },
      ],
    },
    {
      title: "Plan Metrics",
      icon: "BarChart3",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      topBorderColor: "border-blue-400",
      heroValue: 847,
      heroColor: "text-blue-600",
      items: [{ label: "SKU Orders", value: 847 }],
    },
    {
      title: "Approval Status",
      icon: "CheckCircle",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      topBorderColor: "border-amber-400",
      items: [
        { label: "Pending", value: 847, color: "text-amber-600" },
        { label: "Approved", value: 0, color: "text-emerald-600" },
        { label: "Rejected", value: 0, color: "text-red-500" },
      ],
    },
    {
      title: "Demand Fulfillment Rate",
      icon: "TrendingUp",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      topBorderColor: "border-emerald-400",
      heroValue: "91.34%",
      heroColor: "text-emerald-600",
      items: [
        { label: "Demand Value", value: 0 },
        { label: "Fulfilled Demand Value", value: "2,845,612.50", color: "text-emerald-600" },
      ],
    },
    {
      title: "Lost Sales %",
      icon: "AlertTriangle",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      topBorderColor: "border-red-400",
      heroValue: "3.21%",
      heroColor: "text-red-500",
      items: [
        { label: "Volume", value: "18,420" },
        { label: "Value", value: 0 },
      ],
    },
  ],
  tableColumns: [
    { key: "stoId", label: "STO ID", width: "240px" },
    { key: "productName", label: "Product Name", width: "220px" },
    { key: "skuCode", label: "SKU CODE", width: "110px" },
    { key: "startNode", label: "Start Node", width: "130px" },
    { key: "locationEnd", label: "Location End", width: "130px" },
    { key: "manuallyCreated", label: "Manually Created", width: "130px", format: "boolean" },
    { key: "demandForecast", label: "Demand Forecast", width: "140px", format: "number", align: "right" },
    { key: "projectedSales", label: "Projected Sales", width: "130px", format: "number", align: "right" },
    { key: "plannedReplenishmentQty", label: "Planned Qty", width: "110px", format: "number", align: "right" },
    { key: "variableCost", label: "Variable Cost", width: "120px", format: "currency", align: "right" },
    { key: "leadTime", label: "Lead Time", width: "100px" },
    { key: "division", label: "Division", width: "110px" },
  ],
};

export const rmConfig: ModuleConfig = {
  breadcrumb: { period: "MAR 2026", title: "Procurement Dashboard" },
  statusLabel: "Planned & Executed",
  idField: "po_id",
  statusField: "approval_status",
  summaryCards: [
    {
      title: "Plan Summary",
      icon: "ClipboardList",
      iconBg: "bg-accent-light",
      iconColor: "text-accent",
      topBorderColor: "border-accent",
      items: [
        { label: "SKU Count", value: 28, color: "text-accent" },
        { label: "Supplier Count", value: 14, color: "text-blue-600" },
        { label: "Destination DC Count", value: 4, color: "text-blue-600" },
      ],
    },
    {
      title: "Plan Metrics",
      icon: "BarChart3",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      topBorderColor: "border-blue-400",
      heroValue: 186,
      heroColor: "text-blue-600",
      items: [{ label: "Purchase Orders", value: 186 }],
    },
    {
      title: "Approval Status",
      icon: "CheckCircle",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      topBorderColor: "border-amber-400",
      items: [
        { label: "Pending", value: 186, color: "text-amber-600" },
        { label: "Approved", value: 0, color: "text-emerald-600" },
        { label: "Rejected", value: 0, color: "text-red-500" },
      ],
    },
    {
      title: "Procurement Coverage",
      icon: "TrendingUp",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      topBorderColor: "border-emerald-400",
      heroValue: "96.8%",
      heroColor: "text-emerald-600",
      items: [
        { label: "Total Requirement", value: "42,500" },
        { label: "Covered", value: "41,140", color: "text-emerald-600" },
      ],
    },
    {
      title: "SoB Compliance",
      icon: "Shield",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      topBorderColor: "border-blue-400",
      items: [
        { label: "On Target", value: "11 suppliers", color: "text-emerald-600" },
        { label: "Deviation", value: "3 suppliers", color: "text-amber-600" },
      ],
    },
  ],
  tableColumns: [
    { key: "po_id", label: "PO ID", width: "210px" },
    { key: "sku", label: "SKU", width: "200px" },
    { key: "sku_code", label: "SKU Code", width: "100px" },
    { key: "supplier", label: "Supplier", width: "150px" },
    { key: "destination_dc", label: "Destination DC", width: "120px" },
    { key: "required_qty", label: "Required Qty", width: "110px", format: "number", align: "right" },
    { key: "planned_qty", label: "Planned Qty", width: "110px", format: "number", align: "right" },
    { key: "edited_qty", label: "Edited Qty", width: "100px", format: "number", align: "right" },
    { key: "unit_cost", label: "Unit Cost", width: "100px", format: "currency", align: "right" },
    { key: "freight_per_unit", label: "Freight/Unit", width: "100px", format: "currency", align: "right" },
    { key: "landed_cost", label: "Landed Cost", width: "110px", format: "currency", align: "right" },
    { key: "lead_time", label: "Lead Time", width: "100px" },
    { key: "order_date", label: "Order Date", width: "110px", format: "date" },
    { key: "expected_delivery", label: "Expected Delivery", width: "130px", format: "date" },
    { key: "moq", label: "MOQ", width: "80px", format: "number", align: "right" },
    { key: "supplier_capacity", label: "Supplier Capacity", width: "130px", format: "number", align: "right" },
    { key: "sob_target", label: "SoB Target %", width: "110px" },
    { key: "sob_actual", label: "Actual SoB %", width: "110px" },
    { key: "sob_status", label: "SoB Status", width: "110px" },
    { key: "transport_mode", label: "Transport Mode", width: "120px" },
    { key: "total_cost", label: "Total Cost", width: "110px", format: "currency", align: "right" },
  ],
};

export function getModuleConfig(module: "replenishment" | "rm"): ModuleConfig {
  return module === "rm" ? rmConfig : replenishmentConfig;
}
