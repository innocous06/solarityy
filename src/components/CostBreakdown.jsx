import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
const CostBreakdown = ({ systemCost, subsidy }) => {
  const equipmentCost = systemCost * 0.50;
  const laborCost = systemCost * 0.25;
  const permitsCost = systemCost * 0.10;
  const otherCost = systemCost * 0.15;
  const data = [
    { name: 'Solar Panels & Equipment', value: equipmentCost, color: '#16a34a' },
    { name: 'Installation Labor', value: laborCost, color: '#22c55e' },
    { name: 'Permits & Inspection', value: permitsCost, color: '#4ade80' },
    { name: 'Other Costs', value: otherCost, color: '#86efac' },
  ];
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="text-xs sm:text-sm font-bold text-gray-800">{payload[0].name}</p>
          <p className="text-base sm:text-lg font-black text-green-600">
            ₹{payload[0].value.toLocaleString()}
