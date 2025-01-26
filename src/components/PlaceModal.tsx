import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Place } from '../types';
import { getReadableType } from '../utils/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface PlaceModalProps {
  place: Place;
  onClose: () => void;
}

interface PhotoResponse {
  name: string;
  photoUri: string;
}

export default function PlaceModal({ place, onClose }: PlaceModalProps) {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!place.photos) return;

      const photoPromises = place.photos.slice(0, 6).map(async (photo) => {
        try {
          const response = await axios.get<PhotoResponse>(
            `https://places.googleapis.com/v1/${photo.name}/media`,
            {
              params: {
                key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                maxHeightPx: 800,
                maxWidthPx: 800,
                skipHttpRedirect: true,
              },
            }
          );
          return response.data.photoUri;
        } catch (error) {
          console.error('Error fetching photo:', error);
          return null;
        }
      });

      const photoUrls = await Promise.all(photoPromises);
      setPhotos(photoUrls.filter((url): url is string => url !== null));
    };

    fetchPhotos();
  }, [place.photos]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-[2000]"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-y-0 left-0 w-1/2 p-4 overflow-y-auto">
        <Dialog.Panel className="w-full h-full bg-white rounded-lg shadow-xl">
          <div className="relative h-64">
            {photos.length > 0 ? (
              <img
                src={photos[0]}
                alt={place.displayName.text}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                <span className="text-gray-400">No photo available</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <Dialog.Title className="text-2xl font-bold mb-2">
              {place.displayName.text}
            </Dialog.Title>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">{place.formattedAddress}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Type: {getReadableType(place.primaryType)}
                </p>
              </div>
              
              {photos.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Photos</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photoUrl, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={photoUrl}
                          alt={`${place.displayName.text} photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}