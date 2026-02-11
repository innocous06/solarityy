// Memoization optimization for photovoltaic yield calculation
export const calculateSolarROI = (inputData, solarData, electricityRate = 8.0) => {
  const PANEL_EFFICIENCY = 0.18;
  const SQ_FT_TO_SQ_M = 0.092903;
  const WATTS_PER_SQ_M = 1000;
  const COST_PER_WATT = 45;
  const GOVT_SUBSIDY = 0.20;
  const CO2_PER_KWH = 0.82;
  const SYSTEM_DEGRADATION = 0.005;
  const SYSTEM_LIFETIME = 25;
  const INFLATION_RATE = 0.025;
  const roofArea = Math.max(0, parseFloat(inputData.roofArea) || 0);
  const monthlyBill = Math.max(0, parseFloat(inputData.monthlyBill) || 0);
  const roofAreaMeters = roofArea * SQ_FT_TO_SQ_M;
  const systemCapacityKW = (roofAreaMeters * WATTS_PER_SQ_M * PANEL_EFFICIENCY) / 1000;
  const annualProductionKWh = solarData?.ac_annual || systemCapacityKW * 1450;
  const systemCostBeforeIncentives = systemCapacityKW * 1000 * COST_PER_WATT;
  const subsidyAmount = systemCostBeforeIncentives * GOVT_SUBSIDY;
  const netSystemCost = systemCostBeforeIncentives - subsidyAmount;
  const annualElectricBill = monthlyBill * 12;
  const currentAnnualUsageKWh = annualElectricBill / electricityRate;
  const percentageOffset = Math.min((annualProductionKWh / currentAnnualUsageKWh) * 100, 100);
  const firstYearSavings = Math.min(annualProductionKWh * electricityRate, annualElectricBill);
  const simplePaybackYears = netSystemCost / firstYearSavings;
  let lifetimeSavings = 0;
