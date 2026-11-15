import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QRDesign } from '../../../types/qr.types';
import { renderCompositedCanvas, preloadTemplateImage } from '../../../utils/frameRenderer';
import { exportPNG, exportPDF, copyCanvasToClipboard } from '../../../utils/exportHelper';
import { useScannability } from '../../../hooks/useScannability';
import { ScannabilityIndicator } from './ScannabilityIndicator';
import { PreMadeTemplatesModal } from '../templates/PreMadeTemplatesModal';
import { DesignAccordion } from './DesignAccordion';
import { DownloadButtonGroup } from './DownloadButtonGroup';
import { Sparkles } from 'lucide-react';
interface LivePreviewCardProps {
  payload: string;
  design: QRDesign;
  onChangeDesign: (design: QRDesign) => void;
  onRecordHistory?: (thumb: string) => void;
}
export const LivePreviewCard: React.FC<LivePreviewCardProps> = ({
  payload,
  design,
  onChangeDesign,
  onRecordHistory,
}) => {
  const hiddenContainerRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const scannability = useScannability(previewCanvasRef.current);
  const buildOptions = (size: number): Options => ({
    width: size,
    height: size,
    data: payload || 'https://me-qr.com',
    dotsOptions: {
      type: design.dots.type,
      color: design.dots.color,
      gradient: design.dots.gradient.enabled
        ? {
            type: design.dots.gradient.type,
            rotation: (design.dots.gradient.rotation * Math.PI) / 180,
            colorStops: [
              { offset: 0, color: design.dots.gradient.startColor },
              { offset: 1, color: design.dots.gradient.endColor },
            ],
          }
        : undefined,
    },
    cornersSquareOptions: {
      type: design.cornersSquare.type,
      color: design.cornersSquare.customColor ? design.cornersSquare.color : design.dots.color,
    },
    cornersDotOptions: {
      type: design.cornersDot.type,
      color: design.cornersDot.customColor ? design.cornersDot.color : design.dots.color,
    },
    backgroundOptions: {
      color: design.background.isTransparent ? 'rgba(0,0,0,0)' : design.background.color,
    },
    image: design.logo.url || undefined,
    imageOptions: {
      hideBackgroundDots: design.logo.hideBackgroundDots,
      imageSize: design.logo.size,
      margin: design.logo.margin,
      crossOrigin: 'anonymous',
    },
    qrOptions: {
      errorCorrectionLevel: design.errorCorrectionLevel || (design.logo.url ? 'H' : 'Q'),
    },
  });
  useEffect(() => {
    if (!hiddenContainerRef.current) return;
    if (!qrInstanceRef.current) {
      qrInstanceRef.current = new QRCodeStyling(buildOptions(280));
      hiddenContainerRef.current.innerHTML = '';
      qrInstanceRef.current.append(hiddenContainerRef.current);
    } else {
      qrInstanceRef.current.update(buildOptions(280));
    }
    const timer = setTimeout(async () => {
      let tplImg: HTMLImageElement | null = null;
      if (design.frame.templateUrl) {
        tplImg = await preloadTemplateImage(design.frame.templateUrl);
      }
      const raw = hiddenContainerRef.current?.querySelector('canvas');
      if (raw && previewCanvasRef.current) {
        const comp = renderCompositedCanvas(raw, design.frame, tplImg);
        const p = previewCanvasRef.current;
        p.width = comp.width;
        p.height = comp.height;
        const ctx = p.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, p.width, p.height);
          ctx.drawImage(comp, 0, 0);
        }
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [payload, design]);
  const recordCurrent = () => {
    if (previewCanvasRef.current && onRecordHistory) {
      onRecordHistory(previewCanvasRef.current.toDataURL('image/png', 0.6));
    }
  };
  const handleDownloadPNG = async (size: number) => {
    recordCurrent();
    const tempDiv = document.createElement('div');
    const exportQR = new QRCodeStyling(buildOptions(size));
    exportQR.append(tempDiv);
    let tplImg: HTMLImageElement | null = null;
    if (design.frame.templateUrl) {
      tplImg = await preloadTemplateImage(design.frame.templateUrl);
    }
    setTimeout(() => {
      const raw = tempDiv.querySelector('canvas');
      if (raw) exportPNG(renderCompositedCanvas(raw, design.frame, tplImg), `me-qr-${size}px.png`);
    }, 100);
  };
  const handleDownloadSVG = async () => {
    recordCurrent();
    if (design.frame.id === 'none' && qrInstanceRef.current) {
      qrInstanceRef.current.download({ extension: 'svg', name: 'me-qr-code' });
    } else {
      handleDownloadPNG(1500);
    }
  };
  const handleDownloadPDF = async () => {
    recordCurrent();
    const tempDiv = document.createElement('div');
    const exportQR = new QRCodeStyling(buildOptions(1000));
    exportQR.append(tempDiv);
    let tplImg: HTMLImageElement | null = null;
    if (design.frame.templateUrl) {
      tplImg = await preloadTemplateImage(design.frame.templateUrl);
    }
    setTimeout(() => {
      const raw = tempDiv.querySelector('canvas');
      if (raw) exportPDF(renderCompositedCanvas(raw, design.frame, tplImg), 'me-qr-print.pdf');
    }, 100);
  };
  const handleCopyClipboard = async () => {
    if (!previewCanvasRef.current) return false;
    recordCurrent();
    return await copyCanvasToClipboard(previewCanvasRef.current);
  };
  const handleAutoFix = () => {
    onChangeDesign({
      ...design,
      dots: { ...design.dots, color: '#0F172A', gradient: { ...design.dots.gradient, enabled: false } },
      cornersSquare: { ...design.cornersSquare, color: '#0066FF' },
      cornersDot: { ...design.cornersDot, color: '#0066FF' },
      background: { color: '#FFFFFF', isTransparent: false },
      logo: { ...design.logo, size: 0.22, hideBackgroundDots: true },
    });
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-elevated">
      <div ref={hiddenContainerRef} className="hidden" aria-hidden="true" />
      {/* Button to open Pre-made Templates */}
      <button
        type="button"
        onClick={() => setIsTemplateModalOpen(true)}
        className="w-full mb-3.5 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/15 transition-all"
      >
        <Sparkles size={15} />
        <span>✨ Khám phá Mẫu phối sẵn ME-QR</span>
      </button>
      {/* Live Canvas View */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center border border-slate-150 min-h-[290px]">
        <div className="max-w-[280px] w-full flex items-center justify-center overflow-hidden transition-all duration-200">
          <canvas
            ref={previewCanvasRef}
            className="max-h-[330px] max-w-full h-auto object-contain rounded-xl shadow-preview transition-transform hover:scale-[1.02]"
          />
        </div>
        {/* Real-time Scannability indicator */}
        <ScannabilityIndicator status={scannability} onAutoFix={handleAutoFix} />
      </div>
      <DownloadButtonGroup
        onDownloadPNG={handleDownloadPNG}
        onDownloadSVG={handleDownloadSVG}
        onDownloadPDF={handleDownloadPDF}
        onCopyClipboard={handleCopyClipboard}
      />
      <DesignAccordion design={design} onChange={onChangeDesign} />
      <PreMadeTemplatesModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onApplyTemplate={onChangeDesign}
        currentDesign={design}
      />
    </div>
  );
};
