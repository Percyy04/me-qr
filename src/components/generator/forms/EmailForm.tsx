import React from 'react';
import { Input } from '../../common/Input';
import { QRInputs } from '../../../types/qr.types';

interface EmailFormProps {
  value: QRInputs['email'];
  onChange: (val: QRInputs['email']) => void;
}

export const EmailForm: React.FC<EmailFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3 py-2">
      <Input
        label="Hộp thư người nhận (Email)"
        type="email"
        placeholder="recipient@example.com"
        value={value.email}
        onChange={(e) => onChange({ ...value, email: e.target.value })}
      />
      <Input
        label="Tiêu đề thư"
        placeholder="Yêu cầu thông tin báo giá"
        value={value.subject}
        onChange={(e) => onChange({ ...value, subject: e.target.value })}
      />
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          Nội dung thư mẫu
        </label>
        <textarea
          rows={3}
          value={value.body}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
          placeholder="Xin chào, tôi quan tâm đến dịch vụ..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
    </div>
  );
};

