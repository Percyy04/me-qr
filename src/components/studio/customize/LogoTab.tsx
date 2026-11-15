import React from 'react';
import { QRDesign } from '../../../types/qr.types';
import { PRESET_LOGOS } from '../../../data/presetLogos';
import { useLanguage } from '../../../context/LanguageContext';
import { Upload, X, Info } from 'lucide-react';

interface LogoTabProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

export const LogoTab: React.FC<LogoTabProps> = ({ design, onChange }) => {
  const { t } = useLanguage();
  const logo = design.logo;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          ...design,
          logo: { ...logo, url: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 pt-1">
      <h4 className="text-sm font-bold text-slate-800">Logo</h4>

      {/* Upload Button matching ME-QR */}
      <label className="w-full py-2.5 px-4 rounded-xl border border-purple-400 bg-white hover:bg-purple-50 text-purple-600 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs">
        <Upload size={15} />
        <span>{t('uploadLogoBtn')}</span>
        <input
          type="file"
          accept=".svg,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>

      {/* Info Callout */}
      <div className="flex items-start gap-1.5 text-[11px] text-slate-500 leading-snug">
        <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
        <span>{t('uploadLogoFormatsHelp')}</span>
      </div>

      {/* Slider: Kích Thước Biểu Trưng */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <label className="text-xs font-semibold text-slate-700 shrink-0">
          {t('logoSizeLabel')}
        </label>
        <input
          type="range"
          min="0.15"
          max="0.45"
          step="0.02"
          value={logo.size}
          onChange={(e) =>
            onChange({
              ...design,
              logo: { ...logo, size: parseFloat(e.target.value) },
            })
          }
          className="w-full max-w-[200px] h-1.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#9333EA]"
        />
      </div>

      {/* Preset Icons Row matching ME-QR screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {/* None / Remove (✕) */}
        <button
          type="button"
          onClick={() => onChange({ ...design, logo: { ...logo, url: null } })}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
            !logo.url
              ? 'border-[#9333EA] ring-2 ring-purple-100 bg-purple-50/20'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
          title={t('logoNone')}
        >
          <X size={18} className="text-slate-500" />
        </button>

        {/* Preset logos: YouTube, Facebook, WhatsApp, Instagram, LinkedIn, Telegram */}
        {PRESET_LOGOS.map((item) => {
          const isSelected = logo.url === item.dataUrl;
          return (
            <button
              key={item.id}
              type="button"
              title={item.name}
              onClick={() => onChange({ ...design, logo: { ...logo, url: item.dataUrl } })}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border p-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#9333EA] ring-2 ring-purple-100 bg-purple-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <img src={item.dataUrl} alt={item.name} className="w-6 h-6 object-contain" />
            </button>
          );
        })}

        {/* +64 Badge Button */}
        <button
          type="button"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-slate-200 bg-white hover:border-slate-300 flex items-center justify-center shrink-0 text-xs font-bold text-slate-700 cursor-pointer"
        >
          +64
        </button>
      </div>
    </div>
  );
};
