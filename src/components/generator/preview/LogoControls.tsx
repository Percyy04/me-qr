import React, { useRef } from 'react';
import { QRDesign } from '../../../types/qr.types';
import { PRESET_LOGOS } from '../../../data/presetLogos';
import { Upload, Trash2 } from 'lucide-react';

interface LogoControlsProps {
  logo: QRDesign['logo'];
  onChange: (logo: QRDesign['logo']) => void;
}

export const LogoControls: React.FC<LogoControlsProps> = ({ logo, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) onChange({ ...logo, url: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Upload button or current active logo */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
          Tải lên Logo riêng (PNG, JPG, SVG)
        </label>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-600 transition-colors"
          >
            <Upload size={16} className="text-blue-600" />
            <span>Chọn ảnh từ máy tính</span>
          </button>
          {logo.url && (
            <button
              type="button"
              onClick={() => onChange({ ...logo, url: null })}
              className="p-3 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 transition-colors"
              title="Xóa logo"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Preset popular icons */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
          Hoặc chọn biểu tượng có sẵn
        </label>
        <div className="grid grid-cols-5 gap-2">
          {PRESET_LOGOS.map((p) => {
            const isSelected = logo.url === p.dataUrl;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...logo,
                    url: isSelected ? null : p.dataUrl,
                  })
                }
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                title={p.name}
              >
                <img src={p.dataUrl} alt={p.name} className="w-5 h-5 object-contain" />
                <span className="text-[10px] text-slate-600 truncate w-full text-center">
                  {p.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {logo.url && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between text-xs text-slate-700 mb-1">
              <span>Kích thước Logo</span>
              <span className="font-mono">{Math.round(logo.size * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.35"
              step="0.01"
              value={logo.size}
              onChange={(e) =>
                onChange({ ...logo, size: parseFloat(e.target.value) })
              }
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
            <input
              type="checkbox"
              checked={logo.hideBackgroundDots}
              onChange={(e) =>
                onChange({ ...logo, hideBackgroundDots: e.target.checked })
              }
              className="rounded border-slate-300 text-blue-600"
            />
            <span>Xóa các chấm QR phía sau logo</span>
          </label>
        </div>
      )}
    </div>
  );
};

