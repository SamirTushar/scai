import { ProcurementUseCaseData } from "../../types/procurement";
import { multiSupplierAllocation } from "./multi-supplier-allocation";

export const procurementUseCaseMap: Record<string, ProcurementUseCaseData> = {
  "multi-supplier": multiSupplierAllocation,
};
