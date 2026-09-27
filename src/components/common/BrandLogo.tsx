import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
  className?: string;
  animated?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showSubtitle = false,
  subtitle = 'AI Support Platform',
  className = '',
  animated = false,
}) => {
  // Dimensions for the icon container
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  const wordmarkSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }[size];

  const badgeSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-[11px] px-2 py-0.5',
    xl: 'text-xs px-2.5 py-1',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Unique Nexora Isometric Nexus SVG Logo Mark */}
      <div 
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#0b121e] p-1 border border-slate-700/60 shadow-md shadow-black/40 flex items-center justify-center shrink-0 group`}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#4ade80]/20 via-[#2dd4bf]/15 to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />
        
        {/* Bespoke Geometric Nexus "N" Emblem */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full relative z-10 ${animated ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
        >
          <defs>
            {/* Primary Mint-to-Emerald Facet Gradient */}
            <linearGradient id="nexora-left-facet" x1="6" y1="6" x2="16" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Cyan-to-Teal Central Diagonal Ribbon Gradient */}
            <linearGradient id="nexora-diagonal-facet" x1="12" y1="8" x2="24" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>

            {/* Right Emerald Pillar Gradient */}
            <linearGradient id="nexora-right-facet" x1="22" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Core Neural Spark Radial */}
            <radialGradient id="nexora-neural-spark" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#6ee7b7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Left Vertical Nexus Pillar */}
          <path
            d="M8 8.5C8 7.67 8.67 7 9.5 7H13.2C13.8 7 14.3 7.4 14.45 8L15 10.5V28C15 28.83 14.33 29.5 13.5 29.5H9.8C9.2 29.5 8.7 29.1 8.55 28.5L8 26V8.5Z"
            fill="url(#nexora-left-facet)"
          />

          {/* Dynamic Interlocking Diagonal Fold (Cutting through isometric space) */}
          <path
            d="M12.5 8.5L23.5 24.5C23.9 25.1 24.5 25.5 25.2 25.5H27C27.83 25.5 28.5 24.83 28.5 24V18L17.5 7.5C16.9 6.9 16 6.7 15.2 7L12.5 8.5Z"
            fill="url(#nexora-diagonal-facet)"
            fillOpacity="0.92"
          />

          {/* Right Upright Nexus Anchor */}
          <path
            d="M21 7.5C21 6.67 21.67 6 22.5 6H26.5C27.33 6 28 6.67 28 7.5V24C28 24.5 27.7 25 27.2 25.2L22 28.5C21.4 28.9 21 28.5 21 27.8V7.5Z"
            fill="url(#nexora-right-facet)"
          />

          {/* Core Central Aperture / Neural Spark node */}
          <circle cx="18" cy="17" r="3.5" fill="url(#nexora-neural-spark)" />
          <circle cx="18" cy="17" r="1.2" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Typography Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-bold tracking-tight text-white ${wordmarkSizes}`}>
              Nexora
            </span>
            <span className={`font-mono font-bold text-slate-950 bg-gradient-to-r from-[#4ade80] to-[#2dd4bf] rounded tracking-wider uppercase ${badgeSizes}`}>
              AI
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] text-slate-400 font-medium tracking-normal mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
