import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
const SavingsChart = ({ data, paybackPeriod }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const savings = payload[0].value;
      return (
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="text-xs sm:text-sm font-bold text-gray-600">Year {payload[0].payload.year}</p>
          <p className="text-base sm:text-lg font-black text-green-600">
            ₹{savings.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {savings >= 0 ? 'Net Profit' : 'Payback Period'}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Cumulative Savings</h3>
        <p className="text-gray-500 text-xs sm:text-sm">25-year projection with energy cost inflation</p>
      </div>
      <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 12 }}
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Net Savings (₹)', angle: -90, position: 'insideLeft', fontSize: 12 }}
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <ReferenceLine 
            y={0} 
