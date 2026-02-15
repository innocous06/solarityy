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
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationQuery)}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          country: 'IN',
          limit: 1,
          types: 'place,locality'
        }
      }
    );
    if (response.data.features && response.data.features.length > 0) {
      const [longitude, latitude] = response.data.features[0].center;
      const placeName = response.data.features[0].place_name;
      return { latitude, longitude, placeName };
    }
    throw new Error('Location not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Could not find location. Try entering city and state.');
  }
};
export const searchLocations = async (query) => {
  if (!query || query.length < 2) return [];
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'your_mapbox_token_here') {
    const indianCities = [
      'Mumbai, Maharashtra',
      'Delhi, Delhi',
      'Bangalore, Karnataka',
      'Hyderabad, Telangana',
      'Chennai, Tamil Nadu',
      'Kolkata, West Bengal',
      'Pune, Maharashtra',
      'Ahmedabad, Gujarat',
      'Jaipur, Rajasthan',
      'Surat, Gujarat'
    ];
    return indianCities
      .filter(city => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .map(city => ({ name: city, id: city }));
  }
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
      {
        params: {
          access_token: MAPBOX_TOKEN,
          country: 'IN',
          limit: 5,
          types: 'place,locality'
        }
      }
    );
    return response.data.features.map(feature => ({
      name: feature.place_name,
      id: feature.id
    }));
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};
export const getSolarData = async (latitude, longitude, systemCapacity, tilt = 20) => {
  try {
    const response = await axios.get(
      'https://developer.nrel.gov/api/pvwatts/v8.json',
      {
        params: {
          api_key: NREL_API_KEY,
          lat: latitude,
          lon: longitude,
          system_capacity: systemCapacity,
          azimuth: 180,
          tilt: tilt,
          array_type: 1,
          module_type: 0,
          losses: 14
        }
      }
    );
    return response.data.outputs;
  } catch (error) {
    console.error('NREL API error:', error);
    const fallbackProduction = systemCapacity * 1450;
    return {
      ac_annual: fallbackProduction,
      solrad_annual: 5.5,
      capacity_factor: 16.5
    };
  }
};
export const getElectricityRate = (state) => {
  const rates = {
    'Maharashtra': 9.5,
    'Delhi': 8.0,
    'Karnataka': 7.5,
    'Telangana': 8.5,
    'Tamil Nadu': 7.0,
    'West Bengal': 8.0,
    'Gujarat': 6.5,
    'Rajasthan': 7.5,
    'default': 8.0
  };
  return rates[state] || rates.default;
};
