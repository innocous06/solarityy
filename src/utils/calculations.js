export const calculateSolarROI = (inputData) => {
  // --- CONSTANTS (Indian Market Context) ---
  const ELECTRICITY_RATE = 8.0; // Average ₹8/kWh
  const PANEL_EFFICIENCY = 0.18; // 18% efficiency
  const SQ_FT_TO_SQ_M = 0.092903; 
  const WATTS_PER_SQ_M = 1000;
  
  // Cost estimates for India (approx ₹45-50 per Watt installed)
  const COST_PER_WATT = 45; 
  const GOVT_SUBSIDY = 0.20; // Approx 20% subsidy/incentive
  const CO2_PER_KWH = 0.82; // India grid average is higher carbon intensity (~0.82 kg/kWh)
  
  // Parse inputs
  const roofArea = parseFloat(inputData.roofArea);
  const monthlyBill = parseFloat(inputData.monthlyBill);
  
  // Step 1: Calculate system size
  const roofAreaMeters = roofArea * SQ_FT_TO_SQ_M;
  // KW capacity = Area * Insolation * Efficiency
  const systemCapacityKW = (roofAreaMeters * WATTS_PER_SQ_M * PANEL_EFFICIENCY) / 1000;
  
  // Step 2: Annual production 
  // India has high solar irradiance ~1400-1600 units per kW per year
  const annualProductionKWh = systemCapacityKW * 1450; 
  
  // Step 3: Installation costs
  const systemCostBeforeIncentives = systemCapacityKW * 1000 * COST_PER_WATT;
  const subsidyAmount = systemCostBeforeIncentives * GOVT_SUBSIDY;
  const netSystemCost = systemCostBeforeIncentives - subsidyAmount;
  
  // Step 4: Annual savings
  const annualElectricBill = monthlyBill * 12;
  const currentAnnualUsageKWh = annualElectricBill / ELECTRICITY_RATE;
  
  // Cap offset at 100% (cannot save more than the bill for this simple calc)
  const percentageOffset = Math.min((annualProductionKWh / currentAnnualUsageKWh) * 100, 100);
  const firstYearSavings = (annualProductionKWh * ELECTRICITY_RATE);
  
  // Step 5: Payback period
  const simplePaybackYears = netSystemCost / firstYearSavings;

  // Step 6: Lifetime Savings (25 years)
  // Simple calc: (Annual Savings * 25) - Net Cost
  // In a real app, we would add energy inflation
  const lifetimeSavings = (firstYearSavings * 25) - netSystemCost;

  return {
    systemSize: systemCapacityKW.toFixed(1),
    panelCount: Math.ceil(systemCapacityKW * 1000 / 400), // Assuming 400W panels
    netCost: Math.round(netSystemCost),
    subsidy: Math.round(subsidyAmount),
    percentageOffset: Math.round(percentageOffset),
    annualSavings: Math.round(firstYearSavings),
    paybackPeriod: simplePaybackYears.toFixed(1),
    lifetimeSavings: Math.round(lifetimeSavings),
    co2Offset: Math.round((annualProductionKWh * CO2_PER_KWH) / 1000), // Tons
  };
};
