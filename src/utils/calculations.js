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

  const roofArea = parseFloat(inputData.roofArea);
  const monthlyBill = parseFloat(inputData.monthlyBill);

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
  let cumulativeProduction = 0;
  const savingsTimeline = [];

  for (let year = 1; year <= SYSTEM_LIFETIME; year++) {
    const degradationFactor = Math.pow(1 - SYSTEM_DEGRADATION, year - 1);
    const yearlyProduction = annualProductionKWh * degradationFactor;
    const yearlyInflationRate = Math.pow(1 + INFLATION_RATE, year - 1);
    const yearlyRate = electricityRate * yearlyInflationRate;
    const yearlySavings = yearlyProduction * yearlyRate;

    lifetimeSavings += yearlySavings;
    cumulativeProduction += yearlyProduction;

    savingsTimeline.push({
      year: year,
      cumulativeSavings: Math.round(lifetimeSavings - netSystemCost),
      savings: Math.round(lifetimeSavings),
      cost: netSystemCost
    });
  }

  const netLifetimeSavings = lifetimeSavings - netSystemCost;
  const lifetimeCO2Offset = (cumulativeProduction * CO2_PER_KWH) / 1000;
  const monthlySavings = firstYearSavings / 12;

  return {
    systemSize: systemCapacityKW.toFixed(2),
    panelCount: Math.ceil(systemCapacityKW * 1000 / 400),
    annualProduction: Math.round(annualProductionKWh),
    systemCostBefore: Math.round(systemCostBeforeIncentives),
    federalIncentive: Math.round(subsidyAmount),
    netCost: Math.round(netSystemCost),
    percentageOffset: Math.round(percentageOffset),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(firstYearSavings),
    paybackPeriod: simplePaybackYears.toFixed(1),
    lifetimeSavings: Math.round(netLifetimeSavings),
    co2Offset: Math.round(lifetimeCO2Offset),
    breakEvenYear: Math.ceil(simplePaybackYears),
    savingsTimeline,
    solarRadiation: solarData?.solrad_annual?.toFixed(1) || '5.5',
    capacityFactor: solarData?.capacity_factor?.toFixed(1) || '16.5'
  };
};

export const validateFormData = (formData) => {
  const errors = {};

  if (!formData.location || formData.location.trim() === '') {
    errors.location = 'Location is required';
  }

  const roofArea = parseFloat(formData.roofArea);
  if (!formData.roofArea || isNaN(roofArea) || roofArea < 100) {
    errors.roofArea = 'Minimum 100 sq ft required';
  } else if (roofArea > 10000) {
    errors.roofArea = 'Maximum 10,000 sq ft allowed';
  }

  const monthlyBill = parseFloat(formData.monthlyBill);
  if (!formData.monthlyBill || isNaN(monthlyBill) || monthlyBill < 100) {
    errors.monthlyBill = 'Minimum ₹100 required';
  } else if (monthlyBill > 100000) {
    errors.monthlyBill = 'Please enter valid amount';
  }

  return errors;
};
