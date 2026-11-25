/**
 * Navbar.jsx — Top Navigation Bar matching Airbnb reference page ditto
 *
 * Exact visual structure and switching animation:
 * - Full-width layout spanning 100% viewport width
 * - Left: Official Fleeguide wordmark SVG (#FF385C) with Bélo + "fleeguide" logo close to the left screen corner
 * - Right: "Become a host", Globe language button, and Profile pill close to the right screen corner
 * - Switching Animation:
 *     - When collapsed: Header is 80px tall. Collapsed pill sits in the center with prominent 3D house icon.
 *     - When clicking search: Header expands smoothly to 176px (cubic-bezier transition).
 *       Row 1 Center: Collapsed pill smoothly scales/fades out, Category Tabs [Homes] [Experiences] [Services]
 *       smoothly glide in with official prominent 3D icons (48px) and solid black active underline.
 *       Row 2: Expanded capsule [Where | When | Who | 🔍 Search] smoothly glides and scales into place.
 *     - Floating card with "Suggested destinations" opens directly under "Where".
 *     - Page Backdrop: Dimming overlay below header; clicking outside or Escape smoothly reverses the animation.
 */

import { useState, useEffect, useRef } from 'react';
import { Globe, HelpCircle, Home, X, Mail } from 'lucide-react';
import {
  CollapsedSearchPill,
  CategoryTabs,
  ExpandedSearchCapsule,
} from './SearchBar';

export default function Navbar({ onSelectProperty }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('homes'); // 'homes' | 'experiences' | 'services'
  const [activeField, setActiveField] = useState('where');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close search and modals when pressing Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsProfileMenuOpen(false);
        setIsLoginModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close profile menu on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  return (
    <>
      <header
        className={`relative z-30 bg-white border-b border-[#EBEBEB] w-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] overflow-visible ${
          isSearchOpen ? 'h-[176px]' : 'h-20'
        }`}
      >
        <div className="w-full px-6 sm:px-8 md:px-10 lg:px-10 xl:px-12 h-full flex flex-col justify-start">
          {/* ROW 1: Logo (Left), Center (Pill when closed / 3 Tabs when open), Profile (Right) */}
          <div className="h-20 flex items-center justify-between shrink-0 relative">
            {/* Left: Official Fleeguide Logo with Bélo symbol and "fleeguide" wordmark */}
            <div className="flex-1 flex justify-start items-center">
              <a
                href="/"
                className="flex items-center gap-2 shrink-0 hover:opacity-95 transition-opacity"
                aria-label="Fleeguide homepage"
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 1006 1080"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#FF385C] block shrink-0"
                >
                  <path
                    d="M948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-bold text-[21px] md:text-[22px] tracking-tight text-[#FF385C] leading-none">
                  fleeguide
                </span>
              </a>
            </div>

            {/* Center: Relative Container holding both Collapsed Pill & 3 Category Tabs */}
            <div className="shrink-0 flex justify-center items-center h-full relative">
              {/* State A: Collapsed Search Pill (Scales/fades out smoothly on open) */}
              <div
                className={`transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  isSearchOpen
                    ? 'opacity-0 scale-90 -translate-y-2 pointer-events-none absolute'
                    : 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                }`}
              >
                <CollapsedSearchPill
                  onClick={() => {
                    setIsSearchOpen(true);
                    setActiveField('where');
                  }}
                />
              </div>

              {/* State B: Category Tabs [Homes | Experiences | Services] (Slides/fades in smoothly) */}
              <div
                className={`transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] delay-75 ${
                  isSearchOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 translate-y-2 pointer-events-none absolute'
                }`}
              >
                <CategoryTabs
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    setActiveField('where');
                  }}
                />
              </div>
            </div>

            {/* Right: "Become a host", Avatar circle & Hamburger menu circle (No Globe in top bar) */}
            <div className="flex-1 flex justify-end items-center">
              <nav aria-label="Profile" className="flex items-center gap-3 shrink-0" ref={profileMenuRef}>
              {/* 1. Become a host button */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hidden md:inline-block text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Become a host
              </a>

              {/* 2. Log in or sign up (Avatar circle button) */}
              <button
                onClick={() => setIsLoginModalOpen(true)}
                aria-label="Log in or sign up"
                className="w-10 h-10 rounded-full bg-[#EBEBEB] hover:bg-[#DDDDDD] flex items-center justify-center transition-colors cursor-pointer text-[#222222]"
              >
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#222222]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="14" />
                  <path d="m26.46 25.62c-1.58-2.81-4.26-4.9-7.46-5.73v-.72c1.79-1.04 3-2.96 3-5.17 0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.14 3 5.17v.72c-3.16.82-5.83 2.87-7.42 5.64" />
                </svg>
              </button>

              {/* 3. Main navigation menu (Hamburger circle button) */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  aria-label="Main navigation menu"
                  aria-expanded={isProfileMenuOpen}
                  className={`w-10 h-10 rounded-full bg-[#EBEBEB] hover:bg-[#DDDDDD] flex items-center justify-center transition-colors cursor-pointer text-[#222222] ${
                    isProfileMenuOpen ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#222222]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path d="M2 16h28M2 24h28M2 8h28" />
                  </svg>
                </button>

                {/* Dropdown Menu matching authentic Airbnb reference ditto */}
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+10px)] w-[260px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.14),0_0_1px_rgba(0,0,0,0.08)] border border-[#EBEBEB] py-2 z-50 overflow-hidden"
                  >
                    {/* 1. Languages & currency */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                    >
                      <Globe size={16} strokeWidth={1.8} className="text-[#222222] shrink-0" />
                      <span>Languages & currency</span>
                    </a>

                    {/* 2. Help Centre */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                    >
                      <HelpCircle size={16} strokeWidth={1.8} className="text-[#222222] shrink-0" />
                      <span>Help Centre</span>
                    </a>

                    {/* Divider 1 */}
                    <div className="my-1.5 border-t border-[#EBEBEB]" />

                    {/* 3. Become a host (Featured promo card) */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#F7F7F7] transition-colors cursor-pointer group"
                    >
                      <div className="pr-2">
                        <p className="text-[14px] font-semibold text-[#222222]">
                          Become a host
                        </p>
                        <p className="text-[12px] text-[#717171] mt-0.5 leading-snug">
                          It&apos;s easy to start hosting and earn extra income.
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#FF385C] shrink-0 group-hover:scale-105 transition-transform">
                        <Home size={20} strokeWidth={1.8} />
                      </div>
                    </a>

                    {/* Divider 2 */}
                    <div className="my-1.5 border-t border-[#EBEBEB]" />

                    {/* 4. Refer a host */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block px-4 py-2.5 text-[14px] text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                    >
                      Refer a host
                    </a>

                    {/* 5. Find a co-host */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block px-4 py-2.5 text-[14px] text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                    >
                      Find a co-host
                    </a>

                    {/* Divider 3 */}
                    <div className="my-1.5 border-t border-[#EBEBEB]" />

                    {/* 6. Log in or sign up */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="block px-4 py-2.5 text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                    >
                      Log in or sign up
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

          {/* ROW 2: Expanded Search Capsule (Where | When | Who | Search) — Smooth Glide Transition */}
          <div
            className={`w-full flex justify-center pb-5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              isSearchOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-4 pointer-events-none h-0 overflow-hidden'
            }`}
          >
            <ExpandedSearchCapsule
              activeTab={activeTab}
              activeField={activeField}
              setActiveField={setActiveField}
              onSelectProperty={onSelectProperty}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      </header>

      {/* Dimmed Page Backdrop when search is expanded */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className={`fixed inset-0 top-[176px] bg-black/25 backdrop-blur-[1px] z-20 transition-opacity duration-300 ease-out ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Authentic Log in or sign up Modal Dialog */}
      {isLoginModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Log in or sign up"
          onClick={() => setIsLoginModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-[568px] overflow-hidden shadow-2xl relative animate-fadeIn"
          >
            {/* Modal Header */}
            <div className="h-16 border-b border-[#EBEBEB] flex items-center justify-between px-6 relative">
              <button
                onClick={() => setIsLoginModalOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#222222] cursor-pointer"
              >
                <X size={18} strokeWidth={2} />
              </button>
              <h2 className="text-base font-bold text-[#222222] absolute left-1/2 -translate-x-1/2">
                Log in or sign up
              </h2>
              <div className="w-8" />
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h3 className="text-[22px] font-semibold text-[#222222] mb-6">
                Welcome to fleeguide
              </h3>

              {/* Country & Phone inputs */}
              <div className="border border-[#B0B0B0] rounded-xl overflow-hidden mb-2">
                <div className="p-3 border-b border-[#B0B0B0]">
                  <label className="block text-[10px] font-bold text-[#717171] uppercase tracking-wider">
                    Country/Region
                  </label>
                  <div className="text-sm text-[#222222] font-normal mt-0.5">
                    India (+91)
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-[10px] font-bold text-[#717171] uppercase tracking-wider">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full text-sm text-[#222222] outline-hidden mt-0.5 bg-transparent"
                  />
                </div>
              </div>

              <p className="text-[12px] text-[#717171] leading-tight mb-5">
                We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="underline font-semibold text-[#222222]">
                  Privacy Policy
                </a>
              </p>

              {/* Continue button */}
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="w-full bg-linear-to-r from-[#FF385C] to-[#E00B41] hover:from-[#E00B41] hover:to-[#D70466] text-white font-semibold py-3.5 rounded-xl text-base transition-all cursor-pointer shadow-xs mb-6"
              >
                Continue
              </button>

              {/* Or divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#DDDDDD]" />
                <span className="text-xs text-[#717171] font-medium">or</span>
                <div className="flex-1 h-px bg-[#DDDDDD]" />
              </div>

              {/* Social Login options */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  className="w-full border border-[#222222] hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-[#222222] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15Z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  className="w-full border border-[#222222] hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-[#222222] transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.91-12.04-14.49-6.3-9.5-11.24-20.44-14.83-32.81-3.59-12.38-5.39-23.75-5.39-34.13 0-14.28 3.59-25.96 10.77-35.03 7.18-9.08 16.09-13.68 26.74-13.82 4.47 0 9.53 1.2 15.17 3.59 5.64 2.39 9.17 3.65 10.6 3.78 2.01-.27 5.75-1.61 11.22-4.04 5.47-2.43 10.37-3.52 14.7-3.29 11.22.68 20.31 4.7 27.26 12.08-9.84 5.92-14.65 14.15-14.42 24.68.23 8.35 3.42 15.34 9.57 20.97 6.15 5.63 13.54 8.78 22.18 9.45-2.01 6.07-4.49 12.35-7.44 18.84zM119.22 31.84c0-7.39 2.68-14.26 8.04-20.61 5.36-6.35 11.89-10.42 19.59-12.23.27 1.34.4 2.67.4 3.99 0 7.39-2.73 14.28-8.19 20.67-5.46 6.39-12.08 10.32-19.84 11.78z" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>

                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  className="w-full border border-[#222222] hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-[#222222] transition-colors cursor-pointer"
                >
                  <Mail size={19} strokeWidth={2} />
                  <span>Continue with email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
