/**
 * HighlightsSection.jsx — Verbatim listing highlights from Airbnb
 */

import { MapPin, Waves, Award } from 'lucide-react';

export default function HighlightsSection({ highlights }) {
  const defaultHighlights = [
    {
      icon: 'map-pin',
      title: 'In Candolim, near the beach',
      description: 'About a 10-min walk to Candolim Beach, with restaurants and shops along the way',
    },
    {
      icon: 'waves',
      title: 'Pool and balcony with green views',
      description: 'A shared infinity pool overlooks the mangroves, with a private balcony to take in the greenery',
    },
    {
      icon: 'award',
      title: 'Arun Mehta is an attentive host',
      description: "Guests highlight Arun's responsiveness, local tips, and the daily housekeeping that keeps the space spotless",
    },
  ];

  const items = highlights && highlights.length > 0 ? highlights : defaultHighlights;

  const iconMap = {
    'map-pin': <MapPin size={24} className="text-[#222222]" strokeWidth={1.5} />,
    waves: <Waves size={24} className="text-[#222222]" strokeWidth={1.5} />,
    award: <Award size={24} className="text-[#222222]" strokeWidth={1.5} />,
  };

  return (
    <div className="py-6 border-b border-[#EBEBEB] space-y-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="pt-0.5 shrink-0">
            {iconMap[item.icon] || <MapPin size={24} className="text-[#222222]" strokeWidth={1.5} />}
          </div>
          <div>
            <h4 className="text-base font-semibold text-[#222222]">{item.title}</h4>
            <p className="text-sm text-[#717171] mt-0.5 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
      <div>
        <a href="#" className="text-xs text-[#717171] underline hover:text-[#222222] transition-colors">
          Learn more about summaries
        </a>
      </div>
    </div>
  );
}
