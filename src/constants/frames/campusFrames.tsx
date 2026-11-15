import React from 'react';
import { QrFrameTemplate } from '../../types/qrFrame';
const SafeZone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <foreignObject x="60" y="110" width="200" height="200">
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {children}
    </div>
  </foreignObject>
);
export const campusFrames: QrFrameTemplate[] = [
  {
    id: 'FRAME-01',
    name: 'Club Event Pass',
    category: 'campus',
    defaultLabel: 'CHECK-IN SỰ KIỆN 🎟️',
    defaultColors: { primary: '#1D4ED8', secondary: '#3B82F6', dotsStyle: 'extra-rounded', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill="#FFFFFF" height="340" rx="18" stroke={props.primaryColor || `#3B82F6`} strokeWidth="3" width="280" x="20" y="20"></rect>
<circle cx="20" cy="90" fill="#F8FAFC" r="12" stroke={props.primaryColor || `#3B82F6`} strokeWidth="3"></circle>
<circle cx="300" cy="90" fill="#F8FAFC" r="12" stroke={props.primaryColor || `#3B82F6`} strokeWidth="3"></circle>
<line stroke={props.secondaryColor || `#93C5FD`} strokeDasharray="6 4" strokeWidth="2" x1="36" x2="284" y1="90" y2="90"></line>
<rect fill="#EFF6FF" height="38" rx="8" width="220" x="50" y="38"></rect>
<text fill="#1D4ED8" fontFamily="Plus Jakarta Sans" fontSize="14" fontWeight="700" textAnchor="middle" x="160" y="62">{props.labelText ?? `CHECK-IN SỰ KIỆN 🎟️`}</text>
<SafeZone>{props.children}</SafeZone>
<rect fill="#F1F5F9" height="22" rx="4" width="200" x="60" y="325"></rect>
<line stroke="#334155" strokeWidth="2" x1="75" x2="75" y1="330" y2="342"></line>
<line stroke="#334155" strokeWidth="4" x1="82" x2="82" y1="330" y2="342"></line>
<line stroke="#334155" strokeWidth="1.5" x1="92" x2="92" y1="330" y2="342"></line>
<line stroke="#334155" strokeWidth="3" x1="102" x2="102" y1="330" y2="342"></line>
<text fill="#475569" fontFamily="JetBrains Mono" fontSize="9" x="180" y="340">PASS-8942-VN</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-02',
    name: 'Student ID Lanyard',
    category: 'campus',
    defaultLabel: 'THẺ THÀNH VIÊN CLB 🪪',
    defaultColors: { primary: '#4F46E5', secondary: '#6366F1', dotsStyle: 'rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M140 10 L140 32 M180 10 L180 32" stroke={props.primaryColor || `#4F46E5`} strokeLinecap="round" strokeWidth="12"></path>
<rect fill={props.secondaryColor || `#94A3B8`} height="14" rx="4" width="50" x="135" y="32"></rect>
<circle cx="160" cy="39" fill="#334155" r="3"></circle>
<rect fill="#FFFFFF" height="316" rx="16" stroke={props.primaryColor || `#4F46E5`} strokeWidth="2.5" width="270" x="25" y="44"></rect>
<rect fill={props.primaryColor || `#4F46E5`} height="42" rx="16" width="270" x="25" y="44"></rect>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="70">{props.labelText ?? `THẺ THÀNH VIÊN CLB 🪪`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill={props.primaryColor || `#4F46E5`} fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="160" y="336">HỌC SINH • SINH VIÊN VN</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-03',
    name: 'Club Recruitment',
    category: 'campus',
    defaultLabel: 'TUYỂN QUÂN / APPLY NGAY 📢',
    defaultColors: { primary: '#B45309', secondary: '#D97706', dotsStyle: 'dots', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#FFFBEB`} height="336" rx="20" stroke={props.secondaryColor || `#F59E0B`} strokeWidth="3" width="276" x="22" y="22"></rect>
<circle cx="45" cy="50" fill="#EF4444" r="4"></circle>
<circle cx="275" cy="65" fill="#3B82F6" r="5"></circle>
<polygon fill="#10B981" points="260,40 268,45 264,52"></polygon>
<polygon fill={props.secondaryColor || `#F59E0B`} points="50,75 58,72 55,80"></polygon>
<rect fill={props.secondaryColor || `#F59E0B`} height="42" rx="10" width="240" x="40" y="38"></rect>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="800" textAnchor="middle" x="160" y="65">{props.labelText ?? `TUYỂN QUÂN / APPLY NGAY 📢`}</text>
<SafeZone>{props.children}</SafeZone>
<text fill="#B45309" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="336">HẠN NỘP: 23H59 CHỦ NHẬT</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-04',
    name: 'Graduation Portfolio',
    category: 'campus',
    defaultLabel: 'XEM DEMO ĐỒ ÁN 🎓',
    defaultColors: { primary: '#0369A1', secondary: '#0284C7', dotsStyle: 'classy', eyeStyle: 'extra-rounded' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill={props.primaryColor || `#F0F9FF`} height="332" rx="16" stroke={props.secondaryColor || `#0284C7`} strokeWidth="2.5" width="276" x="22" y="24"></rect>
<path d="M160 30 L200 48 L160 64 L120 48 Z" fill="#0369A1"></path>
<path d="M140 57 L140 72 Q160 82 180 72 L180 57" fill={props.secondaryColor || `#0284C7`}></path>
<line stroke="#F59E0B" strokeWidth="2" x1="195" x2="208" y1="48" y2="70"></line>
<circle cx="208" cy="72" fill="#F59E0B" r="3"></circle>
<SafeZone>{props.children}</SafeZone>
<rect fill={props.secondaryColor || `#0284C7`} height="30" rx="8" width="220" x="50" y="318"></rect>
<text fill="#FFFFFF" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="338">{props.labelText ?? `XEM DEMO ĐỒ ÁN 🎓`}</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-05',
    name: 'Survey Clipboard',
    category: 'campus',
    defaultLabel: 'KHẢO SÁT NGHIÊN CỨU 📝',
    defaultColors: { primary: '#065F46', secondary: '#059669', dotsStyle: 'classy-rounded', eyeStyle: 'dot' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<rect fill="#FFFFFF" height="328" rx="14" stroke={props.primaryColor || `#059669`} strokeWidth="2.5" width="270" x="25" y="32"></rect>
<rect fill={props.secondaryColor || `#E2E8F0`} height="26" rx="6" stroke={props.primaryColor || `#059669`} strokeWidth="2" width="80" x="120" y="18"></rect>
<circle cx="160" cy="30" fill={props.primaryColor || `#059669`} r="4"></circle>
<text fill="#065F46" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="160" y="75">{props.labelText ?? `KHẢO SÁT NGHIÊN CỨU 📝`}</text>
<SafeZone>{props.children}</SafeZone>
<path d="M125 330 L135 340 L155 320" stroke="#10B981" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
<text fill="#065F46" fontFamily="Inter" fontSize="11" fontWeight="600" x="180" y="335">DÀNH 2 PHÚT</text>
      </svg>
    ),
  },
  {
    id: 'FRAME-06',
    name: 'Study Drive Folder',
    category: 'campus',
    defaultLabel: 'TÀI LIỆU ÔN THI 📂',
    defaultColors: { primary: '#6D28D9', secondary: '#7C3AED', dotsStyle: 'square', eyeStyle: 'square' },
    renderSvg: (props) => (
      <svg viewBox="0 0 320 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fill="none">
<path d="M25 55 L90 55 L115 35 L295 35 Q300 35 300 40 L300 345 Q300 355 290 355 L35 355 Q25 355 25 345 Z" fill={props.primaryColor || `#F5F3FF`} stroke={props.secondaryColor || `#7C3AED`} strokeWidth="2.5"></path>
<text fill="#6D28D9" fontFamily="Plus Jakarta Sans" fontSize="13" fontWeight="700" textAnchor="middle" x="165" y="75">{props.labelText ?? `TÀI LIỆU ÔN THI 📂`}</text>
<SafeZone>{props.children}</SafeZone>
<rect fill="#DDD6FE" height="22" rx="11" width="160" x="80" y="325"></rect>
<text fill="#5B21B6" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="160" y="340">GOOGLE DRIVE / ONEDRIVE</text>
      </svg>
    ),
  },
];