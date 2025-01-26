import { useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapProps } from './types';
import { getPlaceIcon } from '../../utils/icons';

function MapEvents({ onBoundsChange }: { 
  onBoundsChange: MapProps['onBoundsChange']
}) {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      
      const radius = Math.min(
        getDistanceFromLatLonInM(
          center.lat,
          center.lng,
          northEast.lat,
          northEast.lng
        ),
        50000 // API limit
      );

      onBoundsChange({
        center: {
          latitude: center.lat,
          longitude: center.lng
        },
        radius
      });
    },
  });
  return null;
}

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
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

export function LeafletMap({ markers, onBoundsChange, onMarkerSelect, selectedMarkerId }: MapProps) {
  const defaultCenter = { lat: 48.5, lng: 10 };
  const defaultZoom = 5;

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
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onBoundsChange={onBoundsChange} />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.location.latitude, marker.location.longitude]}
          icon={marker.id === selectedMarkerId ? selectedIcon : normalIcon}
          eventHandlers={{
            click: () => onMarkerSelect(marker.id),
          }}
        />
      ))}
    </MapContainer>
  );
}