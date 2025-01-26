import axios, { AxiosError } from 'axios';
import { Place, PlacesService, PlacesSearchParams } from './types';

export class GooglePlacesService implements PlacesService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchNearby(params: PlacesSearchParams): Promise<Place[]> {
    try {
      const response = await axios.post(
        'https://places.googleapis.com/v1/places:searchNearby',
        {
          includedTypes: params.includedTypes,
          excludedTypes: params.excludedTypes,
          maxResultCount: 20,
          locationRestriction: {
            circle: {
              center: params.center,
              radius: params.radius
            }
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': this.apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.primaryType,places.types,places.photos,places.id',
          },
        }
      );

      return response.data.places || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ error: { message: string } }>;
        throw new Error(
          axiosError.response?.data?.error?.message || axiosError.message
        );
      }
      throw error;
    }
  }

  async getPhoto(photoName: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://places.googleapis.com/v1/${photoName}/media`,
        {
          params: {
            key: this.apiKey,
            maxHeightPx: 800,
            maxWidthPx: 800,
            skipHttpRedirect: true,
          },
        }
      );
      return response.data.photoUri;
    } catch (error) {
      throw new Error('Failed to fetch photo');
    }
  }
}