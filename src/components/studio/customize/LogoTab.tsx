import React from 'react';
import { QRDesign } from '../../../types/qr.types';
import { PRESET_LOGOS } from '../../../data/presetLogos';
import { UploadCloud, Trash2 } from 'lucide-react';

interface LogoTabProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

export const LogoTab: React.FC<LogoTabProps> = ({ design, onChange }) => {
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
      {/* Preset Brand Logos */}
      <div>
        <label className="block text-xs font-bold text-slate-text-strong mb-2">
          Logo thương hiệu phổ biến
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {/* None button */}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...design,
                logo: { ...logo, url: null },
              })
            }
            className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
              !logo.url
                ? 'border-primary-container bg-indigo-tint/50 text-primary-container font-bold ring-1 ring-primary-container/20'
                : 'border-border-subtle bg-white hover:border-slate-300 text-slate-500'
            }`}
          >
            <span className="text-xs font-mono">None</span>
          </button>

          {PRESET_LOGOS.slice(0, 11).map((item) => {
            const isSelected = logo.url === item.dataUrl;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...design,
                    logo: { ...logo, url: item.dataUrl },
                  })
                }
                className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'border-primary-container bg-indigo-tint/50 ring-2 ring-primary-container/20 shadow-xs'
                    : 'border-border-subtle bg-white hover:border-slate-300'
                }`}
                title={item.name}
              >
                <img src={item.dataUrl} alt={item.name} className="w-5 h-5 object-contain" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Upload Dropzone */}
      <div className="pt-2 border-t border-border-subtle">
        <label className="block text-xs font-bold text-slate-text-strong mb-1.5">
          Tải lên Logo riêng (PNG, SVG, JPG)
        </label>

        {logo.url ? (
          <div className="p-3 bg-canvas-bg rounded-xl border border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white border border-border-subtle p-1 flex items-center justify-center">
                <img src={logo.url} alt="Custom Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold text-slate-700">Logo tùy chỉnh đang dùng</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ ...design, logo: { ...logo, url: null } })}
              className="text-slate-400 hover:text-rose-500 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-slate-300 hover:border-primary-container rounded-xl p-4 text-center cursor-pointer block bg-canvas-bg/50 transition-colors">
            <UploadCloud size={20} className="mx-auto text-primary-container mb-1" />
            <span className="text-xs font-semibold text-slate-700 block">Kéo thả ảnh hoặc nhấp để tải logo</span>
            <span className="text-[10px] text-slate-400">Khuyên dùng ảnh vuông nền trong suốt PNG hoặc SVG</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        )}
      </div>

      {/* Logo Tuning Sliders */}
      {logo.url && (
        <div className="p-3 bg-canvas-bg rounded-xl border border-border-subtle space-y-3">
          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1">
              <span>Kích thước logo trong mã QR</span>
              <span className="font-mono">{Math.round((logo.size || 0.3) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.4"
              step="0.01"
              value={logo.size || 0.3}
              onChange={(e) =>
                onChange({
                  ...design,
                  logo: { ...logo, size: parseFloat(e.target.value) },
                })
              }
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-container"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-700 font-medium">Xóa các chấm QR phía sau logo</span>
            <input
              type="checkbox"
              checked={logo.hideBackgroundDots}
              onChange={(e) =>
                onChange({
                  ...design,
                  logo: { ...logo, hideBackgroundDots: e.target.checked },
                })
              }
              className="w-4 h-4 rounded text-primary-container accent-primary-container"
            />
          </div>
        </div>
      )}
    </div>
  );
};
