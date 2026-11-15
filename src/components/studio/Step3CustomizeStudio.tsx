import React, { useState } from 'react';
import { QRDesign } from '../../types/qr.types';
import { FrameTab } from './customize/FrameTab';
import { PatternEyeTab } from './customize/PatternEyeTab';
import { ColorTab } from './customize/ColorTab';
import { LogoTab } from './customize/LogoTab';
import { PRESET_LOGOS } from '../../data/presetLogos';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Paintbrush } from 'lucide-react';

interface Step3Props {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
  onReset: () => void;
}

type TabKey = 'frames' | 'patterns' | 'logo' | 'colors';

export const Step3CustomizeStudio: React.FC<Step3Props> = ({ design, onChange, onReset }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('frames');
  const [styleMode, setStyleMode] = useState<'classic' | 'logo'>('classic');

  const handleSelectMode = (mode: 'classic' | 'logo') => {
    setStyleMode(mode);
    if (mode === 'logo') {
      setActiveTab('logo');
      const fb = PRESET_LOGOS.find((l) => l.id === 'facebook') || PRESET_LOGOS[0];
      onChange({
        ...design,
        mode: 'logo',
        frame: { ...design.frame, id: 'none' },
        logo: {
          ...design.logo,
          url: design.logo.url || fb.dataUrl,
          size: design.logo.size >= 0.4 ? design.logo.size : 0.75,
        },
      });
    } else {
      setActiveTab('frames');
      onChange({ ...design, mode: 'classic' });
    }
  };

  const tabs: TabKey[] = styleMode === 'logo'
    ? ['logo', 'colors']
    : ['frames', 'patterns', 'logo', 'colors'];

  const tabLabels: Record<TabKey, string> = {
    frames: t('tabFrame'),
    patterns: t('tabShape'),
    logo: t('tabLogoShort'),
    colors: t('tabLevel'),
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs transition-all">
      {/* Header with Dark Circle 2 & "Tùy chỉnh" */}
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
        <span className="w-6 h-6 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-xs shrink-0">
          2
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          {t('step3Title')}
        </h2>
      </div>

      {/* Two Large Style Cards: Classic QR vs Logo QR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={() => handleSelectMode('classic')}
          className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
            styleMode === 'classic'
              ? 'bg-[#F5E7F8] border-[#E9D5FF] shadow-xs'
              : 'bg-[#F8FAFC] border-slate-200 hover:border-purple-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              styleMode === 'classic' ? 'border-[#9333EA]' : 'border-slate-300'
            }`}>
              {styleMode === 'classic' && <span className="w-2 h-2 rounded-full bg-[#9333EA]" />}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {t('classicQr')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 opacity-90">
            <div className="w-5 h-5 rounded border border-cyan-400 bg-cyan-50 flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-cyan-600 rounded-xs" />
            </div>
            <div className="w-5 h-5 rounded border border-rose-400 bg-rose-50 flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-xs" />
            </div>
            <div className="w-5 h-5 rounded border border-purple-400 bg-purple-50 flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-purple-600 rounded-xs" />
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleSelectMode('logo')}
          className="p-3.5 rounded-xl bg-gradient-to-r from-[#3B0764] via-[#7E22CE] to-[#E11D48] text-white flex items-center justify-between text-left transition-all shadow-xs hover:opacity-95 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              styleMode === 'logo' ? 'border-white' : 'border-white/60'
            }`}>
              {styleMode === 'logo' && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
              {t('logoQr')}
              <Sparkles size={14} className="text-amber-300" />
              <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                {t('badgeNew')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <div className="w-5 h-5 rounded-full bg-[#00704A] border border-white/40 flex items-center justify-center text-[8px] font-black text-white">
              S
            </div>
            <div className="w-5 h-5 rounded-full bg-[#D62300] border border-white/40 flex items-center justify-center text-[8px] font-black text-amber-300">
              BK
            </div>
            <div className="w-5 h-5 rounded-full bg-[#351C15] border border-white/40 flex items-center justify-center text-[8px] font-black text-amber-400">
              UPS
            </div>
          </div>
        </button>
      </div>

      {/* Sub-Tabs: Logo, Màu sắc (in logo mode) or Khung, Hình dạng, Logo, Màu sắc (in classic) */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tabKey) => {
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F5E7F8] text-[#9333EA]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tabLabels[tabKey]}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-purple-600 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-purple-50"
        >
          <Paintbrush size={13} />
          <span>{t('resetBtn')}</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'frames' && <FrameTab design={design} onChange={onChange} />}
        {activeTab === 'patterns' && <PatternEyeTab design={design} onChange={onChange} />}
        {activeTab === 'logo' && <LogoTab design={design} onChange={onChange} />}
        {activeTab === 'colors' && <ColorTab design={design} onChange={onChange} />}
      </div>
    </section>
  );
};
