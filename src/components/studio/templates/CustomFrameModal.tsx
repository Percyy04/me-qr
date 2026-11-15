import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRDesign } from '../../../types/qr.types';
import { QrFrameTemplate } from '../../../types/qrFrame';
import { getFrameById } from '../../../constants/qrFrameRegistry';
import { QrFrameWrapper } from '../../customizer/QrFrameWrapper';
import { ModalCategoryAccordion } from './ModalCategoryAccordion';
import { Logo } from '../../common/Logo';
import { useLanguage } from '../../../context/LanguageContext';
import { X, Search } from 'lucide-react';

interface CustomFrameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDesign: QRDesign;
  onApply: (design: QRDesign) => void;
}

export const CustomFrameModal: React.FC<CustomFrameModalProps> = ({
  isOpen,
  onClose,
  currentDesign,
  onApply,
}) => {
  const { t } = useLanguage();
  const [staged, setStaged] = useState<QRDesign>(currentDesign);
  const [openCatId, setOpenCatId] = useState<string>('campus');
  const [search, setSearch] = useState('');
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (isOpen) setStaged(currentDesign);
  }, [isOpen, currentDesign]);

  // Live QR Generator inside Modal Safe-Zone
  useEffect(() => {
    if (!isOpen || !qrContainerRef.current) return;
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: 180,
        height: 180,
        data: 'https://me-qr.com/vi',
        dotsOptions: { type: staged.dots.type, color: staged.dots.color },
        cornersSquareOptions: { type: staged.cornersSquare.type, color: staged.cornersSquare.color },
        backgroundOptions: { color: staged.background.color },
      });
      qrContainerRef.current.innerHTML = '';
      qrRef.current.append(qrContainerRef.current);
    } else {
      qrRef.current.update({
        dotsOptions: { type: staged.dots.type, color: staged.dots.color },
        cornersSquareOptions: { type: staged.cornersSquare.type, color: staged.cornersSquare.color },
        backgroundOptions: { color: staged.background.color },
      });
    }
  }, [isOpen, staged.dots, staged.cornersSquare, staged.background]);

  const selectFrame = (frame: QrFrameTemplate) => {
    setStaged({
      ...staged,
      frame: {
        ...staged.frame,
        id: frame.id,
        templateUrl: null,
        text: frame.defaultLabel,
        frameColor: frame.defaultColors.primary,
        textColor: '#FFFFFF',
      },
      dots: {
        ...staged.dots,
        type: frame.defaultColors.dotsStyle,
        color: frame.defaultColors.primary,
      },
      cornersSquare: {
        type: frame.defaultColors.eyeStyle,
        color: frame.defaultColors.primary,
        customColor: true,
      },
      cornersDot: {
        type: 'dot',
        color: frame.defaultColors.secondary,
        customColor: true,
      },
    });
  };

  if (!isOpen) return null;

  const currentFrame = getFrameById(staged.frame.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">{t('customFrameModalTitle')}</h2>
              <p className="text-xs text-slate-500">{t('customFrameModalSubtitle')}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: Categories & Frame Grids */}
          <div className="w-full md:w-[62%] border-r border-slate-200 flex flex-col overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 bg-slate-50/60">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('searchFramePlaceholder')}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <ModalCategoryAccordion
              search={search}
              openCatId={openCatId}
              onToggleCat={setOpenCatId}
              selectedFrameId={staged.frame.id}
              onSelectFrame={selectFrame}
            />
          </div>

          {/* Right Column: Real-time Live QR Preview */}
          <div className="w-full md:w-[38%] bg-slate-50 p-6 flex flex-col items-center justify-center border-t md:border-t-0">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center max-w-[280px] w-full">
              <QrFrameWrapper
                frameId={staged.frame.id}
                labelText={staged.frame.text}
                primaryColor={staged.frame.frameColor || staged.dots.color}
                secondaryColor={staged.cornersDot.color}
                bgColor={staged.background.color}
              >
                <div ref={qrContainerRef} className="w-[180px] h-[180px] flex items-center justify-center" />
              </QrFrameWrapper>
              <div className="mt-3 text-center">
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  {currentFrame ? `${currentFrame.name} (${currentFrame.id})` : t('noFrameSelected')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(staged);
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            {t('apply')}
          </button>
        </div>
      </div>
    </div>
  );
};
