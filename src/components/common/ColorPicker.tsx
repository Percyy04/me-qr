import React from 'react';
import { COLOR_PRESETS } from '../../data/presetColors';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (hex: string) => void;
  showPresets?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  showPresets = true,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0 cursor-pointer">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-[-8px] w-16 h-16 cursor-pointer border-0"
          />
        </div>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 px-2.5 py-2 text-xs font-mono font-medium uppercase bg-slate-50 border border-slate-200 rounded-xl text-center focus:bg-white focus:outline-none focus:border-blue-500"
          maxLength={7}
        />
        {showPresets && (
          <div className="flex items-center gap-1.5 flex-wrap flex-1 justify-end">
            {COLOR_PRESETS.slice(0, 6).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onChange(preset)}
                className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${
                  value.toLowerCase() === preset.toLowerCase()
                    ? 'ring-2 ring-blue-500 ring-offset-1 border-white'
                    : 'border-slate-200'
                }`}
                style={{ backgroundColor: preset }}
                title={preset}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

