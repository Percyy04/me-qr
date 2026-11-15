import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QRDesign } from '../../../types/qr.types';
import { QrFrameWrapper } from '../../customizer/QrFrameWrapper';
import { generateQRMatrix } from '../../../utils/qrMatrixHelper';
import {
  renderHalftoneQRToCanvas, exportHalftonePNG, exportHalftoneSVG,
} from '../../../utils/halftoneQrRenderer';
import {
  exportHighResPNG, exportHighResSVG, renderHighResCanvas, exportPDF, copyCanvasToClipboard,
} from '../../../utils/exportHelper';
import { ENV } from '../../../config/env';
import { useScannability } from '../../../hooks/useScannability';
import { useLanguage } from '../../../context/LanguageContext';
import { Download, Copy, Check, Loader2, ChevronDown, CheckCircle2, Printer } from 'lucide-react';

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
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [format, setFormat] = useState<'png' | 'svg' | 'pdf'>('png');
  const [size, setSize] = useState<number>(1000);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const scannability = useScannability(previewRef.current, design);
  const isHalftone = design.mode === 'logo' && Boolean(design.logo.url);

  useEffect(() => {
    if (!design.logo.url) { setLogoImg(null); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setLogoImg(img);
    img.src = design.logo.url;
  }, [design.logo.url]);

  const buildOptions = (s: number): Options => ({
    width: s, height: s, data: payload || ENV.defaultQrUrl,
    dotsOptions: {
      type: design.dots.type, color: design.dots.color,
      gradient: design.dots.gradient.enabled ? {
        type: design.dots.gradient.type, rotation: (design.dots.gradient.rotation * Math.PI) / 180,
        colorStops: [{ offset: 0, color: design.dots.gradient.startColor }, { offset: 1, color: design.dots.gradient.endColor }],
      } : undefined,
    },
    cornersSquareOptions: { type: design.cornersSquare.type, color: design.cornersSquare.customColor ? design.cornersSquare.color : design.dots.color },
    cornersDotOptions: { type: design.cornersDot.type, color: design.cornersDot.customColor ? design.cornersDot.color : design.dots.color },
    backgroundOptions: { color: design.background.isTransparent ? 'rgba(0,0,0,0)' : design.background.color },
    image: design.logo.url || undefined,
    imageOptions: { hideBackgroundDots: design.logo.hideBackgroundDots, imageSize: design.logo.size, margin: design.logo.margin, crossOrigin: 'anonymous' },
    qrOptions: { errorCorrectionLevel: 'H' },
  });

  useEffect(() => {
    if (isHalftone && previewRef.current) {
      const matrix = generateQRMatrix(payload, 'H');
      renderHalftoneQRToCanvas(previewRef.current, matrix, logoImg, {
        size: 400, logoScale: design.logo.size || 0.75,
        darkColor: design.dots.color || '#000000', lightColor: design.background.color || '#ffffff',
      });
      return;
    }
    if (!hiddenRef.current) return;
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(buildOptions(400));
      hiddenRef.current.innerHTML = '';
      qrRef.current.append(hiddenRef.current);
    } else qrRef.current.update(buildOptions(400));

    const timer = setTimeout(() => {
      const raw = hiddenRef.current?.querySelector('canvas');
      if (raw && previewRef.current) {
        previewRef.current.width = raw.width; previewRef.current.height = raw.height;
        previewRef.current.getContext('2d')?.drawImage(raw, 0, 0);
      }
    }, 40);
    return () => clearTimeout(timer);
  }, [payload, design, isHalftone, logoImg]);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      if (isHalftone) {
        const matrix = generateQRMatrix(payload, 'H');
        const opt = { size, logoScale: design.logo.size || 0.75, darkColor: design.dots.color || '#000000', lightColor: design.background.color || '#ffffff' };
        if (format === 'png') await exportHalftonePNG(matrix, logoImg, opt, 'halftone-qr.png');
        else if (format === 'svg') exportHalftoneSVG(matrix, logoImg, opt, 'halftone-qr.svg');
        else { const c = document.createElement('canvas'); renderHalftoneQRToCanvas(c, matrix, logoImg, opt); exportPDF(c, 'halftone-qr.pdf'); }
      } else {
        if (format === 'png') await exportHighResPNG(frameRef.current, buildOptions, size, 'quickqr-code.png');
        else if (format === 'pdf') { const c = await renderHighResCanvas(frameRef.current, buildOptions, size); if (c) exportPDF(c, 'quickqr-document.pdf'); }
        else if (format === 'svg') await exportHighResSVG(frameRef.current, buildOptions, size, 'quickqr-vector.svg');
      }
    } finally { setIsExporting(false); }
  };

  const handleCopy = async () => {
    if (previewRef.current && await copyCanvasToClipboard(previewRef.current)) {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3.5">
      <div ref={hiddenRef} className="hidden" />
      <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-200/80 flex flex-col items-center justify-center relative shadow-2xs">
        <div ref={frameRef} className="w-full max-w-[240px] flex flex-col items-center">
          <QrFrameWrapper frameId={isHalftone ? 'none' : design.frame.id} labelText={design.frame.text} primaryColor={design.frame.frameColor || design.dots.color} secondaryColor={design.cornersDot.color || '#10B981'} bgColor={design.background.color}>
            <canvas ref={previewRef} className="w-[190px] h-[190px] object-contain" />
          </QrFrameWrapper>
        </div>
        <button type="button" onClick={handleCopy} className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] text-purple-600 font-semibold hover:underline cursor-pointer bg-white/90 px-2 py-1 rounded-md border border-slate-200/60 shadow-2xs">
          {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}<span>{copied ? t('copied') : t('copy')}</span>
        </button>
      </div>

      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${scannability.isScannable ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
        <CheckCircle2 size={15} className={scannability.isScannable ? 'text-emerald-600 shrink-0' : 'text-amber-600 shrink-0'} />
        <span>{scannability.isScannable ? t('qrGreatScannable') : t('contrastWarning')}</span>
        {!scannability.isScannable && onAutoFix && <button type="button" onClick={onAutoFix} className="ml-auto text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded cursor-pointer">{t('autoFix')}</button>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">{t('format')}</label>
          <div className="relative">
            <select value={format} onChange={(e) => setFormat(e.target.value as 'png' | 'svg' | 'pdf')} className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:border-purple-500">
              <option value="png">PNG</option><option value="svg">SVG</option><option value="pdf">PDF</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">{t('size')}</label>
          <div className="relative">
            <select value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:border-purple-500">
              <option value="500">500x500 px</option><option value="1000">1000x1000 px</option><option value="2000">2000x2000 px</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <button type="button" onClick={handleDownload} disabled={isExporting} className="w-full py-3 px-4 rounded-xl bg-[#9333EA] hover:bg-[#7E22CE] disabled:opacity-60 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} strokeWidth={2.2} />}<span>{isExporting ? t('generating') : t('downloadBtn')}</span>
      </button>

      <p className="text-[10px] text-slate-500 text-center leading-relaxed px-1">
        {t('termsDisclaimerPrefix')} <span className="text-[#9333EA] underline cursor-pointer font-medium">{t('termsAndConditions')}</span>. {t('termsDisclaimerSuffix')}
      </p>

      <div className="text-center pt-0.5">
        <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9333EA] hover:text-purple-700 transition-colors cursor-pointer">
          <Printer size={13} /><span>{t('printQr')}</span><span className="bg-purple-100 text-[#9333EA] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">{t('badgeNew')}</span>
        </button>
      </div>
    </div>
  );
};
