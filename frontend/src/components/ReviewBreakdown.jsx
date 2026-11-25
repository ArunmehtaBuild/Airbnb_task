/**
 * ReviewBreakdown.jsx — Full Review & Guest Favourite Section
 *
 * Verbatim text and structure from Airbnb listing:
 * - "Rated 4.93 out of 5 from 165 reviews."
 * - Giant 4.93 with authentic laurel wreath branches
 * - "Guest favourite"
 * - "This home is a guest favourite based on ratings, reviews and reliability"
 * - "7 of 7 items showing"
 * - Overall rating with 5-star distribution bars
 * - 6 Category rating cards (Cleanliness, Accuracy, Check-in, Communication, Location, Value)
 */

import {
  Sparkles,
  CheckCircle2,
  Key,
  MessageSquare,
  MapPin,
  Tag,
} from 'lucide-react';

export const LEFT_LAUREL_URL =
  'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png?im_w=240';
export const RIGHT_LAUREL_URL =
  'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png?im_w=240';

export default function ReviewBreakdown({
  rating = 4.93,
  reviewsCount = 165,
}) {
  const categories = [
    {
      name: 'Cleanliness',
      score: '4.8',
      label: 'Rated 4.8 out of 5 stars for cleanliness',
      icon: <Sparkles size={28} className="text-[#222222]" strokeWidth={1.5} />,
    },
    {
      name: 'Accuracy',
      score: '5.0',
      label: 'Rated 5.0 out of 5 stars for accuracy',
      icon: <CheckCircle2 size={28} className="text-[#222222]" strokeWidth={1.5} />,
    },
    {
      name: 'Check-in',
      score: '4.9',
      label: 'Rated 4.9 out of 5 stars for check-in',
      icon: <Key size={28} className="text-[#222222]" strokeWidth={1.5} />,
    },
    {
      name: 'Communication',
      score: '5.0',
      label: 'Rated 5.0 out of 5 stars for communication',
      icon: <MessageSquare size={28} className="text-[#222222]" strokeWidth={1.5} />,
    },
    {
      name: 'Location',
      score: '4.9',
      label: 'Rated 4.9 out of 5 stars for location',
      icon: <MapPin size={28} className="text-[#222222]" strokeWidth={1.5} />,
    },
    {
      name: 'Value',
      score: '4.9',
      label: 'Rated 4.9 out of 5 stars for value',
      icon: <Tag size={28} className="text-[#222222]" strokeWidth={1.5} />,
    },
  ];

  const starBars = [
    { star: 5, pct: 94, label: '5 stars, 94% of reviews' },
    { star: 4, pct: 5, label: '4 stars, 5% of reviews' },
    { star: 3, pct: 1, label: '3 stars, 1% of reviews' },
    { star: 2, pct: 0, label: '2 stars, 0% of reviews' },
    { star: 1, pct: 0, label: '1 stars, 0% of reviews' },
  ];

  return (
    <section id="reviews" className="py-12 border-t border-[#EBEBEB]">
      {/* 1. GIANT 4.93 WITH LAUREL WREATH BRANCHES */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {/* Official Left Laurel Wreath Bracket */}
          <div className="w-[60px] h-[92px] sm:w-[87px] sm:h-[132px] flex items-center justify-center shrink-0">
            <img
              src={LEFT_LAUREL_URL}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain select-none"
            />
          </div>

          {/* Giant 4.93 */}
          <h2
            role="heading"
            aria-level="2"
            className="text-[68px] sm:text-[96px] font-extrabold text-[#222222] tracking-tighter leading-none px-1"
          >
            {rating}
          </h2>

          {/* Official Right Laurel Wreath Bracket */}
          <div className="w-[60px] h-[92px] sm:w-[87px] sm:h-[132px] flex items-center justify-center shrink-0">
            <img
              src={RIGHT_LAUREL_URL}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain select-none"
            />
          </div>
        </div>

        {/* Guest favourite title & description */}
        <h3 className="text-[22px] sm:text-[26px] font-bold text-[#222222] mt-3">
          Guest favourite
        </h3>
        <p className="text-[17px] sm:text-[18px] text-[#717171] max-w-[380px] mx-auto mt-1.5 text-center leading-[24px]">
          This home is a guest favourite based on
          <br />
          ratings, reviews and reliability
        </p>
      </div>

      {/* 2. RATING BREAKDOWN (Star distribution bars + Category rating cards) */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-[#717171]">
            7 of 7 items showing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Overall star rating distribution (lg: 4 cols) */}
          <div className="lg:col-span-4 lg:border-r lg:border-[#EBEBEB] lg:pr-8">
            <h4 className="text-sm font-semibold text-[#222222] mb-1">
              Overall rating
            </h4>
            <p className="text-xs text-[#717171] mb-4">
              Rated {rating} out of 5 from {reviewsCount} reviews.
            </p>

            <div className="space-y-2.5">
              {starBars.map((item) => (
                <div key={item.star} className="flex items-center gap-3 text-xs font-semibold text-[#222222]">
                  <span className="w-2">{item.star}</span>
                  <div className="flex-1 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#222222] rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="w-28 text-right font-normal text-[#717171]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 6 Category Rating Cards (lg: 8 cols) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="border-b sm:border-b-0 pb-4 sm:pb-0 sm:border-r border-[#EBEBEB] last:border-r-0 pr-4"
                >
                  <div className="mb-3">{cat.icon}</div>
                  <p className="text-xs font-normal text-[#717171] line-clamp-1">
                    {cat.label}
                  </p>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-sm font-semibold text-[#222222]">{cat.name}</span>
                    <span className="text-base font-bold text-[#222222]">{cat.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
