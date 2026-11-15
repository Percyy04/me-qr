import React, { useState, useMemo, useEffect } from 'react';
import { QRType } from '../../types/qr.types';
import { BENTO_CATEGORIES } from '../../data/bentoCategories';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import {
  X, Search, Check, Link, User, Wifi, MessageCircle,
  MapPin, Type, Calendar, Mail, Phone, Globe, Sparkles
} from 'lucide-react';

interface AllTypesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  url: <Link size={18} />,
  text: <Type size={18} />,
  vcard: <User size={18} />,
  wifi: <Wifi size={18} />,
  whatsapp: <MessageCircle size={18} />,
  social: <Globe size={18} />,
  map: <MapPin size={18} />,
  event: <Calendar size={18} />,
  email: <Mail size={18} />,
  phone: <Phone size={18} />,
};

export const AllTypesModal: React.FC<AllTypesModalProps> = ({
  isOpen,
  onClose,
  selectedType,
  onSelectType,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return BENTO_CATEGORIES;
    return BENTO_CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.badge.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h3 className="text-base font-bold text-slate-800">{t('modalAllTypesTitle')}</h3>
              <p className="text-xs text-slate-500">{t('modalAllTypesDesc')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchTypePlaceholder')}
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Grid of All QR Types */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((cat) => {
            const isActive = selectedType === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectType(cat.id);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between group cursor-pointer ${
                  isActive
                    ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-slate-50/80'
                }`}
              >
                {isActive && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                    <Check size={10} strokeWidth={3} />
                  </div>
                )}
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                    }`}
                  >
                    {ICONS[cat.id] || <Sparkles size={16} />}
                  </div>
                  <div className="min-w-0 pr-4">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{cat.title}</h4>
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-slate-100 text-slate-600">
                      {cat.badge}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
