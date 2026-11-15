import { QrFrameTemplate, QrFrameCategory } from '../types/qrFrame';
import { campusFrames } from './frames/campusFrames';
import { studentLifeFrames } from './frames/studentLifeFrames';
import { esportsTechFrames } from './frames/esportsTechFrames';
import { vnFestivalFrames } from './frames/vnFestivalFrames';
import { fnbFrames } from './frames/fnbFrames';
import { ecommerceFrames } from './frames/ecommerceFrames';

export const FRAME_CATEGORIES: { id: QrFrameCategory; label: string; badge: string; icon: string }[] = [
  { id: 'campus', label: 'Học Đường & CLB', badge: 'Sinh Viên', icon: 'school' },
  { id: 'student-life', label: 'Đời Sống & Donate', badge: 'Gen Z', icon: 'wallet' },
  { id: 'esports-tech', label: 'Esports & Công Nghệ', badge: 'Cyber', icon: 'gamepad' },
  { id: 'vn-festival', label: 'Lễ Hội Việt Nam', badge: 'Văn Hóa', icon: 'flag' },
  { id: 'fnb', label: 'Ẩm Thực & Quán Xá', badge: 'F&B', icon: 'coffee' },
  { id: 'ecommerce', label: 'Dịch Vụ & Du Lịch', badge: 'Thương Mại', icon: 'shopping-bag' },
];

export const NONE_FRAME: QrFrameTemplate = {
  id: 'NONE',
  name: 'Không Khung (No Frame)',
  category: 'campus',
  defaultLabel: '',
  defaultColors: {
    primary: '#4F46E5',
    secondary: '#10B981',
    dotsStyle: 'rounded',
    eyeStyle: 'extra-rounded',
  },
  renderSvg: ({ children }) => <>{children}</>,
};

export const QR_FRAME_REGISTRY: QrFrameTemplate[] = [
  ...campusFrames,
  ...studentLifeFrames,
  ...esportsTechFrames,
  ...vnFestivalFrames,
  ...fnbFrames,
  ...ecommerceFrames,
];

export function getFrameById(id: string | null | undefined): QrFrameTemplate | null {
  if (!id || id === 'NONE' || id === 'none') return null;
  return QR_FRAME_REGISTRY.find((f) => f.id.toUpperCase() === id.toUpperCase()) || null;
}
