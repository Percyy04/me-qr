import React from 'react';
import {
  BodyDotType,
  CornerSquareType,
  CornerDotType,
  QRDesign,
} from '../../../types/qr.types';

interface PatternSelectorProps {
  dots: QRDesign['dots'];
  cornersSquare: QRDesign['cornersSquare'];
  cornersDot: QRDesign['cornersDot'];
  onChangeDots: (dots: QRDesign['dots']) => void;
  onChangeCornersSquare: (c: QRDesign['cornersSquare']) => void;
  onChangeCornersDot: (c: QRDesign['cornersDot']) => void;
}

const DOT_TYPES: { id: BodyDotType; label: string }[] = [
  { id: 'square', label: 'Vuông' },
  { id: 'dots', label: 'Chấm bi' },
  { id: 'rounded', label: 'Bo tròn' },
  { id: 'extra-rounded', label: 'Con nhộng' },
  { id: 'classy', label: 'Vát cạnh' },
  { id: 'classy-rounded', label: 'Vát cong' },
];

const CORNER_SQUARE_TYPES: { id: CornerSquareType; label: string }[] = [
  { id: 'square', label: 'Vuông' },
  { id: 'extra-rounded', label: 'Bo góc' },
  { id: 'dot', label: 'Tròn' },
];

const CORNER_DOT_TYPES: { id: CornerDotType; label: string }[] = [
  { id: 'square', label: 'Điểm vuông' },
  { id: 'dot', label: 'Điểm tròn' },
];

export const PatternSelector: React.FC<PatternSelectorProps> = ({
  dots,
  cornersSquare,
  cornersDot,
  onChangeDots,
  onChangeCornersSquare,
  onChangeCornersDot,
}) => {
  return (
    <div className="space-y-4 pt-2">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
          Hoa văn thân mã (Body Pattern)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DOT_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeDots({ ...dots, type: item.id })}
              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                dots.type === item.id
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-semibold ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
          Vành mắt ngoài (Eye Frame)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {CORNER_SQUARE_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChangeCornersSquare({ ...cornersSquare, type: item.id })
              }
              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                cornersSquare.type === item.id
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-semibold ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
          Tâm mắt trong (Eye Dot)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CORNER_DOT_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onChangeCornersDot({ ...cornersDot, type: item.id })
              }
              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                cornersDot.type === item.id
                  ? 'border-blue-600 bg-blue-50/70 text-blue-700 font-semibold ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

