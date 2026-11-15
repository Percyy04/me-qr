import React from 'react';
import { QRInputs, QRType, getFormVariant } from '../../types/qr.types';
import { FormALinkRouting } from './forms/FormALinkRouting';
import { FormBFileMedia } from './forms/FormBFileMedia';
import { FormCVCard } from './forms/FormCVCard';
import { FormDWifiWhatsApp } from './forms/FormDWifiWhatsApp';
import { useLanguage } from '../../context/LanguageContext';

interface Step2Props {
  type: QRType;
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const Step2ContentWrapper: React.FC<Step2Props> = ({ type, inputs, onChange }) => {
  const { t } = useLanguage();
  const variant = getFormVariant(type);

  const renderActiveForm = () => {
    switch (variant) {
      case 'form-a':
        return <FormALinkRouting inputs={inputs} onChange={onChange} />;
      case 'form-b':
        return <FormBFileMedia inputs={inputs} onChange={onChange} />;
      case 'form-c':
        return <FormCVCard inputs={inputs} onChange={onChange} />;
      case 'form-d':
      default:
        return <FormDWifiWhatsApp type={type} inputs={inputs} onChange={onChange} />;
    }
  };

  const getVariantTitle = () => {
    switch (variant) {
      case 'form-a':
        return t('step2UrlDesc');
      case 'form-b':
        return t('step2FileDesc');
      case 'form-c':
        return t('step2VcardDesc');
      case 'form-d':
        return type === 'wifi' ? t('step2WifiDesc') : t('step2DirectDesc');
    }
  };

  return (
    <section className="bg-surface-card rounded-2xl border border-border-subtle p-6 shadow-subtle transition-all">
      {/* Header with Step 2 Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-sm shadow-sm">
            2
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-text-strong font-display">
              {t('step2Title')}
            </h2>
            <p className="text-xs text-slate-text-muted">{getVariantTitle()}</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-tint text-primary-container border border-indigo-200">
          {variant.toUpperCase()}
        </span>
      </div>

      {/* Conditional Rendering of 1 Form Variant */}
      {renderActiveForm()}
    </section>
  );
};
