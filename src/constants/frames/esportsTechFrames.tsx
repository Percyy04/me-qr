import React from 'react';
import { QrFrameTemplate } from '../../types/qrFrame';
const SafeZone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <foreignObject x="60" y="110" width="200" height="200">
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  </foreignObject>
);
export const esportsTechFrames: QrFrameTemplate[] = [
  {
    id: 'FRAME-13',
    name: 'Esports Shield',
    category: 'esports-tech',
    defaultLabel: 'ĐĂNG KÝ GIẢI ĐẤU 🎮',
    defaultColors: { primary: '#7E22CE', secondary: '#9333EA', dotsStyle: 'extra-rounded', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M160 22 L285 55 L285 240 Q285 330 160 365 Q35 330 35 240 L35 55 Z" fill={props.primaryColor || `#FAF5FF`} stroke={props.secondaryColor || `#9333EA`} strokeWidth="3"></path>
<rect fill={props.secondaryColor || `#9333EA`} height="34" rx="8" width="180" x="70" y="45"></rect>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="800" textAnchor="middle" x="160" y="68">{props.labelText || `ĐĂNG KÝ GIẢI ĐẤU 🎮`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#7E22CE" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="338">5v5 TOURNAMENT • FREE</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-14',
    name: 'Cyberpunk HUD',
    category: 'esports-tech',
    defaultLabel: '&gt; QUÉT KHÁM PHÁ ⚡ &lt;',
    defaultColors: { primary: '#090D16', secondary: '#22D3EE', dotsStyle: 'rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#090D16`} height="340" rx="14" stroke={props.secondaryColor || `#22D3EE`} strokeWidth="2" width="280" x="20" y="20"></rect>
<path d="M35 55 L35 35 L55 35" stroke={props.secondaryColor || `#22D3EE`} strokeWidth="4"></path>
<path d="M285 55 L285 35 L265 35" stroke={props.secondaryColor || `#22D3EE`} strokeWidth="4"></path>
<path d="M35 325 L35 345 L55 345" stroke={props.secondaryColor || `#22D3EE`} strokeWidth="4"></path>
<path d="M285 325 L285 345 L265 345" stroke={props.secondaryColor || `#22D3EE`} strokeWidth="4"></path>
<text fill="#10B981" fontFamily="JetBrains Mono" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="65">{props.labelText || `&gt; QUÉT KHÁM PHÁ ⚡ &lt;`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#64748B" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="160" y="335">CYBER_LINK // PROTOCOL_V4</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-15',
    name: 'Acoustic Music Night',
    category: 'esports-tech',
    defaultLabel: 'ĐẶT VÉ ĐÊM NHẠC 🎸',
    defaultColors: { primary: '#9F1239', secondary: '#E11D48', dotsStyle: 'dots', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect fill={props.primaryColor || `#FFF1F2`} height="332" rx="20" stroke={props.secondaryColor || `#E11D48`} strokeWidth="2.5" width="276" x="22" y="24"></rect>
<circle cx="160" cy="48" fill="#1E293B" r="28"></circle>
<circle cx="160" cy="48" fill="#FDA4AF" r="10"></circle>
<circle cx="160" cy="48" fill="#FFFFFF" r="3"></circle>
<text fill="#9F1239" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="96">{props.labelText || `ĐẶT VÉ ĐÊM NHẠC 🎸`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill={props.secondaryColor || `#E11D48`} fontFamily="Plus Jakarta Sans" fontSize="10.5" fontWeight="600" textAnchor="middle" x="160" y="342">ACOUSTIC LIVE @ 20:00</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-16',
    name: 'Livestream Viewfinder',
    category: 'esports-tech',
    defaultLabel: 'REC',
    defaultColors: { primary: '#18181B', secondary: '#EF4444', dotsStyle: 'classy', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
        <rect fill={props.primaryColor || `#18181B`} height="332" rx="16" stroke={props.secondaryColor || `#3F3F46`} strokeWidth="2" width="276" x="22" y="24"></rect>
<circle cx="45" cy="52" fill="#EF4444" r="6"></circle>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" x="60" y="56">REC</text>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" x="175" y="56">LIVE CHAT</text>
<rect fill="none" height="12" rx="3" stroke="#FFFFFF" strokeWidth="1.5" width="24" x="250" y="47"></rect>
<SafeZone>{props.children}</SafeZone>
<rect fill="#EF4444" height="36" rx="8" width="240" x="40" y="305"></rect>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="328">THAM GIA LIVESTREAM 🔴</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-17',
    name: 'macOS Terminal Code',
    category: 'esports-tech',
    defaultLabel: 'terminal — git clone',
    defaultColors: { primary: '#0F172A', secondary: '#10B981', dotsStyle: 'classy-rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#0F172A`} height="332" rx="14" stroke="#334155" strokeWidth="2" width="276" x="22" y="24"></rect>
<circle cx="42" cy="44" fill={props.secondaryColor || `#EF4444`} r="5"></circle>
<circle cx="58" cy="44" fill="#F59E0B" r="5"></circle>
<circle cx="74" cy="44" fill="#10B981" r="5"></circle>
<text fill="#94A3B8" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="160" y="48">{props.labelText || `terminal — git clone`}</text>
<text fill="#38BDF8" fontFamily="JetBrains Mono" fontSize="11" x="40" y="80">$ npm run dev --repo</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#F1F5F9" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="336">SOURCE CODE &amp; GITHUB 💻</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-18',
    name: 'Mobile App Bezel',
    category: 'esports-tech',
    defaultLabel: 'TẢI APP TRẢI NGHIỆM 📱',
    defaultColors: { primary: '#1D4ED8', secondary: '#3B82F6', dotsStyle: 'square', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill="#FFFFFF" height="350" rx="34" stroke={props.primaryColor || `#0F172A`} strokeWidth="4" width="260" x="30" y="15"></rect>
<rect fill={props.primaryColor || `#0F172A`} height="14" rx="7" width="70" x="125" y="26"></rect>
<text fill="#1E293B" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="68">{props.labelText || `TẢI APP TRẢI NGHIỆM 📱`}</text>
<SafeZone>{props.children}</SafeZone>
<rect fill={props.primaryColor || `#0F172A`} height="4" rx="2" width="100" x="110" y="342"></rect>
<text fill="#2563EB" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" textAnchor="middle" x="160" y="325">APP STORE &amp; GOOGLE PLAY</text>
      </svg>
    ),
  },
];