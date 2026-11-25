/**
 * ImageGallery.jsx — Property Photo Gallery Grid
 *
 * What it does:
 *   Renders the Airbnb-style 5-image grid:
 *   - One large primary image on the left (50% width)
 *   - Four smaller images in a 2x2 grid on the right (50% width)
 *   - "Show all photos" button in the bottom-right corner
 *
 * Why it exists:
 *   The photo gallery is one of the most visually important parts of
 *   the Airbnb property page. It needs correct proportions, gaps,
 *   and rounded corners matching the reference.
 *
 * Visual details (from reference inspection):
 *   - Gap: 8px between all images
 *   - Border-radius: 12px only on outer corners of the whole grid
 *   - Hover: Images dim slightly (brightness 0.95)
 *   - Aspect ratio: ~1:1 for the grid cells
 *
 * Props:
 *   - images: Array of image objects (each with url, alt, order)
 *   - onShowAll: Callback to open the full photo modal
 *   - onImageClick: Callback when clicking an individual image
 */

export default function ImageGallery({ images, onShowAll, onImageClick }) {
  const displayImages = images.slice(0, 5);

  return (
    <div className="relative">
      {/* Desktop grid: 1 large + 4 small with 8px gaps and authentic Airbnb height (~412px) */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-[8px] overflow-hidden h-[360px] md:h-[390px] lg:h-[412px] rounded-2xl">
        {/* Primary image — spans 2 columns and 2 rows (left half) */}
        <div
          className="col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-l-2xl group"
          onClick={() => onImageClick(0)}
        >
          <img
            src={displayImages[0]?.url}
            alt={displayImages[0]?.alt || 'Primary property image'}
            className="w-full h-full object-cover group-hover:brightness-[0.95] transition-all"
          />
        </div>

        {/* Top-left of right grid (no rounded corners) */}
        <div
          className="cursor-pointer overflow-hidden group"
          onClick={() => onImageClick(1)}
        >
          <img
            src={displayImages[1]?.url}
            alt={displayImages[1]?.alt || 'Property image 2'}
            className="w-full h-full object-cover group-hover:brightness-[0.95] transition-all"
            loading="lazy"
          />
        </div>

        {/* Top-right of right grid (top-right corner rounded) */}
        <div
          className="cursor-pointer overflow-hidden rounded-tr-2xl group"
          onClick={() => onImageClick(2)}
        >
          <img
            src={displayImages[2]?.url}
            alt={displayImages[2]?.alt || 'Property image 3'}
            className="w-full h-full object-cover group-hover:brightness-[0.95] transition-all"
            loading="lazy"
          />
        </div>

        {/* Bottom-left of right grid (no rounded corners) */}
        <div
          className="cursor-pointer overflow-hidden group"
          onClick={() => onImageClick(3)}
        >
          <img
            src={displayImages[3]?.url}
            alt={displayImages[3]?.alt || 'Property image 4'}
            className="w-full h-full object-cover group-hover:brightness-[0.95] transition-all"
            loading="lazy"
          />
        </div>

        {/* Bottom-right of right grid (bottom-right corner rounded) */}
        <div
          className="cursor-pointer overflow-hidden rounded-br-2xl group"
          onClick={() => onImageClick(4)}
        >
          <img
            src={displayImages[4]?.url}
            alt={displayImages[4]?.alt || 'Property image 5'}
            className="w-full h-full object-cover group-hover:brightness-[0.95] transition-all"
            loading="lazy"
          />
        </div>
      </div>

      {/* Mobile layout: single image with count badge */}
      <div className="md:hidden">
        <div
          className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
          onClick={() => onImageClick(0)}
        >
          <img
            src={displayImages[0]?.url}
            alt={displayImages[0]?.alt || 'Primary property image'}
            className="w-full h-full object-cover"
          />
          {/* Image count badge on mobile */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-300">
            1 / {images.length}
          </div>
        </div>
      </div>

      {/* "Show all photos" button — desktop only, bottom-right of gallery */}
      <button
        onClick={onShowAll}
        className="hidden md:flex absolute bottom-5 right-5 items-center gap-2 bg-white text-xs md:text-sm font-semibold px-3.5 py-[6px] rounded-lg border border-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:bg-[#F7F7F7] active:scale-[0.98] transition-all cursor-pointer z-10"
      >
        {/* 3x3 dot grid icon matching the reference */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="1.5" fill="#222222"/>
          <circle cx="8" cy="3" r="1.5" fill="#222222"/>
          <circle cx="13" cy="3" r="1.5" fill="#222222"/>
          <circle cx="3" cy="8" r="1.5" fill="#222222"/>
          <circle cx="8" cy="8" r="1.5" fill="#222222"/>
          <circle cx="13" cy="8" r="1.5" fill="#222222"/>
          <circle cx="3" cy="13" r="1.5" fill="#222222"/>
          <circle cx="8" cy="13" r="1.5" fill="#222222"/>
          <circle cx="13" cy="13" r="1.5" fill="#222222"/>
        </svg>
        Show all photos
      </button>
    </div>
  );
}
