import React, { useState } from 'react';
import { QRDesign } from '../../types/qr.types';
import { FrameTab } from './customize/FrameTab';
import { PatternEyeTab } from './customize/PatternEyeTab';
import { ColorTab } from './customize/ColorTab';
import { LogoTab } from './customize/LogoTab';
import { useLanguage } from '../../context/LanguageContext';
import { Crop, Grid, Palette, Image, RotateCcw } from 'lucide-react';

interface Step3Props {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
  onReset: () => void;
}

type TabKey = 'frames' | 'patterns' | 'colors' | 'logo';

export const Step3CustomizeStudio: React.FC<Step3Props> = ({ design, onChange, onReset }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('frames');

  const applyPreset = (presetName: string) => {
    if (presetName === 'minimal') {
      onChange({
        ...design,
        dots: {
          type: 'rounded',
          color: '#4F46E5',
          gradient: { enabled: false, type: 'linear', rotation: 45, startColor: '#4F46E5', endColor: '#10B981' },
        },
        cornersSquare: { type: 'extra-rounded', color: '#4F46E5', customColor: false },
        cornersDot: { type: 'dot', color: '#4F46E5', customColor: false },
        background: { color: '#FFFFFF', isTransparent: false },
      });
    } else if (presetName === 'vibrant') {
      onChange({
        ...design,
        dots: {
          type: 'dots',
          color: '#4F46E5',
          gradient: { enabled: true, type: 'linear', rotation: 135, startColor: '#4F46E5', endColor: '#10B981' },
        },
        cornersSquare: { type: 'dot', color: '#10B981', customColor: true },
        cornersDot: { type: 'dot', color: '#4F46E5', customColor: true },
        background: { color: '#FFFFFF', isTransparent: false },
      });
    } else if (presetName === 'dark') {
      onChange({
        ...design,
        dots: {
          type: 'classy',
          color: '#0F172A',
          gradient: { enabled: false, type: 'linear', rotation: 0, startColor: '#0F172A', endColor: '#334155' },
        },
        cornersSquare: { type: 'square', color: '#0F172A', customColor: false },
        cornersDot: { type: 'square', color: '#0F172A', customColor: false },
        background: { color: '#FFFFFF', isTransparent: false },
      });
    }
  };

  return (
    <section className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-subtle transition-all">
      {/* Header with Step 3 Badge & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-sm shadow-sm">
            3
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-text-strong font-display">
              {t('step3Title')}
            </h2>
            <p className="text-xs text-slate-text-muted">{t('step3Subtitle')}</p>
          </div>
        </div>

        {/* Quick Presets & Reset */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400">{t('presetsLabel')}</span>
          <button
            type="button"
            onClick={() => applyPreset('minimal')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-tint text-primary-container hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            {t('presetMinimal')}
          </button>
          <button
            type="button"
            onClick={() => applyPreset('vibrant')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-canvas-bg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            {t('presetVibrant')}
          </button>
          <button
            type="button"
            onClick={() => applyPreset('dark')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-canvas-bg hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            {t('presetDark')}
          </button>
          <button
            type="button"
            aria-label={t('resetDesign')}
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors ml-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-container"
            title={t('resetDesign')}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* 4 Customization Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-border-subtle mt-4">
        <button
          type="button"
          onClick={() => setActiveTab('frames')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer ${
            activeTab === 'frames'
              ? 'border-primary-container text-primary-container'
              : 'border-transparent text-slate-text-muted hover:text-slate-text-strong'
          }`}
        >
          <Crop size={14} />
          <span>{t('tabFrames')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('patterns')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer ${
            activeTab === 'patterns'
              ? 'border-primary-container text-primary-container'
              : 'border-transparent text-slate-text-muted hover:text-slate-text-strong'
          }`}
        >
          <Grid size={14} />
          <span>{t('tabPatterns')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer ${
            activeTab === 'colors'
              ? 'border-primary-container text-primary-container'
              : 'border-transparent text-slate-text-muted hover:text-slate-text-strong'
          }`}
        >
          <Palette size={14} />
          <span>{t('tabColors')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`flex items-center gap-2 px-3 py-2.5 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer ${
            activeTab === 'logo'
              ? 'border-primary-container text-primary-container'
              : 'border-transparent text-slate-text-muted hover:text-slate-text-strong'
          }`}
        >
          <Image size={14} />
          <span>{t('tabLogo')}</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className="pt-4">
        {activeTab === 'frames' && <FrameTab design={design} onChange={onChange} />}
        {activeTab === 'patterns' && <PatternEyeTab design={design} onChange={onChange} />}
        {activeTab === 'colors' && <ColorTab design={design} onChange={onChange} />}
        {activeTab === 'logo' && <LogoTab design={design} onChange={onChange} />}
      </div>
    </section>
  );
};
