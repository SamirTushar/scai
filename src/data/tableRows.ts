import { PlanRow } from "../types";

export const tableRows: PlanRow[] = [
  // ===== UC1: Pure Node Balancing — BRK-4712 (5 STOs) =====
  {
    stoId: "STO-001", productName: "Brake Pad Set Front Axle", skuCode: "BRK-4712", startNode: "Berlin DC", locationEnd: "Hamburg Dist.",
    demandForecast: 360, plannedReplenishmentQty: 180, editedQty: 180, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 68.40, sourceType: "Primary (partial)", reason: "Berlin constrained — split shipment",
    status: "pending", useCaseId: "uc1", useCaseLabel: "UC1: Pure Node Balancing",
    projectedSales: 180, lostSales: 0, sourceName: "Berlin DC", destinationName: "Hamburg Distributor", division: "Braking", manuallyCreated: false,
  },
  {
    stoId: "STO-002", productName: "Brake Pad Set Front Axle", skuCode: "BRK-4712", startNode: "Berlin DC", locationEnd: "Munich Dist.",
    demandForecast: 280, plannedReplenishmentQty: 140, editedQty: 140, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 63.00, sourceType: "Primary (partial)", reason: "Berlin constrained — split shipment",
    status: "pending", useCaseId: "uc1", useCaseLabel: "UC1: Pure Node Balancing",
    projectedSales: 140, lostSales: 0, sourceName: "Berlin DC", destinationName: "Munich Distributor", division: "Braking", manuallyCreated: false,
  },
  {
    stoId: "STO-003", productName: "Brake Pad Set Front Axle", skuCode: "BRK-4712", startNode: "Szczecin DC", locationEnd: "Hamburg Dist.",
    demandForecast: null, plannedReplenishmentQty: 180, editedQty: 180, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 93.60, sourceType: "Alternate", reason: "Szczecin surplus covers Hamburg shortfall",
    status: "pending", useCaseId: "uc1", useCaseLabel: "UC1: Pure Node Balancing",
    projectedSales: 180, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Hamburg Distributor", division: "Braking", manuallyCreated: false,
  },
  {
    stoId: "STO-004", productName: "Brake Pad Set Front Axle", skuCode: "BRK-4712", startNode: "Szczecin DC", locationEnd: "Munich Dist.",
    demandForecast: null, plannedReplenishmentQty: 140, editedQty: 140, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 109.20, sourceType: "Alternate", reason: "Szczecin surplus covers Munich shortfall",
    status: "pending", useCaseId: "uc1", useCaseLabel: "UC1: Pure Node Balancing",
    projectedSales: 140, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Munich Distributor", division: "Braking", manuallyCreated: false,
  },
  {
    stoId: "STO-005", productName: "Brake Pad Set Front Axle", skuCode: "BRK-4712", startNode: "Cheb DC", locationEnd: "Vienna Dist.",
    demandForecast: 280, plannedReplenishmentQty: 280, editedQty: 280, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 84.00, sourceType: "Alternate (full)", reason: "Cheb nearest to Vienna, cheapest route",
    status: "pending", useCaseId: "uc1", useCaseLabel: "UC1: Pure Node Balancing",
    projectedSales: 280, lostSales: 0, sourceName: "Cheb DC", destinationName: "Vienna Distributor", division: "Braking", manuallyCreated: false,
  },

  // ===== UC2: Node Balancing + Demand Sensing — ALT-3305 (3 STOs) =====
  {
    stoId: "STO-011", productName: "Alternator Mercedes C-Class", skuCode: "ALT-3305", startNode: "Ghent DC", locationEnd: "Antwerp Dist.",
    demandForecast: 450, plannedReplenishmentQty: 420, editedQty: 420, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 117.60, sourceType: "Primary (partial)", reason: "Fleet recall — sensing signal",
    status: "pending", useCaseId: "uc2", useCaseLabel: "UC2: Demand Sensing + Balancing",
    projectedSales: 420, lostSales: 0, sourceName: "Ghent DC", destinationName: "Antwerp Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-012", productName: "Alternator Mercedes C-Class", skuCode: "ALT-3305", startNode: "Berlin DC", locationEnd: "Antwerp Dist.",
    demandForecast: null, plannedReplenishmentQty: 30, editedQty: 30, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 17.40, sourceType: "Alternate", reason: "Ghent shortfall — sensing spike",
    status: "pending", useCaseId: "uc2", useCaseLabel: "UC2: Demand Sensing + Balancing",
    projectedSales: 30, lostSales: 0, sourceName: "Berlin DC", destinationName: "Antwerp Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-013", productName: "Alternator Mercedes C-Class", skuCode: "ALT-3305", startNode: "Szczecin DC", locationEnd: "Lyon Dist.",
    demandForecast: 180, plannedReplenishmentQty: 180, editedQty: 180, leadTime: "3 days", dispatchDate: "26-Mar", deliveryDate: "29-Mar",
    transportMode: "Road", variableCost: 147.60, sourceType: "Alternate", reason: "Ghent depleted — rebalance",
    status: "pending", useCaseId: "uc2", useCaseLabel: "UC2: Demand Sensing + Balancing",
    projectedSales: 180, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Lyon Distributor", division: "Electrical", manuallyCreated: false,
  },

  // ===== UC3: Promo Spike — BAT-1104 (5 STOs) =====
  {
    stoId: "STO-021", productName: "Car Battery 74Ah", skuCode: "BAT-1104", startNode: "Szczecin DC", locationEnd: "Warsaw Dist.",
    demandForecast: 720, plannedReplenishmentQty: 530, editedQty: 530, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 169.60, sourceType: "Primary (partial)", reason: "Promo: Winter Battery Blitz",
    status: "pending", useCaseId: "uc3", useCaseLabel: "UC3: Promo Spike + Balancing",
    projectedSales: 530, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Warsaw Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-022", productName: "Car Battery 74Ah", skuCode: "BAT-1104", startNode: "Berlin DC", locationEnd: "Warsaw Dist.",
    demandForecast: null, plannedReplenishmentQty: 190, editedQty: 190, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 110.20, sourceType: "Alternate", reason: "Szczecin shortfall — promo spike",
    status: "pending", useCaseId: "uc3", useCaseLabel: "UC3: Promo Spike + Balancing",
    projectedSales: 190, lostSales: 0, sourceName: "Berlin DC", destinationName: "Warsaw Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-023", productName: "Car Battery 74Ah", skuCode: "BAT-1104", startNode: "Berlin DC", locationEnd: "Stockholm Dist.",
    demandForecast: 150, plannedReplenishmentQty: 150, editedQty: 150, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 97.50, sourceType: "Alternate", reason: "Szczecin depleted — rebalance",
    status: "pending", useCaseId: "uc3", useCaseLabel: "UC3: Promo Spike + Balancing",
    projectedSales: 150, lostSales: 0, sourceName: "Berlin DC", destinationName: "Stockholm Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-024", productName: "Car Battery 74Ah", skuCode: "BAT-1104", startNode: "Cheb DC", locationEnd: "Prague Dist.",
    demandForecast: 270, plannedReplenishmentQty: 270, editedQty: 270, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 59.40, sourceType: "Primary", reason: "Promo: Winter Battery Blitz",
    status: "pending", useCaseId: "uc3", useCaseLabel: "UC3: Promo Spike + Balancing",
    projectedSales: 270, lostSales: 0, sourceName: "Cheb DC", destinationName: "Prague Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-025", productName: "Car Battery 74Ah", skuCode: "BAT-1104", startNode: "Berlin DC", locationEnd: "Hamburg Dist.",
    demandForecast: 200, plannedReplenishmentQty: 200, editedQty: 200, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 76.00, sourceType: "Primary", reason: "Normal — non-promo",
    status: "pending", useCaseId: "uc3", useCaseLabel: "UC3: Promo Spike + Balancing",
    projectedSales: 200, lostSales: 0, sourceName: "Berlin DC", destinationName: "Hamburg Distributor", division: "Electrical", manuallyCreated: false,
  },

  // ===== UC4: Intermittent Demand — WPM-0987 (5 STOs) =====
  {
    stoId: "STO-031", productName: "Water Pump Porsche 911 997", skuCode: "WPM-0987", startNode: "Cheb DC", locationEnd: "Prague Dist.",
    demandForecast: 45, plannedReplenishmentQty: 12, editedQty: 12, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 3.60, sourceType: "Primary (partial)", reason: "Burst order — pooling network",
    status: "pending", useCaseId: "uc4", useCaseLabel: "UC4: Intermittent Demand + Pooling",
    projectedSales: 12, lostSales: 0, sourceName: "Cheb DC", destinationName: "Prague Distributor", division: "Cooling", manuallyCreated: false,
  },
  {
    stoId: "STO-032", productName: "Water Pump Porsche 911 997", skuCode: "WPM-0987", startNode: "Berlin DC", locationEnd: "Prague Dist.",
    demandForecast: null, plannedReplenishmentQty: 8, editedQty: 8, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 4.16, sourceType: "Alternate — pooled", reason: "Network-wide stock consolidation",
    status: "pending", useCaseId: "uc4", useCaseLabel: "UC4: Intermittent Demand + Pooling",
    projectedSales: 8, lostSales: 0, sourceName: "Berlin DC", destinationName: "Prague Distributor", division: "Cooling", manuallyCreated: false,
  },
  {
    stoId: "STO-033", productName: "Water Pump Porsche 911 997", skuCode: "WPM-0987", startNode: "Szczecin DC", locationEnd: "Prague Dist.",
    demandForecast: null, plannedReplenishmentQty: 8, editedQty: 8, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 5.44, sourceType: "Alternate — pooled", reason: "Network-wide stock consolidation",
    status: "pending", useCaseId: "uc4", useCaseLabel: "UC4: Intermittent Demand + Pooling",
    projectedSales: 8, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Prague Distributor", division: "Cooling", manuallyCreated: false,
  },
  {
    stoId: "STO-034", productName: "Water Pump Porsche 911 997", skuCode: "WPM-0987", startNode: "Ghent DC", locationEnd: "Prague Dist.",
    demandForecast: null, plannedReplenishmentQty: 10, editedQty: 10, leadTime: "2.5 days", dispatchDate: "26-Mar", deliveryDate: "29-Mar",
    transportMode: "Road", variableCost: 8.50, sourceType: "Alternate — pooled", reason: "Network-wide stock consolidation",
    status: "pending", useCaseId: "uc4", useCaseLabel: "UC4: Intermittent Demand + Pooling",
    projectedSales: 10, lostSales: 0, sourceName: "Ghent DC", destinationName: "Prague Distributor", division: "Cooling", manuallyCreated: false,
  },
  {
    stoId: "STO-035", productName: "Water Pump Porsche 911 997", skuCode: "WPM-0987", startNode: "Berlin DC", locationEnd: "Munich Dist.",
    demandForecast: 6, plannedReplenishmentQty: 6, editedQty: 6, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 2.70, sourceType: "Primary", reason: "Normal",
    status: "pending", useCaseId: "uc4", useCaseLabel: "UC4: Intermittent Demand + Pooling",
    projectedSales: 6, lostSales: 0, sourceName: "Berlin DC", destinationName: "Munich Distributor", division: "Cooling", manuallyCreated: false,
  },

  // ===== UC5: Multi-Echelon CDC — FLT-1190 (4 STOs) =====
  {
    stoId: "STO-041", productName: "Oil Filter Universal", skuCode: "FLT-1190", startNode: "Duisburg CDC", locationEnd: "Berlin DC",
    demandForecast: 2400, plannedReplenishmentQty: 2400, editedQty: 2400, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 528.00, sourceType: "CDC → DC", reason: "Priority A distributors downstream",
    status: "pending", useCaseId: "uc5", useCaseLabel: "UC5: Multi-Echelon CDC Allocation",
    projectedSales: 2400, lostSales: 0, sourceName: "Duisburg CDC", destinationName: "Berlin DC", division: "Filtration", manuallyCreated: false,
  },
  {
    stoId: "STO-042", productName: "Oil Filter Universal", skuCode: "FLT-1190", startNode: "Duisburg CDC", locationEnd: "Ghent DC",
    demandForecast: 1900, plannedReplenishmentQty: 1900, editedQty: 1900, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 342.00, sourceType: "CDC → DC", reason: "Priority A distributors downstream",
    status: "pending", useCaseId: "uc5", useCaseLabel: "UC5: Multi-Echelon CDC Allocation",
    projectedSales: 1900, lostSales: 0, sourceName: "Duisburg CDC", destinationName: "Ghent DC", division: "Filtration", manuallyCreated: false,
  },
  {
    stoId: "STO-043", productName: "Oil Filter Universal", skuCode: "FLT-1190", startNode: "Duisburg CDC", locationEnd: "Cheb DC",
    demandForecast: 1200, plannedReplenishmentQty: 1200, editedQty: 1200, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 420.00, sourceType: "CDC → DC", reason: "Low DOS, partial allocation",
    status: "pending", useCaseId: "uc5", useCaseLabel: "UC5: Multi-Echelon CDC Allocation",
    projectedSales: 1200, lostSales: 0, sourceName: "Duisburg CDC", destinationName: "Cheb DC", division: "Filtration", manuallyCreated: false,
  },
  {
    stoId: "STO-044", productName: "Oil Filter Universal", skuCode: "FLT-1190", startNode: "Duisburg CDC", locationEnd: "Szczecin DC",
    demandForecast: 1000, plannedReplenishmentQty: 1000, editedQty: 1000, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 450.00, sourceType: "CDC → DC", reason: "Lowest priority, reduced allocation",
    status: "pending", useCaseId: "uc5", useCaseLabel: "UC5: Multi-Echelon CDC Allocation",
    projectedSales: 1000, lostSales: 0, sourceName: "Duisburg CDC", destinationName: "Szczecin DC", division: "Filtration", manuallyCreated: false,
  },

  // ===== FILLER ROWS (15 rows — standard replenishment) =====
  {
    stoId: "STO-101", productName: "Timing Belt Kit", skuCode: "TMB-3340", startNode: "Berlin DC", locationEnd: "Hamburg Dist.",
    demandForecast: 180, plannedReplenishmentQty: 180, editedQty: 180, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 234.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 180, lostSales: 0, sourceName: "Berlin DC", destinationName: "Hamburg Distributor", division: "Drivetrain", manuallyCreated: false,
  },
  {
    stoId: "STO-102", productName: "Radiator Assembly", skuCode: "RAD-5521", startNode: "Ghent DC", locationEnd: "Antwerp Dist.",
    demandForecast: 95, plannedReplenishmentQty: 95, editedQty: 95, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 361.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 95, lostSales: 0, sourceName: "Ghent DC", destinationName: "Antwerp Distributor", division: "Cooling", manuallyCreated: false,
  },
  {
    stoId: "STO-103", productName: "Shock Absorber Rear", skuCode: "SHK-7780", startNode: "Szczecin DC", locationEnd: "Warsaw Dist.",
    demandForecast: 320, plannedReplenishmentQty: 320, editedQty: 320, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 448.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 320, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Warsaw Distributor", division: "Suspension", manuallyCreated: false,
  },
  {
    stoId: "STO-104", productName: "Spark Plug Set Iridium", skuCode: "SPK-2245", startNode: "Berlin DC", locationEnd: "Munich Dist.",
    demandForecast: 500, plannedReplenishmentQty: 500, editedQty: 500, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 95.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 500, lostSales: 0, sourceName: "Berlin DC", destinationName: "Munich Distributor", division: "Ignition", manuallyCreated: false,
  },
  {
    stoId: "STO-105", productName: "Headlight Assembly LED", skuCode: "HLA-4410", startNode: "Ghent DC", locationEnd: "Lyon Dist.",
    demandForecast: 45, plannedReplenishmentQty: 45, editedQty: 45, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 585.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 45, lostSales: 0, sourceName: "Ghent DC", destinationName: "Lyon Distributor", division: "Lighting", manuallyCreated: false,
  },
  {
    stoId: "STO-106", productName: "Clutch Kit BMW 3-Series", skuCode: "CLT-2201", startNode: "Berlin DC", locationEnd: "Vienna Dist.",
    demandForecast: 120, plannedReplenishmentQty: 120, editedQty: 120, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 396.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 120, lostSales: 0, sourceName: "Berlin DC", destinationName: "Vienna Distributor", division: "Drivetrain", manuallyCreated: false,
  },
  {
    stoId: "STO-107", productName: "Thermostat Assembly", skuCode: "THR-6632", startNode: "Cheb DC", locationEnd: "Prague Dist.",
    demandForecast: 280, plannedReplenishmentQty: 280, editedQty: 280, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 56.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 280, lostSales: 0, sourceName: "Cheb DC", destinationName: "Prague Distributor", division: "Cooling", manuallyCreated: false,
  },
  {
    stoId: "STO-108", productName: "CV Joint Outer", skuCode: "CVJ-8891", startNode: "Szczecin DC", locationEnd: "Stockholm Dist.",
    demandForecast: 85, plannedReplenishmentQty: 85, editedQty: 85, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 221.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 85, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Stockholm Distributor", division: "Drivetrain", manuallyCreated: false,
  },
  {
    stoId: "STO-109", productName: "Fuel Pump Electric", skuCode: "FPM-1123", startNode: "Berlin DC", locationEnd: "Hamburg Dist.",
    demandForecast: 65, plannedReplenishmentQty: 65, editedQty: 65, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 455.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 65, lostSales: 0, sourceName: "Berlin DC", destinationName: "Hamburg Distributor", division: "Fuel System", manuallyCreated: false,
  },
  {
    stoId: "STO-110", productName: "Starter Motor", skuCode: "STM-4456", startNode: "Ghent DC", locationEnd: "Antwerp Dist.",
    demandForecast: 40, plannedReplenishmentQty: 40, editedQty: 40, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 320.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 40, lostSales: 0, sourceName: "Ghent DC", destinationName: "Antwerp Distributor", division: "Electrical", manuallyCreated: false,
  },
  {
    stoId: "STO-111", productName: "Wiper Blade Set", skuCode: "WBL-9978", startNode: "Szczecin DC", locationEnd: "Warsaw Dist.",
    demandForecast: 450, plannedReplenishmentQty: 450, editedQty: 450, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 67.50, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 450, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Warsaw Distributor", division: "Exterior", manuallyCreated: false,
  },
  {
    stoId: "STO-112", productName: "Air Filter", skuCode: "AFR-2200", startNode: "Berlin DC", locationEnd: "Munich Dist.",
    demandForecast: 380, plannedReplenishmentQty: 380, editedQty: 380, leadTime: "1 day", dispatchDate: "26-Mar", deliveryDate: "27-Mar",
    transportMode: "Road", variableCost: 76.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 380, lostSales: 0, sourceName: "Berlin DC", destinationName: "Munich Distributor", division: "Filtration", manuallyCreated: false,
  },
  {
    stoId: "STO-113", productName: "Power Steering Pump", skuCode: "PSP-3310", startNode: "Cheb DC", locationEnd: "Prague Dist.",
    demandForecast: 55, plannedReplenishmentQty: 55, editedQty: 55, leadTime: "0.5 day", dispatchDate: "26-Mar", deliveryDate: "26-Mar",
    transportMode: "Road", variableCost: 412.50, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 55, lostSales: 0, sourceName: "Cheb DC", destinationName: "Prague Distributor", division: "Steering", manuallyCreated: false,
  },
  {
    stoId: "STO-114", productName: "Exhaust Manifold", skuCode: "EXM-4450", startNode: "Ghent DC", locationEnd: "Lyon Dist.",
    demandForecast: 30, plannedReplenishmentQty: 30, editedQty: 30, leadTime: "1.5 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 540.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 30, lostSales: 0, sourceName: "Ghent DC", destinationName: "Lyon Distributor", division: "Exhaust", manuallyCreated: false,
  },
  {
    stoId: "STO-115", productName: "Wheel Bearing Kit", skuCode: "WBR-5560", startNode: "Szczecin DC", locationEnd: "Stockholm Dist.",
    demandForecast: 110, plannedReplenishmentQty: 110, editedQty: 110, leadTime: "2 days", dispatchDate: "26-Mar", deliveryDate: "28-Mar",
    transportMode: "Road", variableCost: 275.00, sourceType: "Primary", reason: "Standard fulfillment — sufficient stock",
    status: "pending", projectedSales: 110, lostSales: 0, sourceName: "Szczecin DC", destinationName: "Stockholm Distributor", division: "Suspension", manuallyCreated: false,
  },
];
