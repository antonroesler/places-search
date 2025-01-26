import { useEffect, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { LatLngBounds, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place, PlaceType } from '../types';
import { getPlaceIcon } from '../utils/icons';
import PlaceModal from './PlaceModal';

interface MapProps {
  selectedTypes: PlaceType[];
  onSearch: (bounds: { center: { latitude: number; longitude: number }; radius: number }) => void;
  places: Place[];
}

function MapEvents({ onBoundsChange }: { 
  onBoundsChange: (bounds: { center: { latitude: number; longitude: number }; radius: number }) => void 
}) {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      
      // Calculate radius in meters (approximate)
      const radius = Math.max(
        getDistanceFromLatLonInM(center.lat, center.lng, northEast.lat, northEast.lng),
        getDistanceFromLatLonInM(center.lat, center.lng, southWest.lat, southWest.lng)
      );

      // Clamp radius to API limits (0 to 50,000 meters)
      const clampedRadius = Math.min(Math.max(0, radius), 50000);

      onBoundsChange({
        center: {
          latitude: center.lat,
          longitude: center.lng
        },
        radius: clampedRadius
      });
    },
  });
  return null;
}

// Calculate distance between two points in meters
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth's radius in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Separate markers into their own component to prevent unnecessary re-renders
function PlaceMarkers({ places, selectedPlace, onSelectPlace }: {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
}) {
  // Create marker icons with useMemo
  const normalIcon = useMemo(() => new Icon({
    iconUrl: getPlaceIcon(false),
    iconSize: [32, 38],
    iconAnchor: [16, 38],
    className: 'transition-transform duration-200 hover:scale-110'
  }), []);

  const selectedIcon = useMemo(() => new Icon({
    iconUrl: getPlaceIcon(true),
    iconSize: [32, 38],
    iconAnchor: [16, 38],
    className: 'transition-transform duration-200 scale-125'
  }), []);

  return (
    <>
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.location.latitude, place.location.longitude]}
          icon={selectedPlace?.id === place.id ? selectedIcon : normalIcon}
          eventHandlers={{
            click: () => onSelectPlace(place),
          }}
        />
      ))}
    </>
  );
}

export default function Map({ selectedTypes, onSearch, places }: MapProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const defaultCenter = { lat: 48.5, lng: 10 }; // Roughly central Europe
  const defaultZoom = 5; // Zoom level to show most of Europe

  // Debounce the bounds change handler
  const handleBoundsChange = useCallback((bounds: { center: { latitude: number; longitude: number }; radius: number }) => {
    // Use requestAnimationFrame to debounce the update
    requestAnimationFrame(() => {
      onSearch(bounds);
    });
  }, [onSearch]);

  return (
    <div className="absolute inset-0">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onBoundsChange={handleBoundsChange} />
        <PlaceMarkers
          places={places}
          selectedPlace={selectedPlace}
          onSelectPlace={setSelectedPlace}
        />
      </MapContainer>

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}