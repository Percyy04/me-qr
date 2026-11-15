import React, { useState } from 'react';
import { QRType } from '../../types/qr.types';
import { BENTO_CATEGORIES } from '../../data/bentoCategories';
import { AllTypesModal } from './AllTypesModal';
import { useLanguage } from '../../context/LanguageContext';
import {
  Link, AlignLeft, User, MessageCircle,
  MapPin, Wifi, Mail, Sparkles
} from 'lucide-react';

interface Step1Props {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
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

export const Step1TypeBento: React.FC<Step1Props> = ({ selectedType, onSelectType }) => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const primaryItems = [
    { id: 'url' as QRType, label: t('typeUrl'), icon: <Link size={20} strokeWidth={2.2} /> },
    { id: 'text' as QRType, label: t('typeText'), icon: <AlignLeft size={20} strokeWidth={2.2} /> },
    { id: 'vcard' as QRType, label: t('typeVcard'), icon: <User size={20} strokeWidth={2.2} /> },
    { id: 'wifi' as QRType, label: t('typeWifi'), icon: <Wifi size={20} strokeWidth={2.2} /> },
    { id: 'whatsapp' as QRType, label: t('typeWhatsapp'), icon: <MessageCircle size={20} strokeWidth={2.2} /> },
    { id: 'social' as QRType, label: 'Facebook', icon: <FacebookIcon /> },
    { id: 'map' as QRType, label: t('typeMap'), icon: <MapPin size={20} strokeWidth={2.2} /> },
    { id: 'phone' as QRType, label: 'X (Twitter)', icon: <XTwitterIcon /> },
    { id: 'email' as QRType, label: t('typeEmail'), icon: <Mail size={20} strokeWidth={2.2} /> },
  ];

  const isSelectedInPrimary = primaryItems.some((item) => item.id === selectedType);
  const activeCustomCat = !isSelectedInPrimary
    ? BENTO_CATEGORIES.find((c) => c.id === selectedType)
    : null;

  return (
    <>
      <section className="bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          {primaryItems.map((item) => {
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

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#9333EA] hover:bg-[#7E22CE] text-white font-bold text-xs rounded-xl px-4 py-2 flex items-center justify-center shrink-0 h-[72px] sm:h-[76px] transition-colors shadow-xs cursor-pointer whitespace-nowrap min-w-[88px]"
          >
            <span>{t('step1AllTypes')}</span>
          </button>
        </div>
      </section>

      <AllTypesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedType={selectedType}
        onSelectType={onSelectType}
      />
    </>
  );
};
