import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const SavingsChart = ({ data, paybackPeriod }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const savings = payload[0].value;
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="text-sm font-bold text-gray-600">Year {payload[0].payload.year}</p>
          <p className="text-lg font-black text-green-600">
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
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-gray-900 mb-2">Cumulative Savings</h3>
        <p className="text-gray-500 text-sm">25-year projection with energy cost inflation</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
            stroke="#9ca3af"
          />
          <YAxis 
            label={{ value: 'Net Savings (₹)', angle: -90, position: 'insideLeft' }}
            stroke="#9ca3af"
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={0} 
            stroke="#ef4444" 
            strokeDasharray="5 5" 
            label={{ value: 'Break Even', position: 'insideTopLeft', fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }}
          />
          <ReferenceLine 
            x={parseFloat(paybackPeriod)} 
            stroke="#f59e0b" 
            strokeDasharray="5 5"
            label={{ value: `${paybackPeriod} years`, position: 'top', fill: '#f59e0b', fontSize: 12, fontWeight: 'bold' }}
          />
          <Line 
            type="monotone" 
            dataKey="cumulativeSavings" 
            stroke="#16a34a" 
            strokeWidth={3} 
            name="Net Savings"
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-2xl">
          <p className="text-xs text-gray-500 font-bold uppercase">Break Even</p>
          <p className="text-2xl font-black text-green-600">{paybackPeriod} yrs</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 font-bold uppercase">Year 10</p>
          <p className="text-2xl font-black text-gray-800">
            ₹{data[9]?.cumulativeSavings ? (data[9].cumulativeSavings / 100000).toFixed(1) : '0'}L
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 font-bold uppercase">Year 25</p>
          <p className="text-2xl font-black text-gray-800">
            ₹{data[24]?.cumulativeSavings ? (data[24].cumulativeSavings / 100000).toFixed(1) : '0'}L
          </p>
        </div>
      </div>
    </div>
  );
};

export default SavingsChart;
