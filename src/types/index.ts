export type RowStatus = "pending" | "approved" | "rejected";
export type { ActiveModule, ApprovalStatus, ProcurementRow, ProcurementUseCaseData, ProcurementInputSection, ProcurementConfigRule, ProcurementEvaluatedOption, ProcurementPOResult, SoBComplianceEntry, PostProcurementEntry } from "./procurement";

export interface PlanRow {
  stoId: string;
  productName: string;
  skuCode: string;
  startNode: string;
  locationEnd: string;
  demandForecast: number | null;
  projectedSales: number;
  lostSales: number;
  leadTime: string;
  plannedReplenishmentQty: number;
  transportMode: string;
  variableCost: number;
  sourceName: string;
  destinationName: string;
  division: string;
  status: RowStatus;
  useCaseId?: string;
  useCaseLabel?: string;
  manuallyCreated: boolean;
}

// Explainability data structures

export interface DistributorDemandEntry {
  distributor: string;
  region: string;
  primaryDC: string;
  demand14Day: number;
  priority: string;
  [key: string]: string | number;
}

export interface DCInventoryEntry {
  dc: string;
  gih: number;
  committed: string;
  availableToPromise: number;
  safetyStock: number;
  [key: string]: string | number;
}

export interface RouteEntry {
  route: string;
  leadTime: string;
  costPerUnit: string;
  moq: string;
}

export interface ConfigRule {
  rule: string;
  setting: string;
}

export interface EvaluatedOption {
  id: string;
  plan: string;
  fillRate: string;
  cost: string;
  status: "selected" | "rejected";
  reason?: string;
}

export interface STOResult {
  stoId: string;
  sku: string;
  from: string;
  to: string;
  qty: number;
  dispatch: string;
  delivery: string;
  cost: string;
}

export interface PostPlanEntry {
  dc: string;
  newAvailable: string;
  vsSS: string;
  impact: string;
  [key: string]: string | number;
}

export interface UseCaseData {
  id: string;
  title: string;
  subtitle: string;
  skuCode: string;
  sourceId: string;
  destinationId: string;
  inputs: {
    sections: InputSection[];
  };
  configuration: ConfigRule[];
  optimizer: {
    trigger: string;
    options: EvaluatedOption[];
    whySelected: string[];
    whyNotRejected: { option: string; reason: string }[];
  };
  result: {
    stos: STOResult[];
    postPlan: PostPlanEntry[];
    networkFillRate: string;
  };
}

export interface InputSection {
  title: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
}

export interface SummaryCardData {
  title: string;
  items: { label: string; value: string | number; color?: string }[];
  icon?: string;
}
