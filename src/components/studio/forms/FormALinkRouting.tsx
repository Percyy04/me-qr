import React, { useState } from 'react';
import { QRInputs } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';
import { Globe, Sliders, CheckCircle2 } from 'lucide-react';

interface FormAProps {
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const FormALinkRouting: React.FC<FormAProps> = ({ inputs, onChange }) => {
  const { t } = useLanguage();
  const [showUtm, setShowUtm] = useState(false);

  return (
    <div className="space-y-4">
      {/* Target URL */}
      <div>
        <label className="block text-xs font-bold text-slate-text-strong mb-1.5">
          {t('targetUrl')} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Globe size={16} />
          </div>
          <input
            type="url"
            value={inputs.url}
            onChange={(e) => onChange({ ...inputs, url: e.target.value })}
            placeholder={t('targetUrlPlaceholder')}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container focus:bg-white transition-all font-mono"
          />
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-text-muted">
          <CheckCircle2 size={12} className="text-secondary-cta" />
          <span>{t('urlHelper')}</span>
        </div>
      </div>

      {/* UTM Builder Toggle */}
      <div className="pt-2 border-t border-border-subtle">
        <button
          type="button"
          onClick={() => setShowUtm(!showUtm)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary-container hover:underline cursor-pointer"
        >
          <Sliders size={14} />
          <span>{showUtm ? t('utmHide') : t('utmShow')}</span>
        </button>

        {showUtm && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 p-3 bg-canvas-bg rounded-xl border border-border-subtle">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                {t('utmSource')}
              </label>
              <input
                type="text"
                value={inputs.utmSource || ''}
                onChange={(e) => onChange({ ...inputs, utmSource: e.target.value })}
                placeholder="qr-flyer"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                {t('utmMedium')}
              </label>
              <input
                type="text"
                value={inputs.utmMedium || ''}
                onChange={(e) => onChange({ ...inputs, utmMedium: e.target.value })}
                placeholder="print"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                {t('utmCampaign')}
              </label>
              <input
                type="text"
                value={inputs.utmCampaign || ''}
                onChange={(e) => onChange({ ...inputs, utmCampaign: e.target.value })}
                placeholder="summer-promo"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
