import React from 'react';
import { QRDesign, BodyDotType, CornerSquareType, CornerDotType } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';
import { Circle, Square } from 'lucide-react';

interface PatternEyeTabProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

export const PatternEyeTab: React.FC<PatternEyeTabProps> = ({ design, onChange }) => {
  const { t } = useLanguage();

  const bodyPatterns: { id: BodyDotType; label: string; desc: string }[] = [
    { id: 'square', label: 'Square', desc: t('patternSquare') },
    { id: 'rounded', label: 'Rounded', desc: t('patternRounded') },
    { id: 'dots', label: 'Dots', desc: t('patternDots') },
    { id: 'extra-rounded', label: 'Capsule', desc: t('patternExtraRounded') },
    { id: 'classy', label: 'Classy', desc: t('patternClassy') },
    { id: 'classy-rounded', label: 'Soft Cut', desc: t('patternClassyRounded') },
  ];

  const eyeFrames: { id: CornerSquareType; label: string }[] = [
    { id: 'square', label: t('eyeSquare') },
    { id: 'extra-rounded', label: t('eyeRounded') },
    { id: 'dot', label: t('eyeDot') },
  ];

  const eyeCenters: { id: CornerDotType; label: string }[] = [
    { id: 'square', label: t('eyeCenterSquare') },
    { id: 'dot', label: t('eyeCenterDot') },
  ];

  return (
    <div className="space-y-4 pt-1">
      {/* Body Pattern Styles */}
      <div>
        <label className="block text-xs font-bold text-slate-text-strong mb-2">
          {t('patternBodyTitle')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {bodyPatterns.map((p) => {
            const isSelected = design.dots.type === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...design,
                    dots: { ...design.dots, type: p.id },
                  })
                }
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary-container bg-indigo-tint/50 ring-2 ring-primary-container/20'
                    : 'border-border-subtle bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${isSelected ? 'text-primary-container' : 'text-slate-500'}`}>
                    {p.id === 'dots' ? <Circle size={14} className="fill-current" /> : <Square size={14} className="fill-current" />}
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-primary-container' : 'text-slate-700'}`}>
                    {p.label}
                  </span>
                </div>
                <span className="text-[10px] text-slate-text-muted block pl-8">{p.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Eye Geometry: Outer & Inner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border-subtle">
        {/* Corner Outer Eyes */}
        <div>
          <label className="block text-xs font-bold text-slate-text-strong mb-2">
            {t('patternEyeOuterTitle')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {eyeFrames.map((ef) => {
              const isSelected = design.cornersSquare.type === ef.id;
              return (
                <button
                  key={ef.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...design,
                      cornersSquare: { ...design.cornersSquare, type: ef.id },
                    })
                  }
                  className={`py-2 px-1 text-center rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary-container bg-indigo-tint/50 text-primary-container font-bold ring-1 ring-primary-container/30'
                      : 'border-border-subtle bg-white text-slate-600 hover:border-slate-300 text-xs'
                  }`}
                >
                  <span className="text-xs">{ef.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Corner Inner Eyes */}
        <div>
          <label className="block text-xs font-bold text-slate-text-strong mb-2">
            {t('patternEyeCenterTitle')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {eyeCenters.map((ec) => {
              const isSelected = design.cornersDot.type === ec.id;
              return (
                <button
                  key={ec.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...design,
                      cornersDot: { ...design.cornersDot, type: ec.id },
                    })
                  }
                  className={`py-2 px-1 text-center rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary-container bg-indigo-tint/50 text-primary-container font-bold ring-1 ring-primary-container/30'
                      : 'border-border-subtle bg-white text-slate-600 hover:border-slate-300 text-xs'
                  }`}
                >
                  <span className="text-xs">{ec.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
