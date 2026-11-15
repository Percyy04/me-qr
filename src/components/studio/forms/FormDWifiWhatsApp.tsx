import React from 'react';
import { QRInputs, QRType } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';
import { TextEditor } from '../../common/TextEditor';
import { Wifi, MessageSquare, Lock, Eye, EyeOff } from 'lucide-react';

interface FormDProps {
  type: QRType;
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const FormDWifiWhatsApp: React.FC<FormDProps> = ({ type, inputs, onChange }) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = React.useState(false);

  // If WiFi
  if (type === 'wifi') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-text-strong mb-1.5 flex items-center gap-1.5">
            <Wifi size={14} className="text-primary-container" />
            <span>{t('wifiSsid')} <span className="text-rose-500">*</span></span>
          </label>
          <input
            type="text"
            value={inputs.wifi.ssid}
            onChange={(e) => onChange({ ...inputs, wifi: { ...inputs.wifi, ssid: e.target.value } })}
            placeholder="Studio_Coffee_5G"
            className="w-full px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Lock size={12} />
              <span>{t('wifiPassword')}</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputs.wifi.password}
                disabled={inputs.wifi.encryption === 'nopass'}
                onChange={(e) => onChange({ ...inputs, wifi: { ...inputs.wifi, password: e.target.value } })}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-3 pr-8 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong disabled:opacity-50 font-mono"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus-visible:outline-none focus-visible:text-primary-container"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              {t('wifiEncryption')}
            </label>
            <select
              value={inputs.wifi.encryption}
              onChange={(e) => onChange({ ...inputs, wifi: { ...inputs.wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' } })}
              className="w-full px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong font-semibold"
            >
              <option value="WPA">WPA / WPA2 / WPA3</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="wifi-hidden"
            checked={inputs.wifi.hidden}
            onChange={(e) => onChange({ ...inputs, wifi: { ...inputs.wifi, hidden: e.target.checked } })}
            className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer"
          />
          <label htmlFor="wifi-hidden" className="text-xs text-slate-text-muted cursor-pointer">
            {t('wifiHidden')}
          </label>
        </div>
      </div>
    );
  }

  // If WhatsApp
  if (type === 'whatsapp') {
    const wa = inputs.whatsapp || { countryCode: '+84', phoneNumber: '901234567', message: '' };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-text-strong mb-1.5 flex items-center gap-1.5">
            <MessageSquare size={14} className="text-emerald-500" />
            <span>{t('whatsappNumber')} <span className="text-rose-500">*</span></span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={wa.countryCode}
              onChange={(e) => onChange({ ...inputs, whatsapp: { ...wa, countryCode: e.target.value } })}
              placeholder="+84"
              className="w-20 px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-center font-mono font-bold"
            />
            <input
              type="tel"
              value={wa.phoneNumber}
              onChange={(e) => onChange({ ...inputs, whatsapp: { ...wa, phoneNumber: e.target.value } })}
              placeholder="901234567"
              className="flex-1 px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong font-mono focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {t('whatsappMessage')}
          </label>
          <textarea
            rows={3}
            value={wa.message}
            onChange={(e) => onChange({ ...inputs, whatsapp: { ...wa, message: e.target.value } })}
            placeholder="Xin chào, tôi cần tư vấn..."
            className="w-full px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-xl text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container font-sans"
          />
        </div>
      </div>
    );
  }

  // Plain Text with Rich Text Editor
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-text-strong mb-1">
        {t('textEditorLabel')}
      </label>
      <TextEditor
        value={inputs.text}
        onChange={(val) => onChange({ ...inputs, text: val })}
        placeholder={t('textEditorPlaceholder')}
      />
    </div>
  );
};
