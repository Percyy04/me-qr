import React from 'react';
import { QrFrameTemplate } from '../../types/qrFrame';
const SafeZone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <foreignObject x="60" y="110" width="200" height="200">
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  </foreignObject>
);
export const fnbFrames: QrFrameTemplate[] = [
  {
    id: 'FRAME-25',
    name: 'Phin Coffee Filter',
    category: 'fnb',
    defaultLabel: 'MENU CÀ PHÊ &amp; TRÀ ☕',
    defaultColors: { primary: '#78350F', secondary: '#92400E', dotsStyle: 'extra-rounded', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFFBEB`} height="312" rx="18" stroke={props.secondaryColor || `#78350F`} strokeWidth="2.5" width="270" x="25" y="42"></rect>
<rect fill="#94A3B8" height="12" rx="2" width="50" x="135" y="16"></rect>
<rect fill="#CBD5E1" height="14" width="36" x="142" y="28"></rect>
<rect fill="#64748B" height="6" rx="2" width="80" x="120" y="40"></rect>
<text fill={props.secondaryColor || `#78350F`} fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="78">{props.labelText || `MENU CÀ PHÊ &amp; TRÀ ☕`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#92400E" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="336">CÀ PHÊ MUỐI • BẠC XỈU • TRÀ ĐÀO</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-26',
    name: 'Restaurant Cloche Menu',
    category: 'fnb',
    defaultLabel: 'THỰC ĐƠN MÓN NGON 🍽️',
    defaultColors: { primary: '#C2410C', secondary: '#EA580C', dotsStyle: 'rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFF7ED`} height="320" rx="20" stroke={props.secondaryColor || `#EA580C`} strokeWidth="2.5" width="270" x="25" y="35"></rect>
<circle cx="160" cy="24" fill="#F97316" r="6"></circle>
<path d="M130 35 Q160 22 190 35" fill="none" stroke={props.secondaryColor || `#EA580C`} strokeWidth="3"></path>
<text fill="#C2410C" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="75">{props.labelText || `THỰC ĐƠN MÓN NGON 🍽️`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#9A3412" fontFamily="Inter" fontSize="10.5" fontWeight="600" textAnchor="middle" x="160" y="336">XEM MENU &amp; ĐẶT MÓN TẠI BÀN</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-27',
    name: 'Street Food Cart',
    category: 'fnb',
    defaultLabel: 'QUÉT ĐẶT ĐỒ ĂN NGAY 🥖',
    defaultColors: { primary: '#B91C1C', secondary: '#DC2626', dotsStyle: 'dots', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill="#FFFFFF" height="300" rx="14" stroke={props.primaryColor || `#DC2626`} strokeWidth="2.5" width="270" x="25" y="55"></rect>
<path d="M20 55 L35 25 L285 25 L300 55 Z" fill={props.primaryColor || `#DC2626`}></path>
<polygon fill="#FFFFFF" points="50,25 75,25 65,55 40,55"></polygon>
<polygon fill="#FFFFFF" points="100,25 125,25 115,55 90,55"></polygon>
<polygon fill="#FFFFFF" points="150,25 175,25 165,55 140,55"></polygon>
<polygon fill="#FFFFFF" points="200,25 225,25 215,55 190,55"></polygon>
<polygon fill="#FFFFFF" points="250,25 275,25 265,55 240,55"></polygon>
<text fill={props.secondaryColor || `#B91C1C`} fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="85">{props.labelText || `QUÉT ĐẶT ĐỒ ĂN NGAY 🥖`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#7F1D1D" fontFamily="Inter" fontSize="10.5" fontWeight="700" textAnchor="middle" x="160" y="338">BÁNH MÌ • BÚN BÒ • TRÀ TẮC</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-28',
    name: 'Table Tent Standee',
    category: 'fnb',
    defaultLabel: 'BÀN SỐ 08',
    defaultColors: { primary: '#3730A3', secondary: '#4F46E5', dotsStyle: 'classy', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M40 30 L280 30 L295 335 L25 335 Z" fill="#FFFFFF" stroke={props.primaryColor || `#4F46E5`} strokeWidth="2.5"></path>
<rect fill={props.secondaryColor || `#312E81`} height="20" rx="4" width="290" x="15" y="335"></rect>
<rect fill="#EEF2FF" height="32" rx="16" stroke={props.primaryColor || `#4F46E5`} strokeWidth="1.5" width="130" x="95" y="44"></rect>
<text fill="#4338CA" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="65">{props.labelText || `BÀN SỐ 08`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#3730A3" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="322">GỌI MÓN &amp; THANH TOÁN 🧾</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-29',
    name: '5-Star Customer Review',
    category: 'fnb',
    defaultLabel: 'ĐÁNH GIÁ 5 SAO GOOGLE ⭐',
    defaultColors: { primary: '#B45309', secondary: '#F59E0B', dotsStyle: 'classy-rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect fill="#FFFFFF" height="330" rx="20" stroke={props.primaryColor || `#F59E0B`} strokeWidth="2.5" width="270" x="25" y="25"></rect>
<g fill={props.secondaryColor || `#FBBF24`} stroke="#D97706" strokeWidth="1" transform="translate(70, 40)">
<polygon points="12,2 15,9 23,10 17,15 19,23 12,19 5,23 7,15 1,10 9,9"></polygon>
<polygon points="44,2 47,9 55,10 49,15 51,23 44,19 37,23 39,15 33,10 41,9"></polygon>
<polygon points="76,2 79,9 87,10 81,15 83,23 76,19 69,23 71,15 65,10 73,9"></polygon>
<polygon points="108,2 111,9 119,10 113,15 115,23 108,19 101,23 103,15 97,10 105,9"></polygon>
<polygon points="140,2 143,9 151,10 145,15 147,23 140,19 133,23 135,15 129,10 137,9"></polygon>
</g>
<text fill="#B45309" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="85">{props.labelText || `ĐÁNH GIÁ 5 SAO GOOGLE ⭐`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#92400E" fontFamily="Inter" fontSize="10.5" fontWeight="600" textAnchor="middle" x="160" y="335">TẶNG NGAY VOUCHER 10% KHI REVIEW</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-30',
    name: 'Spa &amp; Nail Voucher',
    category: 'fnb',
    defaultLabel: 'ƯU ĐÃI LÀM ĐẸP -20% ✂️',
    defaultColors: { primary: '#BE185D', secondary: '#DB2777', dotsStyle: 'square', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FDF2F8`} height="330" rx="22" stroke={props.secondaryColor || `#DB2777`} strokeWidth="2.5" width="270" x="25" y="25"></rect>
<path d="M152 40 L168 56 M168 40 L152 56" stroke={props.secondaryColor || `#DB2777`} strokeLinecap="round" strokeWidth="2.5"></path>
<circle cx="160" cy="48" fill="#F472B6" r="3"></circle>
<text fill="#BE185D" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="80">{props.labelText || `ƯU ĐÃI LÀM ĐẸP -20% ✂️`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#9D174D" fontFamily="Inter" fontSize="10.5" fontWeight="700" textAnchor="middle" x="160" y="336">SPA • NAILS • HAIR SALON</text>
      </svg>
    ),
  },
];