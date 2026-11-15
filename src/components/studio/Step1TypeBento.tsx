import React, { useState } from 'react';
import { QRType } from '../../types/qr.types';
import { BENTO_CATEGORIES } from '../../data/bentoCategories';
import { AllTypesModal } from './AllTypesModal';
import {
  Link, AlignLeft, Image as ImageIcon, FileText,
  MapPin, Wifi, Video, Sparkles
} from 'lucide-react';

interface Step1Props {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

interface QuickItem {
  id: QRType;
  label: string;
  icon: React.ReactNode;
}

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XTwitterIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PRIMARY_ITEMS: QuickItem[] = [
  { id: 'url', label: 'Liên kết / URL', icon: <Link size={20} strokeWidth={2.2} /> },
  { id: 'text', label: 'Văn bản', icon: <AlignLeft size={20} strokeWidth={2.2} /> },
  { id: 'image', label: 'Hình ảnh', icon: <ImageIcon size={20} strokeWidth={2.2} /> },
  { id: 'pdf', label: 'PDF', icon: <FileText size={20} strokeWidth={2.2} /> },
  { id: 'social', label: 'Facebook', icon: <FacebookIcon /> },
  { id: 'map', label: 'Google Maps', icon: <MapPin size={20} strokeWidth={2.2} /> },
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi size={20} strokeWidth={2.2} /> },
  { id: 'phone', label: 'X (Twitter)', icon: <XTwitterIcon /> },
  { id: 'multiurl', label: 'Video', icon: <Video size={20} strokeWidth={2.2} /> },
];

export const Step1TypeBento: React.FC<Step1Props> = ({ selectedType, onSelectType }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const isSelectedInPrimary = PRIMARY_ITEMS.some((item) => item.id === selectedType);
  const activeCustomCat = !isSelectedInPrimary
    ? BENTO_CATEGORIES.find((c) => c.id === selectedType)
    : null;

  return (
    <>
      {/* Sleek Horizontal Icon Bar Matching ME-QR */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          {PRIMARY_ITEMS.map((item) => {
            const isActive = selectedType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectType(item.id)}
                className={`flex-1 min-w-[76px] sm:min-w-[84px] h-[72px] sm:h-[76px] rounded-xl flex flex-col items-center justify-center gap-1.5 p-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#F5E7F8] text-[#9333EA] border border-[#E9D5FF] shadow-xs font-bold'
                    : 'bg-[#F8FAFC] hover:bg-slate-100/90 text-slate-700 border border-transparent font-medium'
                }`}
              >
                <div className={`transition-transform ${isActive ? 'scale-105 text-[#9333EA]' : 'text-slate-600'}`}>
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs text-center leading-tight truncate max-w-[82px]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Dynamic Extra Button if a non-primary type was selected via modal */}
          {activeCustomCat && (
            <button
              type="button"
              onClick={() => onSelectType(activeCustomCat.id)}
              className="flex-1 min-w-[76px] sm:min-w-[84px] h-[72px] sm:h-[76px] rounded-xl flex flex-col items-center justify-center gap-1.5 p-2 transition-all shrink-0 cursor-pointer bg-[#F5E7F8] text-[#9333EA] border border-[#E9D5FF] shadow-xs font-bold"
            >
              <div className="text-[#9333EA] scale-105">
                <Sparkles size={20} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] sm:text-xs text-center leading-tight truncate max-w-[82px]">
                {activeCustomCat.title}
              </span>
            </button>
          )}

          {/* Xem Tất cả CTA Button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#9333EA] hover:bg-[#7E22CE] text-white font-bold text-xs rounded-xl px-4 py-2 flex items-center justify-center shrink-0 h-[72px] sm:h-[76px] transition-colors shadow-xs cursor-pointer whitespace-nowrap min-w-[88px]"
          >
            <span>Xem Tất cả</span>
          </button>
        </div>
      </section>

      {/* Full 17+ Types Modal */}
      <AllTypesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedType={selectedType}
        onSelectType={onSelectType}
      />
    </>
  );
};
