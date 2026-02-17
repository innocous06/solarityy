// Solar irradiance data provider configuration
import axios from 'axios';
const NREL_API_KEY = import.meta.env.VITE_NREL_API_KEY || 'DEMO_KEY';
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const getCoordinates = async (locationQuery) => {
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your_mapbox_token_here') {
    console.warn('Mapbox token not configured, using default coordinates');
    return {
      latitude: 28.6139,
      longitude: 77.2090,
      placeName: locationQuery || 'Delhi, India'
    };
  }
  try {
    const response = await axios.get(
