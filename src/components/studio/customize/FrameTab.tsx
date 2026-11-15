import React, { useState } from 'react';
import { QRDesign } from '../../../types/qr.types';
import { QrFrameTemplate } from '../../../types/qrFrame';
import { QR_FRAME_REGISTRY, getFrameById } from '../../../constants/qrFrameRegistry';
import { CustomFrameModal } from '../templates/CustomFrameModal';
import { Type, Sparkles, Palette } from 'lucide-react';

interface FrameTabProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

export const FrameTab: React.FC<FrameTabProps> = ({ design, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const frame = design.frame;
  const activeFrame = getFrameById(frame.id);

  const quickFrames = [
    QR_FRAME_REGISTRY[0],
    QR_FRAME_REGISTRY[1],
    QR_FRAME_REGISTRY[6],
    QR_FRAME_REGISTRY[7],
    QR_FRAME_REGISTRY[18],
    QR_FRAME_REGISTRY[24],
  ];

  const handleSelectFrame = (tpl: QrFrameTemplate | null) => {
    if (!tpl) {
      onChange({ ...design, frame: { ...frame, id: 'NONE', templateUrl: null, text: '' } });
      return;
    }
    onChange({
      ...design,
      frame: { ...frame, id: tpl.id, templateUrl: null, text: tpl.defaultLabel, frameColor: tpl.defaultColors.primary, textColor: '#FFFFFF' },
      dots: { ...design.dots, color: tpl.defaultColors.primary, type: tpl.defaultColors.dotsStyle },
      cornersSquare: { type: tpl.defaultColors.eyeStyle, color: tpl.defaultColors.primary, customColor: true },
      cornersDot: { type: 'dot', color: tpl.defaultColors.secondary, customColor: true },
    });
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Quick SVG Frames Strip */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">Khung Vector SVG</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-purple-100 text-purple-700">36 Khung Stitch AI</span>
          </div>
          <button type="button" onClick={() => setModalOpen(true)} className="text-[11px] font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer">
            <Sparkles size={12} /><span>Mở kho 36 khung</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => handleSelectFrame(null)}
            className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center shrink-0 cursor-pointer ${
              !activeFrame || frame.id === 'NONE' || frame.id === 'none' ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 shadow-xs' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <span className="text-slate-400 text-sm font-bold mb-0.5">✕</span>
            <span className="text-[9px] text-slate-500">Không</span>
          </button>

          {quickFrames.map((tpl) => {
            const isSel = activeFrame?.id === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectFrame(tpl)}
                title={`${tpl.name} (${tpl.id})`}
                className={`w-14 h-16 rounded-xl border p-1 flex flex-col items-center justify-between shrink-0 cursor-pointer transition-all ${
                  isSel ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 shadow-xs' : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="w-full flex-1 overflow-hidden pointer-events-none flex items-center justify-center">
                  {tpl.renderSvg({ labelText: tpl.defaultLabel, primaryColor: tpl.defaultColors.primary, secondaryColor: tpl.defaultColors.secondary })}
                </div>
                <span className="text-[8px] font-bold text-slate-700 truncate w-full text-center">{tpl.id}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-14 h-16 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 text-slate-700 hover:text-purple-700 font-bold text-xs flex flex-col items-center justify-center shrink-0 cursor-pointer transition-all"
          >
            <span className="text-sm font-extrabold text-purple-600">+36</span>
            <span className="text-[8px] font-medium text-slate-500">Tất cả</span>
          </button>
        </div>
      </div>

      {/* Frame Text & Real-time Customization */}
      <div className="p-3 bg-canvas-bg rounded-xl border border-border-subtle space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Type size={12} /><span>Chữ trên banner khung (labelText)</span>
          </label>
          <input
            type="text"
            value={frame.text}
            onChange={(e) => onChange({ ...design, frame: { ...frame, text: e.target.value } })}
            placeholder={activeFrame ? activeFrame.defaultLabel : 'QUÉT ĐỂ TRUY CẬP'}
            className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg font-bold tracking-wider uppercase text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200/60">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
              <Palette size={11} /><span>Màu khung chính</span>
            </label>
            <div className="flex items-center gap-2 bg-white border border-border-subtle rounded-lg px-2 py-1">
              <input
                type="color"
                value={frame.frameColor || design.dots.color || '#4F46E5'}
                onChange={(e) => onChange({ ...design, frame: { ...frame, frameColor: e.target.value }, dots: { ...design.dots, color: e.target.value } })}
                className="w-5 h-5 rounded cursor-pointer border"
              />
              <span className="text-[10px] font-mono uppercase text-slate-600">{frame.frameColor || design.dots.color}</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
              <Palette size={11} /><span>Màu điểm nhấn</span>
            </label>
            <div className="flex items-center gap-2 bg-white border border-border-subtle rounded-lg px-2 py-1">
              <input
                type="color"
                value={design.cornersDot.color || '#10B981'}
                onChange={(e) => onChange({ ...design, cornersDot: { ...design.cornersDot, color: e.target.value, customColor: true } })}
                className="w-5 h-5 rounded cursor-pointer border"
              />
              <span className="text-[10px] font-mono uppercase text-slate-600">{design.cornersDot.color}</span>
            </div>
          </div>
        </div>
      </div>

      <CustomFrameModal isOpen={modalOpen} onClose={() => setModalOpen(false)} currentDesign={design} onApply={onChange} />
    </div>
  );
};
