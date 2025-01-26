import React from 'react';
import { PlaceType } from '../types';

interface IconProps {
  className?: string;
}

const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({ className = "h-5 w-5", children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const Tent = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M3.5 21 14 3" />
    <path d="m20.5 21-7-18" />
    <path d="M2 21h20" />
  </IconWrapper>
);

export const Beer = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
    <path d="M9 12v6" />
    <path d="M13 12v6" />
    <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 3 11 3s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
    <path d="M5 8v13" />
    <path d="M19 8v13" />
  </IconWrapper>
);

export const Coffee = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </IconWrapper>
);

export const UtensilsCrossed = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M16 2v20M12 2v3m0 3v12a4 4 0 0 1-4 4M8 2v3m0 3v12a4 4 0 0 0 4 4" />
  </IconWrapper>
);

export const Wine = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M8 22h8M7 10h10M12 15v7M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
  </IconWrapper>
);

export const Waves = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </IconWrapper>
);

export const Mountain = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </IconWrapper>
);

export const Trees = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M12 2L7 7H5c-1.5 0-3 .5-3 2s2 2 3 2h1l5 5" />
    <path d="M19 7h-2L12 2l-1 1 4 4-4 4 6 6h4c1 0 2-1 2-2s-1-2-2-2h-1l-3-3 3-3Z" />
  </IconWrapper>
);

export const Info = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </IconWrapper>
);

export const Building2 = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="M6 22V4c0-.27 0-.55.07-.82a1.98 1.98 0 0 1 1.1-1.11C7.45 2 7.73 2 8 2h8c.27 0 .55 0 .82.07a1.98 1.98 0 0 1 1.11 1.1c.07.28.07.56.07.83v18H6Z" />
    <path d="M2 14v6c0 1.1.9 2 2 2h2V12H4c-1.1 0-2 .9-2 2Z" />
    <path d="M20 12h-2v10h2c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2Z" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </IconWrapper>
);

export const Store = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </IconWrapper>
);

export const X = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconWrapper>
);

export const ChevronDown = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <polyline points="6 9 12 15 18 9" />
  </IconWrapper>
);

export const Check = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <polyline points="20 6 9 17 4 12" />
  </IconWrapper>
);

export const Search = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </IconWrapper>
);

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