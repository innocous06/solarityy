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
