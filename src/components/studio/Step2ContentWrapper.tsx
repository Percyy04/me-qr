import React from 'react';
import { QRInputs, QRType, getFormVariant } from '../../types/qr.types';
import { FormALinkRouting } from './forms/FormALinkRouting';
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
      case 'form-c':
        return <FormCVCard inputs={inputs} onChange={onChange} />;
      case 'form-d':
      default:
        return <FormDWifiWhatsApp type={type} inputs={inputs} onChange={onChange} />;
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs transition-all">
      {/* Header with Dark Circle 1 & "Thêm nội dung" */}
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
        <span className="w-6 h-6 rounded-full bg-[#1E293B] text-white flex items-center justify-center font-bold text-xs shrink-0">
          1
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          {t('step2Title')}
        </h2>
      </div>

      {/* Dynamic Content Form */}
      {renderActiveForm()}
    </section>
  );
};
