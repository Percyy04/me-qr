import React from 'react';

export interface LogoIconProps {
  size?: number | string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 36, width, height, className = '' }) => {
  const iconW = width ?? size;
  const iconH = height ?? size;

  return (
    <svg
      width={iconW}
      height={iconH}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id="qrg-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="qrg-cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="60%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="qrg-lightning" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Finder 1: Top-Left */}
      <rect x="8" y="8" width="30" height="30" rx="8" fill="none" stroke="url(#qrg-main)" strokeWidth="5" />
      <rect x="17.5" y="17.5" width="11" height="11" rx="3.5" fill="#10B981" />

      {/* Finder 2: Bottom-Left */}
      <rect x="8" y="82" width="30" height="30" rx="8" fill="none" stroke="url(#qrg-main)" strokeWidth="5" />
      <rect x="17.5" y="91.5" width="11" height="11" rx="3.5" fill="#10B981" />

      {/* Finder 3: Bottom-Right & Creative Nib */}
      <rect x="80" y="80" width="28" height="28" rx="8" fill="none" stroke="url(#qrg-main)" strokeWidth="5" />
      <circle cx="94" cy="94" r="4.5" fill="#10B981" />
      <path d="M 103,74 C 103,88 97,103 95,110 C 98,110 105,103 108,93 C 111,84 109,76 103,74 Z" fill="url(#qrg-main)" />

      {/* Graduation Cap (Top Right) */}
      <path d="M 94,14 L 115,27 L 94,40 L 73,27 Z" fill="url(#qrg-cap)" />
      <path d="M 81,32 C 81,38 107,38 107,32 L 107,38 C 107,45 81,45 81,38 Z" fill="url(#qrg-cap)" opacity="0.9" />
      <circle cx="94" cy="27" r="2.5" fill="#A7F3D0" />
      <path d="M 94,27 Q 112,32 112,43 L 112,49" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="112" cy="50" r="2.5" fill="#10B981" />

      {/* Lightning Bolt (Center) */}
      <path d="M 58,16 L 39,52 L 53,52 L 37,96 L 68,50 L 52,50 Z" fill="url(#qrg-lightning)" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" />

      {/* Organic QR Modules & Dots */}
      <circle cx="12" cy="50" r="3.5" fill="#4F46E5" />
      <circle cx="12" cy="65" r="3.5" fill="#4F46E5" />
      <circle cx="23" cy="57" r="4" fill="#3B82F6" />
      <rect x="18" y="42" width="10" height="5" rx="2.5" fill="#4F46E5" />
      <rect x="18" y="68" width="10" height="5" rx="2.5" fill="#3B82F6" />

      <circle cx="48" cy="14" r="3.5" fill="#3B82F6" />
      <circle cx="56" cy="26" r="4" fill="#2563EB" />
      <circle cx="68" cy="18" r="3.5" fill="#1D4ED8" />

      <circle cx="70" cy="58" r="4" fill="#0D9488" />
      <circle cx="82" cy="54" r="4" fill="#10B981" />
      <circle cx="75" cy="70" r="3.5" fill="#14B8A6" />
      <circle cx="88" cy="68" r="3" fill="#10B981" />

      <circle cx="48" cy="104" r="4.5" fill="#3B82F6" />
      <circle cx="62" cy="105" r="3.5" fill="#10B981" />
      <circle cx="70" cy="98" r="4" fill="#14B8A6" />
      <circle cx="57" cy="88" r="3" fill="#06B6D4" />
    </svg>
  );
};

export interface LogoProps {
  width?: number | string;
  height?: number | string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showText?: boolean;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  variant?: 'light' | 'dark';
  onClick?: () => void;
}

const SIZE_MAP = {
  sm: { icon: 28, title: 'text-sm', sub: 'text-[10px]' },
  md: { icon: 38, title: 'text-base sm:text-lg', sub: 'text-xs' },
  lg: { icon: 48, title: 'text-xl sm:text-2xl', sub: 'text-sm' },
  xl: { icon: 60, title: 'text-2xl sm:text-3xl', sub: 'text-base' },
};

export const Logo: React.FC<LogoProps> = ({
  width,
  height,
  size = 'md',
  showText = true,
  className = '',
  textClassName = '',
  iconClassName = '',
  variant = 'light',
  onClick,
}) => {
  const sizeConfig = typeof size === 'number' ? { icon: size, title: 'text-lg', sub: 'text-xs' } : SIZE_MAP[size];
  const iconW = width ?? sizeConfig.icon;
  const iconH = height ?? sizeConfig.icon;
  const isDark = variant === 'dark';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <LogoIcon width={iconW} height={iconH} className={iconClassName} />

      {showText && (
        <div className={`flex flex-col leading-none font-display ${textClassName}`}>
          <div className={`font-extrabold tracking-tight ${sizeConfig.title}`}>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>Quick</span>
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              QR
            </span>
          </div>
          <div className={`font-medium tracking-wide text-emerald-500 mt-0.5 ${sizeConfig.sub}`}>
            Studio
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
