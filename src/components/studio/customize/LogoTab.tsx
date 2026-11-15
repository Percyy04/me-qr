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
  const isLogoMode = design.mode === 'logo';

  const minScale = isLogoMode ? 0.5 : 0.16;
  const maxScale = isLogoMode ? 0.85 : 0.32;
  const stepScale = isLogoMode ? 0.02 : 0.01;
  const currentScale = isLogoMode
    ? (logo.size >= 0.4 ? logo.size : 0.75)
    : (logo.size <= 0.35 && logo.size >= 0.15 ? logo.size : 0.24);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          ...design,
          logo: { ...logo, url: reader.result as string, size: currentScale },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 pt-1">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800">
          {isLogoMode ? 'Biểu trưng Halftone (LogoQR)' : 'Logo ở tâm mã QR (Cổ điển)'}
        </h4>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          {isLogoMode ? 'Halftone Dithering' : 'Center Badge (Level H)'}
        </span>
      </div>

      {/* Upload Button */}
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
        <Info size={14} className="text-purple-600 shrink-0 mt-0.5" />
        <span>
          {isLogoMode
            ? 'Chế độ LogoQR Halftone phủ biểu trưng chìm/nổi lên toàn bộ ma trận hạt QR nghệ thuật.'
            : 'Mã QR Cổ điển đặt logo gọn gàng ở tâm kèm badge bảo vệ, tự động nâng mức sửa lỗi H (30%) đảm bảo quét 100% không bị che khuất.'}
        </span>
      </div>

      {/* Slider: Kích Thước Biểu Trưng */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-700 shrink-0">
            {isLogoMode ? 'Kích thước Halftone' : t('logoSizeLabel')}
          </label>
          <span className="text-[11px] font-mono font-bold text-purple-600">
            {Math.round(currentScale * 100)}%
          </span>
        </div>
        <input
          type="range"
          min={minScale}
          max={maxScale}
          step={stepScale}
          value={currentScale}
          onChange={(e) =>
            onChange({
              ...design,
              logo: { ...logo, size: parseFloat(e.target.value) },
            })
          }
          className="w-full max-w-[180px] h-1.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#9333EA]"
        />
      </div>

      {/* Preset Icons Row matching ME-QR */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
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

        {PRESET_LOGOS.map((item) => {
          const isSelected = logo.url === item.dataUrl;
          return (
            <button
              key={item.id}
              type="button"
              title={item.name}
              onClick={() =>
                onChange({
                  ...design,
                  logo: { ...logo, url: item.dataUrl, size: currentScale },
                })
              }
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
      </div>
    </div>
  );
};
