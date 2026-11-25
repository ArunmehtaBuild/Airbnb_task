/**
 * PropertyHeader.jsx — Title, Location, and Interactive Action Buttons (Share & Save)
 *
 * Verbatim Airbnb Reference:
 * - Property Title: ~26px, font-semibold #222222
 * - Action buttons directly above photo gallery:
 *     1. Share button: Upload/tray icon + underlined "Share"
 *        - Clicking opens authentic "Share this place" modal dialog (568px wide)
 *        - Preview card: 64x64 thumbnail + "Serviced apartment in Goa · ★4.93 · 2 bedrooms · 2 beds · 2.5 bathrooms"
 *        - 8 Share options grid (2 cols x 4 rows):
 *            1. Copy Link (Copies URL & displays "Link Copied" floating pill toast)
 *            2. Email
 *            3. Messages
 *            4. WhatsApp
 *            5. Messenger
 *            6. Facebook
 *            7. Twitter
 *            8. Embed
 *        - Dismisses via ✕ button, backdrop click, or Escape
 *     2. Save button: Heart icon + underlined "Save" (toggles saved heart state)
 */

import { useState, useEffect } from 'react';
import { Heart, X, CheckCircle2 } from 'lucide-react';

export default function PropertyHeader({
  title = '2 BHK Tranquil Bluetique Apartment, Candolim',
  location,
  property,
}) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Close share modal on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsShareOpen(false);
      }
    }
    if (isShareOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isShareOpen]);

  // Handle "Copy Link" action
  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedToast(true);
    setTimeout(() => {
      setCopiedToast(false);
    }, 3000);
  };

  // Thumbnail & details text matching Airbnb reference verbatim
  const thumbnailUrl =
    property?.images?.[0]?.url ||
    'https://a0.muscache.com/im/pictures/hosting/Hosting-52481572/original/94b58daf-1e75-4ab1-9b21-07e6268991a7.jpeg';

  const previewDetails =
    'Serviced apartment in Goa · ★4.93 · 2 bedrooms · 2 beds · 2.5 bathrooms';

  // 8 Share options
  const shareOptions = [
    {
      id: 'copy-link',
      name: 'Copy Link',
      action: handleCopyLink,
      icon: (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M4 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-1H3a1 1 0 0 1-1-1V5H2Z" />
        </svg>
      ),
    },
    {
      id: 'email',
      name: 'Email',
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
            `Check out this place: ${window.location.href}`
          )}`
        );
      },
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-1.4 2L16 16.5 3.4 8ZM4 24V9.8l11.4 7.7a1 1 0 0 0 1.2 0L28 9.8V24Z" />
        </svg>
      ),
    },
    {
      id: 'messages',
      name: 'Messages',
      action: () => {
        window.open(`sms:?&body=${encodeURIComponent(`Check out this place: ${window.location.href}`)}`);
      },
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M16 2C8.3 2 2 7.8 2 15c0 4.2 2.1 8 5.5 10.4L6 30l5.8-2.6c1.3.4 2.7.6 4.2.6 7.7 0 14-5.8 14-13S23.7 2 16 2Z" />
        </svg>
      ),
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      action: () => {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            `Check out this place on fleeguide: ${title} - ${window.location.href}`
          )}`,
          '_blank'
        );
      },
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A14 14 0 1 0 16 2Zm7.9 19.8c-.3.9-1.8 1.7-2.5 1.8-.7.1-1.6.2-5.1-1.3a18.3 18.3 0 0 1-7-6.2c-.8-1.1-1.4-2.5-1.4-3.9 0-1.5.8-2.2 1-2.5.3-.3.7-.4 1-.4h.8c.3 0 .6 0 .8.6.3.8 1 2.5 1.1 2.7.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.6.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.5 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.2.8 0 .3-.3 1.1-1.3 1.4-1.7.3-.4.6-.3 1-.2.4.2 2.5 1.2 2.9 1.4.4.2.7.3.8.5.1.2.1 1.1-.2 2Z" />
        </svg>
      ),
    },
    {
      id: 'messenger',
      name: 'Messenger',
      action: () => {
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
            window.location.href
          )}&app_id=292636774683&redirect_uri=${encodeURIComponent(window.location.href)}`,
          '_blank'
        );
      },
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M16 2C8.3 2 2 7.9 2 15.2c0 4.1 1.9 7.8 5 10.3V30l4.5-2.5c1.4.4 3 .6 4.5.6 7.7 0 14-5.9 14-13.2S23.7 2 16 2Zm1.6 17.5-3.8-4-7.4 4 8.2-8.7 3.8 4 7.4-4-8.2 8.7Z" />
        </svg>
      ),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
          '_blank'
        );
      },
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M16 2C8.3 2 2 8.3 2 16c0 7 5.1 12.8 11.8 13.8v-9.8H10.2V16h3.6v-3c0-3.6 2.1-5.6 5.4-5.6 1.6 0 3.2.3 3.2.3v3.5h-1.8c-1.8 0-2.3 1.1-2.3 2.3v2.5h4l-.6 4H18.3v9.8C25 28.8 30 23 30 16c0-7.7-6.3-14-14-14Z" />
        </svg>
      ),
    },
    {
      id: 'twitter',
      name: 'Twitter',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out this place on fleeguide: ${title}`
          )}&url=${encodeURIComponent(window.location.href)}`,
          '_blank'
        );
      },
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="currentColor">
          <path d="M18.2 13.9 28.5 2h-2.4l-9 10.3L9.9 2H2l10.8 15.6L2 30h2.4l9.5-10.9 7.6 10.9H30L18.2 13.9Zm-3.3 3.8-1.1-1.6L5.3 3.8h3.8l6.8 9.6 1.1 1.6 8.8 12.5h-3.8l-7.1-10.2Z" />
        </svg>
      ),
    },
    {
      id: 'embed',
      name: 'Embed',
      action: handleCopyLink,
      icon: (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#222222]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4.5 11.5 1 8 4.5 4.5" />
          <polyline points="11.5 4.5 15 8 11.5 11.5" />
          <line x1="10" y1="2" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-[26px] font-semibold text-[#222222] leading-[30px]">
            {title}
          </h1>
          {location && (
            <p className="text-sm font-medium text-[#717171] mt-1 underline cursor-pointer">
              {location}
            </p>
          )}
        </div>

        {/* Share and Save buttons */}
        <div className="flex items-center gap-1 shrink-0 mt-1 sm:mt-0">
          {/* Share Pill Button */}
          <button
            onClick={() => setIsShareOpen(true)}
            aria-label="Share"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition-colors cursor-pointer"
          >
            {/* Upload/Share icon matching Airbnb reference (tray with arrow) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#222222]"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <span className="text-sm font-semibold text-[#222222] underline">Share</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            aria-label={isSaved ? 'Saved to wishlist' : 'Add to wishlist'}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] transition-colors cursor-pointer"
          >
            <Heart
              size={16}
              strokeWidth={2}
              className={`transition-colors ${
                isSaved ? 'text-[#FF385C] fill-[#FF385C]' : 'text-[#222222]'
              }`}
            />
            <span className="text-sm font-semibold text-[#222222] underline">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* AUTHENTIC SHARE MODAL DIALOG (Verbatim Airbnb Reference) */}
      {/* ======================================================== */}
      {isShareOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Share"
          onClick={() => setIsShareOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-[568px] overflow-hidden shadow-2xl relative animate-fadeIn"
          >
            {/* Modal Header */}
            <div className="pt-6 px-6 pb-2 flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-[#222222]">
                Share this place
              </h2>
              <button
                onClick={() => setIsShareOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] cursor-pointer transition-colors"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-2">
              {/* Preview Card */}
              <div className="flex items-center gap-4 p-3 bg-white rounded-2xl mb-6">
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#222222] line-clamp-2">
                    {previewDetails}
                  </p>
                </div>
              </div>

              {/* 8 Share Options Grid (2 columns x 4 rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
                {shareOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={opt.action}
                    className="h-[54px] border border-[#DDDDDD] rounded-xl flex items-center gap-3.5 px-4 hover:border-black hover:bg-gray-50 transition-colors cursor-pointer text-left group"
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {opt.icon}
                    </div>
                    <span className="text-sm font-semibold text-[#222222] truncate">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Toast: "Link Copied" with green checkmark */}
            {copiedToast && (
              <div
                role="group"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#DDDDDD] shadow-xl rounded-full px-5 py-2.5 flex items-center gap-2.5 z-50 animate-fadeIn"
              >
                <CheckCircle2 size={18} className="text-[#008A05] fill-[#008A05]/10" />
                <span className="text-sm font-semibold text-[#222222]">
                  Link Copied
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
