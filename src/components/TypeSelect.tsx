import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, X, Search } from 'lucide-react';
import { PlaceType } from '../types';
import { getReadableType, getTypeIcon } from '../utils/icons';

const PLACE_TYPES: PlaceType[] = [
  'campground',
  'bar',
  'cafe',
  'restaurant',
  'wine_bar',
  'beach',
  'hiking_area',
  'national_park',
  'visitor_center',
];

interface TypeSelectProps {
  selectedTypes: PlaceType[];
  onChange: (types: PlaceType[]) => void;
  onSearch: () => void;
}

export default function TypeSelect({ selectedTypes, onChange, onSearch }: TypeSelectProps) {
  const handleSelect = (type: PlaceType) => {
    if (!selectedTypes.includes(type)) {
      onChange([...selectedTypes, type]);
    }
  };

  const handleRemove = (typeToRemove: PlaceType) => {
    onChange(selectedTypes.filter(type => type !== typeToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 items-start">
        <div className="flex-1">
          <Listbox value={null} onChange={handleSelect}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                <span className="block truncate text-gray-400">
                  Select place types...
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[1001]">
                  {PLACE_TYPES.filter(type => !selectedTypes.includes(type)).map((type) => (
                    <Listbox.Option
                      key={type}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                        }`
                      }
                      value={type}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            <span className="inline-flex items-center">
                              {getTypeIcon(type)}
                              <span className="ml-2">{getReadableType(type)}</span>
                            </span>
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-indigo-600' : 'text-indigo-600'
                              }`}
                            >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <button
          onClick={onSearch}
          disabled={selectedTypes.length === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {selectedTypes.map((type) => (
          <span
            key={type}
            className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800"
          >
            {getTypeIcon(type)}
            <span className="ml-2">{getReadableType(type)}</span>
            <button
              type="button"
              onClick={() => handleRemove(type)}
              className="ml-1 inline-flex items-center rounded-full p-0.5 text-indigo-800 hover:bg-indigo-200 focus:outline-none"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}