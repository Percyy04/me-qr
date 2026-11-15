import React, { useState } from 'react';
import { QRInputs } from '../../../types/qr.types';
import { Globe, Apple, Play, Sliders, CheckCircle2 } from 'lucide-react';

interface FormAProps {
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const FormALinkRouting: React.FC<FormAProps> = ({ inputs, onChange }) => {
  const [showUtm, setShowUtm] = useState(false);
  const [showRouting, setShowRouting] = useState(inputs.conditionalRouting || false);

  return (
    <div className="space-y-4">
      {/* Target URL */}
      <div>
        <label className="block text-xs font-bold text-slate-text-strong mb-1.5">
          Target Website URL <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Globe size={16} />
          </div>
          <input
            type="url"
            value={inputs.url}
            onChange={(e) => onChange({ ...inputs, url: e.target.value })}
            placeholder="https://yourbrand.com/campaign-page"
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container focus:bg-white transition-all font-mono"
          />
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-text-muted">
          <CheckCircle2 size={12} className="text-secondary-cta" />
          <span>Tự động tối ưu hóa URL ngắn trên miền chuyển tiếp nhanh</span>
        </div>
      </div>

      {/* UTM Builder Toggle */}
      <div className="pt-2 border-t border-border-subtle">
        <button
          type="button"
          onClick={() => setShowUtm(!showUtm)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary-container hover:underline"
        >
          <Sliders size={14} />
          <span>{showUtm ? 'Ẩn bộ theo dõi UTM' : '+ Thêm UTM Parameters (Google Analytics)'}</span>
        </button>

        {showUtm && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 p-3 bg-canvas-bg rounded-xl border border-border-subtle">
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">utm_source</label>
              <input
                type="text"
                value={inputs.utmSource || ''}
                onChange={(e) => onChange({ ...inputs, utmSource: e.target.value })}
                placeholder="qr-flyer"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">utm_medium</label>
              <input
                type="text"
                value={inputs.utmMedium || ''}
                onChange={(e) => onChange({ ...inputs, utmMedium: e.target.value })}
                placeholder="print"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">utm_campaign</label>
              <input
                type="text"
                value={inputs.utmCampaign || ''}
                onChange={(e) => onChange({ ...inputs, utmCampaign: e.target.value })}
                placeholder="summer-promo"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* Smart OS Conditional Routing */}
      <div className="pt-2 border-t border-border-subtle">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-text-strong block">
              Điều hướng thông minh theo hệ điều hành (Smart OS Routing)
            </span>
            <span className="text-[11px] text-slate-text-muted">
              Tự động nhận diện thiết bị iPhone hoặc Android khi quét
            </span>
          </div>
          <input
            type="checkbox"
            checked={showRouting}
            onChange={(e) => {
              setShowRouting(e.target.checked);
              onChange({ ...inputs, conditionalRouting: e.target.checked });
            }}
            className="w-4 h-4 rounded text-primary-container focus:ring-primary-container accent-primary-container cursor-pointer"
          />
        </div>

        {showRouting && (
          <div className="space-y-3 mt-3 p-3 bg-canvas-bg rounded-xl border border-border-subtle">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 mb-1">
                <Apple size={14} className="text-slate-800" />
                <span>Link dành riêng cho iOS (Apple App Store)</span>
              </label>
              <input
                type="url"
                value={inputs.iosUrl || ''}
                onChange={(e) => onChange({ ...inputs, iosUrl: e.target.value })}
                placeholder="https://apps.apple.com/app/id123456789"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 mb-1">
                <Play size={14} className="text-emerald-600" />
                <span>Link dành riêng cho Android (Google Play Store)</span>
              </label>
              <input
                type="url"
                value={inputs.androidUrl || ''}
                onChange={(e) => onChange({ ...inputs, androidUrl: e.target.value })}
                placeholder="https://play.google.com/store/apps/details?id=com.app"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-border-subtle rounded-lg font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
