import React, { useRef, useState, useEffect } from 'react';
import { generateQRMatrix } from '../utils/qrMatrixHelper';
import { renderHalftoneQRToCanvas, exportHalftonePNG, exportHalftoneSVG } from '../utils/halftoneQrRenderer';
import { PRESET_LOGOS } from '../data/presetLogos';
import { Upload, X, CheckCircle2, Download, Sparkles } from 'lucide-react';

interface Props {
  payload: string;
  onClose?: () => void;
}

export const LogoQrCustomizer: React.FC<Props> = ({ payload }) => {
  const [mode, setMode] = useState<'classic' | 'logo'>('logo');
  const [logoScale, setLogoScale] = useState<number>(0.75);
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string>(PRESET_LOGOS[1].dataUrl); // Facebook default
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [resolution, setResolution] = useState<number>(1000);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!selectedLogoUrl) {
      setImgElement(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImgElement(img);
    img.src = selectedLogoUrl;
  }, [selectedLogoUrl]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const matrixData = generateQRMatrix(payload, 'H');
    renderHalftoneQRToCanvas(canvasRef.current, matrixData, mode === 'logo' ? imgElement : null, {
      size: 400,
      logoScale,
      dotScale: 0.36,
      darkColor: '#000000',
      lightColor: '#ffffff',
    });
  }, [payload, mode, logoScale, imgElement]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPNG = () => {
    const matrixData = generateQRMatrix(payload, 'H');
    exportHalftonePNG(matrixData, mode === 'logo' ? imgElement : null, {
      size: resolution,
      logoScale,
      dotScale: 0.36,
    }, 'halftone-logo-qr.png');
  };

  const handleDownloadSVG = () => {
    const matrixData = generateQRMatrix(payload, 'H');
    exportHalftoneSVG(matrixData, mode === 'logo' ? imgElement : null, {
      size: resolution,
      logoScale,
      dotScale: 0.36,
    }, 'halftone-logo-qr.svg');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs max-w-xl mx-auto space-y-4">
      {/* Mode Switcher */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
        <button
          type="button"
          onClick={() => setMode('classic')}
          className={`py-2 rounded-lg transition-all cursor-pointer ${mode === 'classic' ? 'bg-white text-purple-600 shadow-xs' : 'text-slate-600'}`}
        >
          Classic QR
        </button>
        <button
          type="button"
          onClick={() => setMode('logo')}
          className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${mode === 'logo' ? 'bg-white text-purple-600 shadow-xs' : 'text-slate-600'}`}
        >
          <Sparkles size={14} className="text-amber-500" />
          <span>Logo QR (Halftone)</span>
        </button>
      </div>

      {/* QR Canvas Preview */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col items-center justify-center">
        <canvas ref={canvasRef} className="w-[260px] h-[260px] object-contain shadow-xs rounded-lg bg-white" />
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
          <CheckCircle2 size={15} className="text-emerald-600" />
          <span>Tuyệt vời! Mã QR của bạn dễ quét.</span>
        </div>
      </div>

      {/* Logo Controls */}
      {mode === 'logo' && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">Kích thước biểu trưng (Logo Scale)</label>
            <span className="text-xs font-mono font-bold text-purple-600">{Math.round(logoScale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="0.85"
            step="0.02"
            value={logoScale}
            onChange={(e) => setLogoScale(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />

          {/* Preset Logos */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              type="button"
              onClick={() => setSelectedLogoUrl('')}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${!selectedLogoUrl ? 'border-purple-600 ring-2 ring-purple-100' : 'border-slate-200'}`}
            >
              <X size={16} className="text-slate-400" />
            </button>
            {PRESET_LOGOS.slice(0, 7).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLogoUrl(item.dataUrl)}
                className={`w-10 h-10 rounded-xl border p-1.5 flex items-center justify-center shrink-0 ${selectedLogoUrl === item.dataUrl ? 'border-purple-600 ring-2 ring-purple-100 bg-purple-50/20' : 'border-slate-200'}`}
              >
                <img src={item.dataUrl} alt={item.name} className="w-5 h-5 object-contain" />
              </button>
            ))}
          </div>

          {/* Custom Upload */}
          <label className="w-full py-2 px-3 border border-dashed border-purple-300 rounded-xl text-purple-600 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-purple-50 transition-colors">
            <Upload size={14} />
            <span>Tải Lên Logo (SVG / PNG / JPG)</span>
            <input type="file" accept=".svg,.png,.jpg,.jpeg" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {/* Export Row */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
        <select
          value={resolution}
          onChange={(e) => setResolution(parseInt(e.target.value, 10))}
          className="px-2 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl"
        >
          <option value="1000">1000x1000</option>
          <option value="2000">2000x2000</option>
        </select>
        <button
          type="button"
          onClick={handleDownloadPNG}
          className="py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer"
        >
          <Download size={13} />
          <span>Tải PNG</span>
        </button>
        <button
          type="button"
          onClick={handleDownloadSVG}
          className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer"
        >
          <Download size={13} />
          <span>Tải SVG</span>
        </button>
      </div>
    </div>
  );
};
