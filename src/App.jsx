import React, { useState } from 'react';
import { 
  Sun, Home, BarChart3, Zap, 
  Leaf, IndianRupee, Battery, ArrowRight, CheckCircle2, 
  User, TrendingUp, Download, Share2, AlertCircle, Loader2,
  Info, Clock, Trash2, MapPin, Menu, X
} from 'lucide-react';
import { calculateSolarROI, validateFormData } from './utils/calculations';
import { getCoordinates, getSolarData, getElectricityRate } from './utils/api';
import LocationSearch from './components/LocationSearch';
import SavingsChart from './components/SavingsChart';
import CostBreakdown from './components/CostBreakdown';
const Sidebar = ({ activeView, setActiveView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Calculator' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'compare', icon: BarChart3, label: 'Compare' },
    { id: 'about', icon: Info, label: 'About' },
  ];
  const handleMenuClick = (id) => {
    setActiveView(id);
    setIsMobileMenuOpen(false);
  };
  return (
    <><div className="hidden md:flex flex-col items-center py-8 w-24 bg-white h-screen fixed left-0 top-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-3 bg-green-50 rounded-2xl mb-12 text-green-600">
          <Sun size={32} className="fill-green-600" />
        </div>
        <div className="flex flex-col gap-8 w-full items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`p-3 rounded-2xl transition-all relative group ${
                activeView === item.id
                  ? 'text-white bg-green-600 shadow-lg shadow-green-200'
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
              title={item.label}
            >
              <item.icon size={24} />
              <span className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>{isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}<div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-xl text-green-600">
                <Sun size={24} className="fill-green-600" />
              </div>
              <span className="text-xl font-black text-gray-900">Solarity</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  activeView === item.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <item.icon size={20} />
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
const MetricCard = ({ icon: Icon, label, value, subtext, colorClass }) => (
  <div className={`p-4 sm:p-6 md:p-6 rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.02] duration-300 ${colorClass} min-h-[160px] sm:min-h-[180px] shadow-sm`}>
    <div className="flex justify-between items-start">
      <div className="p-2 sm:p-3 bg-white/60 rounded-2xl backdrop-blur-sm">
        <Icon size={20} className="sm:w-6 sm:h-6 text-gray-800" />
      </div>
    </div>
    <div className="mt-3 sm:mt-4">
      <h3 className="text-gray-600 text-xs sm:text-sm font-bold mb-1 uppercase tracking-wider opacity-70">{label}</h3>
      <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      {subtext && <p className="text-xs font-semibold mt-2 opacity-60">{subtext}</p>}
    </div>
  </div>
);
const InputGroup = ({ label, value, onChange, prefix, suffix, type = "number", placeholder, error }) => (
  <div className="flex flex-col gap-3">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      {prefix && (
        <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-base sm:text-lg group-focus-within:text-green-500 transition-colors">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${prefix ? 'pl-10 sm:pl-12' : 'pl-4 sm:pl-5'} ${suffix ? 'pr-16 sm:pr-20' : 'pr-4 sm:pr-5'} py-4 sm:py-5 rounded-2xl sm:rounded-3xl border-2 transition-all text-gray-900 font-semibold text-base sm:text-lg placeholder:text-gray-300 placeholder:font-normal focus:scale-[1.01] sm:focus:scale-[1.02] focus:shadow-xl ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-gray-100 bg-white focus:border-green-500 focus:bg-green-50/30'
        }`}
      />
      {suffix && (
        <span className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs sm:text-sm">
          {suffix}
        </span>
      )}
    </div>
    {error && (
      <p className="text-red-500 text-sm font-medium ml-1">{error}</p>
    )}
  </div>
);
const HistoryView = ({ history, onLoad, onDelete }) => (
  <div className="space-y-4 animate-fade-in">
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Calculation History</h2>
      <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">View and manage your previous solar calculations</p>
      {history.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Clock size={40} className="sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-400 font-medium text-sm sm:text-base">No calculations yet</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">Your calculation history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {history.map((item, index) => (
            <div key={index} className="p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-green-200 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{item.formData.location}</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-500">System Size</p>
                      <p className="font-bold text-gray-900">{item.results.systemSize} kW</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payback</p>
                      <p className="font-bold text-gray-900">{item.results.paybackPeriod} years</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-gray-500">Annual Savings</p>
                      <p className="font-bold text-gray-900">₹{item.results.annualSavings.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{item.timestamp}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onLoad(item)}
                    className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition touch-manipulation"
                    title="Load calculation"
                  >
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition touch-manipulation"
                    title="Delete"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
const CompareView = ({ history }) => (
  <div className="space-y-4 animate-fade-in">
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Compare Calculations</h2>
      <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">Side-by-side comparison of your solar analyses</p>
      {history.length < 2 ? (
        <div className="text-center py-8 sm:py-12">
          <BarChart3 size={40} className="sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-400 font-medium text-sm sm:text-base">Need at least 2 calculations to compare</p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">Calculate for different locations to compare results</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {history.slice(-2).map((item, index) => (
            <div key={index} className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-green-200">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-green-600 flex-shrink-0" />
                <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{item.formData.location}</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-white rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-600">System Size</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{item.results.systemSize} kW</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-white rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-600">Net Cost</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">₹{(item.results.netCost / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-white rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-600">Payback Period</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{item.results.paybackPeriod} years</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-white rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-600">Annual Savings</span>
                  <span className="font-bold text-green-600 text-sm sm:text-base">₹{item.results.annualSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-white rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-600">Lifetime Savings</span>
                  <span className="font-bold text-green-600 text-sm sm:text-base">₹{(item.results.lifetimeSavings / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between items-center p-2.5 sm:p-3 bg-white rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-600">CO₂ Offset</span>
                  <span className="font-bold text-green-600 text-sm sm:text-base">{item.results.co2Offset} tons</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
const AboutView = () => (
  <div className="space-y-4 sm:space-y-6 animate-fade-in">
    <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <Sun size={36} className="sm:w-12 sm:h-12 fill-white" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">Solarity</h1>
          <p className="text-green-100 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Solar Decisions Made Simple</p>
        </div>
      </div>
      <p className="text-green-50 text-sm sm:text-base md:text-lg leading-relaxed">
        Instant, accurate solar ROI calculations powered by real-time NREL solar radiation data. 
        Make informed decisions about your solar investment in seconds.
      </p>
    </div>
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg">
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl font-black text-green-600">1</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Enter Details</h3>
          <p className="text-xs sm:text-sm text-gray-600">Provide your location, roof area, and monthly electricity bill</p>
        </div>
        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl font-black text-green-600">2</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Real-time Analysis</h3>
          <p className="text-xs sm:text-sm text-gray-600">We fetch location-specific solar data and calculate your ROI</p>
        </div>
        <div className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl font-black text-green-600">3</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Get Results</h3>
          <p className="text-xs sm:text-sm text-gray-600">Instant system sizing, cost, savings, and payback analysis</p>
        </div>
      </div>
    </div>
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg">
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {[
          { icon: Zap, title: 'Real-time Data', desc: 'NREL PVWatts API integration' },
          { icon: MapPin, title: 'Location-specific', desc: 'Accurate solar radiation data' },
          { icon: IndianRupee, title: 'Cost Analysis', desc: 'Complete financial breakdown' },
          { icon: Leaf, title: 'Environmental Impact', desc: 'CO₂ offset calculations' },
          { icon: TrendingUp, title: '25-year Projection', desc: 'Lifetime savings timeline' },
          { icon: CheckCircle2, title: 'Instant Results', desc: 'No signup required' },
        ].map((feature, index) => (
          <div key={index} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
            <div className="p-2 sm:p-3 bg-green-100 rounded-xl flex-shrink-0">
              <feature.icon size={20} className="sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg">
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">Data Sources</h2>
      <div className="space-y-2 sm:space-y-3">
        <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">NREL PVWatts API</h3>
          <p className="text-xs sm:text-sm text-gray-600">National Renewable Energy Laboratory solar radiation database</p>
        </div>
        <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Indian Market Data</h3>
          <p className="text-xs sm:text-sm text-gray-600">Current solar panel costs, installation rates, and government subsidies (2026)</p>
        </div>
        <div className="p-3 sm:p-4 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Regional Electricity Rates</h3>
          <p className="text-xs sm:text-sm text-gray-600">State-wise electricity tariffs for accurate savings calculations</p>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white text-center">
      <p className="text-gray-400 text-xs sm:text-sm mb-2">built for NEXGEN TEXUS HACKATHON</p>
      <p className="font-bold text-base sm:text-lg">Built by Axilla</p>
      <p className="text-gray-400 text-xs sm:text-sm mt-1">Domain: EcoTech • Project: Solarity</p>
    </div>
  </div>
);
function App() {
  const [activeView, setActiveView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    roofArea: '',
    monthlyBill: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [locationData, setLocationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('solarityHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const saveToHistory = (formData, results, locationData) => {
    const newEntry = {
      formData,
      results,
      locationData,
      timestamp: new Date().toLocaleString()
    };
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('solarityHistory', JSON.stringify(updatedHistory));
  };
  const loadFromHistory = (item) => {
    setFormData(item.formData);
    setResults(item.results);
    setLocationData(item.locationData);
    setActiveView('home');
  };
  const deleteFromHistory = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('solarityHistory', JSON.stringify(updatedHistory));
  };
  const handleCalculate = async () => {
    setErrors({});
    setErrorMessage('');
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const coordinates = await getCoordinates(formData.location);
      setLocationData(coordinates);
      const roofAreaMeters = parseFloat(formData.roofArea) * 0.092903;
      const estimatedCapacity = (roofAreaMeters * 1000 * 0.18) / 1000;
      const solarData = await getSolarData(
        coordinates.latitude,
        coordinates.longitude,
        estimatedCapacity,
        20
      );
      const stateName = coordinates.placeName.split(',')[1]?.trim() || 'default';
      const electricityRate = getElectricityRate(stateName);
      const calculationResults = calculateSolarROI(
        formData,
        solarData,
        electricityRate
      );
      setResults(calculationResults);
      saveToHistory(formData, calculationResults, coordinates);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrorMessage(error.message || 'Calculation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleShare = () => {
    const shareText = `Check out my Solarity solar analysis! System Size: ${results.systemSize}kW, Payback: ${results.paybackPeriod} years, Lifetime Savings: ₹${results.lifetimeSavings.toLocaleString()}`;
    if (navigator.share) {
      navigator.share({
        title: 'My Solarity Solar ROI Analysis',
        text: shareText,
      }).catch(err => console.log('Share failed:', err));
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };
  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans text-gray-800 selection:bg-green-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="md:ml-24 p-4 sm:p-6 md:p-12 max-w-[1600px] mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-white rounded-xl transition touch-manipulation"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1 sm:mb-2">
                Solarity<span className="text-green-600">.</span>
              </h1>
              <p className="text-gray-400 font-medium text-sm sm:text-base md:text-lg">Know your solar worth instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 sm:px-5 py-2 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-600">Live Data</span>
            </div>
          </div>
        </header>
        {activeView === 'history' && (
          <HistoryView history={history} onLoad={loadFromHistory} onDelete={deleteFromHistory} />
        )}
        {activeView === 'compare' && (
          <CompareView history={history} />
        )}
        {activeView === 'about' && (
          <AboutView />
        )}
        {activeView === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-4">
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-lg lg:sticky lg:top-8">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Calculate Your ROI</h2>
                  <p className="text-gray-500 text-xs sm:text-sm">Get instant solar analysis powered by real-time data</p>
                </div>
                {errorMessage && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl flex items-start gap-2 sm:gap-3">
                    <AlertCircle size={18} className="sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-red-700 font-medium">{errorMessage}</p>
                  </div>
                )}
                <div className="space-y-5 sm:space-y-6">
                  <LocationSearch
                    value={formData.location}
                    onChange={(v) => setFormData({...formData, location: v})}
                    error={errors.location}
                  />
                  <InputGroup 
                    label="Avg Monthly Bill" 
                    prefix="₹"
                    placeholder="3000"
                    value={formData.monthlyBill}
                    onChange={(v) => setFormData({...formData, monthlyBill: v})}
                    error={errors.monthlyBill}
                  />
                  <InputGroup 
                    label="Usable Roof Area" 
                    suffix="sq ft"
                    placeholder="1200"
                    value={formData.roofArea}
                    onChange={(v) => setFormData({...formData, roofArea: v})}
                    error={errors.roofArea}
                  />
                </div>
                <button 
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full mt-6 sm:mt-8 bg-green-600 hover:bg-green-700 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 md:py-6 rounded-[1.5rem] sm:rounded-[2rem] transition-all active:scale-95 hover:shadow-xl hover:shadow-green-200 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={20} className="sm:w-[22px] sm:h-[22px] animate-spin" />
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <>Calculate ROI <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px]" /></>
                  )}
                </button>
                <p className="text-center text-gray-400 text-xs mt-4 sm:mt-6 font-medium">
                  Powered by NREL Solar Data • Real-time Analysis
                </p>
              </div>
            </div>
