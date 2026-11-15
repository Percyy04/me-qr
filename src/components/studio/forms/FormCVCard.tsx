import React from 'react';
import { QRInputs } from '../../../types/qr.types';
import { Camera, User, Building, Phone, Mail, Globe, MapPin } from 'lucide-react';

interface FormCProps {
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const FormCVCard: React.FC<FormCProps> = ({ inputs, onChange }) => {
  const v = inputs.vcard;

  const update = (field: keyof QRInputs['vcard'], val: string) => {
    onChange({
      ...inputs,
      vcard: {
        ...v,
        [field]: val,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Header and Avatar */}
      <div className="flex items-center gap-4 pb-3 border-b border-border-subtle">
        <div className="relative group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-primary-container/40 flex items-center justify-center overflow-hidden text-slate-400 group-hover:border-primary-container transition-all">
            {v.avatarUrl ? (
              <img src={v.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={28} />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-primary-container text-white p-1 rounded-full text-xs shadow cursor-pointer hover:bg-indigo-700 transition-colors">
            <Camera size={12} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  update('avatarUrl', url);
                }
              }}
            />
          </label>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Họ (Last Name)</label>
            <input
              type="text"
              value={v.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Vance"
              className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Tên (First Name)</label>
            <input
              type="text"
              value={v.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              placeholder="Elena"
              className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </div>
        </div>
      </div>

      {/* Title & Company */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
            <Building size={12} />
            <span>Chức vụ (Job Title)</span>
          </label>
          <input
            type="text"
            value={v.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Head of Growth"
            className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Công ty (Company)</label>
          <input
            type="text"
            value={v.organization}
            onChange={(e) => update('organization', e.target.value)}
            placeholder="Studio Corp"
            className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
            <Phone size={12} />
            <span>Số điện thoại (Mobile)</span>
          </label>
          <input
            type="tel"
            value={v.phoneMobile}
            onChange={(e) => update('phoneMobile', e.target.value)}
            placeholder="+84 901 234 567"
            className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong font-mono focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
            <Mail size={12} />
            <span>Email</span>
          </label>
          <input
            type="email"
            value={v.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="elena@company.com"
            className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
      </div>

      {/* Website & Address */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
            <Globe size={12} />
            <span>Website</span>
          </label>
          <input
            type="url"
            value={v.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://company.com"
            className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong font-mono focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
            <MapPin size={12} />
            <span>Thành phố, Quốc gia</span>
          </label>
          <input
            type="text"
            value={v.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder="TP. Hồ Chí Minh"
            className="w-full px-2.5 py-1.5 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-1 focus:ring-primary-container"
          />
        </div>
      </div>
    </div>
  );
};
