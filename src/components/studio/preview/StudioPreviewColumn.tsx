import React, { useState } from 'react';
import { QRDesign, QRInputs, QRType } from '../../../types/qr.types';
import { StudioQRCanvasView } from './StudioQRCanvasView';
import { StudioMobilePageView } from './StudioMobilePageView';
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
  const [activeTab, setActiveTab] = useState<'qr' | 'mobile'>('qr');

  return (
    <aside className="w-full space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-none">
      {/* Real-time Preview Card matching ME-QR ❸ Tạo & tải QR */}
      <div className="bg-surface-card rounded-2xl border border-border-subtle p-5 shadow-elevated">
        {/* Card Header & Step Indicator */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-primary-container text-white text-xs font-bold flex items-center justify-center shadow-xs">
              3
            </span>
            <h3 className="text-sm font-bold text-slate-text-strong font-display">Tạo & tải QR</h3>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-container bg-indigo-tint px-2 py-0.5 rounded-full">
            LIVE 60FPS
          </span>
        </div>

        {/* Tab Switcher: QR Canvas vs Mobile Page */}
        <div className="grid grid-cols-2 p-1 bg-canvas-bg rounded-xl border border-border-subtle mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white text-primary-container shadow-xs font-bold'
                : 'text-slate-text-muted hover:text-slate-text-strong'
            }`}
          >
            <QrCode size={15} />
            <span>QR Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'mobile'
                ? 'bg-white text-primary-container shadow-xs font-bold'
                : 'text-slate-text-muted hover:text-slate-text-strong'
            }`}
          >
            <Smartphone size={15} />
            <span>Mobile Page</span>
          </button>
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
