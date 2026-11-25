/**
 * HostSection.jsx — Host Profile Information
 *
 * Displays host avatar, name ("Hosted by Arun Mehta"),
 * superhost badge, and hosting duration.
 */

import { Award } from 'lucide-react';

export default function HostSection({ host }) {
  const name = 'Arun Mehta';
  const avatarUrl = '/arun_mehta.jpg';
  const yearsHosting = host?.yearsHosting || 7;
  const isSuperhost = host?.isSuperhost !== undefined ? host.isSuperhost : true;

  return (
    <div className="py-6 border-b border-[#EBEBEB] flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Host Avatar with Superhost badge badge */}
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt={name}
            className="w-14 h-14 rounded-full object-cover object-top border border-gray-200 shadow-sm"
          />
          {isSuperhost && (
            <div
              title="Superhost"
              className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow-sm flex items-center justify-center"
            >
              <Award size={12} strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* Host Details */}
        <div>
          <h3 className="text-base font-semibold text-[#222222] leading-tight">
            Hosted by {name}
          </h3>
          <p className="text-sm text-[#717171] flex items-center gap-1.5 mt-1">
            {isSuperhost && (
              <span className="font-semibold text-[#222222]">Superhost · </span>
            )}
            <span>{yearsHosting} years hosting</span>
          </p>
        </div>
      </div>
    </div>
  );
}
