/**
 * CalendarSection.jsx — Interactive 2-Month Booking Calendar
 *
 * Verbatim Airbnb reference:
 * - Dynamic 2-month side-by-side view (Month 1 on left, Month 2 on right)
 * - Navigation chevrons: Previous Month (<) on Month 1 top-left, Next Month (>) on Month 2 top-right
 * - Clicking Next Month advances both calendars forward by 1 month (e.g. Dec 2026 -> Jan 2027 & Feb 2027)
 * - Clicking Previous Month moves both calendars backward by 1 month
 * - Full interactive date range selection across months and years
 * - Reactive headings:
 *     - "2 nights in Goa" / "X nights in Goa" with formatted range
 *     - "Select check-in date" when cleared
 *     - "Select checkout date" with "1-night minimum" tooltip when check-in is picked
 * - Booked & past dates disabled with line-through
 * - Keyboard shortcuts modal & "Clear dates" action
 */

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Keyboard, X } from 'lucide-react';

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
  const startDayOfWeek = firstDay.getDay(); // 0 is Sunday

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

export default function CalendarSection({
  checkIn: externalCheckIn,
  checkOut: externalCheckOut,
  onDatesChange,
}) {
  // Support both controlled mode (via props) and internal state fallback
  const [internalCheckIn, setInternalCheckIn] = useState('2026-12-04');
  const [internalCheckOut, setInternalCheckOut] = useState('2026-12-06');

  const checkIn = externalCheckIn !== undefined ? externalCheckIn : internalCheckIn;
  const checkOut = externalCheckOut !== undefined ? externalCheckOut : internalCheckOut;

  const updateDates = (newIn, newOut) => {
    if (externalCheckIn === undefined) {
      setInternalCheckIn(newIn);
      setInternalCheckOut(newOut);
    }
    if (onDatesChange) {
      onDatesChange(newIn, newOut);
    }
  };

  // View date tracks Month 1 (starts December 2026)
  const [viewDate, setViewDate] = useState(new Date(2026, 11, 1));
  const [hoverDate, setHoverDate] = useState(null);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  const month1 = getMonthCalendar(viewDate.getFullYear(), viewDate.getMonth());
  const nextMonthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
  const month2 = getMonthCalendar(nextMonthDate.getFullYear(), nextMonthDate.getMonth());

  // Can disable previous button if before Dec 2026 (or Nov 2026)
  const isPrevDisabled =
    viewDate.getFullYear() < 2026 ||
    (viewDate.getFullYear() === 2026 && viewDate.getMonth() <= 10);

  const handlePrevMonth = () => {
    if (!isPrevDisabled) {
      setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (dateStr) => {
    if (BOOKED_DATES.has(dateStr)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // First click: select check-in
      updateDates(dateStr, null);
      setHoverDate(null);
    } else if (checkIn && !checkOut) {
      // Second click: selecting checkout
      if (dateStr > checkIn) {
        updateDates(checkIn, dateStr);
        setHoverDate(null);
      } else if (dateStr < checkIn) {
        // Earlier date clicked: becomes new check-in
        updateDates(dateStr, null);
        setHoverDate(null);
      } else {
        // Same date clicked: 1 night minimum required
        setHoverDate(null);
      }
    }
  };

  const handleClearDates = () => {
    updateDates(null, null);
    setHoverDate(null);
  };

  // Calculate nights
  let nights = 0;
  if (checkIn && checkOut) {
    const diff = Math.round((parseDateStr(checkOut) - parseDateStr(checkIn)) / (1000 * 60 * 60 * 24));
    nights = Math.max(1, diff);
  }

  // Header Title & Subtitle logic matching Airbnb verbatim
  let headerTitle = '';
  let headerSubtitle = '';

  if (checkIn && checkOut) {
    headerTitle = `${nights} ${nights === 1 ? 'night' : 'nights'} in Goa`;
    headerSubtitle = `${formatDisplayDate(checkIn)} - ${formatDisplayDate(checkOut)}`;
  } else if (checkIn && !checkOut) {
    headerTitle = 'Select checkout date';
    headerSubtitle = 'Minimum stay: 1 night';
  } else {
    headerTitle = 'Select check-in date';
    headerSubtitle = 'Add your travel dates for exact pricing';
  }

  // Render helper for single month grid
  const renderMonth = (monthData, isFirst) => {
    return (
      <div className="flex-1 select-none">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4 h-9">
          {isFirst ? (
            <button
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isPrevDisabled
                  ? 'opacity-20 cursor-not-allowed text-[#717171]'
                  : 'hover:bg-[#F7F7F7] cursor-pointer text-[#222222]'
              }`}
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="w-9 md:block hidden" />
          )}

          <h3 className="text-base font-semibold text-[#222222]">
            {monthData.monthName}
          </h3>

          {!isFirst ? (
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] cursor-pointer text-[#222222] transition-colors"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <>
              {/* On desktop, spacer; on mobile, allow next button here */}
              <div className="w-9 md:block hidden" />
              <button
                onClick={handleNextMonth}
                aria-label="Next month"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] cursor-pointer text-[#222222] transition-colors md:hidden"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#717171] mb-2">
          {WEEK_DAYS.map((d, i) => (
            <span key={i} className="py-1">
              {d}
            </span>
          ))}
        </div>

        {/* Date cells grid */}
        <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-semibold">
          {monthData.startOffset.map((_, i) => (
            <div key={`empty-${monthData.monthName}-${i}`} className="h-10" />
          ))}

          {monthData.days.map(({ day, dateStr }) => {
            const isBooked = BOOKED_DATES.has(dateStr);
            const isStart = dateStr === checkIn;
            const isEnd = dateStr === checkOut;
            const inRange =
              checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;
            const inHoverRange =
              checkIn &&
              !checkOut &&
              hoverDate &&
              dateStr > checkIn &&
              dateStr <= hoverDate;

            // Background connector band
            let bgClass = '';
            if (inRange || inHoverRange) {
              bgClass = 'bg-[#F7F7F7]';
            }
            if (isStart && (checkOut || hoverDate)) {
              bgClass = 'rounded-l-full bg-linear-to-r from-transparent to-[#F7F7F7]';
            }
            if (isEnd) {
              bgClass = 'rounded-r-full bg-linear-to-l from-transparent to-[#F7F7F7]';
            }

            return (
              <div
                key={dateStr}
                className={`h-10 flex items-center justify-center relative ${bgClass}`}
                onMouseEnter={() => {
                  if (checkIn && !checkOut && !isBooked) {
                    setHoverDate(dateStr);
                  }
                }}
                onMouseLeave={() => {
                  if (checkIn && !checkOut) {
                    setHoverDate(null);
                  }
                }}
                onClick={() => handleDateClick(dateStr)}
              >
                {/* 1-night minimum tooltip for check-in */}
                {isStart && !checkOut && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#222222] text-white text-[11px] font-medium py-1 px-2.5 rounded-full shadow-md whitespace-nowrap z-30 pointer-events-none">
                    1-night minimum
                  </div>
                )}

                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
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
  };

  return (
    <div className="py-8 border-b border-[#EBEBEB]" id="calendar-section">
      {/* Title & Subtitle */}
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-[#222222]">
          {headerTitle}
        </h2>
        <p className="text-sm text-[#717171] mt-0.5">
          {headerSubtitle}
        </p>
      </div>

      {/* Two month calendars grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mb-6">
        {/* Month 1 */}
        {renderMonth(month1, true)}

        {/* Month 2 */}
        {renderMonth(month2, false)}
      </div>

      {/* Footer controls: Keyboard shortcuts button + Clear dates */}
      <div className="flex items-center justify-between max-w-2xl pt-2">
        <button
          onClick={() => setShowKeyboardModal(true)}
          aria-label="Open keyboard shortcuts panel"
          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-[#222222] transition-colors"
        >
          <Keyboard size={20} strokeWidth={1.5} />
        </button>

        <button
          onClick={handleClearDates}
          className="text-sm font-semibold text-[#222222] underline cursor-pointer hover:text-black transition-colors"
        >
          Clear dates
        </button>
      </div>

      {/* Keyboard shortcuts popup modal */}
      {showKeyboardModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowKeyboardModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-[#222222]">Keyboard shortcuts</h3>
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
