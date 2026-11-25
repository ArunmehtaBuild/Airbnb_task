/**
 * AmenitiesSection.jsx — "What this place offers" verbatim from Airbnb
 *
 * Includes:
 * 1. 10 preview amenities on the main listing page with authentic strikethrough cuts
 * 2. "Show all 62 amenities" interactive button
 * 3. Full popup modal dialog with search filter, all 14 categories, and 62+ amenities
 */

import { useState, useEffect } from 'react';
import {
  Flower,
  Mountain,
  TreePine,
  Waves,
  Bath,
  Wind,
  Sparkles,
  Droplets,
  Flame,
  Shirt,
  Bed,
  Layers,
  Sun,
  Lock,
  Archive,
  Tv,
  Speaker,
  Dumbbell,
  BookOpen,
  Shield,
  ShieldAlert,
  Snowflake,
  Fan,
  Wifi,
  Laptop,
  UtensilsCrossed,
  Refrigerator,
  Microwave,
  Coffee,
  Wine,
  DoorClosed,
  Armchair,
  Car,
  Building,
  Home,
  User,
  Calendar,
  Bell,
  Check,
  Search,
  ArrowLeft,
  X,
} from 'lucide-react';

export const ALL_AMENITIES_CATEGORIES = [
  {
    category: 'Scenic views',
    items: [
      { name: 'Garden view', icon: 'flower' },
      { name: 'Mountain view', icon: 'mountain' },
      { name: 'Park view', icon: 'tree' },
      { name: 'Pool view', icon: 'waves' },
    ],
  },
  {
    category: 'Bathroom',
    items: [
      { name: 'Bath', icon: 'bath' },
      { name: 'Hairdryer', icon: 'wind' },
      { name: 'Cleaning products', icon: 'sparkles' },
      { name: 'Shampoo', icon: 'droplets' },
      { name: 'Conditioner', icon: 'droplets' },
      { name: 'Body soap', icon: 'sparkles' },
      { name: 'Hot water', icon: 'flame' },
      { name: 'Shower gel', icon: 'droplets' },
    ],
  },
  {
    category: 'Bedroom and laundry',
    items: [
      { name: 'Free washer – In unit', icon: 'shirt' },
      { name: 'Free dryer', icon: 'wind' },
      { name: 'Essentials', subtitle: 'Towels, bed sheets, soap and toilet paper', icon: 'check' },
      { name: 'Hangers', icon: 'check' },
      { name: 'Bed linen', subtitle: 'Egyptian cotton 400 Thread Count linen', icon: 'bed' },
      { name: 'Extra pillows and blankets', icon: 'layers' },
      { name: 'Room-darkening blinds', icon: 'sun' },
      { name: 'Iron', icon: 'check' },
      { name: 'Clothes drying rack', icon: 'check' },
      { name: 'Safe', icon: 'lock' },
      { name: 'Clothes storage: wardrobe', icon: 'archive' },
    ],
  },
  {
    category: 'Entertainment',
    items: [
      { name: '43-inch HDTV with Netflix', icon: 'tv' },
      { name: 'Sound system', icon: 'speaker' },
      { name: 'Exercise equipment', icon: 'dumbbell' },
      { name: 'Books and reading material', icon: 'book' },
    ],
  },
  {
    category: 'Family',
    items: [
      { name: 'Fireplace guards', icon: 'shield' },
    ],
  },
  {
    category: 'Heating and cooling',
    items: [
      { name: 'AC – split-type ductless system', icon: 'snowflake' },
      { name: 'Ceiling fan', icon: 'fan' },
      { name: 'Heating', icon: 'flame' },
    ],
  },
  {
    category: 'Home safety',
    items: [
      { name: 'Fire extinguisher', icon: 'shield-alert' },
      { name: 'First aid kit', icon: 'shield' },
    ],
  },
  {
    category: 'Internet and office',
    items: [
      { name: 'Wifi', icon: 'wifi' },
      { name: 'Dedicated workspace', subtitle: 'Includes desk', icon: 'laptop' },
    ],
  },
  {
    category: 'Kitchen and dining',
    items: [
      { name: 'Kitchen', subtitle: 'Space where guests can cook their own meals', icon: 'utensils' },
      { name: 'Fridge', icon: 'refrigerator' },
      { name: 'Microwave', icon: 'microwave' },
      { name: 'Cooking basics', subtitle: 'Pots and pans, oil, salt and pepper', icon: 'utensils' },
      { name: 'Crockery and cutlery', subtitle: 'Plates, bowls, cups, cutlery and other utensils', icon: 'utensils' },
      { name: 'Freezer', icon: 'snowflake' },
      { name: 'Dishwasher', icon: 'sparkles' },
      { name: 'Cooker', icon: 'flame' },
      { name: 'Kettle', icon: 'coffee' },
      { name: 'Wine glasses', icon: 'wine' },
      { name: 'Coffee', icon: 'coffee' },
    ],
  },
  {
    category: 'Location features',
    items: [
      { name: 'Shared beach access', subtitle: 'Guests can enjoy a nearby beach', icon: 'sun' },
      { name: 'Private entrance', subtitle: 'Separate street or building entrance', icon: 'door' },
      { name: 'Launderette nearby', icon: 'shirt' },
    ],
  },
  {
    category: 'Outdoor',
    items: [
      { name: 'Private patio or balcony', icon: 'sun' },
      { name: 'Shared back garden – Fully fenced', subtitle: 'An open space on the property usually covered in grass', icon: 'tree' },
      { name: 'Outdoor furniture', icon: 'armchair' },
      { name: 'Outdoor dining area', icon: 'utensils' },
      { name: 'Beach essentials', subtitle: 'Beach gear such as towels, chairs and an umbrella', icon: 'sun' },
    ],
  },
  {
    category: 'Parking and facilities',
    items: [
      { name: 'Free parking on premises', icon: 'car' },
      { name: 'Shared indoor pool', icon: 'waves' },
      { name: 'Lift', subtitle: "The home or building has a lift that's at least 52 inches (132cm) deep and a doorway at least 32 inches (81cm) wide", icon: 'building' },
      { name: 'Shared gym in building', icon: 'dumbbell' },
      { name: 'Single-level home', subtitle: 'No stairs in home', icon: 'home' },
    ],
  },
  {
    category: 'Services',
    items: [
      { name: 'Caretaker', icon: 'user' },
      { name: 'Long-term stays allowed', subtitle: 'Allow stays of 28 days or more', icon: 'calendar' },
      { name: 'Cleaning available during stay', icon: 'sparkles' },
    ],
  },
  {
    category: 'Not included',
    items: [
      {
        name: 'Smoke alarm',
        subtitle: 'This place may not have a smoke detector. Contact the host with any questions.',
        icon: 'smoke',
        unavailable: true,
      },
      {
        name: 'Carbon monoxide alarm',
        subtitle: 'This place may not have a carbon monoxide detector. Contact the host with any questions.',
        icon: 'alarm',
        unavailable: true,
      },
    ],
  },
];

function renderAmenityIcon(type) {
  switch (type) {
    case 'flower':
      return <Flower size={24} strokeWidth={1.5} />;
    case 'mountain':
      return <Mountain size={24} strokeWidth={1.5} />;
    case 'tree':
      return <TreePine size={24} strokeWidth={1.5} />;
    case 'waves':
    case 'pool':
      return <Waves size={24} strokeWidth={1.5} />;
    case 'bath':
      return <Bath size={24} strokeWidth={1.5} />;
    case 'wind':
      return <Wind size={24} strokeWidth={1.5} />;
    case 'sparkles':
      return <Sparkles size={24} strokeWidth={1.5} />;
    case 'droplets':
      return <Droplets size={24} strokeWidth={1.5} />;
    case 'flame':
      return <Flame size={24} strokeWidth={1.5} />;
    case 'shirt':
      return <Shirt size={24} strokeWidth={1.5} />;
    case 'bed':
      return <Bed size={24} strokeWidth={1.5} />;
    case 'layers':
      return <Layers size={24} strokeWidth={1.5} />;
    case 'sun':
      return <Sun size={24} strokeWidth={1.5} />;
    case 'lock':
      return <Lock size={24} strokeWidth={1.5} />;
    case 'archive':
      return <Archive size={24} strokeWidth={1.5} />;
    case 'tv':
      return <Tv size={24} strokeWidth={1.5} />;
    case 'speaker':
      return <Speaker size={24} strokeWidth={1.5} />;
    case 'dumbbell':
      return <Dumbbell size={24} strokeWidth={1.5} />;
    case 'book':
      return <BookOpen size={24} strokeWidth={1.5} />;
    case 'shield':
      return <Shield size={24} strokeWidth={1.5} />;
    case 'shield-alert':
    case 'alarm':
      return <ShieldAlert size={24} strokeWidth={1.5} />;
    case 'snowflake':
      return <Snowflake size={24} strokeWidth={1.5} />;
    case 'fan':
      return <Fan size={24} strokeWidth={1.5} />;
    case 'wifi':
      return <Wifi size={24} strokeWidth={1.5} />;
    case 'laptop':
    case 'workspace':
      return <Laptop size={24} strokeWidth={1.5} />;
    case 'utensils':
      return <UtensilsCrossed size={24} strokeWidth={1.5} />;
    case 'refrigerator':
      return <Refrigerator size={24} strokeWidth={1.5} />;
    case 'microwave':
      return <Microwave size={24} strokeWidth={1.5} />;
    case 'coffee':
      return <Coffee size={24} strokeWidth={1.5} />;
    case 'wine':
      return <Wine size={24} strokeWidth={1.5} />;
    case 'door':
      return <DoorClosed size={24} strokeWidth={1.5} />;
    case 'armchair':
      return <Armchair size={24} strokeWidth={1.5} />;
    case 'car':
      return <Car size={24} strokeWidth={1.5} />;
    case 'building':
      return <Building size={24} strokeWidth={1.5} />;
    case 'home':
      return <Home size={24} strokeWidth={1.5} />;
    case 'user':
    case 'caretaker':
      return <User size={24} strokeWidth={1.5} />;
    case 'calendar':
      return <Calendar size={24} strokeWidth={1.5} />;
    case 'smoke':
      return <Bell size={24} strokeWidth={1.5} />;
    default:
      return <Check size={24} strokeWidth={1.5} />;
  }
}

export default function AmenitiesSection({ amenities, totalCount = 62 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Preview 10 items shown on the main listing page
  const defaultPreviewAmenities = [
    { name: 'Garden view', icon: 'flower' },
    { name: 'Mountain view', icon: 'mountain' },
    { name: 'Shared beach access', icon: 'sun' },
    { name: 'Kitchen', icon: 'utensils' },
    { name: 'Wifi', icon: 'wifi' },
    { name: 'Dedicated workspace', icon: 'workspace' },
    { name: 'Free parking on premises', icon: 'car' },
    { name: 'Shared indoor pool', icon: 'pool' },
    { name: 'Carbon monoxide alarm', icon: 'alarm', unavailable: true },
    { name: 'Smoke alarm', icon: 'smoke', unavailable: true },
  ];

  const previewItems =
    amenities && amenities.length > 0 ? amenities : defaultPreviewAmenities;

  // Filtered categories based on search input
  const filteredCategories = ALL_AMENITIES_CATEGORIES.map((cat) => {
    const matchingItems = cat.items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        cat.category.toLowerCase().includes(q)
      );
    });
    return { ...cat, items: matchingItems };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div id="amenities" className="py-8 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-6">
        What this place offers
      </h3>

      {/* Main Listing Page Grid (10 Amenities) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 max-w-xl">
        {previewItems.map((item, index) => {
          const isUnavailable =
            item.unavailable || item.name.toLowerCase().includes('alarm');

          return (
            <div key={index} className="flex items-center gap-4 text-[#222222]">
              {/* Icon with authentic diagonal strikethrough slash cut when unavailable */}
              <div className="relative shrink-0 text-[#222222] flex items-center justify-center">
                {renderAmenityIcon(item.icon)}
                {isUnavailable && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[1.5px] h-7 bg-[#222222] rotate-45 transform origin-center" />
                  </div>
                )}
              </div>

              {/* Text with strikethrough cut when unavailable matching Airbnb */}
              <span
                className={`text-base font-normal ${
                  isUnavailable ? 'line-through text-[#222222]' : 'text-[#222222]'
                }`}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Show All Amenities Button */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setSearchQuery('');
        }}
        className="px-6 py-3 border border-[#222222] rounded-lg text-base font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
      >
        Show all {totalCount} amenities
      </button>

      {/* Full 62 Amenities Pop up Modal Dialog */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-[780px] w-full max-h-[88vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="What this place offers"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 sm:px-8 pt-6 pb-4 border-b border-[#EBEBEB] z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] transition-colors -ml-2 cursor-pointer"
                  aria-label="Close"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] transition-colors -mr-2 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </div>

              <div>
                <h1 className="text-[26px] font-bold text-[#222222] tracking-tight">
                  What this place offers
                </h1>
              </div>

              {/* Search Amenities Input */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717171]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search amenities"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-[#B0B0B0] hover:border-[#222222] focus:border-black rounded-full py-2.5 pl-11 pr-4 text-sm font-medium outline-hidden transition-colors"
                />
              </div>
            </div>

            {/* Scrollable Categories List */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12 text-[#717171]">
                  <p className="text-base font-semibold text-[#222222]">
                    No amenities found for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-sm mt-1">Try another search term.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredCategories.map((cat, catIdx) => (
                    <div key={catIdx} className="border-b border-[#EBEBEB] pb-6 last:border-b-0">
                      <h2 className="text-[18px] font-semibold text-[#222222] mb-4">
                        {cat.category}
                      </h2>

                      <div className="divide-y divide-[#F0F0F0]">
                        {cat.items.map((item, itemIdx) => {
                          const isUnavailable =
                            item.unavailable || cat.category === 'Not included';

                          return (
                            <div
                              key={itemIdx}
                              className="py-3.5 flex items-start gap-4 text-[#222222]"
                            >
                              {/* Icon with authentic strikethrough slash cut when unavailable */}
                              <div className="relative shrink-0 text-[#222222] mt-0.5 flex items-center justify-center">
                                {renderAmenityIcon(item.icon)}
                                {isUnavailable && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[1.5px] h-7 bg-[#222222] rotate-45 transform origin-center" />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-base font-normal ${
                                    isUnavailable ? 'line-through text-[#222222]' : 'text-[#222222]'
                                  }`}
                                >
                                  {item.name}
                                </p>
                                {item.subtitle && (
                                  <p className="text-sm text-[#717171] mt-0.5 leading-snug">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
