import React from 'react';
import { QRDesign } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';
import { Sparkles } from 'lucide-react';

interface ColorTabProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

const PRESET_COLORS = ['#4F46E5', '#10B981', '#0F172A', '#7C3AED', '#2563EB', '#D97706', '#E11D48', '#059669'];

export const ColorTab: React.FC<ColorTabProps> = ({ design, onChange }) => {
  const { t } = useLanguage();
  const isGradient = design.dots.gradient.enabled;

  const handlePreset = (hex: string) => {
    if (isGradient) {
      onChange({
        ...design,
        dots: { ...design.dots, gradient: { ...design.dots.gradient, startColor: hex } },
      });
    } else {
      onChange({
        ...design,
        dots: { ...design.dots, color: hex },
        cornersSquare: { ...design.cornersSquare, color: hex },
        cornersDot: { ...design.cornersDot, color: hex },
      });
    }
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Mode Switch: Solid vs Gradient */}
      <div className="flex items-center justify-between p-1 bg-canvas-bg rounded-xl border border-border-subtle text-xs font-bold">
        <button
          type="button"
          onClick={() => onChange({ ...design, dots: { ...design.dots, gradient: { ...design.dots.gradient, enabled: false } } })}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${!isGradient ? 'bg-white text-primary-container shadow-xs' : 'text-slate-text-muted'}`}
        >
          {t('solidColorMode')}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...design, dots: { ...design.dots, gradient: { ...design.dots.gradient, enabled: true } } })}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isGradient ? 'bg-white text-primary-container shadow-xs font-bold' : 'text-slate-text-muted hover:text-slate-text-strong'}`}
        >
          <Sparkles size={13} className={isGradient ? 'text-primary-container' : 'text-slate-400'} />
          <span>{t('gradientColorMode')}</span>
        </button>
      </div>

      {/* Preset Swatches with accessible touch targets */}
      <div>
        <label className="block text-xs font-bold text-slate-text-strong mb-2">{t('quickPalette')}</label>
        <div className="flex items-center gap-2.5 flex-wrap">
          {PRESET_COLORS.map((hex) => (
            <button
              key={hex}
              type="button"
              aria-label={`Color ${hex}`}
              title={`Color ${hex}`}
              onClick={() => handlePreset(hex)}
              className="w-8 h-8 rounded-xl transition-transform hover:scale-110 shadow-xs border border-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-1"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>

      {/* Color Controls */}
      {!isGradient ? (
        <div className="p-3 bg-canvas-bg rounded-xl border border-border-subtle flex items-center justify-between">
          <span className="text-xs font-bold text-slate-text-strong">{t('mainQrColor')}</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={design.dots.color}
              onChange={(e) =>
                onChange({
                  ...design,
                  dots: { ...design.dots, color: e.target.value },
                  cornersSquare: { ...design.cornersSquare, color: e.target.value },
                  cornersDot: { ...design.cornersDot, color: e.target.value },
                })
              }
              className="w-8 h-8 rounded-lg cursor-pointer border"
            />
            <span className="text-xs font-mono uppercase text-slate-700">{design.dots.color}</span>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-canvas-bg rounded-xl border border-border-subtle space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('gradientStartColor')}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={design.dots.gradient.startColor}
                  onChange={(e) =>
                    onChange({
                      ...design,
                      dots: { ...design.dots, gradient: { ...design.dots.gradient, startColor: e.target.value } },
                    })
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono uppercase">{design.dots.gradient.startColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t('gradientEndColor')}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={design.dots.gradient.endColor}
                  onChange={(e) =>
                    onChange({
                      ...design,
                      dots: { ...design.dots, gradient: { ...design.dots.gradient, endColor: e.target.value } },
                    })
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono uppercase">{design.dots.gradient.endColor}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1">
              <span>{t('gradientRotation')}</span>
              <span className="font-mono">{design.dots.gradient.rotation}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={design.dots.gradient.rotation}
              onChange={(e) =>
                onChange({
                  ...design,
                  dots: { ...design.dots, gradient: { ...design.dots.gradient, rotation: parseInt(e.target.value, 10) } },
                })
              }
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-container"
            />
          </div>
        </div>
      )}

      {/* Background Color & Transparency */}
      <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-text-strong block">{t('backgroundColor')}</span>
          <span className="text-[11px] text-slate-text-muted">{t('transparentBg')}</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={design.background.isTransparent}
              onChange={(e) =>
                onChange({
                  ...design,
                  background: { ...design.background, isTransparent: e.target.checked },
                })
              }
              className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer"
            />
            <span>{t('transparentBg')}</span>
          </label>
          {!design.background.isTransparent && (
            <input
              type="color"
              value={design.background.color}
              onChange={(e) =>
                onChange({
                  ...design,
                  background: { ...design.background, color: e.target.value },
                })
              }
              className="w-8 h-8 rounded-lg cursor-pointer border"
            />
          )}
        </div>
      </div>
    </div>
  );
};
