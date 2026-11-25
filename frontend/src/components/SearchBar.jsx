/**
 * SearchBar.jsx — Airbnb Search Bar with Exact Icons and Rich Interactive Subtabs
 *
 * Icons from live Airbnb platform assets:
 * - Homes: https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240
 * - Experiences: https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240
 * - Services: https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240
 *
 * Verbatim Airbnb Reference:
 * - Collapsed Search Pill: Anywhere | Anytime | Add guests + 40px House icon & 36px Search button
 * - Expanded Tabs: Homes | Experiences | Services with 48px official 3D icons
 * - Dedicated Subtabs & Dropdowns for each tab:
 *   1. Homes:
 *      - Where: Suggested destinations (Nearby, Goa, Candolim, Delhi, Mumbai, etc.)
 *      - When: Dates tab (2-month calendar + flexible radio pills) / Flexible tab (Weekend/Week/Month + month carousel)
 *      - Who: 4-row guest picker (Adults, Children, Infants, Pets)
 *   2. Experiences:
 *      - Where: City or landmark suggestions
 *      - When: 2-column popover (Today, Tomorrow, This weekend + 1-month calendar)
 *      - Who: 3-row guest picker (Adults, Children, Infants)
 *   3. Services:
 *      - Where: Service location suggestions
 *      - When: 2-column popover (Today, Tomorrow, This weekend + 1-month calendar)
 *      - Type of service: 9 service pill options (Photography, Chefs, Massage, Prepared meals, Training, Make-up, Hair, Spa treatments, Catering)
 */

import { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Compass,
  Waves,
  Palmtree,
  Hotel,
  Landmark,
  Utensils,
  UtensilsCrossed,
  Sparkles,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Camera,
  Scissors,
  Dumbbell,
  Flower2,
  Wine,
  Check,
} from 'lucide-react';
import { searchProperties } from '../services/propertyApi';

export const HOMES_ICON_URL =
  'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240';
export const EXPERIENCES_ICON_URL =
  'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240';
export const SERVICES_ICON_URL =
  'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240';

const SUGGESTED_DESTINATIONS = [
  {
    name: 'Nearby',
    subtitle: "Find what's around you",
    icon: 'compass',
    query: 'Goa',
    color: 'bg-[#EBF5FB] text-[#2980B9]',
  },
  {
    name: 'Candolim, Goa',
    subtitle: 'Water sports, beach shacks & peaceful stays',
    icon: 'waves',
    query: 'Candolim',
    color: 'bg-[#FEF5E7] text-[#D35400]',
  },
  {
    name: 'North Goa, Goa',
    subtitle: 'Popular beach destination',
    icon: 'palm',
    query: 'Goa',
    color: 'bg-[#FDEDEC] text-[#C0392B]',
  },
  {
    name: 'New Delhi, Delhi',
    subtitle: 'For sights like India Gate & ancient monuments',
    icon: 'landmark',
    query: 'Delhi',
    color: 'bg-[#F4ECF7] text-[#8E44AD]',
  },
  {
    name: 'Mumbai, Maharashtra',
    subtitle: 'Vibrant metropolis, seaside promenades & cafes',
    icon: 'hotel',
    query: 'Mumbai',
    color: 'bg-[#EAF2F8] text-[#2471A3]',
  },
  {
    name: 'Bengaluru, Karnataka',
    subtitle: 'Garden city, craft breweries & tech hubs',
    icon: 'palm',
    query: 'Bengaluru',
    color: 'bg-[#EAFAF1] text-[#27AE60]',
  },
];

const EXPERIENCES_DESTINATIONS = [
  {
    name: 'Nearby',
    subtitle: "Find what's around you",
    icon: 'compass',
    query: 'Goa',
    color: 'bg-[#EBF5FB] text-[#2980B9]',
  },
  {
    name: 'North Goa Ocean Adventures',
    subtitle: 'Scuba diving, dolphin cruise & jet ski',
    icon: 'waves',
    query: 'Goa',
    color: 'bg-[#EBF5FB] text-[#2980B9]',
  },
  {
    name: 'Candolim Water Sports',
    subtitle: 'Parasailing, speedboats & banana rides',
    icon: 'palm',
    query: 'Candolim',
    color: 'bg-[#FEF5E7] text-[#D35400]',
  },
  {
    name: 'New Delhi Heritage Walk',
    subtitle: 'Old Delhi street food & Mughal architecture',
    icon: 'landmark',
    query: 'Delhi',
    color: 'bg-[#F4ECF7] text-[#8E44AD]',
  },
  {
    name: 'Mumbai Bollywood Tour',
    subtitle: 'Behind-the-scenes film city & dance studio',
    icon: 'sparkles',
    query: 'Mumbai',
    color: 'bg-[#FDEDEC] text-[#C0392B]',
  },
];

const SERVICES_DESTINATIONS = [
  {
    name: 'Nearby',
    subtitle: "Find what's around you",
    icon: 'compass',
    query: 'Goa',
    color: 'bg-[#EBF5FB] text-[#2980B9]',
  },
  {
    name: 'Candolim, Goa',
    subtitle: 'In-villa private chefs, cleaning & drivers',
    icon: 'waves',
    query: 'Candolim',
    color: 'bg-[#FEF5E7] text-[#D35400]',
  },
  {
    name: 'North Goa, Goa',
    subtitle: 'Wellness therapies, catering & yacht rental',
    icon: 'palm',
    query: 'Goa',
    color: 'bg-[#FDEDEC] text-[#C0392B]',
  },
];

const SERVICE_ITEMS = [
  { id: 'photography', name: 'Photography', icon: 'camera' },
  { id: 'chefs', name: 'Chefs', icon: 'utensils' },
  { id: 'massage', name: 'Massage', icon: 'sparkles' },
  { id: 'prepared-meals', name: 'Prepared meals', icon: 'utensilscrossed' },
  { id: 'training', name: 'Training', icon: 'dumbbell' },
  { id: 'makeup', name: 'Make-up', icon: 'sparkles' },
  { id: 'hair', name: 'Hair', icon: 'scissors' },
  { id: 'spa', name: 'Spa treatments', icon: 'flower' },
  { id: 'catering', name: 'Catering', icon: 'wine' },
];

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getMonthCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(i).padStart(2, '0');
    days.push({ day: i, dateStr: `${year}-${m}-${d}` });
  }

  return {
    year,
    month,
    monthName: firstDay.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    startOffset: Array(startDayOfWeek).fill(null),
    days,
  };
}

/**
 * CollapsedSearchPill (Closed header state)
 */
export function CollapsedSearchPill({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-white border border-[#DDDDDD] rounded-full pl-2 pr-2 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all cursor-pointer group select-none"
    >
      <div className="w-10 h-10 flex items-center justify-center shrink-0 mr-2">
        <img
          src={HOMES_ICON_URL}
          alt="Homes"
          className="w-[42px] h-[42px] max-w-none object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
        />
      </div>

      <span className="text-[15px] font-semibold text-[#222222] pr-3.5 border-r border-[#EBEBEB] leading-none tracking-tight">
        Anywhere
      </span>

      <span className="text-[15px] font-semibold text-[#222222] px-3.5 border-r border-[#EBEBEB] leading-none tracking-tight">
        Anytime
      </span>

      <span className="text-[15px] font-semibold text-[#717171] px-3.5 leading-none tracking-tight">
        Add guests
      </span>

      <div className="w-9 h-9 rounded-full bg-[#FF385C] flex items-center justify-center text-white shrink-0 ml-1 shadow-xs group-hover:bg-[#E00B41] transition-colors">
        <Search size={19.5} strokeWidth={2.8} />
      </div>
    </button>
  );
}

/**
 * CategoryTabs (Inside expanded header row 1)
 */
export function CategoryTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-10">
      {/* Homes */}
      <button
        onClick={() => onTabChange('homes')}
        className={`flex items-center gap-3 pb-2.5 text-[16px] transition-all cursor-pointer relative select-none group ${
          activeTab === 'homes'
            ? 'text-[#222222] font-semibold'
            : 'text-[#717171] hover:text-[#222222] font-medium'
        }`}
      >
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          <img
            src={HOMES_ICON_URL}
            alt="Homes"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-sm"
          />
        </div>
        <span className="text-[16px]">Homes</span>
        {activeTab === 'homes' && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#222222] rounded-full" />
        )}
      </button>

      {/* Experiences */}
      <button
        onClick={() => onTabChange('experiences')}
        className={`flex items-center gap-3 pb-2.5 text-[16px] transition-all cursor-pointer relative select-none group ${
          activeTab === 'experiences'
            ? 'text-[#222222] font-semibold'
            : 'text-[#717171] hover:text-[#222222] font-medium'
        }`}
      >
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          <img
            src={EXPERIENCES_ICON_URL}
            alt="Experiences"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-sm"
          />
        </div>
        <span className="text-[16px]">Experiences</span>
        {activeTab === 'experiences' && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#222222] rounded-full" />
        )}
      </button>

      {/* Services */}
      <button
        onClick={() => onTabChange('services')}
        className={`flex items-center gap-3 pb-2.5 text-[16px] transition-all cursor-pointer relative select-none group ${
          activeTab === 'services'
            ? 'text-[#222222] font-semibold'
            : 'text-[#717171] hover:text-[#222222] font-medium'
        }`}
      >
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          <img
            src={SERVICES_ICON_URL}
            alt="Services"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-sm"
          />
        </div>
        <span className="text-[16px]">Services</span>
        {activeTab === 'services' && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#222222] rounded-full" />
        )}
      </button>
    </div>
  );
}

/**
 * ExpandedSearchCapsule (Inside expanded header row 2)
 */
export function ExpandedSearchCapsule({
  activeTab = 'homes',
  activeField = 'where',
  setActiveField,
  onSelectProperty,
  onClose,
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ properties: [], destinations: [] });
  const [isLoading, setIsLoading] = useState(false);

  // Homes state
  const [whenMode, setWhenMode] = useState('dates'); // 'dates' | 'flexible'
  const [homesCheckIn, setHomesCheckIn] = useState(null);
  const [homesCheckOut, setHomesCheckOut] = useState(null);
  const [flexibleStay, setFlexibleStay] = useState('weekend'); // 'weekend' | 'week' | 'month'
  const [flexibleRadio, setFlexibleRadio] = useState('exact');
  const [homesAdults, setHomesAdults] = useState(0);
  const [homesChildren, setHomesChildren] = useState(0);
  const [homesInfants, setHomesInfants] = useState(0);
  const [homesPets, setHomesPets] = useState(0);

  // Experiences & Services state
  const [expDateQuick, setExpDateQuick] = useState(null); // 'today' | 'tomorrow' | 'weekend'
  const [expDateSelected, setExpDateSelected] = useState(null);
  const [expAdults, setExpAdults] = useState(0);
  const [expChildren, setExpChildren] = useState(0);
  const [expInfants, setExpInfants] = useState(0);
  const [selectedService, setSelectedService] = useState('');

  // Calendar view date
  const [calDate, setCalDate] = useState(new Date(2026, 11, 1)); // December 2026

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input when 'where' field is active
  useEffect(() => {
    if (activeField === 'where' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeField]);

  // Debounced search query
  useEffect(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setSuggestions({ properties: [], destinations: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchProperties(cleanQuery);
        setSuggestions(results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  function handleSelectDestination(dest) {
    setQuery(dest.name);
    searchProperties(dest.query || dest.name).then((res) => {
      if (res.properties && res.properties.length > 0) {
        onSelectProperty(res.properties[0]);
      }
      onClose();
    });
  }

  function handleSelectPropertyItem(property) {
    onSelectProperty(property);
    onClose();
  }

  function handleSearchSubmit() {
    const q = query.trim() || 'Goa';
    searchProperties(q).then((res) => {
      if (res.properties && res.properties.length > 0) {
        onSelectProperty(res.properties[0]);
      }
      onClose();
    });
  }

  // Summary labels for capsule buttons
  const getHomesWhenLabel = () => {
    if (whenMode === 'flexible') return 'Anytime';
    if (homesCheckIn && homesCheckOut) {
      const d1 = new Date(homesCheckIn).getDate();
      const m1 = new Date(homesCheckIn).toLocaleString('en-US', { month: 'short' });
      const d2 = new Date(homesCheckOut).getDate();
      const m2 = new Date(homesCheckOut).toLocaleString('en-US', { month: 'short' });
      return `${d1} ${m1} - ${d2} ${m2}`;
    }
    return 'Add dates';
  };

  const getHomesWhoLabel = () => {
    const total = homesAdults + homesChildren;
    if (total === 0) return 'Add guests';
    let str = `${total} guest${total > 1 ? 's' : ''}`;
    if (homesInfants > 0) str += `, ${homesInfants} inf`;
    if (homesPets > 0) str += `, ${homesPets} pet`;
    return str;
  };

  const getExpWhenLabel = () => {
    if (expDateQuick === 'today') return 'Today';
    if (expDateQuick === 'tomorrow') return 'Tomorrow';
    if (expDateQuick === 'weekend') return 'This weekend';
    if (expDateSelected) {
      const d = new Date(expDateSelected);
      return `${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })}`;
    }
    return 'Add dates';
  };

  const getExpWhoLabel = () => {
    const total = expAdults + expChildren;
    if (total === 0) return 'Add guests';
    return `${total} guest${total > 1 ? 's' : ''}`;
  };

  // Render icons for destinations
  function renderDestinationIcon(type) {
    switch (type) {
      case 'compass':
        return <Compass size={24} strokeWidth={2} />;
      case 'waves':
        return <Waves size={24} strokeWidth={2} />;
      case 'palm':
        return <Palmtree size={24} strokeWidth={2} />;
      case 'hotel':
        return <Hotel size={24} strokeWidth={2} />;
      case 'utensils':
        return <Utensils size={24} strokeWidth={2} />;
      case 'sparkles':
        return <Sparkles size={24} strokeWidth={2} />;
      case 'landmark':
      default:
        return <Landmark size={24} strokeWidth={2} />;
    }
  }

  // Render icons for services
  function renderServiceIcon(iconName) {
    switch (iconName) {
      case 'camera':
        return <Camera size={16} strokeWidth={2} />;
      case 'utensils':
        return <Utensils size={16} strokeWidth={2} />;
      case 'sparkles':
        return <Sparkles size={16} strokeWidth={2} />;
      case 'utensilscrossed':
        return <UtensilsCrossed size={16} strokeWidth={2} />;
      case 'dumbbell':
        return <Dumbbell size={16} strokeWidth={2} />;
      case 'scissors':
        return <Scissors size={16} strokeWidth={2} />;
      case 'flower':
        return <Flower2 size={16} strokeWidth={2} />;
      case 'wine':
        return <Wine size={16} strokeWidth={2} />;
      default:
        return <Sparkles size={16} strokeWidth={2} />;
    }
  }

  // Month navigation helpers
  const month1 = getMonthCalendar(calDate.getFullYear(), calDate.getMonth());
  const nextMonthDate = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1);
  const month2 = getMonthCalendar(nextMonthDate.getFullYear(), nextMonthDate.getMonth());

  // Carousel months for Flexible tab
  const flexibleMonths = [
    'December 2026',
    'January 2027',
    'February 2027',
    'March 2027',
    'April 2027',
    'May 2027',
  ];

  return (
    <div ref={containerRef} className="w-full max-w-[860px] relative">
      {/* 1. DYNAMIC CAPSULE (MATCHING EACH TAB) */}
      <div className="flex items-center bg-[#EBEBEB] border border-[#DDDDDD] rounded-full relative p-1.5 shadow-lg transition-all">
        {/* ======================================================== */}
        {/* TAB 1: HOMES (Where | When | Who | Search) */}
        {/* ======================================================== */}
        {activeTab === 'homes' && (
          <>
            {/* Where */}
            <div
              onClick={() => setActiveField('where')}
              className={`flex-[1.4] py-3.5 px-7 rounded-full cursor-pointer transition-all ${
                activeField === 'where'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <label className="block text-xs font-bold text-[#222222]">Where</label>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                placeholder="Search destinations"
                className="w-full bg-transparent text-sm font-medium text-[#222222] placeholder-[#717171] outline-hidden truncate"
              />
            </div>

            {activeField !== 'where' && activeField !== 'when' && (
              <div className="h-8 w-[1px] bg-[#CCCCCC]" />
            )}

            {/* When */}
            <div
              onClick={() => setActiveField('when')}
              className={`flex-1 py-3.5 px-6 rounded-full cursor-pointer transition-all ${
                activeField === 'when'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <p className="text-xs font-bold text-[#222222]">When</p>
              <p className="text-sm font-medium text-[#717171] truncate">{getHomesWhenLabel()}</p>
            </div>

            {activeField !== 'when' && activeField !== 'who' && (
              <div className="h-8 w-[1px] bg-[#CCCCCC]" />
            )}

            {/* Who */}
            <div
              onClick={() => setActiveField('who')}
              className={`flex-[1.2] py-2.5 pl-6 pr-2.5 rounded-full cursor-pointer flex items-center justify-between transition-all ${
                activeField === 'who'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-[#222222]">Who</p>
                <p className="text-sm font-medium text-[#717171] truncate">{getHomesWhoLabel()}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchSubmit();
                }}
                className="bg-linear-to-r from-[#FF385C] to-[#E00B41] hover:from-[#E00B41] hover:to-[#D70466] text-white px-6 py-3.5 rounded-full flex items-center gap-2.5 font-semibold text-[15px] transition-all shadow-md cursor-pointer shrink-0"
              >
                <Search size={18} strokeWidth={3} />
                <span>Search</span>
              </button>
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* TAB 2: EXPERIENCES (Where | When | Who | Search) */}
        {/* ======================================================== */}
        {activeTab === 'experiences' && (
          <>
            {/* Where */}
            <div
              onClick={() => setActiveField('where')}
              className={`flex-[1.4] py-3.5 px-7 rounded-full cursor-pointer transition-all ${
                activeField === 'where'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <label className="block text-xs font-bold text-[#222222]">Where</label>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                placeholder="Search by city or landmark"
                className="w-full bg-transparent text-sm font-medium text-[#222222] placeholder-[#717171] outline-hidden truncate"
              />
            </div>

            {activeField !== 'where' && activeField !== 'when' && (
              <div className="h-8 w-[1px] bg-[#CCCCCC]" />
            )}

            {/* When */}
            <div
              onClick={() => setActiveField('when')}
              className={`flex-1 py-3.5 px-6 rounded-full cursor-pointer transition-all ${
                activeField === 'when'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <p className="text-xs font-bold text-[#222222]">When</p>
              <p className="text-sm font-medium text-[#717171] truncate">{getExpWhenLabel()}</p>
            </div>

            {activeField !== 'when' && activeField !== 'who' && (
              <div className="h-8 w-[1px] bg-[#CCCCCC]" />
            )}

            {/* Who */}
            <div
              onClick={() => setActiveField('who')}
              className={`flex-[1.2] py-2.5 pl-6 pr-2.5 rounded-full cursor-pointer flex items-center justify-between transition-all ${
                activeField === 'who'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-[#222222]">Who</p>
                <p className="text-sm font-medium text-[#717171] truncate">{getExpWhoLabel()}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchSubmit();
                }}
                className="bg-linear-to-r from-[#FF385C] to-[#E00B41] hover:from-[#E00B41] hover:to-[#D70466] text-white px-6 py-3.5 rounded-full flex items-center gap-2.5 font-semibold text-[15px] transition-all shadow-md cursor-pointer shrink-0"
              >
                <Search size={18} strokeWidth={3} />
                <span>Search</span>
              </button>
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SERVICES (Where | When | Type of service | Search) */}
        {/* ======================================================== */}
        {activeTab === 'services' && (
          <>
            {/* Where */}
            <div
              onClick={() => setActiveField('where')}
              className={`flex-[1.3] py-3.5 px-7 rounded-full cursor-pointer transition-all ${
                activeField === 'where'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <label className="block text-xs font-bold text-[#222222]">Where</label>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                placeholder="Search destinations"
                className="w-full bg-transparent text-sm font-medium text-[#222222] placeholder-[#717171] outline-hidden truncate"
              />
            </div>

            {activeField !== 'where' && activeField !== 'when' && (
              <div className="h-8 w-[1px] bg-[#CCCCCC]" />
            )}

            {/* When */}
            <div
              onClick={() => setActiveField('when')}
              className={`flex-1 py-3.5 px-6 rounded-full cursor-pointer transition-all ${
                activeField === 'when'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <p className="text-xs font-bold text-[#222222]">When</p>
              <p className="text-sm font-medium text-[#717171] truncate">{getExpWhenLabel()}</p>
            </div>

            {activeField !== 'when' && activeField !== 'service' && (
              <div className="h-8 w-[1px] bg-[#CCCCCC]" />
            )}

            {/* Type of service */}
            <div
              onClick={() => setActiveField('service')}
              className={`flex-[1.3] py-2.5 pl-6 pr-2.5 rounded-full cursor-pointer flex items-center justify-between transition-all ${
                activeField === 'service'
                  ? 'bg-white shadow-[0_6px_20px_rgba(0,0,0,0.14)]'
                  : 'hover:bg-[#E0E0E0]'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-[#222222]">Type of service</p>
                <p className="text-sm font-medium text-[#717171] truncate">
                  {selectedService || 'Add service'}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchSubmit();
                }}
                className="bg-linear-to-r from-[#FF385C] to-[#E00B41] hover:from-[#E00B41] hover:to-[#D70466] text-white px-6 py-3.5 rounded-full flex items-center gap-2.5 font-semibold text-[15px] transition-all shadow-md cursor-pointer shrink-0"
              >
                <Search size={18} strokeWidth={3} />
                <span>Search</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. DYNAMIC DROPDOWN PANELS MATCHING ACTIVE SUBTAB */}
      {/* ======================================================== */}

      {/* -------------------------------------------------------- */}
      {/* CASE A: WHERE DROPDOWN (Anchored Left) */}
      {/* -------------------------------------------------------- */}
      {activeField === 'where' && (
        <div className="absolute top-full left-0 mt-3 w-full max-w-[500px] bg-white border border-[#DDDDDD] rounded-3xl p-6 shadow-[0_8px_28px_rgba(0,0,0,0.22)] z-50 animate-fadeIn">
          {!query.trim() ? (
            <div>
              <p className="text-sm font-bold text-[#222222] mb-3">
                {activeTab === 'experiences'
                  ? 'Popular destinations for activities'
                  : activeTab === 'services'
                  ? 'Available service locations'
                  : 'Suggested destinations'}
              </p>
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
                {(activeTab === 'experiences'
                  ? EXPERIENCES_DESTINATIONS
                  : activeTab === 'services'
                  ? SERVICES_DESTINATIONS
                  : SUGGESTED_DESTINATIONS
                ).map((dest, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectDestination(dest)}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F7F7F7] cursor-pointer transition-colors"
                  >
                    <div
                      className={`w-[48px] h-[48px] rounded-2xl flex items-center justify-center shrink-0 ${dest.color}`}
                    >
                      {renderDestinationIcon(dest.icon)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#222222] truncate">{dest.name}</p>
                      <p className="text-xs text-[#717171] truncate">{dest.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {suggestions.properties && suggestions.properties.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">
                    Available Listings
                  </p>
                  <div className="space-y-1">
                    {suggestions.properties.map((prop) => (
                      <div
                        key={prop._id || prop.slug}
                        onClick={() => handleSelectPropertyItem(prop)}
                        className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#F7F7F7] cursor-pointer transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#EBEBEB] flex items-center justify-center shrink-0 text-[#222222]">
                          <MapPin size={20} strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#222222] truncate">{prop.title}</p>
                          <p className="text-xs text-[#717171] truncate">{prop.location}</p>
                        </div>
                        <span className="text-xs font-bold text-[#222222]">
                          ₹{prop.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.destinations && suggestions.destinations.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">
                    Destinations
                  </p>
                  <div className="space-y-1">
                    {suggestions.destinations.map((dest, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectDestination(dest)}
                        className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-[#F7F7F7] cursor-pointer transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] flex items-center justify-center shrink-0 text-[#717171]">
                          <MapPin size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#222222]">{dest.name}</p>
                          <p className="text-xs text-[#717171]">{dest.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <p className="text-xs text-[#717171] py-2 text-center">Searching destinations...</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* CASE B: WHEN DROPDOWN — HOMES (Wide Centered Popover) */}
      {/* -------------------------------------------------------- */}
      {activeField === 'when' && activeTab === 'homes' && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full max-w-[850px] bg-white border border-[#DDDDDD] rounded-3xl p-6 shadow-[0_8px_28px_rgba(0,0,0,0.22)] z-50 animate-fadeIn">
          {/* Top Switcher: Dates | Flexible */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#EBEBEB] p-1 rounded-full flex gap-1">
              <button
                onClick={() => setWhenMode('dates')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  whenMode === 'dates' ? 'bg-white shadow-xs text-[#222222]' : 'text-[#717171]'
                }`}
              >
                Dates
              </button>
              <button
                onClick={() => setWhenMode('flexible')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  whenMode === 'flexible' ? 'bg-white shadow-xs text-[#222222]' : 'text-[#717171]'
                }`}
              >
                Flexible
              </button>
            </div>
          </div>

          {whenMode === 'dates' ? (
            <div>
              {/* 2-Month Calendar Grid */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Month 1 */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() =>
                        setCalDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                      }
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-semibold text-[#222222]">{month1.monthName}</span>
                    <div className="w-8" />
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs text-[#717171] mb-2 font-semibold">
                    {WEEK_DAYS.map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-semibold">
                    {month1.startOffset.map((_, i) => (
                      <div key={i} className="h-9" />
                    ))}
                    {month1.days.map(({ day, dateStr }) => {
                      const isStart = dateStr === homesCheckIn;
                      const isEnd = dateStr === homesCheckOut;
                      const inRange =
                        homesCheckIn && homesCheckOut && dateStr > homesCheckIn && dateStr < homesCheckOut;
                      return (
                        <div
                          key={dateStr}
                          onClick={() => {
                            if (!homesCheckIn || (homesCheckIn && homesCheckOut)) {
                              setHomesCheckIn(dateStr);
                              setHomesCheckOut(null);
                            } else {
                              if (dateStr > homesCheckIn) setHomesCheckOut(dateStr);
                              else {
                                setHomesCheckIn(dateStr);
                                setHomesCheckOut(null);
                              }
                            }
                          }}
                          className={`h-9 flex items-center justify-center cursor-pointer relative ${
                            inRange ? 'bg-[#F7F7F7]' : ''
                          } ${isStart ? 'rounded-l-full bg-linear-to-r from-transparent to-[#F7F7F7]' : ''} ${
                            isEnd ? 'rounded-r-full bg-linear-to-l from-transparent to-[#F7F7F7]' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isStart || isEnd
                                ? 'bg-[#222222] text-white font-bold'
                                : 'text-[#222222] hover:border hover:border-black'
                            }`}
                          >
                            {day}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Month 2 */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8" />
                    <span className="text-sm font-semibold text-[#222222]">{month2.monthName}</span>
                    <button
                      onClick={() =>
                        setCalDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                      }
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs text-[#717171] mb-2 font-semibold">
                    {WEEK_DAYS.map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-semibold">
                    {month2.startOffset.map((_, i) => (
                      <div key={i} className="h-9" />
                    ))}
                    {month2.days.map(({ day, dateStr }) => {
                      const isStart = dateStr === homesCheckIn;
                      const isEnd = dateStr === homesCheckOut;
                      const inRange =
                        homesCheckIn && homesCheckOut && dateStr > homesCheckIn && dateStr < homesCheckOut;
                      return (
                        <div
                          key={dateStr}
                          onClick={() => {
                            if (!homesCheckIn || (homesCheckIn && homesCheckOut)) {
                              setHomesCheckIn(dateStr);
                              setHomesCheckOut(null);
                            } else {
                              if (dateStr > homesCheckIn) setHomesCheckOut(dateStr);
                              else {
                                setHomesCheckIn(dateStr);
                                setHomesCheckOut(null);
                              }
                            }
                          }}
                          className={`h-9 flex items-center justify-center cursor-pointer relative ${
                            inRange ? 'bg-[#F7F7F7]' : ''
                          } ${isStart ? 'rounded-l-full bg-linear-to-r from-transparent to-[#F7F7F7]' : ''} ${
                            isEnd ? 'rounded-r-full bg-linear-to-l from-transparent to-[#F7F7F7]' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isStart || isEnd
                                ? 'bg-[#222222] text-white font-bold'
                                : 'text-[#222222] hover:border hover:border-black'
                            }`}
                          >
                            {day}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Flexible Radios */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-[#F0F0F0]">
                {['exact', '1', '2', '3', '7', '14'].map((val) => {
                  const label = val === 'exact' ? 'Exact dates' : `± ${val} days`;
                  return (
                    <button
                      key={val}
                      onClick={() => setFlexibleRadio(val)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        flexibleRadio === val
                          ? 'border-[#222222] bg-[#222222] text-white'
                          : 'border-[#DDDDDD] text-[#222222] hover:border-black'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Flexible View */
            <div className="py-2 text-center">
              <p className="text-sm font-semibold text-[#222222] mb-3">
                How long would you like to stay?
              </p>
              <div className="flex justify-center gap-3 mb-6">
                {['weekend', 'week', 'month'].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setFlexibleStay(dur)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold capitalize border cursor-pointer transition-all ${
                      flexibleStay === dur
                        ? 'border-[#222222] bg-[#F7F7F7] text-[#222222] ring-1 ring-[#222222]'
                        : 'border-[#DDDDDD] hover:border-black'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>

              <p className="text-sm font-semibold text-[#222222] mb-3">When do you want to go?</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {flexibleMonths.map((m, i) => (
                  <div
                    key={i}
                    className="p-3 border border-[#DDDDDD] rounded-2xl hover:border-black cursor-pointer transition-colors"
                  >
                    <Calendar size={22} className="mx-auto text-[#717171] mb-1" />
                    <p className="text-xs font-semibold text-[#222222]">{m.split(' ')[0]}</p>
                    <p className="text-[10px] text-[#717171]">{m.split(' ')[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* CASE C: WHEN DROPDOWN — EXPERIENCES & SERVICES (2-Column) */}
      {/* -------------------------------------------------------- */}
      {activeField === 'when' && (activeTab === 'experiences' || activeTab === 'services') && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full max-w-[680px] bg-white border border-[#DDDDDD] rounded-3xl p-6 shadow-[0_8px_28px_rgba(0,0,0,0.22)] z-50 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            {/* Left Column: 3 Quick Select Cards */}
            <div className="sm:col-span-5 space-y-3">
              <p className="text-xs font-bold text-[#717171] uppercase tracking-wider mb-2">
                Quick dates
              </p>
              {[
                { id: 'today', title: 'Today', subtitle: '25 Nov' },
                { id: 'tomorrow', title: 'Tomorrow', subtitle: '26 Nov' },
                { id: 'weekend', title: 'This weekend', subtitle: '27–29 Nov' },
              ].map((card) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setExpDateQuick(card.id);
                    setExpDateSelected(null);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    expDateQuick === card.id
                      ? 'border-[#222222] bg-[#F7F7F7] shadow-xs'
                      : 'border-[#DDDDDD] hover:border-black'
                  }`}
                >
                  <p className="text-sm font-semibold text-[#222222]">{card.title}</p>
                  <p className="text-xs text-[#717171]">{card.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Right Column: 1-Month Calendar */}
            <div className="sm:col-span-7 border-l border-[#F0F0F0] pl-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() =>
                    setCalDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                  }
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-[#222222]">{month1.monthName}</span>
                <button
                  onClick={() =>
                    setCalDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                  }
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-xs text-[#717171] font-semibold mb-2">
                {WEEK_DAYS.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-semibold">
                {month1.startOffset.map((_, i) => (
                  <div key={i} className="h-8" />
                ))}
                {month1.days.map(({ day, dateStr }) => {
                  const isSel = expDateSelected === dateStr;
                  return (
                    <div
                      key={dateStr}
                      onClick={() => {
                        setExpDateSelected(dateStr);
                        setExpDateQuick(null);
                      }}
                      className="h-8 flex items-center justify-center cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          isSel
                            ? 'bg-[#222222] text-white font-bold'
                            : 'text-[#222222] hover:border hover:border-black'
                        }`}
                      >
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* CASE D: WHO DROPDOWN (Anchored Right) */}
      {/* -------------------------------------------------------- */}
      {activeField === 'who' && (
        <div className="absolute top-full right-0 mt-3 w-full max-w-[420px] bg-white border border-[#DDDDDD] rounded-3xl p-6 shadow-[0_8px_28px_rgba(0,0,0,0.22)] z-50 animate-fadeIn">
          {/* Homes: 4 rows (Adults, Children, Infants, Pets) */}
          {activeTab === 'homes' && (
            <div className="space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Adults</p>
                  <p className="text-xs text-[#717171]">Ages 13 or above</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHomesAdults(Math.max(0, homesAdults - 1))}
                    disabled={homesAdults <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{homesAdults}</span>
                  <button
                    onClick={() => setHomesAdults(homesAdults + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Children</p>
                  <p className="text-xs text-[#717171]">Ages 2–12</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHomesChildren(Math.max(0, homesChildren - 1))}
                    disabled={homesChildren <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{homesChildren}</span>
                  <button
                    onClick={() => setHomesChildren(homesChildren + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Infants</p>
                  <p className="text-xs text-[#717171]">Under 2</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHomesInfants(Math.max(0, homesInfants - 1))}
                    disabled={homesInfants <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{homesInfants}</span>
                  <button
                    onClick={() => setHomesInfants(homesInfants + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Pets */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Pets</p>
                  <p className="text-xs text-[#717171] underline cursor-pointer">
                    Bringing a service animal?
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHomesPets(Math.max(0, homesPets - 1))}
                    disabled={homesPets <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{homesPets}</span>
                  <button
                    onClick={() => setHomesPets(homesPets + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Experiences: 3 rows (Adults, Children, Infants) */}
          {activeTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Adults</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpAdults(Math.max(0, expAdults - 1))}
                    disabled={expAdults <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{expAdults}</span>
                  <button
                    onClick={() => setExpAdults(expAdults + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Children</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpChildren(Math.max(0, expChildren - 1))}
                    disabled={expChildren <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{expChildren}</span>
                  <button
                    onClick={() => setExpChildren(expChildren + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Infants</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setExpInfants(Math.max(0, expInfants - 1))}
                    disabled={expInfants <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{expInfants}</span>
                  <button
                    onClick={() => setExpInfants(expInfants + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* CASE E: TYPE OF SERVICE DROPDOWN — SERVICES (Anchored Right) */}
      {/* -------------------------------------------------------- */}
      {activeField === 'service' && activeTab === 'services' && (
        <div className="absolute top-full right-0 mt-3 w-full max-w-[460px] bg-white border border-[#DDDDDD] rounded-3xl p-6 shadow-[0_8px_28px_rgba(0,0,0,0.22)] z-50 animate-fadeIn">
          <p className="text-sm font-bold text-[#222222] mb-3">Choose a service</p>
          <div className="flex flex-wrap gap-2.5">
            {SERVICE_ITEMS.map((srv) => {
              const isSelected = selectedService === srv.name;
              return (
                <button
                  key={srv.id}
                  onClick={() => {
                    setSelectedService(isSelected ? '' : srv.name);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#222222] bg-[#222222] text-white shadow-xs'
                      : 'border-[#DDDDDD] bg-white text-[#222222] hover:border-black hover:bg-gray-50'
                  }`}
                >
                  {renderServiceIcon(srv.icon)}
                  <span>{srv.name}</span>
                  {isSelected && <Check size={14} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchBar({
  isOpen,
  setIsOpen,
  onSelectProperty,
  activeField = 'where',
  setActiveField,
}) {
  if (!isOpen) {
    return (
      <CollapsedSearchPill
        onClick={() => {
          setIsOpen(true);
          if (setActiveField) setActiveField('where');
        }}
      />
    );
  }

  return (
    <ExpandedSearchCapsule
      activeField={activeField}
      setActiveField={setActiveField}
      onSelectProperty={onSelectProperty}
      onClose={() => setIsOpen(false)}
    />
  );
}
