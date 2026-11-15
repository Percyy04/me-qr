import React from 'react';
import { QRDesign } from '../../../types/qr.types';
import { ColorPicker } from '../../common/ColorPicker';
import { GRADIENT_PRESETS } from '../../../data/presetColors';

interface ColorControlsProps {
  dots: QRDesign['dots'];
  cornersSquare: QRDesign['cornersSquare'];
  cornersDot: QRDesign['cornersDot'];
  background: QRDesign['background'];
  onChangeDots: (dots: QRDesign['dots']) => void;
  onChangeCornersSquare: (c: QRDesign['cornersSquare']) => void;
  onChangeCornersDot: (c: QRDesign['cornersDot']) => void;
  onChangeBackground: (bg: QRDesign['background']) => void;
}

export const ColorControls: React.FC<ColorControlsProps> = ({
  dots,
  cornersSquare,
  cornersDot,
  background,
  onChangeDots,
  onChangeCornersSquare,
  onChangeCornersDot,
  onChangeBackground,
}) => {
  const isGradient = dots.gradient.enabled;

  return (
    <div className="space-y-4 pt-2">
      {/* Mode toggle */}
      <div className="flex p-1 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() =>
            onChangeDots({
              ...dots,
              gradient: { ...dots.gradient, enabled: false },
            })
          }
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            !isGradient ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
          }`}
        >
          Màu đơn
        </button>
        <button
          type="button"
          onClick={() =>
            onChangeDots({
              ...dots,
              gradient: { ...dots.gradient, enabled: true },
            })
          }
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            isGradient ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
          }`}
        >
          Chuyển sắc (Gradient)
        </button>
      </div>

      {!isGradient ? (
        <ColorPicker
          label="Màu hoa văn QR"
          value={dots.color}
          onChange={(hex) => onChangeDots({ ...dots, color: hex })}
        />
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {GRADIENT_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() =>
                  onChangeDots({
                    ...dots,
                    gradient: {
                      ...dots.gradient,
                      startColor: p.startColor,
                      endColor: p.endColor,
                    },
                  })
                }
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium border border-slate-200 hover:border-slate-300 flex items-center gap-1.5 bg-white"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${p.startColor}, ${p.endColor})`,
                  }}
                />
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ColorPicker
              label="Màu bắt đầu"
              value={dots.gradient.startColor}
              onChange={(hex) =>
                onChangeDots({
                  ...dots,
                  gradient: { ...dots.gradient, startColor: hex },
                })
              }
              showPresets={false}
            />
            <ColorPicker
              label="Màu kết thúc"
              value={dots.gradient.endColor}
              onChange={(hex) =>
                onChangeDots({
                  ...dots,
                  gradient: { ...dots.gradient, endColor: hex },
                })
              }
              showPresets={false}
            />
          </div>
        </div>
      )}

      {/* Eye colors customization */}
      <div className="pt-3 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 mb-2">
          <input
            type="checkbox"
            checked={cornersSquare.customColor}
            onChange={(e) => {
              const checked = e.target.checked;
              onChangeCornersSquare({ ...cornersSquare, customColor: checked });
              onChangeCornersDot({ ...cornersDot, customColor: checked });
            }}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Tùy chỉnh màu mắt quét riêng biệt</span>
        </label>

        {cornersSquare.customColor && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <ColorPicker
              label="Vành ngoài mắt"
              value={cornersSquare.color}
              onChange={(hex) =>
                onChangeCornersSquare({ ...cornersSquare, color: hex })
              }
              showPresets={false}
            />
            <ColorPicker
              label="Tâm trong mắt"
              value={cornersDot.color}
              onChange={(hex) =>
                onChangeCornersDot({ ...cornersDot, color: hex })
              }
              showPresets={false}
            />
          </div>
        )}
      </div>

      {/* Background options */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Nền mã QR
          </label>
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={background.isTransparent}
              onChange={(e) =>
                onChangeBackground({
                  ...background,
                  isTransparent: e.target.checked,
                })
              }
              className="rounded border-slate-300 text-blue-600"
            />
            <span>Nền trong suốt</span>
          </label>
        </div>
        {!background.isTransparent && (
          <ColorPicker
            value={background.color}
            onChange={(hex) =>
              onChangeBackground({ ...background, color: hex })
            }
          />
        )}
      </div>
    </div>
  );
};

