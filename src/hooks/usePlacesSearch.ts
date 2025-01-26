import { useState, useCallback } from 'react';
import { Place, PlaceType, placeTypeRelations } from '../types';
import { PlacesService } from '../services/places/types';
import { MapBounds } from '../services/maps/types';

export function usePlacesSearch(placesService: PlacesService) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (
    selectedTypes: PlaceType[],
    bounds: MapBounds
  ) => {
    if (selectedTypes.length === 0 || !bounds) return;

    setIsSearching(true);
    setError(null);

    try {
      const includedTypes = new Set<string>();
      const excludedTypes = new Set<string>();

      selectedTypes.forEach(type => {
        const relations = placeTypeRelations[type];
        relations.includes.forEach(t => includedTypes.add(t));
        relations.excludes.forEach(t => excludedTypes.add(t));
      });

      const results = await placesService.searchNearby({
        includedTypes: Array.from(includedTypes),
        excludedTypes: Array.from(excludedTypes),
        center: bounds.center,
        radius: bounds.radius
      });

      // Filter results to ensure they match our criteria
      const filteredPlaces = results.filter((place: Place) => {
        const placeTypes = new Set([place.primaryType, ...(place.types || [])]);
        return Array.from(placeTypes).some(type => includedTypes.has(type));
      });

      setPlaces(filteredPlaces);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setPlaces([]);
    } finally {
      setIsSearching(false);
    }
  }, [placesService]);

  return {
    places,
    isSearching,
    error,
    searchPlaces
  };
}