import React from 'react';
import { QRType } from '../../types/qr.types';
import { QR_TYPES } from '../../data/qrTypes';
import {
  Globe,
  Wifi,
  Contact,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
} from 'lucide-react';

interface TypeSelectorProps {
  currentType: QRType;
  onSelectType: (type: QRType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={18} />,
  Wifi: <Wifi size={18} />,
  Contact: <Contact size={18} />,
  FileText: <FileText size={18} />,
  Mail: <Mail size={18} />,
  MessageSquare: <MessageSquare size={18} />,
  Calendar: <Calendar size={18} />,
};

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  currentType,
  onSelectType,
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
      {QR_TYPES.map((t) => {
        const isActive = currentType === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectType(t.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-150 ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <span className={isActive ? 'text-white' : 'text-slate-500'}>
              {iconMap[t.icon]}
            </span>
            <span>{t.label}</span>
            {t.badge && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {t.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

