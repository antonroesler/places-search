import {
  Tent,
  Beer,
  Coffee,
  UtensilsCrossed,
  Wine,
  Waves,
  Mountain,
  Trees,
  Info,
  Building2,
  Store
} from 'lucide-react';
import { PlaceType } from '../types';

export function getTypeIcon(type: PlaceType) {
  switch (type) {
    case 'campground':
      return <Tent className="h-5 w-5" />;
    case 'bar':
      return <Beer className="h-5 w-5" />;
    case 'cafe':
      return <Coffee className="h-5 w-5" />;
    case 'restaurant':
      return <UtensilsCrossed className="h-5 w-5" />;
    case 'wine_bar':
      return <Wine className="h-5 w-5" />;
    case 'beach':
      return <Waves className="h-5 w-5" />;
    case 'hiking_area':
      return <Mountain className="h-5 w-5" />;
    case 'national_park':
      return <Trees className="h-5 w-5" />;
    case 'visitor_center':
      return <Info className="h-5 w-5" />;
    case 'hotel':
      return <Building2 className="h-5 w-5" />;
    case 'supermarket':
      return <Store className="h-5 w-5" />;
  }
}

export function getPlaceIcon(isSelected: boolean = false): string {
  // Modern Google Maps style marker with enhanced shading
  const svgMarker = `
    <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="pinGradient" x1="16" y1="0" x2="16" y2="38">
          <stop offset="0%" stop-color="${isSelected ? '#FF8F8F' : '#FF6B6B'}" />
          <stop offset="45%" stop-color="${isSelected ? '#FF6B6B' : '#FF4B4B'}" />
          <stop offset="100%" stop-color="${isSelected ? '#FF4B4B' : '#DC2626'}" />
        </linearGradient>
        <radialGradient id="shineGradient" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stop-color="${isSelected ? '#FFA3A3' : '#FF8080'}" stop-opacity="0.6" />
          <stop offset="100%" stop-color="${isSelected ? '#FF2525' : '#FF0000'}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Pin body with gradient fill -->
      <path d="M16 0C9 0 3.2 5.7 3.2 12.7C3.2 22.2 16 38 16 38C16 38 28.8 22.2 28.8 12.7C28.8 5.7 23 0 16 0Z" 
        fill="url(#pinGradient)"
        filter="url(#shadow)"
      />
      <!-- Shine overlay -->
      <path d="M16 0C9 0 3.2 5.7 3.2 12.7C3.2 22.2 16 38 16 38C16 38 28.8 22.2 28.8 12.7C28.8 5.7 23 0 16 0Z" 
        fill="url(#shineGradient)"
      />
      <!-- White dot in center -->
      <circle cx="16" cy="12.7" r="4" fill="white" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgMarker)}`;
}

export function getReadableType(type: string | undefined): string {
  if (!type) return 'Unknown';
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}