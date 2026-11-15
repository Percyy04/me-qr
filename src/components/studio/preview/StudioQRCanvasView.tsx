import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QRDesign } from '../../../types/qr.types';
import { QrFrameWrapper } from '../../customizer/QrFrameWrapper';
import {
  exportHighResPNG, exportHighResSVG,
  renderHighResCanvas, exportPDF, copyCanvasToClipboard,
} from '../../../utils/exportHelper';
import { ENV } from '../../../config/env';
import { useScannability } from '../../../hooks/useScannability';
import { useLanguage } from '../../../context/LanguageContext';
import { Download, Copy, Check, Loader2, ChevronDown } from 'lucide-react';

interface Props {
  payload: string;
  design: QRDesign;
  onAutoFix?: () => void;
}

export const StudioQRCanvasView: React.FC<Props> = ({ payload, design, onAutoFix }) => {
  const { t } = useLanguage();
  const hiddenRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [format, setFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  const [size, setSize] = useState<number>(1000);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const scannability = useScannability(previewRef.current, design);

  const buildOptions = (s: number): Options => ({
    width: s,
    height: s,
    data: payload || ENV.defaultQrUrl,
    dotsOptions: {
      type: design.dots.type,
      color: design.dots.color,
      gradient: design.dots.gradient.enabled ? {
        type: design.dots.gradient.type,
        rotation: (design.dots.gradient.rotation * Math.PI) / 180,
        colorStops: [{ offset: 0, color: design.dots.gradient.startColor }, { offset: 1, color: design.dots.gradient.endColor }],
      } : undefined,
    },
    cornersSquareOptions: { type: design.cornersSquare.type, color: design.cornersSquare.customColor ? design.cornersSquare.color : design.dots.color },
    cornersDotOptions: { type: design.cornersDot.type, color: design.cornersDot.customColor ? design.cornersDot.color : design.dots.color },
    backgroundOptions: { color: design.background.isTransparent ? 'rgba(0,0,0,0)' : design.background.color },
    image: design.logo.url || undefined,
    imageOptions: { hideBackgroundDots: design.logo.hideBackgroundDots, imageSize: design.logo.size, margin: design.logo.margin, crossOrigin: 'anonymous' },
    qrOptions: { errorCorrectionLevel: design.logo.url ? 'H' : 'Q' },
  });

  useEffect(() => {
    if (!hiddenRef.current) return;
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(buildOptions(400));
      hiddenRef.current.innerHTML = '';
      qrRef.current.append(hiddenRef.current);
    } else {
      qrRef.current.update(buildOptions(400));
    }
    const timer = setTimeout(() => {
      const raw = hiddenRef.current?.querySelector('canvas');
      if (raw && previewRef.current) {
        previewRef.current.width = raw.width;
        previewRef.current.height = raw.height;
        previewRef.current.getContext('2d')?.drawImage(raw, 0, 0);
      }
    }, 40);
    return () => clearTimeout(timer);
  }, [payload, design]);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      if (format === 'png') await exportHighResPNG(frameRef.current, buildOptions, size, 'quickqr-code.png');
      else if (format === 'pdf') {
        const c = await renderHighResCanvas(frameRef.current, buildOptions, size);
        if (c) exportPDF(c, 'quickqr-document.pdf');
      } else if (format === 'svg') await exportHighResSVG(frameRef.current, buildOptions, size, 'quickqr-vector.svg');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    const c = await renderHighResCanvas(frameRef.current, buildOptions, 1000);
    const target = c || previewRef.current;
    if (target && await copyCanvasToClipboard(target)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={hiddenRef} className="hidden" />

      {/* Canvas Area */}
      <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/80 flex flex-col items-center justify-center relative shadow-2xs">
        <div ref={frameRef} className="w-full max-w-[240px] flex flex-col items-center">
          <QrFrameWrapper
            frameId={design.frame.id}
            labelText={design.frame.text}
            primaryColor={design.frame.frameColor || design.dots.color}
            secondaryColor={design.cornersDot.color || '#10B981'}
            bgColor={design.background.color}
          >
            <canvas ref={previewRef} className="w-[190px] h-[190px] object-contain" />
          </QrFrameWrapper>
        </div>

        {/* Diagnostic Bar */}
        <div className="mt-2.5 flex items-center justify-between w-full px-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${scannability.isScannable ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="font-semibold text-slate-700">
              {scannability.isScannable ? t('scannable100') : t('contrastWarning')}
            </span>
            {!scannability.isScannable && onAutoFix && (
              <button
                type="button"
                onClick={onAutoFix}
                className="text-[10px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded cursor-pointer"
              >
                {t('autoFix')}
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-purple-600 font-semibold hover:underline cursor-pointer"
          >
            {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span>{copied ? t('copied') : t('copy')}</span>
          </button>
        </div>
      </div>

      {/* Format & Size Selectors matching Reference Layout */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">{t('format')}</label>
          <div className="relative">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as 'png' | 'svg' | 'pdf')}
              className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:border-purple-500"
            >
              <option value="png">PNG</option>
              <option value="svg">SVG</option>
              <option value="pdf">PDF</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">{t('size')}</label>
          <div className="relative">
            <select
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:border-purple-500"
            >
              <option value="500">500x500 px</option>
              <option value="1000">1000x1000 px</option>
              <option value="2000">2000x2000 px</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Big Download Button */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isExporting}
        className="w-full py-3 px-4 rounded-xl bg-[#9333EA] hover:bg-[#7E22CE] disabled:opacity-60 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} strokeWidth={2.2} />}
        <span>{isExporting ? t('generating') : t('downloadBtn')}</span>
      </button>

      {/* Legal & Free Disclaimer matching Reference Text */}
      <p className="text-[10px] text-slate-500 text-center leading-relaxed px-1">
        {t('termsDisclaimerPrefix')}{' '}
        <span className="text-[#9333EA] underline cursor-pointer font-medium">{t('termsAndConditions')}</span>.{' '}
        {t('termsDisclaimerSuffix')}
      </p>
    </div>
  );
};
