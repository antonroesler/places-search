export interface Place {
  id: string;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
    languageCode: string;
  };
  primaryType: string;
  types?: string[];
  photos?: Array<{
    name: string;
    widthPx: number;
    heightPx: number;
    authorAttributions: Array<{
      displayName: string;
      uri: string;
      photoUri: string;
    }>;
    googleMapsUri: string;
  }>;
}

export interface PlacesSearchParams {
  includedTypes: string[];
  excludedTypes: string[];
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}

export interface PlacesService {
  searchNearby: (params: PlacesSearchParams) => Promise<Place[]>;
  getPhoto: (photoName: string) => Promise<string>;
}