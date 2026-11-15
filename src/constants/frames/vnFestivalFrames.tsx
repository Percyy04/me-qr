import React from 'react';
import { QrFrameTemplate } from '../../types/qrFrame';
const SafeZone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <foreignObject x="60" y="110" width="200" height="200">
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  </foreignObject>
);
export const vnFestivalFrames: QrFrameTemplate[] = [
  {
    id: 'FRAME-19',
    name: 'Lunar New Year Red Packet',
    category: 'vn-festival',
    defaultLabel: 'LÌ XÌ ĐẦU NĂM 🧧',
    defaultColors: { primary: '#B91C1C', secondary: '#EAB308', dotsStyle: 'extra-rounded', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#DC2626`} height="332" rx="20" stroke={props.secondaryColor || `#FDE047`} strokeWidth="3" width="272" x="24" y="24"></rect>
<path d="M35 50 Q50 50 50 35" fill="none" stroke="#FBBF24" strokeWidth="2.5"></path>
<path d="M285 50 Q270 50 270 35" fill="none" stroke="#FBBF24" strokeWidth="2.5"></path>
<rect fill="#B91C1C" height="38" rx="8" width="220" x="50" y="38"></rect>
<text fill={props.secondaryColor || `#FDE047`} fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="800" textAnchor="middle" x="160" y="63">{props.labelText ?? `LÌ XÌ ĐẦU NĂM 🧧`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#FEF08A" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="336">VẠN SỰ NHƯ Ý • TÀI LỘC</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-20',
    name: 'Mid-Autumn Lantern',
    category: 'vn-festival',
    defaultLabel: 'VUI TẾT TRUNG THU 🏮',
    defaultColors: { primary: '#B45309', secondary: '#F59E0B', dotsStyle: 'rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFFBEB`} height="320" rx="24" stroke={props.secondaryColor || `#D97706`} strokeWidth="2.5" width="270" x="25" y="32"></rect>
<line stroke="#B45309" strokeWidth="3" x1="160" x2="160" y1="12" y2="32"></line>
<text fill="#B45309" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="800" textAnchor="middle" x="160" y="70">{props.labelText ?? `VUI TẾT TRUNG THU 🏮`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#92400E" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="332">RƯỚC ĐÈN PHÁ CỖ • ĐOÀN VIÊN</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-21',
    name: 'Teachers\' Day 20/11',
    category: 'vn-festival',
    defaultLabel: 'TRI ÂN THẦY CÔ 20/11 🌹',
    defaultColors: { primary: '#15803D', secondary: '#16A34A', dotsStyle: 'dots', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#F0FDF4`} height="330" rx="16" stroke={props.secondaryColor || `#16A34A`} strokeWidth="2.5" width="270" x="25" y="25"></rect>
<path d="M120 48 Q160 60 200 48" fill="none" stroke="#15803D" strokeWidth="2.5"></path>
<text fill="#15803D" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="78">{props.labelText ?? `TRI ÂN THẦY CÔ 20/11 🌹`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#166534" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="338">NGƯỜI LÁI ĐÒ THẦM LẶNG</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-22',
    name: 'Lotus Heritage',
    category: 'vn-festival',
    defaultLabel: 'TINH HOA VIỆT NAM 🪷',
    defaultColors: { primary: '#854D0E', secondary: '#D97706', dotsStyle: 'classy', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFFBEB`} height="332" rx="18" stroke={props.secondaryColor || `#B45309`} strokeWidth="3" width="276" x="22" y="24"></rect>
<circle cx="160" cy="50" fill="none" r="16" stroke="#D97706" strokeWidth="2"></circle>
<circle cx="160" cy="50" fill="#D97706" r="6"></circle>
<text fill="#92400E" fontFamily="Plus Jakarta Sans" fontSize="12.5" fontWeight="800" textAnchor="middle" x="160" y="86">{props.labelText ?? `TINH HOA VIỆT NAM 🪷`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill={props.secondaryColor || `#B45309`} fontFamily="Inter" fontSize="10.5" fontWeight="700" textAnchor="middle" x="160" y="338">DI SẢN &amp; VĂN HOÁ TRUYỀN THỐNG</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-23',
    name: 'Wedding &amp; Romance',
    category: 'vn-festival',
    defaultLabel: 'SAVE THE DATE 💍',
    defaultColors: { primary: '#BE123C', secondary: '#F43F5E', dotsStyle: 'classy-rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFF1F2`} height="332" rx="20" stroke={props.secondaryColor || `#E11D48`} strokeWidth="2" width="272" x="24" y="24"></rect>
<circle cx="152" cy="46" fill="none" r="10" stroke="#F59E0B" strokeWidth="2.5"></circle>
<circle cx="168" cy="46" fill="none" r="10" stroke="#F59E0B" strokeWidth="2.5"></circle>
<text fill="#BE123C" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="78">{props.labelText ?? `SAVE THE DATE 💍`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#9F1239" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="335">THIỆP CƯỚI &amp; ALBUM ẢNH</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-24',
    name: 'Women\'s Day Bouquet',
    category: 'vn-festival',
    defaultLabel: 'GỬI LỜI YÊU THƯƠNG 💐',
    defaultColors: { primary: '#86198F', secondary: '#C026D3', dotsStyle: 'square', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect fill={props.primaryColor || `#FDF4FF`} height="330" rx="18" stroke={props.secondaryColor || `#C026D3`} strokeWidth="2.5" width="270" x="25" y="25"></rect>
<path d="M160 44 Q140 25 130 45 Q150 50 160 44 Z" fill="#E879F9"></path>
<path d="M160 44 Q180 25 190 45 Q170 50 160 44 Z" fill="#E879F9"></path>
<circle cx="160" cy="44" fill="#A21CAF" r="4"></circle>
<text fill="#86198F" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="78">{props.labelText ?? `GỬI LỜI YÊU THƯƠNG 💐`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#A21CAF" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="336">CHÚC MỪNG NGÀY 8/3 &amp; 20/10</text>
      </svg>
    ),
  },
];