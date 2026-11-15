import React from 'react';
import { CheckCircle2, AlertTriangle, Wand2 } from 'lucide-react';
import { ScannabilityResult } from '../../../hooks/useScannability';

interface ScannabilityIndicatorProps {
  status: ScannabilityResult;
  onAutoFix?: () => void;
}

export const ScannabilityIndicator: React.FC<ScannabilityIndicatorProps> = ({
  status,
  onAutoFix,
}) => {
  const isOk = status.isScannable;

  return (
    <div className="w-full mt-3">
      <div
        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
          isOk
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}
      >
        <div className="flex items-center gap-2">
          {isOk ? (
            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
          ) : (
            <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 animate-pulse" />
          )}
          <span className="font-semibold">{status.message}</span>
        </div>

        {!isOk && onAutoFix && (
          <button
            type="button"
            onClick={onAutoFix}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm transition-colors"
          >
            <Wand2 size={12} />
            <span>Tự sửa</span>
          </button>
        )}
      </div>
    </div>
  );
};
