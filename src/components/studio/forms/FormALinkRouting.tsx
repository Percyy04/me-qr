import React, { useState } from 'react';
import { QRInputs } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';
import { Sliders, Crown, Info } from 'lucide-react';

interface FormAProps {
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const FormALinkRouting: React.FC<FormAProps> = ({ inputs, onChange }) => {
  const { t } = useLanguage();
  const [showUtm, setShowUtm] = useState(false);
  const [isStatic, setIsStatic] = useState(false);
  const isEmpty = !inputs.url.trim();

  return (
    <div className="space-y-4">
      {/* Target URL Input matching reference UI */}
      <div>
        <input
          type="url"
          value={inputs.url}
          onChange={(e) => onChange({ ...inputs, url: e.target.value })}
          placeholder={t('urlPlaceholderMeQr')}
          className={`w-full px-4 py-3 text-xs sm:text-sm bg-white border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${isEmpty
              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
            }`}
        />
        {isEmpty && (
          <p className="text-xs text-rose-500 mt-1.5 font-medium">
            {t('urlEmptyWarning')}
          </p>
        )}
      </div>

      {/* Static QR Checkbox & Premium Upsell Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isStatic}
            onChange={(e) => setIsStatic(e.target.checked)}
            className="w-3.5 h-3.5 text-purple-600 rounded border-slate-300 focus:ring-purple-400"
          />
          <span>{t('staticQr')}</span>
          <Info size={13} className="text-slate-400" />
        </label>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] border border-purple-200 text-[#9333EA] text-[11px] font-medium shadow-2xs">
          <Crown size={13} className="text-purple-600" />
          <span>{t('staticQrPremium')}</span>
        </div>
      </div>

      {/* UTM Parameters Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowUtm(!showUtm)}
          className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 cursor-pointer"
        >
          <Sliders size={13} />
          <span>{showUtm ? t('utmHide') : t('utmShow')}</span>
        </button>

        {showUtm && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                {t('utmSource')}
              </label>
              <input
                type="text"
                value={inputs.utmSource || ''}
                onChange={(e) => onChange({ ...inputs, utmSource: e.target.value })}
                placeholder="qr-flyer"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-purple-500"
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
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-purple-500"
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
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
