import { useState, useCallback } from 'react';
import { LeafletMap } from './services/maps/LeafletMap';
import TypeSelect from './components/TypeSelect';
import PlaceModal from './components/PlaceModal';
import { usePlacesSearch } from './hooks/usePlacesSearch';
import { GooglePlacesService } from './services/places/googlePlaces';
import { MapBounds } from './services/maps/types';
import { PlaceType } from './types';
import { Place } from './services/places/types';

const placesService = new GooglePlacesService(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

function App() {
  const [selectedTypes, setSelectedTypes] = useState<PlaceType[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const {
    places,
    isSearching,
    error,
    searchPlaces
  } = usePlacesSearch(placesService);

  const handleMapSearch = useCallback((bounds: MapBounds) => {
    setMapBounds(bounds);
  }, []);

  const handleSearch = useCallback(() => {
    if (mapBounds) {
      searchPlaces(selectedTypes, mapBounds);
    }
  }, [mapBounds, selectedTypes, searchPlaces]);

  const markers = places.map(place => ({
    id: place.id,
    location: place.location,
    isSelected: place.id === selectedPlace?.id
  }));

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white shadow-md relative z-[1000]">
        <TypeSelect
          selectedTypes={selectedTypes}
          onChange={setSelectedTypes}
          onSearch={handleSearch}
          isSearching={isSearching}
        />
        {error && (
          <div className="mt-2 text-red-600 text-sm">{error}</div>
        )}
      </div>
      <div className="flex-1 relative">
        <LeafletMap
          markers={markers}
          onBoundsChange={handleMapSearch}
          onMarkerSelect={(id) => {
            const place = places.find(p => p.id === id);
            setSelectedPlace(place || null);
          }}
          selectedMarkerId={selectedPlace?.id || null}
        />
      </div>

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          placesService={placesService}
        />
      )}
    </div>
  );
}

export default App;