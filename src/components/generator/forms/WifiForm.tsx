import React from 'react';
import { Input } from '../../common/Input';
import { QRInputs } from '../../../types/qr.types';

interface WifiFormProps {
  value: QRInputs['wifi'];
  onChange: (val: QRInputs['wifi']) => void;
}

export const WifiForm: React.FC<WifiFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4 py-2">
      <Input
        label="Tên mạng Wi-Fi (SSID)"
        placeholder="Ví dụ: CoffeeShop_5G"
        value={value.ssid}
        onChange={(e) => onChange({ ...value, ssid: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Bảo mật
          </label>
          <select
            value={value.encryption}
            onChange={(e) =>
              onChange({
                ...value,
                encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
              })
            }
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Không có mật khẩu</option>
          </select>
        </div>

        {value.encryption !== 'nopass' && (
          <Input
            label="Mật khẩu Wi-Fi"
            type="text"
            placeholder="Nhập mật khẩu..."
            value={value.password}
            onChange={(e) => onChange({ ...value, password: e.target.value })}
          />
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => onChange({ ...value, hidden: e.target.checked })}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span>Mạng Wi-Fi ẩn (Hidden SSID)</span>
      </label>
    </div>
  );
};

