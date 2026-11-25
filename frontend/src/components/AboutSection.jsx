/**
 * AboutSection.jsx — "About this space" description verbatim from Airbnb
 * Truncated preview on main page + modal popup dialog on clicking "Show more"
 */

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, X } from 'lucide-react';

export default function AboutSection({ description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    window.history.pushState({ modal: 'about' }, '', window.location.href);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (window.history.state?.modal === 'about') {
      window.history.back();
    } else {
      setIsModalOpen(false);
    }
  };

  // Close modal on Escape key press or mousepad back navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    const handlePopState = () => {
      setIsModalOpen(false);
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalOpen]);

  const defaultP1 =
    'This is a spacious apartment with a rustic mediterranean look which you will fall in love with. With 2 bedrooms and en-suite bathrooms it is just the right size for small familes and group of friends';
  const defaultP2 =
    'The apartment is located in a peaceful location and yet very close to all the action like amazing restaurants, bars and night clubs within 15-20 min of walking distance. The apartment block has a small infinity style swimming pool overlooking mangroves where you can relax after a long day out';
  const defaultSpaceP =
    'The apartment has an amazing view of the mangroves which is a natural habitat for various species of birds like peacocks etc';

  const paragraphs = description
    ? description.split('\n\n').filter(Boolean)
    : [defaultP1, defaultP2];

  const p1 = paragraphs[0] || defaultP1;
  const p2 = paragraphs[1] || defaultP2;
  const spaceP = paragraphs.length > 2 ? paragraphs.slice(2).join('\n\n') : defaultSpaceP;

  return (
    <div className="py-8 border-b border-[#EBEBEB]">
      <h3 className="text-[22px] font-semibold text-[#222222] mb-3">
        About this space
      </h3>

      {/* Main page clean truncated preview */}
      <div className="text-base text-[#222222] leading-relaxed line-clamp-3">
        {p1}
        <br />
        <br />
        {p2}
      </div>

      <button
        onClick={openModal}
        className="mt-4 flex items-center gap-1 font-semibold text-base underline cursor-pointer text-[#222222] hover:opacity-80 transition-opacity"
      >
        Show more
        <ChevronRight size={18} />
      </button>

      {/* Pop up Modal Dialog */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl max-w-[780px] w-full max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="About this space"
          >
            {/* Top Navigation Bar with Back & Close buttons */}
            <div className="sticky top-0 bg-white px-6 sm:px-8 pt-6 pb-2 flex items-center justify-between z-10">
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] transition-colors -ml-2 cursor-pointer"
                aria-label="Close"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] transition-colors -mr-2 cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="overflow-y-auto px-6 sm:px-8 pb-8 pt-2">
              <h2 className="text-[26px] font-bold text-[#222222] mb-6 tracking-tight">
                About this space
              </h2>

              <div className="space-y-4 text-base text-[#222222] leading-relaxed">
                <p>{p1}</p>
                <p>{p2}</p>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-[#222222] mb-2">
                    The space
                  </h3>
                  <p>{spaceP}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
