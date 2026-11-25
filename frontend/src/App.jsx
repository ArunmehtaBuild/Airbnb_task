/**
 * App.jsx — Main Application Component
 *
 * Full-stack Airbnb Property Page Clone matching the exact reference:
 * - Upper main Navbar is visible ONLY at the top and scrolls away naturally
 * - Floating SubNav (Photos · Amenities · Reviews · Location) slides down & sticks
 *   ONLY AFTER scrolling past the Photos gallery, and disappears when scrolling back up
 * - Active section tracking with underline indicator
 * - Mini reservation bar inside SubNav
 * - Authentic 5-image gallery with lightbox
 * - Left column: Overview, Guest Favourite badge, Host (Arun Mehta), Highlights,
 *   About space, Sleeping arrangements, Amenities (Show all 62), Calendar
 * - Right column: 10% promo card & sticky Booking reservation card
 * - Final section: Giant 4.93 with laurel wreaths, star distribution & 6 category cards
 */

import { useState, useEffect, useRef } from 'react';
import { Tag } from 'lucide-react';
import { fetchProperty, FALLBACK_PROPERTY } from './services/propertyApi';

import Navbar from './components/Navbar';
import SubNav from './components/SubNav';
import PropertyHeader from './components/PropertyHeader';
import ImageGallery from './components/ImageGallery';
import PhotoModal from './components/PhotoModal';
import PropertyOverview from './components/PropertyOverview';
import GuestFavourite from './components/GuestFavourite';
import HostSection from './components/HostSection';
import HighlightsSection from './components/HighlightsSection';
import AboutSection from './components/AboutSection';
import SleepingArrangements from './components/SleepingArrangements';
import AmenitiesSection from './components/AmenitiesSection';
import CalendarSection from './components/CalendarSection';
import BookingCard from './components/BookingCard';
import ReviewBreakdown from './components/ReviewBreakdown';

const PROPERTY_SLUG = '2-bhk-tranquil-bluetique-apartment-candolim';

export default function App() {
  const [property, setProperty] = useState(FALLBACK_PROPERTY);

  // SubNav scroll & visibility states
  const [showSubNav, setShowSubNav] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('photos');

  // Photo modal state
  const [showModal, setShowModal] = useState(false);
  const [modalInitialSection, setModalInitialSection] = useState(null);

  // Reservation dates state (synchronized between CalendarSection, BookingCard & SubNav)
  const [checkIn, setCheckIn] = useState('2026-12-04');
  const [checkOut, setCheckOut] = useState('2026-12-06');

  // Compute nights and pricing
  let nights = 0;
  if (checkIn && checkOut) {
    const [y1, m1, d1] = checkIn.split('-').map(Number);
    const [y2, m2, d2] = checkOut.split('-').map(Number);
    const diff = Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / (1000 * 60 * 60 * 24));
    nights = Math.max(1, diff);
  }

  const baseRatePerNight = 8871;
  const baseOriginalRatePerNight = 11105;
  const computedPrice = nights > 0 ? baseRatePerNight * nights : property.price || 17742;
  const computedOriginalPrice = nights > 0 ? baseOriginalRatePerNight * nights : property.originalPrice || 22210;

  // Gallery ref to track scroll position
  const galleryRef = useRef(null);

  // Fetch live property from MongoDB Atlas backend
  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await fetchProperty(PROPERTY_SLUG);
        if (data) {
          setProperty(data);
        }
      } catch (err) {
        console.warn('Backend offline, using fallback:', err.message);
      }
    }
    loadProperty();
  }, []);

  // Window scroll listener: controls SubNav slide-down and active tab highlighting
  useEffect(() => {
    const handleScroll = () => {
      // 1. SubNav visibility: show ONLY after scrolling past photos gallery
      if (galleryRef.current) {
        const galleryRect = galleryRef.current.getBoundingClientRect();
        // When the bottom of the photo gallery reaches the top header area
        if (galleryRect.bottom <= 80) {
          setShowSubNav(true);
        } else {
          setShowSubNav(false);
        }
      }

      // 2. Determine active section based on scroll offset
      const sections = ['location', 'reviews', 'amenities', 'photos'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveNavSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Browser & mousepad back navigation listener: closes photo modal instead of exiting the web page
  useEffect(() => {
    // Reset any stale modal history state on fresh load
    if (window.history.state?.modal) {
      window.history.replaceState(null, '', window.location.href);
    }

    const handlePopState = (event) => {
      if (!event.state || (event.state.modal !== 'photoTour' && event.state.modal !== 'photoSingle')) {
        setShowModal(false);
        setModalInitialSection(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function handleSelectProperty(selectedProperty) {
    if (selectedProperty.slug) {
      fetchProperty(selectedProperty.slug)
        .then((data) => {
          setProperty(data);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((err) => console.error(err));
    } else {
      setProperty(selectedProperty);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function openModal(imageIndex, sectionId) {
    if (typeof sectionId === 'string') {
      setModalInitialSection(sectionId);
    } else if (typeof imageIndex === 'string') {
      setModalInitialSection(imageIndex);
    } else {
      const sectionMap = {
        0: 'photo-tour-section-living-room',
        1: 'photo-tour-section-bedroom-2',
        2: 'photo-tour-section-living-room',
        3: 'photo-tour-section-bedroom-1',
        4: 'photo-tour-section-patio',
      };
      setModalInitialSection(typeof imageIndex === 'number' ? sectionMap[imageIndex] : null);
    }
    // Push history state so mousepad back gesture / browser Back returns to page rather than leaving the site
    window.history.pushState({ modal: 'photoTour' }, '', window.location.href);
    setShowModal(true);
  }

  function closeModal() {
    if (window.history.state?.modal === 'photoTour' || window.history.state?.modal === 'photoSingle') {
      window.history.back();
    } else {
      setShowModal(false);
      setModalInitialSection(null);
    }
  }

  const sortedImages = property.images
    ? [...property.images].sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="min-h-screen bg-white text-[#222222] antialiased">
      {/* 1. TOP NAVBAR WITH SEARCH — visible ONLY at the top, scrolls away naturally */}
      <Navbar onSelectProperty={handleSelectProperty} />

      {/* 2. FLOATING STICKY SUBNAV — appears ONLY after scrolling past the photos */}
      <SubNav
        visible={showSubNav}
        activeSection={activeNavSection}
        price={computedPrice}
        priceNights={nights || 2}
        rating={property.rating}
        reviewsCount={property.reviewsCount}
        onReserveClick={() => {
          const el = document.getElementById('booking-card');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. MAIN CONTENT CONTAINER (Airbnb standard max-width 1280px) */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-10 xl:px-20 pt-6">
        {/* Title, Share & Save */}
        <PropertyHeader
          title={property.title}
          location={property.location}
          property={property}
        />

        {/* 5-image photo gallery (tracked by galleryRef) */}
        <div id="photos" ref={galleryRef} className="mb-6">
          <ImageGallery
            images={sortedImages}
            onShowAll={() => openModal(0)}
            onImageClick={openModal}
          />
        </div>

        {/* TWO-COLUMN LAYOUT: Wide uncompressed left info + 372px sticky right card */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 xl:gap-20 relative pb-12">
          {/* LEFT COLUMN: Wide, uncompressed, relaxed */}
          <div className="flex-1 min-w-0 max-w-full lg:max-w-[650px]">
            {/* Property Overview */}
            <PropertyOverview
              propertyType={property.propertyType}
              guests={property.guests}
              bedrooms={property.bedrooms}
              beds={property.beds}
              bathrooms={property.bathrooms}
            />

            {/* Guest Favourite Top Badge Card */}
            <GuestFavourite
              rating={property.rating}
              reviewsCount={property.reviewsCount}
              guestFavourite={property.guestFavourite}
              description={property.guestFavouriteDescription}
            />

            {/* Host Section with Arun Mehta */}
            <HostSection host={property.host} />

            {/* Stay highlights */}
            <HighlightsSection highlights={property.highlights} />

            {/* Description */}
            <AboutSection description={property.description} />

            {/* Sleeping arrangements — click photo/card redirects to that bedroom in photo tour modal */}
            <SleepingArrangements
              arrangements={property.sleepingArrangements}
              onSelectSection={(sectionId) => openModal(null, sectionId)}
            />

            {/* Amenities + Show all 62 button */}
            <AmenitiesSection
              amenities={property.amenities}
              totalCount={property.totalAmenitiesCount || 62}
            />

            {/* Interactive calendar section & Location anchor */}
            <div id="location">
              <CalendarSection
                checkIn={checkIn}
                checkOut={checkOut}
                onDatesChange={(newIn, newOut) => {
                  setCheckIn(newIn);
                  setCheckOut(newOut);
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Reservation Sidebar (stays visible while scrolling) */}
          <div
            id="booking-card"
            className="w-full lg:w-[372px] shrink-0 lg:sticky lg:top-20 self-start mt-6 lg:mt-0 z-20"
          >
            {/* 10% off promotion card matching Airbnb reference (NO emojis) */}
            <div className="border border-[#DDDDDD] rounded-2xl p-4 bg-white mb-6 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#FF385C] shrink-0">
                  <Tag size={16} className="fill-current" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#222222]">Take 10% off your next stay.</p>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs text-[#222222] underline font-medium"
                  >
                    Terms apply
                  </a>
                </div>
              </div>
              <button className="bg-[#F7F7F7] hover:bg-[#EBEBEB] text-xs font-semibold text-[#222222] px-4 py-2 rounded-lg border border-[#DDDDDD] transition-colors cursor-pointer">
                Claim
              </button>
            </div>

            {/* Booking Card & Report Link */}
            <BookingCard
              price={computedPrice}
              originalPrice={computedOriginalPrice}
              priceNights={nights}
              checkIn={checkIn}
              checkOut={checkOut}
              onDatesChange={(newIn, newOut) => {
                setCheckIn(newIn);
                setCheckOut(newOut);
              }}
            />
          </div>
        </div>

        {/* 4. REVIEWS & RATINGS BREAKDOWN (GIANT 4.93 + LAURELS + BARS + CATEGORIES) */}
        <ReviewBreakdown
          rating={property.rating}
          reviewsCount={property.reviewsCount}
          description={property.guestFavouriteDescription}
          ratingBreakdown={property.ratingBreakdown}
        />
      </main>

      {/* FULL-SCREEN PHOTO TOUR MODAL (modal=PHOTO_TOUR_SCROLLABLE) */}
      {showModal && (
        <PhotoModal
          onClose={closeModal}
          initialSectionId={modalInitialSection}
        />
      )}
    </div>
  );
}
