import React, { useState } from 'react';
import { QRDesign } from '../../../types/qr.types';
import { PREMADE_TEMPLATES } from '../../../data/preMadeTemplatesData';
import { X, Sparkles } from 'lucide-react';

interface PreMadeTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (design: QRDesign) => void;
  currentDesign: QRDesign;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'business', label: 'Doanh nghiệp' },
  { id: 'creative', label: 'Sáng tạo & Neon' },
  { id: 'social', label: 'Mạng xã hội' },
  { id: 'modern', label: 'Hiện đại' },
  { id: 'minimal', label: 'Tối giản' },
];

export const PreMadeTemplatesModal: React.FC<PreMadeTemplatesModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  const filtered = activeTab === 'all'
    ? PREMADE_TEMPLATES
    : PREMADE_TEMPLATES.filter((t) => t.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Sparkles size={20} />
            </span>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Thư Viện Mẫu Thiết Kế Có Sẵn
              </h3>
              <p className="text-xs text-slate-500">
                Chọn mẫu yêu thích để áp dụng ngay màu sắc, hoa văn và khung viền.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none bg-slate-50/50">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === c.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const d = item.design;
            const bgGrad = d.dots.gradient.enabled
              ? `linear-gradient(135deg, ${d.dots.gradient.startColor}, ${d.dots.gradient.endColor})`
              : d.dots.color;

            return (
              <div
                key={item.id}
                onClick={() => {
                  onApplyTemplate(item.design);
                  onClose();
                }}
                className="group border border-slate-200 hover:border-blue-500 rounded-2xl p-3 bg-white hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Visual miniature */}
                <div className="h-28 rounded-xl bg-slate-50 border border-slate-150 flex flex-col items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center shadow-sm"
                    style={{ background: bgGrad }}
                  >
                    <div className="w-8 h-8 rounded bg-white/90 flex items-center justify-center text-[10px] font-bold text-slate-800">
                      QR
                    </div>
                  </div>
                  {d.frame.id !== 'none' && (
                    <span
                      className="text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded truncate max-w-full"
                      style={{ background: d.frame.frameColor, color: d.frame.textColor }}
                    >
                      {d.frame.text || 'FRAME'}
                    </span>
                  )}
                </div>

                <div className="mt-2.5 text-center">
                  <span className="font-semibold text-xs text-slate-900 group-hover:text-blue-600 transition-colors block truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize block">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
