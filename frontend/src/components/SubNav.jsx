/**
 * SubNav.jsx — Floating Sticky In-Page Navigation Bar
 *
 * Behavior matching Airbnb reference:
 * - Hidden when at the top of the page
 * - Slides down smoothly and sticks to the top ONLY AFTER scrolling past the Photos gallery
 * - Disappears smoothly when scrolling back up above the photos gallery
 * - Highlights the active section based on current scroll position
 * - Smoothly scrolls to each section on click
 * - Shows a mini booking widget on the right (Price, Rating, Reserve button)
 */

import { Star } from 'lucide-react';

export default function SubNav({
  visible = false,
  activeSection = 'photos',
  price = 17742,
  priceNights = 2,
  rating = 4.93,
  reviewsCount = 165,
  onReserveClick,
}) {
  const navItems = [
    { id: 'photos', label: 'Photos' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
  ];

  const scrollToSection = (id) => {
    if (id === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70; // offset for sticky subnav height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#EBEBEB] shadow-xs transition-all duration-300 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-20 h-14 flex items-center justify-between">
        {/* Left: Section Links (Photos, Amenities, Reviews, Location) */}
        <div className="flex items-center gap-6 h-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative h-full flex items-center text-sm font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-[#222222]' : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#222222] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Mini Reservation Bar */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-sm font-bold text-[#222222]">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#717171]">
                for {priceNights} nights
              </span>
            </div>
            <div className="flex items-center gap-1 justify-end text-xs text-[#222222] font-semibold">
              <Star size={10} fill="#222222" strokeWidth={0} />
              <span>{rating}</span>
              <span className="text-[#717171]">({reviewsCount})</span>
            </div>
          </div>

          <button
            onClick={onReserveClick}
            className="bg-[#E00B41] hover:bg-[#D70466] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
