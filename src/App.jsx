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
