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
          </p>
          <p className="text-xs text-gray-400">
            {((payload[0].value / systemCost) * 100).toFixed(0)}%
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Cost Breakdown</h3>
        <p className="text-gray-500 text-xs sm:text-sm">System installation cost distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
