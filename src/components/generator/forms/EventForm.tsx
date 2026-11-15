import React from 'react';
import { Input } from '../../common/Input';
import { QRInputs } from '../../../types/qr.types';

interface EventFormProps {
  value: QRInputs['event'];
  onChange: (val: QRInputs['event']) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3 py-2">
      <Input
        label="Tên sự kiện"
        placeholder="Hội thảo Công nghệ 2026"
        value={value.title}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
      />
      <Input
        label="Địa điểm tổ chức"
        placeholder="Trung tâm Hội nghị Quốc gia, Hà Nội"
        value={value.location}
        onChange={(e) => onChange({ ...value, location: e.target.value })}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Bắt đầu lúc"
          type="datetime-local"
          value={value.startTime}
          onChange={(e) => onChange({ ...value, startTime: e.target.value })}
        />
        <Input
          label="Kết thúc lúc"
          type="datetime-local"
          value={value.endTime}
          onChange={(e) => onChange({ ...value, endTime: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          Ghi chú sự kiện
        </label>
        <textarea
          rows={2}
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Mô tả tóm tắt nội dung chương trình..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
    </div>
  );
};

