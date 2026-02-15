import React, { useState } from 'react';
import { 
  Sun, Home, BarChart3, Settings, Zap, 
  Leaf, IndianRupee, Battery, ArrowRight, CheckCircle2, 
  Menu, X, User
} from 'lucide-react';
import { calculateSolarROI } from './utils/calculations';

// --- UI Components ---

const Sidebar = () => (
  <div className="hidden md:flex flex-col items-center py-8 w-24 bg-white h-screen fixed left-0 top-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
    <div className="p-3 bg-blue-50 rounded-2xl mb-12 text-blue-600">
      <Sun size={32} className="fill-blue-600" />
    </div>
    <div className="flex flex-col gap-8 w-full items-center">
      <button className="p-3 text-white bg-blue-600 rounded-2xl shadow-lg shadow-blue-200"><Home size={24} /></button>
      <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"><Zap size={24} /></button>
      <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"><BarChart3 size={24} /></button>
      <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"><User size={24} /></button>
    </div>
  </div>
);

const MetricCard = ({ icon: Icon, label, value, subtext, colorClass }) => (
  <div className={`p-6 rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${colorClass} min-h-[180px] shadow-sm`}>
    <div className="flex justify-between items-start">
      <div className="p-3 bg-white/60 rounded-2xl backdrop-blur-sm">
        <Icon size={24} className="text-gray-800" />
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-gray-600 text-sm font-bold mb-1 uppercase tracking-wider opacity-70">{label}</h3>
      <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      {subtext && <p className="text-xs font-semibold mt-2 opacity-60">{subtext}</p>}
    </div>
  </div>
);

const InputGroup = ({ label, value, onChange, prefix, suffix, type = "number", placeholder }) => (
  <div className="flex flex-col gap-3">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      {prefix && <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg group-focus-within:text-blue-500 transition-colors">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-gray-50 border-2 border-transparent hover:border-gray-200 text-gray-800 text-xl font-bold rounded-3xl py-5 px-6 ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-16' : ''} focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all`}
      />
       {suffix && <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">{suffix}</span>}
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    location: '',
    roofArea: '',
    monthlyBill: ''
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!formData.roofArea || !formData.monthlyBill) return;
    setLoading(true);
    
    // Simulate calculation delay for smooth UX
    setTimeout(() => {
      const data = calculateSolarROI(formData);
      setResults(data);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-gray-800 selection:bg-blue-200">
      <Sidebar />
      
      <main className="md:ml-24 p-6 md:p-12 max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">
              Solarity<span className="text-blue-600">.</span>
            </h1>
            <p className="text-gray-400 font-medium text-lg">Know your solar worth instantly</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white px-5 py-2 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold text-gray-600">Market Live</span>
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition shadow-lg shadow-gray-200">
              Get Pro
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <Settings size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Parameters</h2>
              </div>
              
              <div className="space-y-6">
                <InputGroup 
                  label="Location" 
                  placeholder="Enter City (e.g. Chennai)"
                  type="text"
                  value={formData.location}
                  onChange={(v) => setFormData({...formData, location: v})}
                />
                
                <InputGroup 
                  label="Avg Monthly Bill" 
                  prefix="₹"
                  placeholder="3000"
                  value={formData.monthlyBill}
                  onChange={(v) => setFormData({...formData, monthlyBill: v})}
                />
                
                <InputGroup 
                  label="Roof Area" 
                  suffix="sq ft"
                  placeholder="1200"
                  value={formData.roofArea}
                  onChange={(v) => setFormData({...formData, roofArea: v})}
                />
              </div>

              <button 
                onClick={handleCalculate}
                disabled={loading}
                className="w-full mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-6 rounded-[2rem] transition-all active:scale-95 hover:shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>Calculate ROI <ArrowRight size={22} /></>
                )}
              </button>
              
              <p className="text-center text-gray-400 text-xs mt-6 font-medium">
                Powered by Solarity Engine • SRM Institute
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: RESULTS DASHBOARD */}
          <div className="lg:col-span-8">
            {results ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr h-full animate-fade-in">
                
                {/* HERO CARD: Annual Savings */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group min-h-[320px] text-white shadow-2xl shadow-gray-200">
                  <div className="absolute right-[-40px] top-[-40px] w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-40 group-hover:opacity-50 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-blue-300 font-bold mb-3 tracking-widest text-xs uppercase">
                        <IndianRupee size={14} /> Projected Savings
                    </div>
                    <div className="text-6xl font-black tracking-tighter mb-1">
                      ₹{results.annualSavings.toLocaleString()}
                      <span className="text-2xl text-gray-400 font-medium ml-2">/yr</span>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full backdrop-blur-md text-sm font-bold">
                      <CheckCircle2 size={16} />
                      {results.percentageOffset}% Bill Offset
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-8">
                     <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                        <span>Current Usage</span>
                        <span>Solar Coverage</span>
                     </div>
                     <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out" 
                            style={{ width: `${Math.min(results.percentageOffset, 100)}%` }}
                        ></div>
                     </div>
                  </div>
                </div>

                {/* TALL CARD: System Size */}
                <div className="bg-[#fff9c2] p-8 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
                     <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-40"></div>
                     <div className="relative z-10">
                        <div className="p-4 bg-white/60 w-fit rounded-2xl mb-6 backdrop-blur-sm">
                            <Sun size={28} className="text-yellow-700" />
                        </div>
                        <h3 className="text-yellow-900/60 font-bold uppercase text-xs tracking-widest mb-1">System Size</h3>
                        <p className="text-5xl font-black text-yellow-900 tracking-tighter">{results.systemSize}<span className="text-2xl ml-1 opacity-60">kW</span></p>
                        
                        <div className="mt-8 space-y-2">
                           <div className="flex justify-between items-center text-sm font-bold text-yellow-900/70 border-b border-yellow-900/10 pb-2">
                              <span>Panels</span>
                              <span>{results.panelCount}x</span>
                           </div>
                           <div className="flex justify-between items-center text-sm font-bold text-yellow-900/70 pt-1">
                              <span>CO₂ Saved</span>
                              <span>{results.co2Offset}t</span>
                           </div>
                        </div>
                     </div>
                </div>

                {/* SQUARE CARDS */}
                <MetricCard 
                  icon={IndianRupee} 
                  label="Net Cost" 
                  value={`₹${(results.netCost / 100000).toFixed(1)}L`} 
                  subtext={`Inc. ₹${results.subsidy.toLocaleString()} Subsidy`}
                  colorClass="bg-white border border-gray-100"
                />
                
                <MetricCard 
                  icon={Battery} 
                  label="ROI Period" 
                  value={`${results.paybackPeriod} Yrs`} 
                  subtext="Break-even Point"
                  colorClass="bg-blue-50" 
                />

                <div className="p-6 rounded-[2rem] bg-indigo-600 text-white flex flex-col justify-center items-center text-center gap-4 transition-all hover:scale-[1.02] shadow-xl shadow-indigo-200 cursor-pointer group">
                  <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                    <User size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Connect with<br/>Installers</h3>
                    <p className="text-indigo-200 text-sm mt-1">Get verified quotes</p>
                  </div>
                </div>
                
              </div>
            ) : (
              // EMPTY STATE
              <div className="h-full w-full bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-12 text-center group">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sun size={40} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Solarity?</h3>
                <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Enter your location and bill details to unlock your <span className="text-blue-500 font-bold">instant solar worth</span> analysis.
                </p>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}
