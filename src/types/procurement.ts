export type ActiveModule = "replenishment" | "rm";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ProcurementRow {
  po_id: string;
  sku: string;
  sku_code: string;
  supplier: string;
  destination_dc: string;
  required_qty: number;
  planned_qty: number;
  edited_qty: number;
  unit_cost: number;
  freight_per_unit: number;
  landed_cost: number;
  lead_time: string;
  order_date: string;
  expected_delivery: string;
  moq: number;
  supplier_capacity: number;
  sob_target: string;
  sob_actual: string;
  sob_status: string;
  transport_mode: string;
  total_cost: number;
  approval_status: ApprovalStatus;
  use_case?: string;
  approved_by?: string;
  comments?: string;
  [key: string]: string | number | undefined;
}

export interface ProcurementUseCaseData {
  id: string;
  title: string;
  subtitle: string;
  skuCode: string;
  supplierId: string;
  destinationDC: string;
  inputs: {
    sections: ProcurementInputSection[];
  };
  configuration: ProcurementConfigRule[];
  optimizer: {
    trigger: string;
    options: ProcurementEvaluatedOption[];
    whySelected: string[];
    whyNotRejected: { option: string; reason: string }[];
  };
  result: {
    purchaseOrders: ProcurementPOResult[];
    sobCompliance: SoBComplianceEntry[];
    postProcurementState: PostProcurementEntry[];
  };
}

export interface ProcurementInputSection {
  title: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
}

export interface ProcurementConfigRule {
  rule: string;
  setting: string;
}

export interface ProcurementEvaluatedOption {
  id: string;
  allocation: string;
  totalCost: string;
  sobCompliance: string;
  status: "selected" | "rejected";
  reason?: string;
}

export interface ProcurementPOResult {
  poId: string;
  supplier: string;
  destDC: string;
  qty: number;
  landedCost: string;
  total: string;
  delivery: string;
  [key: string]: string | number;
}

export interface SoBComplianceEntry {
  supplier: string;
  qty: number;
  actualPercent: string;
  targetPercent: string;
  band: string;
  status: string;
  [key: string]: string | number;
}

export interface PostProcurementEntry {
  dc: string;
  currentGIH: string;
  incoming: string;
  projected: string;
  vsSS: string;
  [key: string]: string | number;
}
