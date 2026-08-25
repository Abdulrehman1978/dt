import React from 'react';
import { PlatformId } from '../types';

interface PlatformBadgeProps {
  platform: PlatformId | string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const p = platform.toLowerCase();

  const getPlatformDetails = () => {
    switch (p) {
      case 'zomato':
        return {
          name: 'Zomato',
          bg: 'bg-[#E23744]/15 border-red-500/30 text-red-400',
          dot: 'bg-[#E23744]',
          logoChar: 'Z',
          brandColor: '#E23744',
        };
      case 'swiggy':
        return {
          name: 'Swiggy',
          bg: 'bg-[#FC8019]/15 border-orange-500/30 text-orange-400',
          dot: 'bg-[#FC8019]',
          logoChar: 'S',
          brandColor: '#FC8019',
        };
      case 'zepto':
        return {
          name: 'Zepto',
          bg: 'bg-[#800080]/15 border-purple-500/30 text-purple-400',
          dot: 'bg-[#9333EA]',
          logoChar: 'Z',
          brandColor: '#9333EA',
        };
      case 'blinkit':
        return {
          name: 'Blinkit',
          bg: 'bg-[#F4B400]/15 border-amber-500/30 text-amber-400',
          dot: 'bg-[#F4B400]',
          logoChar: 'B',
          brandColor: '#F4B400',
        };
      case 'shadowfax':
        return {
          name: 'Shadowfax',
          bg: 'bg-[#00A8B5]/15 border-cyan-500/30 text-cyan-400',
          dot: 'bg-[#00A8B5]',
          logoChar: 'SF',
          brandColor: '#00A8B5',
        };
      case 'uber':
        return {
          name: 'Uber',
          bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-500',
          logoChar: 'U',
          brandColor: '#10B981',
        };
      default:
        return {
          name: platform,
          bg: 'bg-slate-800 border-slate-700 text-slate-300',
          dot: 'bg-slate-400',
          logoChar: platform[0]?.toUpperCase() || 'P',
          brandColor: '#64748B',
        };
    }
  };

  const details = getPlatformDetails();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-sm px-2.5 py-1 gap-2',
    lg: 'text-base px-3.5 py-1.5 gap-2.5 font-semibold',
  };

  const iconSizes = {
    sm: 'w-4 h-4 text-[10px]',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm',
  };

  return (
    <span
      id={`badge-${p}`}
      className={`inline-flex items-center rounded-full border font-medium ${details.bg} ${sizeClasses[size]} ${className}`}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full font-black text-white ${iconSizes[size]}`}
        style={{ backgroundColor: details.brandColor }}
      >
        {details.logoChar}
      </span>
      {showLabel && <span>{details.name}</span>}
    </span>
  );
};
