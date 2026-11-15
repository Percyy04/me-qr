import React from 'react';
import { QRInputs, QRType, getFormVariant } from '../../../types/qr.types';
import {
  Globe, FileText, User, Wifi, MessageCircle, Phone, Mail,
  ExternalLink, Download, UserPlus, CheckCircle
} from 'lucide-react';

interface StudioMobilePageViewProps {
  type: QRType;
  inputs: QRInputs;
}

export const StudioMobilePageView: React.FC<StudioMobilePageViewProps> = ({ type, inputs }) => {
  const variant = getFormVariant(type);

  return (
    <div className="flex flex-col items-center">
      {/* Smartphone Device Mockup Frame */}
      <div className="w-[260px] h-[480px] bg-slate-900 rounded-[36px] p-2.5 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
        {/* Dynamic Island & Screen Bezel */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
        <div className="w-full h-full bg-slate-50 rounded-[28px] overflow-y-auto p-3 text-slate-800 flex flex-col justify-between pt-7">
          <div className="flex items-center justify-between text-[10px] text-slate-500 px-2 mb-2 font-mono">
            <span>9:41</span>
            <span className="flex items-center gap-1">5G 100%</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            {variant === 'form-a' && (
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-container text-white flex items-center justify-center shadow-md">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {inputs.url.replace(/^https?:\/\//i, '') || 'yourbrand.com'}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">QuickQR Dynamic Redirection</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-border-subtle shadow-xs text-left space-y-1.5">
                  <span className="text-[9px] font-bold uppercase text-primary-container block">Active Campaign</span>
                  <p className="text-[11px] font-medium text-slate-700 truncate">
                    {inputs.url || 'https://quickqr.io/demo'}
                  </p>
                </div>
                <a
                  href={inputs.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-primary-container text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-indigo-700 transition-colors"
                >
                  <span>Truy cập trang đích</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}

            {variant === 'form-b' && (
              /* File & Media Landing Card */
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {inputs.file?.title || 'Spring Catalog 2026'}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {inputs.file?.description || 'Tài liệu hướng dẫn trực tuyến'}
                  </p>
                </div>

                <div className="p-2 bg-white rounded-xl border border-border-subtle text-left flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">
                    PDF
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-800 truncate">
                      {inputs.file?.name || 'document.pdf'}
                    </p>
                    <span className="text-[9px] text-slate-400">{inputs.file?.size || '4.2 MB'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 px-3 rounded-xl bg-secondary-cta text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Download size={14} />
                  <span>{inputs.file?.ctaText || 'Tải tệp tài liệu'}</span>
                </button>
              </div>
            )}

            {variant === 'form-c' && (
              /* vCard Digital Business Card */
              <div className="space-y-3 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-indigo-tint border-2 border-primary-container p-0.5 overflow-hidden flex items-center justify-center">
                  {inputs.vcard.avatarUrl ? (
                    <img src={inputs.vcard.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={28} className="text-primary-container" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {inputs.vcard.firstName || 'Elena'} {inputs.vcard.lastName || 'Vance'}
                  </h4>
                  <p className="text-[10px] text-slate-500">{inputs.vcard.title || 'Head of Growth'}</p>
                  <p className="text-[10px] font-semibold text-primary-container">{inputs.vcard.organization || 'Studio Corp'}</p>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <a
                    href={`tel:${inputs.vcard.phoneMobile}`}
                    className="p-1.5 rounded-lg bg-white border border-border-subtle flex items-center justify-center gap-1 text-slate-700"
                  >
                    <Phone size={11} className="text-emerald-600" />
                    <span>Gọi điện</span>
                  </a>
                  <a
                    href={`mailto:${inputs.vcard.email}`}
                    className="p-1.5 rounded-lg bg-white border border-border-subtle flex items-center justify-center gap-1 text-slate-700"
                  >
                    <Mail size={11} className="text-primary-container" />
                    <span>Gửi Mail</span>
                  </a>
                </div>

                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-xl bg-primary-container text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <UserPlus size={14} />
                  <span>Lưu danh bạ (vCard)</span>
                </button>
              </div>
            )}

            {variant === 'form-d' && (
              /* Wi-Fi / Direct Action */
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  {type === 'wifi' ? <Wifi size={24} /> : <MessageCircle size={24} />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {type === 'wifi' ? inputs.wifi.ssid || 'Wi-Fi Hotspot' : 'WhatsApp Direct Chat'}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {type === 'wifi' ? 'Quét để tham gia mạng không dây' : 'Mở cuộc trò chuyện tức thì'}
                  </p>
                </div>

                {type === 'wifi' && (
                  <div className="p-2.5 bg-white rounded-xl border border-border-subtle text-left space-y-1">
                    <span className="text-[9px] font-bold uppercase text-slate-400">Mật khẩu mạng:</span>
                    <p className="text-xs font-mono font-bold text-slate-800">
                      {inputs.wifi.encryption === 'nopass' ? 'Không mật khẩu' : inputs.wifi.password || '••••••••'}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  className="w-full py-2.5 px-3 rounded-xl bg-secondary-cta text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <CheckCircle size={14} />
                  <span>{type === 'wifi' ? 'Kết nối ngay' : 'Mở WhatsApp'}</span>
                </button>
              </div>
            )}
          </div>

          {/* QuickQR Studio Footer Mark */}
          <div className="pt-2 border-t border-slate-200 text-center">
            <span className="text-[9px] text-slate-400 font-semibold">Powered by QuickQR Studio</span>
          </div>
        </div>
      </div>
    </div>
  );
};
