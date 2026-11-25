/**
 * PropertyOverview.jsx — Property Type & Accommodation Details
 *
 * Displays "Entire serviced apartment in Goa, India"
 * and "5 guests · 2 bedrooms · 2 beds · 2.5 bathrooms".
 */

export default function PropertyOverview({ propertyType, guests, bedrooms, beds, bathrooms }) {
  const details = [
    `${guests} guests`,
    `${bedrooms} bedrooms`,
    `${beds} beds`,
    `${bathrooms} bathrooms`,
  ];

  return (
    <div className="pt-1 pb-6 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-semibold text-[#222222] leading-[26px]">
        {propertyType}
      </h2>
      <p className="text-base text-[#222222] mt-1 font-normal">
        {details.join(' · ')}
      </p>
    </div>
  );
}
