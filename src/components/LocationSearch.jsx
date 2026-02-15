import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';
import { searchLocations } from '../utils/api';

const LocationSearch = ({ value, onChange, error }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchLocations(value);
        setSuggestions(results);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleSelect = (locationName) => {
    onChange(locationName);
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-3 relative" ref={wrapperRef}>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
        Location
      </label>
      <div className="relative group">
        <span className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
          <MapPin size={18} className="sm:w-5 sm:h-5" />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter city name (e.g., Mumbai)"
          className={`w-full pl-12 sm:pl-14 pr-10 sm:pr-12 py-4 sm:py-5 rounded-2xl sm:rounded-3xl border-2 transition-all text-gray-900 font-semibold text-base sm:text-lg placeholder:text-gray-300 placeholder:font-normal focus:scale-[1.01] sm:focus:scale-[1.02] focus:shadow-xl ${
            error
              ? 'border-red-300 bg-red-50 focus:border-red-500'
              : 'border-gray-100 bg-white focus:border-green-500 focus:bg-green-50/30'
          }`}
        />
        {loading && (
          <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm font-medium ml-1">{error}</p>
      )}

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slide-up max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSelect(suggestion.name)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 text-left hover:bg-green-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-b-0 touch-manipulation"
            >
              <MapPin size={16} className="text-green-500 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
              <span className="text-gray-800 font-medium text-sm sm:text-base">{suggestion.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
