/**
 * BookingCard.jsx — Interactive Sticky Reservation Card
 *
 * Verbatim Airbnb Reference:
 * - Pricing row: Strikethrough original price, total price, "for X nights" (or "Add dates for prices")
 * - 2-part inputs container:
 *   1. CHECK-IN / CHECKOUT button:
 *      - Clicking opens floating Date Picker popover anchored top-right extending leftward
 *      - Popover displays dual inputs (CHECK-IN / CHECKOUT with active borders & clear buttons),
 *        2-month interactive calendar with month navigation chevrons, range highlights,
 *        keyboard shortcut button, "Clear dates" and "Close" buttons.
 *      - Automatically updates dates and closes upon selecting a checkout date.
 *   2. GUESTS button:
 *      - Clicking opens dropdown with 2px active border and flipped chevron
 *      - Rows for Adults (13+), Children (2–12), Infants (Under 2), Pets (Bringing a service animal?)
 *      - Respects 5 guests maximum (not including infants) & disabled pets
 *      - Clear policy notice and "Close" button
 * - Reserve button (or "Check availability" if dates not set)
 * - "You won't be charged yet"
 * - "Report this listing"
 */

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Flag,
  Keyboard,
  X,
  Minus,
  Plus,
} from 'lucide-react';

const BOOKED_DATES = new Set([
  '2026-12-26',
  '2026-12-27',
  '2026-12-28',
  '2026-12-29',
  '2026-12-30',
  '2026-12-31',
  '2027-01-01',
]);

const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function toDateStr(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function parseDateStr(str) {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatCardDate(dateStr) {
  if (!dateStr) return 'Add date';
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${m}/${d}/${y}`;
}

function formatDisplayDate(str) {
  if (!str) return '';
  const date = parseDateStr(str);
  if (!date) return '';
  const d = date.getDate();
  const m = date.toLocaleString('en-US', { month: 'short' });
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

function getMonthCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      dateStr: toDateStr(year, month, i),
    });
  }

  return {
    year,
    month,
    monthName: firstDay.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    startOffset: Array(startDayOfWeek).fill(null),
    days,
  };
}

export default function BookingCard({
  price = 17742,
  originalPrice = 22210,
  priceNights = 2,
  checkIn = '2026-12-04',
  checkOut = '2026-12-06',
  onDatesChange,
}) {
  // Popover & Dropdown states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeDateInput, setActiveDateInput] = useState('checkIn'); // 'checkIn' | 'checkOut'
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Guests state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Calendar popover view date & hover state
  const [popoverViewDate, setPopoverViewDate] = useState(new Date(2026, 11, 1));
  const [popoverHoverDate, setPopoverHoverDate] = useState(null);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  const cardRef = useRef(null);

  // Click outside listener to dismiss popovers
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
        setIsGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Total guests count (infants do not count towards the 5-guest maximum)
  const totalGuests = adults + children;
  const maxGuests = 5;

  const getGuestsSummary = () => {
    let summary = `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`;
    if (infants === 1) summary += ', 1 infant';
    else if (infants > 1) summary += `, ${infants} infants`;
    return summary;
  };

  // Month navigation in popover
  const month1 = getMonthCalendar(popoverViewDate.getFullYear(), popoverViewDate.getMonth());
  const nextMonthDate = new Date(popoverViewDate.getFullYear(), popoverViewDate.getMonth() + 1, 1);
  const month2 = getMonthCalendar(nextMonthDate.getFullYear(), nextMonthDate.getMonth());

  const isPrevDisabled =
    popoverViewDate.getFullYear() < 2026 ||
    (popoverViewDate.getFullYear() === 2026 && popoverViewDate.getMonth() <= 10);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (!isPrevDisabled) {
      setPopoverViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setPopoverViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Date selection in popover
  const handleDateClick = (dateStr) => {
    if (BOOKED_DATES.has(dateStr)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // First click: sets check-in, prompts checkout
      if (onDatesChange) onDatesChange(dateStr, null);
      setActiveDateInput('checkOut');
      setPopoverHoverDate(null);
    } else if (checkIn && !checkOut) {
      // Second click: sets checkout
      if (dateStr > checkIn) {
        if (onDatesChange) onDatesChange(checkIn, dateStr);
        setPopoverHoverDate(null);
        // Automatically close popover when both dates selected, matching Airbnb
        setIsDatePickerOpen(false);
      } else if (dateStr < checkIn) {
        if (onDatesChange) onDatesChange(dateStr, null);
        setActiveDateInput('checkOut');
        setPopoverHoverDate(null);
      }
    }
  };

  const handleClearDates = (e) => {
    e.stopPropagation();
    if (onDatesChange) onDatesChange(null, null);
    setActiveDateInput('checkIn');
    setPopoverHoverDate(null);
  };

  const handleClearSingleDate = (e, field) => {
    e.stopPropagation();
    if (field === 'checkIn') {
      if (onDatesChange) onDatesChange(null, null);
      setActiveDateInput('checkIn');
    } else {
      if (onDatesChange) onDatesChange(checkIn, null);
      setActiveDateInput('checkOut');
    }
  };

  // Calculate nights
  let nights = 0;
  if (checkIn && checkOut) {
    const diff = Math.round((parseDateStr(checkOut) - parseDateStr(checkIn)) / (1000 * 60 * 60 * 24));
    nights = Math.max(1, diff);
  }

  // Popover Header Title & Subtitle
  let popoverTitle = '';
  let popoverSubtitle = '';
  if (checkIn && checkOut) {
    popoverTitle = `${nights} ${nights === 1 ? 'night' : 'nights'}`;
    popoverSubtitle = `${formatDisplayDate(checkIn)} - ${formatDisplayDate(checkOut)}`;
  } else if (checkIn && !checkOut) {
    popoverTitle = 'Select checkout date';
    popoverSubtitle = 'Minimum stay: 1 night';
  } else {
    popoverTitle = 'Select check-in date';
    popoverSubtitle = 'Add your travel dates for exact pricing';
  }

  const hasDates = Boolean(checkIn && checkOut);

  // Month renderer for popover
  const renderPopoverMonth = (monthData, isFirst) => (
    <div className="flex-1 select-none">
      <div className="flex items-center justify-between mb-3 h-8">
        {isFirst ? (
          <button
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            aria-label="Previous month"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isPrevDisabled
                ? 'opacity-20 cursor-not-allowed text-[#717171]'
                : 'hover:bg-[#F7F7F7] cursor-pointer text-[#222222]'
            }`}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="w-8" />
        )}

        <h3 className="text-sm font-semibold text-[#222222]">
          {monthData.monthName}
        </h3>

        {!isFirst ? (
          <button
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] cursor-pointer text-[#222222] transition-colors"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="w-8" />
        )}
      </div>

      <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-[#717171] mb-1">
        {WEEK_DAYS.map((d, i) => (
          <span key={i} className="py-0.5">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 text-center text-xs font-semibold">
        {monthData.startOffset.map((_, i) => (
          <div key={`pop-empty-${monthData.monthName}-${i}`} className="h-9" />
        ))}

        {monthData.days.map(({ day, dateStr }) => {
          const isBooked = BOOKED_DATES.has(dateStr);
          const isStart = dateStr === checkIn;
          const isEnd = dateStr === checkOut;
          const inRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;
          const inHoverRange = checkIn && !checkOut && popoverHoverDate && dateStr > checkIn && dateStr <= popoverHoverDate;

          let bgClass = '';
          if (inRange || inHoverRange) {
            bgClass = 'bg-[#F7F7F7]';
          }
          if (isStart && (checkOut || popoverHoverDate)) {
            bgClass = 'rounded-l-full bg-linear-to-r from-transparent to-[#F7F7F7]';
          }
          if (isEnd) {
            bgClass = 'rounded-r-full bg-linear-to-l from-transparent to-[#F7F7F7]';
          }

          return (
            <div
              key={`pop-${dateStr}`}
              className={`h-9 flex items-center justify-center relative ${bgClass}`}
              onMouseEnter={() => {
                if (checkIn && !checkOut && !isBooked) {
                  setPopoverHoverDate(dateStr);
                }
              }}
              onMouseLeave={() => {
                if (checkIn && !checkOut) {
                  setPopoverHoverDate(null);
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDateClick(dateStr);
              }}
            >
              {isStart && !checkOut && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#222222] text-white text-[10px] font-medium py-0.5 px-2 rounded-full shadow-md whitespace-nowrap z-30 pointer-events-none">
                  1-night min
                </div>
              )}

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                  isStart || isEnd
                    ? 'bg-[#222222] text-white font-bold shadow-xs'
                    : isBooked
                    ? 'text-[#B0B0B0] line-through cursor-not-allowed'
                    : 'text-[#222222] hover:border hover:border-black cursor-pointer'
                }`}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full relative" ref={cardRef}>
      {/* Main Reservation Card */}
      <div className="bg-white border border-[#DDDDDD] rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] relative">
        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-6">
          {hasDates ? (
            <>
              {originalPrice && (
                <span className="text-[20px] text-[#717171] line-through font-normal">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[22px] font-bold text-[#222222] underline">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-[15px] text-[#717171] font-normal">
                for {priceNights} {priceNights === 1 ? 'night' : 'nights'}
              </span>
            </>
          ) : (
            <span className="text-[22px] font-bold text-[#222222]">
              Add dates for prices
            </span>
          )}
        </div>

        {/* Date and Guest inputs grid */}
        <div className="border border-[#B0B0B0] rounded-xl overflow-visible mb-4 relative">
          {/* Top row: Check-in / Checkout trigger */}
          <div className="grid grid-cols-2 border-b border-[#B0B0B0]">
            {/* CHECK-IN field */}
            <div
              onClick={() => {
                setActiveDateInput('checkIn');
                setIsDatePickerOpen(true);
                setIsGuestsOpen(false);
              }}
              className={`p-3 border-r border-[#B0B0B0] cursor-pointer hover:bg-gray-50 transition-colors rounded-tl-xl ${
                isDatePickerOpen && activeDateInput === 'checkIn'
                  ? 'ring-2 ring-inset ring-[#222222] bg-white'
                  : ''
              }`}
            >
              <label className="block text-[10px] font-bold text-[#222222] uppercase tracking-wider cursor-pointer">
                CHECK-IN
              </label>
              <div
                className={`text-[14px] font-medium mt-0.5 truncate ${
                  checkIn ? 'text-[#222222]' : 'text-[#717171]'
                }`}
              >
                {formatCardDate(checkIn)}
              </div>
            </div>

            {/* CHECKOUT field */}
            <div
              onClick={() => {
                setActiveDateInput('checkOut');
                setIsDatePickerOpen(true);
                setIsGuestsOpen(false);
              }}
              className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-tr-xl ${
                isDatePickerOpen && activeDateInput === 'checkOut'
                  ? 'ring-2 ring-inset ring-[#222222] bg-white'
                  : ''
              }`}
            >
              <label className="block text-[10px] font-bold text-[#222222] uppercase tracking-wider cursor-pointer">
                CHECKOUT
              </label>
              <div
                className={`text-[14px] font-medium mt-0.5 truncate ${
                  checkOut ? 'text-[#222222]' : 'text-[#717171]'
                }`}
              >
                {formatCardDate(checkOut)}
              </div>
            </div>
          </div>

          {/* Bottom row: Guests trigger */}
          <div
            onClick={() => {
              setIsGuestsOpen(!isGuestsOpen);
              setIsDatePickerOpen(false);
            }}
            className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors rounded-b-xl ${
              isGuestsOpen ? 'ring-2 ring-inset ring-[#222222] bg-white' : ''
            }`}
          >
            <div>
              <label className="block text-[10px] font-bold text-[#222222] uppercase tracking-wider cursor-pointer">
                GUESTS
              </label>
              <div className="text-[14px] text-[#222222] font-medium mt-0.5">
                {getGuestsSummary()}
              </div>
            </div>
            {isGuestsOpen ? (
              <ChevronUp size={18} className="text-[#222222]" />
            ) : (
              <ChevronDown size={18} className="text-[#222222]" />
            )}
          </div>

          {/* ======================================================== */}
          {/* 1. GUESTS DROPDOWN PANEL (Matching Airbnb verbatim) */}
          {/* ======================================================== */}
          {isGuestsOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-[#DDDDDD] rounded-xl shadow-2xl p-4 z-40 mt-1 max-h-[380px] overflow-y-auto">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
                  <div>
                    <p className="text-sm font-semibold text-[#222222]">Adults</p>
                    <p className="text-xs text-[#717171]">Age 13+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                      aria-label="subtract adult"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black cursor-pointer transition-colors"
                    >
                      <Minus size={14} className="text-[#222222]" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      disabled={totalGuests >= maxGuests}
                      aria-label="add adult"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black cursor-pointer transition-colors"
                    >
                      <Plus size={14} className="text-[#222222]" />
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
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                      aria-label="subtract child"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black cursor-pointer transition-colors"
                    >
                      <Minus size={14} className="text-[#222222]" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      disabled={totalGuests >= maxGuests}
                      aria-label="add child"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black cursor-pointer transition-colors"
                    >
                      <Plus size={14} className="text-[#222222]" />
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
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      disabled={infants <= 0}
                      aria-label="subtract infant"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black cursor-pointer transition-colors"
                    >
                      <Minus size={14} className="text-[#222222]" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{infants}</span>
                    <button
                      onClick={() => setInfants(Math.min(5, infants + 1))}
                      disabled={infants >= 5}
                      aria-label="add infant"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-black cursor-pointer transition-colors"
                    >
                      <Plus size={14} className="text-[#222222]" />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <p className="text-sm font-semibold text-[#222222]">Pets</p>
                    <p className="text-xs text-[#717171] underline cursor-pointer">
                      Bringing a service animal?
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      disabled
                      aria-label="subtract pet"
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center opacity-20 cursor-not-allowed"
                    >
                      <Minus size={14} className="text-[#717171]" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center text-[#717171]">0</span>
                    <button
                      disabled
                      aria-label="add pet"
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center opacity-20 cursor-not-allowed"
                    >
                      <Plus size={14} className="text-[#717171]" />
                    </button>
                  </div>
                </div>

                {/* Policy Notice */}
                <p className="text-xs text-[#717171] leading-relaxed">
                  This place has a maximum of 5 guests, not including infants. Pets aren&apos;t allowed.
                </p>

                {/* Close Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setIsGuestsOpen(false)}
                    className="text-sm font-semibold underline text-[#222222] hover:text-black cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reserve Button */}
        <button className="w-full bg-[#E00B41] hover:bg-[#D70466] text-white font-semibold py-3.5 rounded-xl text-base transition-colors cursor-pointer mb-3 shadow-xs">
          {hasDates ? 'Reserve' : 'Check availability'}
        </button>

        <p className="text-center text-[14px] font-normal text-[#222222]">
          {hasDates ? "You won't be charged yet" : 'Enter dates to see total price'}
        </p>

        {/* ======================================================== */}
        {/* 2. DATE PICKER POPOVER (Anchored top-right extending left) */}
        {/* ======================================================== */}
        {isDatePickerOpen && (
          <div
            className="absolute top-0 right-0 z-50 bg-white border border-[#DDDDDD] rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.22)] p-6 w-[340px] sm:w-[580px] lg:w-[640px] xl:w-[660px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popover Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#222222]">
                  {popoverTitle}
                </h2>
                <p className="text-xs text-[#717171] mt-0.5">
                  {popoverSubtitle}
                </p>
              </div>

              {/* Dual input box */}
              <div className="flex items-center border border-[#B0B0B0] rounded-lg overflow-hidden shrink-0">
                <div
                  onClick={() => setActiveDateInput('checkIn')}
                  className={`px-3 py-1.5 cursor-pointer flex items-center gap-1.5 border-r border-[#B0B0B0] transition-colors ${
                    activeDateInput === 'checkIn'
                      ? 'ring-2 ring-inset ring-[#222222] bg-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <label className="block text-[9px] font-bold text-[#222222] uppercase tracking-wider cursor-pointer">
                      CHECK-IN
                    </label>
                    <div className="text-xs font-medium text-[#222222] mt-0.5">
                      {formatCardDate(checkIn)}
                    </div>
                  </div>
                  {checkIn && (
                    <button
                      onClick={(e) => handleClearSingleDate(e, 'checkIn')}
                      className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center text-[#717171]"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>

                <div
                  onClick={() => setActiveDateInput('checkOut')}
                  className={`px-3 py-1.5 cursor-pointer flex items-center gap-1.5 transition-colors ${
                    activeDateInput === 'checkOut'
                      ? 'ring-2 ring-inset ring-[#222222] bg-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <label className="block text-[9px] font-bold text-[#222222] uppercase tracking-wider cursor-pointer">
                      CHECKOUT
                    </label>
                    <div className="text-xs font-medium text-[#222222] mt-0.5">
                      {formatCardDate(checkOut)}
                    </div>
                  </div>
                  {checkOut && (
                    <button
                      onClick={(e) => handleClearSingleDate(e, 'checkOut')}
                      className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center text-[#717171]"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 2-Month Calendar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {renderPopoverMonth(month1, true)}
              <div className="hidden sm:block">
                {renderPopoverMonth(month2, false)}
              </div>
            </div>

            {/* Popover Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
              <button
                onClick={() => setShowKeyboardModal(true)}
                aria-label="Open keyboard shortcuts panel"
                className="p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer text-[#222222]"
              >
                <Keyboard size={18} strokeWidth={1.5} />
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleClearDates}
                  className="text-xs font-semibold text-[#222222] underline cursor-pointer hover:text-black"
                >
                  Clear dates
                </button>
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="bg-[#222222] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report this listing */}
      <div className="flex items-center justify-center gap-2 mt-6 text-[#717171] hover:text-[#222222] text-xs font-semibold cursor-pointer">
        <Flag size={14} />
        <span className="underline">Report this listing</span>
      </div>

      {/* Keyboard Shortcuts Dialog */}
      {showKeyboardModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowKeyboardModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-[#222222]">Keyboard shortcuts</h3>
              <button
                onClick={() => setShowKeyboardModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="py-4 space-y-3 text-sm text-[#222222]">
              <div className="flex justify-between items-center py-1">
                <span>Move to previous/next day</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 text-xs font-mono">← / →</kbd>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Move to previous/next week</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 text-xs font-mono">↑ / ↓</kbd>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Select focused date</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 text-xs font-mono">Enter / Space</kbd>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Switch month</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-200 text-xs font-mono">PgUp / PgDn</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
