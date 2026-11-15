import React, { useState } from 'react';
import { QRDesign } from '../../../types/qr.types';
import { ME_QR_TEMPLATES } from '../../../data/meQrTemplates';
import { ChevronLeft, ChevronRight, Sliders } from 'lucide-react';

interface FrameSelectorProps {
  frame: QRDesign['frame'];
  onChange: (frame: QRDesign['frame']) => void;
}

const PAGE_SIZE = 16;

export const FrameSelector: React.FC<FrameSelectorProps> = ({ frame, onChange }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(ME_QR_TEMPLATES.length / PAGE_SIZE);

  const currentItems = ME_QR_TEMPLATES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="space-y-4 pt-2">
      {/* Top Header & Page Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Khung ME-QR ({ME_QR_TEMPLATES.length} Mẫu)
          </label>
          <span className="text-[11px] text-slate-500">
            Trang {page + 1} / {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Grid of 16 templates per page + No frame option on page 0 */}
      <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto pr-1">
        {page === 0 && (
          <button
            type="button"
            onClick={() =>
              onChange({
                ...frame,
                id: 'none',
                templateUrl: null,
              })
            }
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
              frame.id === 'none'
                ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 mb-1">
              ✕
            </div>
            <span className="truncate w-full text-center text-[10px]">Không khung</span>
          </button>
        )}

        {currentItems.map((item) => {
          const isSelected = frame.templateUrl === item.url;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChange({
                  ...frame,
                  id: item.id,
                  templateUrl: item.url,
                  qrScale: frame.qrScale || 0.72,
                  qrOffsetY: frame.qrOffsetY || 0,
                })
              }
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/25 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center p-0.5 mb-1">
                <img
                  src={item.url}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="truncate w-full text-center text-[10px] text-slate-600">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Adjusters when a template is active */}
      {frame.id !== 'none' && frame.templateUrl && (
        <div className="space-y-3 pt-3 border-t border-slate-100 bg-slate-50/50 p-3 rounded-xl border">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Sliders size={14} className="text-blue-600" />
            <span>Tinh chỉnh khớp khung hình:</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Tỉ lệ mã QR trong khung</span>
              <span className="font-mono">{Math.round((frame.qrScale || 0.72) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.55"
              max="0.88"
              step="0.01"
              value={frame.qrScale || 0.72}
              onChange={(e) =>
                onChange({ ...frame, qrScale: parseFloat(e.target.value) })
              }
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Vị trí dịch chuyển dọc</span>
              <span className="font-mono">{frame.qrOffsetY || 0}px</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              value={frame.qrOffsetY || 0}
              onChange={(e) =>
                onChange({ ...frame, qrOffsetY: parseInt(e.target.value, 10) })
              }
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};
