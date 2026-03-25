import { UseCaseData } from "../../types";
import { uc1 } from "./uc1-multi-dc";
import { uc2 } from "./uc2-demand-sensing";
import { uc3 } from "./uc3-promo-driven";
import { uc4 } from "./uc4-intermittent";
import { uc5 } from "./uc5-cross-warehouse";

export const useCaseMap: Record<string, UseCaseData> = {
  uc1,
  uc2,
  uc3,
  uc4,
  uc5,
};

export { uc1, uc2, uc3, uc4, uc5 };
