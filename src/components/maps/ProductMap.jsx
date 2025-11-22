// src/components/maps/ProductMap.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';
import { mockVendors } from '../../utils/mockData';
import { formatPrice } from '../../utils/currency';

const libraries = ['places']; // For potential future autocomplete on map

const mapContainerStyle = {
  width: '100%',
  height: '600px', // Adjust height as needed
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const defaultCenter = {
  lat: 12.9716, // Bangalore, India
  lng: 77.5946,
};

// You need to replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
// It's best to store this in an environment variable: VITE_GOOGLE_MAPS_API_KEY
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function ProductMap({ searchResults = [] }) {
  // Check if API key is valid (not placeholder)
  const isValidApiKey = googleMapsApiKey && googleMapsApiKey !== 'YOUR_ACTUAL_API_KEY_HERE';

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: isValidApiKey ? googleMapsApiKey : '',
    libraries,
    preventGoogleFontsLoading: true, // Optimization
  });

  // If API key is invalid, show a friendly fallback immediately
  if (!isValidApiKey) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full mb-4">
          <Loader2 className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Map Unavailable</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          Map integration requires a valid Google Maps API Key. Please configure it in your environment variables.
        </p>
      </div>
    );
  }

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (isLoaded && searchResults.length > 0) {
      // Create markers from search results
      const newMarkers = searchResults.map((result) => ({
        lat: result.vendor.latitude,
        lng: result.vendor.longitude,
        id: result.vendor.id + '-' + result.product.id, // Unique ID for marker
        name: result.vendor.name,
        productName: result.product.name,
        price: result.price,
        stock: result.stock,
      }));
      setMarkers(newMarkers);

      // Adjust map center to the first result or average of all
      if (searchResults.length > 0) {
        setMapCenter({
          lat: searchResults[0].vendor.latitude,
          lng: searchResults[0].vendor.longitude,
        });
      }
    } else if (isLoaded && searchResults.length === 0) {
      // If no results, reset markers and center
      setMarkers([]);
      setMapCenter(defaultCenter);
    }
  }, [isLoaded, searchResults]);


  if (loadError) return <div className="text-center text-red-500 p-4">Error loading maps.</div>;
  if (!isLoaded) return (
    <div className="flex items-center justify-center w-full h-[600px] bg-gray-100 dark:bg-gray-700 rounded-lg">
      <Loader2 className="h-8 w-8 animate-spin text-fypBlue" />
      <span className="ml-2 text-gray-600 dark:text-gray-300">Loading Map...</span>
    </div>
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={12} // Adjust zoom level as needed
      options={{
        disableDefaultUI: false, // You can customize UI controls
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {markers.map((marker) => (
        <MarkerF
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={`${marker.productName} at ${marker.name} (${formatPrice(marker.price)})`}
          // You can add more info windows or custom icons here
          onClick={() => console.log('Marker clicked:', marker)}
        />
      ))}
    </GoogleMap>
  );
}