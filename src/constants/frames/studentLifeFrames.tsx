import React from 'react';
import { QrFrameTemplate } from '../../types/qrFrame';
const SafeZone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <foreignObject x="60" y="110" width="200" height="200">
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  </foreignObject>
);
export const studentLifeFrames: QrFrameTemplate[] = [
  {
    id: 'FRAME-07',
    name: 'Boba Milk Tea Cup',
    category: 'student-life',
    defaultLabel: 'DONATE TRÀ SỮA 🧋',
    defaultColors: { primary: '#BE123C', secondary: '#FB7185', dotsStyle: 'extra-rounded', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M190 8 L170 45" stroke={props.primaryColor || `#F43F5E`} strokeLinecap="round" strokeWidth="12"></path>
<path d="M35 50 L55 330 Q58 350 85 350 L235 350 Q262 350 265 330 L285 50 Z" fill={props.secondaryColor || `#FFF1F2`} stroke="#FB7185" strokeWidth="3"></path>
<rect fill="#FDA4AF" height="14" rx="7" width="270" x="25" y="42"></rect>
<text fill="#BE123C" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="700" textAnchor="middle" x="160" y="82">{props.labelText ?? `DONATE TRÀ SỮA 🧋`}</text>
<SafeZone>{props.children}</SafeZone>
<circle cx="95" cy="325" fill="#475569" r="8"></circle>
<circle cx="125" cy="330" fill="#334155" r="9"></circle>
<circle cx="160" cy="325" fill="#1E293B" r="8.5"></circle>
<circle cx="195" cy="330" fill="#475569" r="8"></circle>
<circle cx="225" cy="325" fill="#334155" r="9"></circle>
      </svg>
    ),
  },
  {
    id: 'FRAME-08',
    name: 'VietQR Piggy Bank',
    category: 'student-life',
    defaultLabel: 'QUÉT CHIA TIỀN NHÓM 🐷',
    defaultColors: { primary: '#BE185D', secondary: '#EC4899', dotsStyle: 'rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FDF2F8`} height="300" rx="30" stroke={props.secondaryColor || `#EC4899`} strokeWidth="2.5" width="270" x="25" y="45"></rect>
<rect fill="#FBBF24" height="12" rx="6" stroke="#D97706" strokeWidth="2" width="60" x="130" y="28"></rect>
<path d="M45 45 L65 20 L85 45 Z" fill="#FBCFE8" stroke={props.secondaryColor || `#EC4899`} strokeWidth="2"></path>
<path d="M235 45 L255 20 L275 45 Z" fill="#FBCFE8" stroke={props.secondaryColor || `#EC4899`} strokeWidth="2"></path>
<text fill="#BE185D" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="78">{props.labelText ?? `QUÉT CHIA TIỀN NHÓM 🐷`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#9D174D" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="332">VIETQR 24/7 NAPAS</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-09',
    name: 'SOS Instant Noodles',
    category: 'student-life',
    defaultLabel: 'CỨU ĐÓI CUỐI THÁNG 🍜',
    defaultColors: { primary: '#9A3412', secondary: '#EA580C', dotsStyle: 'dots', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFF7ED`} height="330" rx="20" stroke={props.secondaryColor || `#EA580C`} strokeWidth="2.5" width="270" x="25" y="25"></rect>
<line stroke="#78350F" strokeLinecap="round" strokeWidth="4" x1="220" x2="280" y1="20" y2="45"></line>
<line stroke="#78350F" strokeLinecap="round" strokeWidth="4" x1="225" x2="285" y1="30" y2="55"></line>
<rect fill="#FFEDD5" height="36" rx="8" width="200" x="45" y="45"></rect>
<text fill="#C2410C" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="145" y="68">{props.labelText ?? `CỨU ĐÓI CUỐI THÁNG 🍜`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#9A3412" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="338">MÌ TÔM HẢO HẢO / 5K - 10K</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-10',
    name: 'Wi-Fi Access Card',
    category: 'student-life',
    defaultLabel: 'QUÉT VÀO WI-FI 🛜',
    defaultColors: { primary: '#0E7490', secondary: '#0891B2', dotsStyle: 'classy', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect fill="#FFFFFF" height="332" rx="18" stroke={props.primaryColor || `#0891B2`} strokeWidth="2.5" width="272" x="24" y="24"></rect>
<path d="M125 50 Q160 30 195 50" fill="none" stroke={props.secondaryColor || `#06B6D4`} strokeLinecap="round" strokeWidth="3.5"></path>
<path d="M135 60 Q160 45 185 60" fill="none" stroke={props.secondaryColor || `#06B6D4`} strokeLinecap="round" strokeWidth="3"></path>
<circle cx="160" cy="70" fill={props.primaryColor || `#0891B2`} r="3.5"></circle>
<text fill="#0E7490" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="92">{props.labelText ?? `QUÉT VÀO WI-FI 🛜`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#155E75" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="160" y="338">SSID: SV_STUDY_FREE | WPA2</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-11',
    name: 'Boarding House Rules',
    category: 'student-life',
    defaultLabel: 'NỘI QUY PHÒNG TRỌ 🏠',
    defaultColors: { primary: '#0F766E', secondary: '#0D9488', dotsStyle: 'classy-rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M160 20 L285 75 L285 345 Q285 355 275 355 L45 355 Q35 355 35 345 L35 75 Z" fill={props.primaryColor || `#F0FDFA`} stroke={props.secondaryColor || `#0D9488`} strokeWidth="2.5"></path>
<rect fill="#CCFBF1" height="28" stroke={props.secondaryColor || `#0D9488`} strokeWidth="2" width="20" x="230" y="32"></rect>
<text fill="#115E59" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="85">{props.labelText ?? `NỘI QUY PHÒNG TRỌ 🏠`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#0F766E" fontFamily="Inter" fontSize="10.5" fontWeight="600" textAnchor="middle" x="160" y="338">TIỀN PHÒNG • ĐIỆN NƯỚC • RÁC</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-12',
    name: 'Lost &amp; Found Tag',
    category: 'student-life',
    defaultLabel: 'NHẶT ĐƯỢC XIN LIÊN HỆ 📞',
    defaultColors: { primary: '#4D7C0F', secondary: '#65A30D', dotsStyle: 'square', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M75 25 L245 25 L290 70 L290 350 L30 350 L30 70 Z" fill={props.primaryColor || `#F7FEE7`} stroke={props.secondaryColor || `#65A30D`} strokeWidth="2.5"></path>
<circle cx="160" cy="50" fill="#FFFFFF" r="10" stroke={props.secondaryColor || `#65A30D`} strokeWidth="2.5"></circle>
<path d="M160 50 Q160 10 180 8" fill="none" stroke="#4D7C0F" strokeWidth="2"></path>
<text fill="#3F6212" fontFamily="Plus Jakarta Sans" fontSize="11.5" fontWeight="700" textAnchor="middle" x="160" y="85">{props.labelText ?? `NHẶT ĐƯỢC XIN LIÊN HỆ 📞`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#4D7C0F" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="160" y="335">XIN HẬU TẠ &amp; CẢM ƠN</text>
      </svg>
    ),
  },
];