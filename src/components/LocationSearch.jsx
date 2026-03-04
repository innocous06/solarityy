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
