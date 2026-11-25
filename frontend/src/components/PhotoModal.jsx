/**
 * PhotoModal.jsx — Airbnb Scrollable Photo Tour Modal (modal=PHOTO_TOUR_SCROLLABLE)
 *
 * Matches the reference listing modal exactly:
 * - Fixed top header with Back arrow (<), Share, and Save (heart) buttons
 * - "Photo tour" h1 title with 13-item thumbnail navigation grid
 * - Smooth scroll to any room section
 * - 13 sections rendered vertically:
 *     1. Living room (8 photos)
 *     2. Full kitchen (2 photos)
 *     3. Bedroom 1 (6 photos, 1 king bed)
 *     4. Bedroom 2 (8 photos, 1 king bed)
 *     5. Full bathroom 1 (1 photo)
 *     6. Full bathroom 2 (1 photo)
 *     7. WC (1 photo)
 *     8. Workspace (1 photo)
 *     9. Back garden (4 photos)
 *    10. Patio (3 photos)
 *    11. Exterior (3 photos)
 *    12. Pool (2 photos)
 *    13. Additional photos (7 photos)
 * - Two-column desktop layout (sticky section titles on left, photo collage on right)
 * - Single-photo full-screen lightbox mode when clicking any individual image
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Share, Heart } from 'lucide-react';
import { photoTourSections, allPhotoTourImages } from '../data/photoTourData';

export default function PhotoModal({ onClose, initialSectionId, initialImageIndex }) {
  const containerRef = useRef(null);

  // If activePhotoIndex is not null, single photo lightbox overlay is shown
  const [activePhotoIndex, setActivePhotoIndex] = useState(
    typeof initialImageIndex === 'number' && initialImageIndex >= 0 ? initialImageIndex : null
  );

  // Reliable scroll inside the fixed overflow-y-auto container
  const scrollToTarget = (targetId, isSmooth = false) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    const container = containerRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetScroll = container.scrollTop + (elRect.top - containerRect.top) - 70;
      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: isSmooth ? 'smooth' : 'instant',
      });
    } else if (el) {
      el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant', block: 'start' });
    }
  };

  // Scroll to initial section on open if specified
  useEffect(() => {
    if (initialSectionId) {
      scrollToTarget(initialSectionId, false);
      const t1 = setTimeout(() => scrollToTarget(initialSectionId, false), 50);
      const t2 = setTimeout(() => scrollToTarget(initialSectionId, false), 150);
      const t3 = setTimeout(() => scrollToTarget(initialSectionId, false), 350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [initialSectionId]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Helper to cleanly close single photo lightbox with history pop
  function closeSinglePhoto() {
    if (window.history.state?.modal === 'photoSingle') {
      window.history.back();
    } else {
      setActivePhotoIndex(null);
    }
  }

  // Keyboard controls: Escape closes lightbox or modal, arrow keys navigate
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (activePhotoIndex !== null) {
          closeSinglePhoto();
        } else {
          onClose();
        }
      }
      if (activePhotoIndex !== null) {
        if (e.key === 'ArrowRight' && activePhotoIndex < allPhotoTourImages.length - 1) {
          setActivePhotoIndex(activePhotoIndex + 1);
        }
        if (e.key === 'ArrowLeft' && activePhotoIndex > 0) {
          setActivePhotoIndex(activePhotoIndex - 1);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, onClose]);

  // Handle browser & mousepad back navigation for single photo lightbox
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.modal !== 'photoSingle') {
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Smooth scroll to a section by ID from thumbnail pills
  const scrollToSection = (sectionId) => {
    scrollToTarget(sectionId, true);
  };

  // Find overall image index for single photo lightbox
  const openSinglePhoto = (photoUrl) => {
    const idx = allPhotoTourImages.findIndex((p) => p.url === photoUrl || p.thumbnail === photoUrl);
    if (idx !== -1) {
      window.history.pushState({ modal: 'photoSingle' }, '', window.location.href);
      setActivePhotoIndex(idx);
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* 1. TOP FIXED BAR (Back arrow, Share, Save) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 md:px-10 py-3.5 flex items-center justify-between">
        {/* Back / Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-colors cursor-pointer text-[#222222]"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        {/* Share & Save */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F7F7F7] text-sm font-semibold text-[#222222] underline cursor-pointer transition-colors"
          >
            <Share size={15} />
            <span>Share</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F7F7F7] text-sm font-semibold text-[#222222] underline cursor-pointer transition-colors"
          >
            <Heart size={15} />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-8">
        {/* Top Header: "Photo tour" */}
        <h1 className="text-2xl md:text-[28px] font-semibold text-[#222222] mb-6 tracking-tight">
          Photo tour
        </h1>

        {/* 13 Navigation Thumbnail Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 mb-14">
          {photoTourSections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="text-left group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-2 border border-black/5 group-hover:opacity-90 transition-opacity">
                <img
                  src={section.thumbnail}
                  alt={section.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <p className="text-xs md:text-sm font-medium text-[#222222] group-hover:underline line-clamp-1">
                {section.name}
              </p>
              <p className="text-xs text-[#717171]">
                {section.photos.length} photo{section.photos.length > 1 ? 's' : ''}
              </p>
            </button>
          ))}
        </div>

        {/* 13 PHOTO SECTIONS IN VERBATIM ORDER */}
        <div className="space-y-12">
          {photoTourSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="pt-8 pb-10 border-t border-[#DDDDDD] scroll-mt-20"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Left Column: Section Title & Bed description */}
                <div className="w-full md:w-[240px] lg:w-[280px] shrink-0 md:sticky md:top-24 md:self-start">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#222222] tracking-tight">
                    {section.name}
                  </h2>
                  {section.subtitle && (
                    <ul className="mt-2 text-sm text-[#717171] list-disc list-inside">
                      <li>{section.subtitle}</li>
                    </ul>
                  )}
                </div>

                {/* Right Column: Photo Layout collage */}
                <div className="flex-1 space-y-4">
                  {/* Case 1: Single Photo */}
                  {section.photos.length === 1 && (
                    <div
                      className="w-full rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                      onClick={() => openSinglePhoto(section.photos[0].url)}
                    >
                      <img
                        src={section.photos[0].url}
                        alt={section.photos[0].alt}
                        className="w-full max-h-[640px] object-cover group-hover:brightness-[0.96] transition-all"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Case 2: Exactly 2 Photos */}
                  {section.photos.length === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {section.photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                          onClick={() => openSinglePhoto(photo.url)}
                        >
                          <img
                            src={photo.url}
                            alt={photo.alt}
                            className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Case 3: 3 Photos (1 large hero + 2 side-by-side) */}
                  {section.photos.length === 3 && (
                    <div className="space-y-4">
                      <div
                        className="w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                        onClick={() => openSinglePhoto(section.photos[0].url)}
                      >
                        <img
                          src={section.photos[0].url}
                          alt={section.photos[0].alt}
                          className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                          loading="lazy"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.photos.slice(1, 3).map((photo) => (
                          <div
                            key={photo.id}
                            className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                            onClick={() => openSinglePhoto(photo.url)}
                          >
                            <img
                              src={photo.url}
                              alt={photo.alt}
                              className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Case 4: 4 Photos (1 large hero + 2 side-by-side + 1 large hero) */}
                  {section.photos.length === 4 && (
                    <div className="space-y-4">
                      <div
                        className="w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                        onClick={() => openSinglePhoto(section.photos[0].url)}
                      >
                        <img
                          src={section.photos[0].url}
                          alt={section.photos[0].alt}
                          className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                          loading="lazy"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.photos.slice(1, 3).map((photo) => (
                          <div
                            key={photo.id}
                            className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                            onClick={() => openSinglePhoto(photo.url)}
                          >
                            <img
                              src={photo.url}
                              alt={photo.alt}
                              className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                      <div
                        className="w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                        onClick={() => openSinglePhoto(section.photos[3].url)}
                      >
                        <img
                          src={section.photos[3].url}
                          alt={section.photos[3].alt}
                          className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  {/* Case 5: 6 or more photos (Living room, Bedroom 1, Bedroom 2, Additional photos) */}
                  {section.photos.length >= 5 && (
                    <div className="space-y-4">
                      {/* Photo 1: Full-width hero */}
                      <div
                        className="w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                        onClick={() => openSinglePhoto(section.photos[0].url)}
                      >
                        <img
                          src={section.photos[0].url}
                          alt={section.photos[0].alt}
                          className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                          loading="lazy"
                        />
                      </div>

                      {/* Photo 2 & 3: 2-column grid */}
                      {section.photos.length >= 3 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {section.photos.slice(1, 3).map((photo) => (
                            <div
                              key={photo.id}
                              className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                              onClick={() => openSinglePhoto(photo.url)}
                            >
                              <img
                                src={photo.url}
                                alt={photo.alt}
                                className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Photo 4: Full-width */}
                      {section.photos[3] && (
                        <div
                          className="w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                          onClick={() => openSinglePhoto(section.photos[3].url)}
                        >
                          <img
                            src={section.photos[3].url}
                            alt={section.photos[3].alt}
                            className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Remaining photos: 2-column grid */}
                      {section.photos.length > 4 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {section.photos.slice(4).map((photo) => (
                            <div
                              key={photo.id}
                              className="w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-gray-100 group"
                              onClick={() => openSinglePhoto(photo.url)}
                            >
                              <img
                                src={photo.url}
                                alt={photo.alt}
                                className="w-full h-full object-cover group-hover:brightness-[0.96] transition-all"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* 3. SINGLE PHOTO LIGHTBOX OVERLAY (when a photo is clicked inside the tour) */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:px-8 text-white">
            <button
              onClick={closeSinglePhoto}
              className="flex items-center gap-2 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors cursor-pointer text-sm font-medium"
            >
              <X size={18} />
              <span>Close</span>
            </button>
            <span className="text-sm font-medium">
              {activePhotoIndex + 1} / {allPhotoTourImages.length}
            </span>
            <div className="w-16"></div>
          </div>

          {/* Image & Prev/Next buttons */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-16 pb-8 relative">
            <button
              onClick={() => setActivePhotoIndex(Math.max(0, activePhotoIndex - 1))}
              disabled={activePhotoIndex === 0}
              className="absolute left-4 md:left-8 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-transform hover:scale-105 disabled:opacity-20 disabled:hover:scale-100 cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft size={22} className="text-gray-900" />
            </button>

            <img
              src={allPhotoTourImages[activePhotoIndex].url}
              alt={allPhotoTourImages[activePhotoIndex].alt || `Photo ${activePhotoIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={() => setActivePhotoIndex(Math.min(allPhotoTourImages.length - 1, activePhotoIndex + 1))}
              disabled={activePhotoIndex === allPhotoTourImages.length - 1}
              className="absolute right-4 md:right-8 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-transform hover:scale-105 disabled:opacity-20 disabled:hover:scale-100 cursor-pointer disabled:cursor-default"
            >
              <ChevronRight size={22} className="text-gray-900" />
            </button>
          </div>

          {/* Section Name caption at bottom */}
          <div className="text-center pb-6 text-white/80 text-sm">
            {allPhotoTourImages[activePhotoIndex].sectionName}
          </div>
        </div>
      )}
    </div>
  );
}
