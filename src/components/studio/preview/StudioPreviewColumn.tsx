import React, { useState } from 'react';
import { QRDesign, QRInputs, QRType } from '../../../types/qr.types';
import { StudioQRCanvasView } from './StudioQRCanvasView';
import { StudioMobilePageView } from './StudioMobilePageView';
import { useLanguage } from '../../../context/LanguageContext';
import { QrCode, Smartphone } from 'lucide-react';

interface StudioPreviewColumnProps {
  type: QRType;
  payload: string;
  inputs: QRInputs;
  design: QRDesign;
  onAutoFix?: () => void;
}

export const StudioPreviewColumn: React.FC<StudioPreviewColumnProps> = ({
  type,
  payload,
  inputs,
  design,
  onAutoFix,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'qr' | 'mobile'>('qr');

  return (
    <aside className="w-full space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-none">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        {/* Step 3 Header: Circle 3 & "Tạo & tải QR" */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#1E293B] text-white text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {t('previewTitle')}
            </h3>
          </div>

          {/* Compact QR / Mobile switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'qr' ? 'bg-white text-purple-600 shadow-2xs font-bold' : 'text-slate-500'
              }`}
              title={t('tabQrCanvas')}
            >
              <QrCode size={14} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mobile')}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'mobile' ? 'bg-white text-purple-600 shadow-2xs font-bold' : 'text-slate-500'
              }`}
              title={t('tabMobilePage')}
            >
              <Smartphone size={14} />
            </button>
          </div>
        </div>

        {/* Active View Render */}
        {activeTab === 'qr' ? (
          <StudioQRCanvasView payload={payload} design={design} onAutoFix={onAutoFix} />
        ) : (
          <StudioMobilePageView type={type} inputs={inputs} />
        )}
      </div>
    </aside>
  );
};
