import { z } from 'zod';

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

export type PlaceType = 
  | 'campground'
  | 'bar'
  | 'cafe'
  | 'restaurant'
  | 'wine_bar'
  | 'beach'
  | 'hiking_area'
  | 'national_park'
  | 'visitor_center'
  | 'hotel'
  | 'supermarket';

// Define type relationships for filtering
export const placeTypeRelations = {
  restaurant: {
    includes: [
      'restaurant',
      'seafood_restaurant',
      'steak_house',
      'fine_dining_restaurant',
      'american_restaurant',
      'asian_restaurant',
      'european_restaurant',
      'mediterranean_restaurant'
    ],
    excludes: []
  },
  campground: {
    includes: ['campground'],
    excludes: [
      'hotel',
      'motel',
      'resort_hotel',
      'lodging'
    ]
  },
  hotel: {
    includes: [
      'hotel',
      'resort_hotel'
    ],
    excludes: [
      'campground',
      'motel'
    ]
  },
  supermarket: {
    includes: [
      'supermarket',
      'grocery_store'
    ],
    excludes: [
      'convenience_store',
      'department_store'
    ]
  },
  bar: {
    includes: [
      'bar',
      'pub',
      'bar_and_grill'
    ],
    excludes: []
  },
  cafe: {
    includes: [
      'cafe',
      'coffee_shop',
      'tea_house'
    ],
    excludes: []
  },
  wine_bar: {
    includes: [
      'wine_bar'
    ],
    excludes: [
      'bar',
      'pub'
    ]
  },
  beach: {
    includes: ['beach'],
    excludes: []
  },
  hiking_area: {
    includes: [
      'hiking_area',
      'trail'
    ],
    excludes: []
  },
  national_park: {
    includes: [
      'national_park',
      'state_park',
      'nature_reserve'
    ],
    excludes: []
  },
  visitor_center: {
    includes: [
      'visitor_center',
      'tourist_information_center'
    ],
    excludes: []
  }
} as const;

// Type guard to check if a type is a valid PlaceType
export function isValidPlaceType(type: string): type is PlaceType {
  return Object.keys(placeTypeRelations).includes(type);
}