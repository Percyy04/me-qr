import React from 'react';

interface TextFormProps {
  value: string;
  onChange: (val: string) => void;
}

export const TextForm: React.FC<TextFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2 py-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Nội dung văn bản
        </label>
        <span className="text-xs text-slate-400 font-mono">
          {value.length}/1000 ký tự
        </span>
      </div>
      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 1000))}
        placeholder="Nhập thông điệp, ghi chú hoặc nội dung bất kỳ cần chia sẻ..."
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-500"
      />
      <p className="text-xs text-slate-500">
        Nội dung sẽ hiển thị trực tiếp trên màn hình điện thoại khi quét mã.
      </p>
    </div>
  );
};

