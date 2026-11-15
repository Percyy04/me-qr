import React from 'react';
import { Input } from '../../common/Input';
import { QRInputs } from '../../../types/qr.types';

interface SmsFormProps {
  value: QRInputs['sms'];
  onChange: (val: QRInputs['sms']) => void;
}

export const SmsForm: React.FC<SmsFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3 py-2">
      <Input
        label="Số điện thoại nhận tin"
        placeholder="0912345678 hoặc +84912345678"
        value={value.phoneNumber}
        onChange={(e) => onChange({ ...value, phoneNumber: e.target.value })}
      />
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          Nội dung tin nhắn SMS
        </label>
        <textarea
          rows={3}
          value={value.message}
          onChange={(e) => onChange({ ...value, message: e.target.value })}
          placeholder="Nội dung tin nhắn soạn sẵn khi quét mã..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
    </div>
  );
};

