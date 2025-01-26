export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface MapBounds {
  center: MapLocation;
  radius: number;
}

export interface MapMarker {
  id: string;
  location: MapLocation;
  isSelected: boolean;
}

export interface MapProps {
  markers: MapMarker[];
  onBoundsChange: (bounds: MapBounds) => void;
  onMarkerSelect: (markerId: string) => void;
  selectedMarkerId: string | null;
}

// This allows us to easily swap map providers
export interface MapProvider {
  Map: React.ComponentType<MapProps>;
}