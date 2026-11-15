import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QRDesign } from '../../../types/qr.types';
import { QrFrameWrapper } from '../../customizer/QrFrameWrapper';
import {
  exportHighResPNG,
  exportHighResSVG,
  renderHighResCanvas,
  exportPDF,
  copyCanvasToClipboard,
} from '../../../utils/exportHelper';
import { ENV } from '../../../config/env';
import { useScannability } from '../../../hooks/useScannability';
import { Download, Copy, Check, Loader2 } from 'lucide-react';

interface Props {
  payload: string;
  design: QRDesign;
  onAutoFix?: () => void;
}

export const StudioQRCanvasView: React.FC<Props> = ({ payload, design, onAutoFix }) => {
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
      gradient: design.dots.gradient.enabled
        ? {
            type: design.dots.gradient.type,
            rotation: (design.dots.gradient.rotation * Math.PI) / 180,
            colorStops: [{ offset: 0, color: design.dots.gradient.startColor }, { offset: 1, color: design.dots.gradient.endColor }],
          }
        : undefined,
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

    const t = setTimeout(() => {
      const raw = hiddenRef.current?.querySelector('canvas');
      if (raw && previewRef.current) {
        previewRef.current.width = raw.width;
        previewRef.current.height = raw.height;
        previewRef.current.getContext('2d')?.drawImage(raw, 0, 0);
      }
    }, 40);
    return () => clearTimeout(t);
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
    if (!target) return;
    if (await copyCanvasToClipboard(target)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3.5">
      <div ref={hiddenRef} className="hidden" />

      {/* Checkered Canvas Stage with Dynamic SVG Frame Wrapper */}
      <div className="bg-gradient-to-b from-indigo-tint/30 to-canvas-bg rounded-xl p-3 sm:p-4 border border-border-subtle flex flex-col items-center justify-center relative shadow-inner">
        <div ref={frameRef} className="w-full max-w-[260px] flex flex-col items-center">
          <QrFrameWrapper
            frameId={design.frame.id}
            labelText={design.frame.text}
            primaryColor={design.frame.frameColor || design.dots.color}
            secondaryColor={design.cornersDot.color || '#10B981'}
            bgColor={design.background.color}
          >
            <canvas ref={previewRef} className="w-[200px] h-[200px] object-contain" />
          </QrFrameWrapper>
        </div>

        {/* Diagnostic Bar */}
        <div className="mt-2.5 flex items-center justify-between w-full px-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${scannability.isScannable ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
            <span className="font-semibold text-slate-700">{scannability.isScannable ? '100% Scannable' : 'Contrast Warning'}</span>
            {!scannability.isScannable && onAutoFix && (
              <button type="button" onClick={onAutoFix} className="text-[10px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded cursor-pointer">
                Auto-Fix
              </button>
            )}
          </div>
          <button type="button" onClick={handleCopy} className="flex items-center gap-1 text-[11px] text-primary-container font-semibold hover:underline cursor-pointer">
            {copied ? <Check size={12} className="text-secondary-cta" /> : <Copy size={12} />}
            <span>{copied ? 'Đã sao chép' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Format & Size Selectors matching ME-QR */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Định dạng</label>
          <select value={format} onChange={(e) => setFormat(e.target.value as 'png' | 'svg' | 'pdf')} className="w-full px-2.5 py-1.5 bg-canvas-bg border border-border-subtle rounded-lg text-slate-700 font-semibold">
            <option value="png">PNG (Raster)</option>
            <option value="svg">SVG (Vector)</option>
            <option value="pdf">PDF (Print)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Kích thước</label>
          <select value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} className="w-full px-2.5 py-1.5 bg-canvas-bg border border-border-subtle rounded-lg text-slate-700 font-semibold">
            <option value="500">500x500 px</option>
            <option value="1000">1000x1000 px</option>
            <option value="2000">2000x2000 px</option>
          </select>
        </div>
      </div>

      {/* Big Emerald CTA */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={isExporting}
        className="w-full py-3 px-4 rounded-xl bg-secondary-cta hover:bg-emerald-600 disabled:opacity-75 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} strokeWidth={2.5} />}
        <span>{isExporting ? 'Đang tạo file chất lượng cao...' : 'Tải xuống MÃ QR'}</span>
      </button>

      {/* Legal & Free Disclaimer */}
      <p className="text-[10px] text-slate-400 text-center leading-relaxed px-1">
        Bằng cách nhấp vào "Tải xuống MÃ QR" bạn đồng ý với <a href="#terms" className="text-primary-container underline hover:text-indigo-800">Điều khoản & Điều kiện</a>. Phiên bản miễn phí có chứa quảng cáo.
      </p>
    </div>
  );
};
