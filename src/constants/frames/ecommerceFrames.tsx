import React from 'react';
import { QrFrameTemplate } from '../../types/qrFrame';
const SafeZone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <foreignObject x="60" y="110" width="200" height="200">
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  </foreignObject>
);
export const ecommerceFrames: QrFrameTemplate[] = [
  {
    id: 'FRAME-31',
    name: 'Shopping Bag Store',
    category: 'ecommerce',
    defaultLabel: 'MUA SẮM NGAY 🛍️',
    defaultColors: { primary: '#047857', secondary: '#059669', dotsStyle: 'extra-rounded', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M120 50 Q160 10 200 50" fill="none" stroke={props.primaryColor || `#059669`} strokeLinecap="round" strokeWidth="4"></path>
<rect fill="#FFFFFF" height="305" rx="14" stroke={props.primaryColor || `#059669`} strokeWidth="2.5" width="270" x="25" y="50"></rect>
<text fill={props.secondaryColor || `#047857`} fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="800" textAnchor="middle" x="160" y="85">{props.labelText ?? `MUA SẮM NGAY 🛍️`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#065F46" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="336">QUÉT MÃ MUA HÀNG TIỆN LỢI</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-32',
    name: 'Flash Sale Voucher',
    category: 'ecommerce',
    defaultLabel: 'SĂN VOUCHER GIẢM SỐC 🔥',
    defaultColors: { primary: '#C2410C', secondary: '#EA580C', dotsStyle: 'rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFF7ED`} height="332" rx="18" stroke={props.secondaryColor || `#EA580C`} strokeWidth="3" width="276" x="22" y="24"></rect>
<rect fill={props.secondaryColor || `#EA580C`} height="40" rx="8" width="250" x="35" y="38"></rect>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="64">{props.labelText ?? `SĂN VOUCHER GIẢM SỐC 🔥`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#C2410C" fontFamily="Inter" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="338">FLASH SALE 50% • CHỈ HÔM NAY</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-33',
    name: 'Gift Box Ribbon',
    category: 'ecommerce',
    defaultLabel: 'QUÉT MỞ QUÀ TẶNG 🎁',
    defaultColors: { primary: '#1D4ED8', secondary: '#2563EB', dotsStyle: 'dots', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#EFF6FF`} height="305" rx="14" stroke={props.secondaryColor || `#2563EB`} strokeWidth="2.5" width="270" x="25" y="50"></rect>
<path d="M160 50 Q130 15 110 35 Q135 50 160 50" fill="#60A5FA"></path>
<path d="M160 50 Q190 15 210 35 Q185 50 160 50" fill="#60A5FA"></path>
<circle cx="160" cy="50" fill="#1D4ED8" r="5"></circle>
<text fill="#1D4ED8" fontFamily="Plus Jakarta Sans" fontSize="12.5" fontWeight="800" textAnchor="middle" x="160" y="85">{props.labelText ?? `QUÉT MỞ QUÀ TẶNG 🎁`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#1E40AF" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="338">QUÀ BÍ MẬT DÀNH CHO BẠN</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-34',
    name: 'Sleeper Bus / Boarding',
    category: 'ecommerce',
    defaultLabel: 'LỊCH TRÌNH CHUYẾN ĐI 🎫',
    defaultColors: { primary: '#047857', secondary: '#10B981', dotsStyle: 'classy', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#F0FDF4`} height="332" rx="16" stroke={props.secondaryColor || `#059669`} strokeWidth="2.5" width="270" x="25" y="24"></rect>
<circle cx="25" cy="88" fill="#F8FAFC" r="10" stroke={props.secondaryColor || `#059669`} strokeWidth="2.5"></circle>
<circle cx="295" cy="88" fill="#F8FAFC" r="10" stroke={props.secondaryColor || `#059669`} strokeWidth="2.5"></circle>
<line stroke="#6EE7B7" strokeDasharray="4 4" strokeWidth="2" x1="38" x2="282" y1="88" y2="88"></line>
<text fill="#047857" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="60">{props.labelText ?? `LỊCH TRÌNH CHUYẾN ĐI 🎫`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#065F46" fontFamily="Inter" fontSize="10.5" fontWeight="600" textAnchor="middle" x="160" y="336">XE KHÁCH GIƯỜNG NẰM • VÉ ĐIỆN TỬ</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-35',
    name: 'Google Maps Location Pin',
    category: 'ecommerce',
    defaultLabel: 'CHỈ ĐƯỜNG ĐẾN ĐÂY 📍',
    defaultColors: { primary: '#BE123C', secondary: '#E11D48', dotsStyle: 'classy-rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFF1F2`} height="310" rx="20" stroke={props.secondaryColor || `#E11D48`} strokeWidth="2.5" width="270" x="25" y="45"></rect>
<path d="M160 12 C145 12 135 24 135 38 C135 55 160 70 160 70 C160 70 185 55 185 38 C185 24 175 12 160 12 Z" fill={props.secondaryColor || `#E11D48`}></path>
<circle cx="160" cy="35" fill="#FFFFFF" r="7"></circle>
<text fill="#BE123C" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="88">{props.labelText ?? `CHỈ ĐƯỜNG ĐẾN ĐÂY 📍`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#9F1239" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="336">MỞ TRỰC TIẾP GOOGLE MAPS</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-36',
    name: 'Polaroid Photo Memory',
    category: 'ecommerce',
    defaultLabel: 'ALBUM ẢNH KỶ NIỆM 📸',
    defaultColors: { primary: '#0F172A', secondary: '#64748B', dotsStyle: 'square', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill="#FFFFFF" height="330" rx="8" stroke={props.primaryColor || `#CBD5E1`} strokeWidth="2" width="270" x="25" y="25"></rect>
<rect fill={props.secondaryColor || `#FDE047`} height="20" opacity="0.8" rx="3" transform="rotate(-3 160 25)" width="80" x="120" y="15"></rect>
<SafeZone>{props.children}</SafeZone>
<text fill="#0F172A" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="800" textAnchor="middle" x="160" y="300">{props.labelText ?? `ALBUM ẢNH KỶ NIỆM 📸`}</text>
<text fill="#64748B" fontFamily="Inter" fontSize="11" fontWeight="500" textAnchor="middle" x="160" y="325">QUÉT XEM TOÀN BỘ ẢNH CHUYẾN ĐI</text>
      </svg>
    ),
  },
];