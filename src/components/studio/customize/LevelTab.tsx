import React, { useMemo } from 'react';
import qrcode from 'qrcode-generator';
import { QRDesign } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';

interface LevelTabProps {
  design: QRDesign;
  onChange: (design: QRDesign) => void;
}

type ECLevel = 'H' | 'Q' | 'M' | 'L';

const generateMiniQrPath = (level: ECLevel): { d: string; size: number } => {
  const qr = qrcode(0, level);
  qr.addData('https://me-qr.com/sample-data-demo-path');
  qr.make();
  const size = qr.getModuleCount();
  let d = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (qr.isDark(r, c)) d += `M${c},${r}h1v1h-1z `;
    }
  }
  return { d, size };
};

export const LevelTab: React.FC<LevelTabProps> = ({ design, onChange }) => {
  const { t } = useLanguage();
  const currentLevel: ECLevel = design.errorCorrectionLevel || (design.logo.url ? 'H' : 'Q');

  const miniQrPaths = useMemo(() => {
    return {
      H: generateMiniQrPath('H'),
      Q: generateMiniQrPath('Q'),
      M: generateMiniQrPath('M'),
      L: generateMiniQrPath('L'),
    };
  }, []);

  const options: { id: ECLevel; title: string; desc: string }[] = [
    { id: 'H', title: t('ecLevelBest'), desc: t('ecLevelBestDesc') },
    { id: 'Q', title: t('ecLevelHigh'), desc: t('ecLevelHighDesc') },
    { id: 'M', title: t('ecLevelMedium'), desc: t('ecLevelMediumDesc') },
    { id: 'L', title: t('ecLevelLowest'), desc: t('ecLevelLowestDesc') },
  ];

  return (
    <div className="space-y-4 pt-1">
      <div>
        <h3 className="text-xs sm:text-sm font-bold text-slate-800">
          {t('ecLevelTitle')}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
          {t('ecLevelSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = currentLevel === opt.id;
          const { d, size } = miniQrPaths[opt.id];
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ ...design, errorCorrectionLevel: opt.id })}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#9333EA] bg-[#FAF5FF] ring-2 ring-[#9333EA]/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="w-11 h-11 shrink-0 bg-white rounded-lg p-1 flex items-center justify-center border border-slate-100 shadow-2xs">
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  className="w-9 h-9 text-slate-900"
                  shapeRendering="crispEdges"
                >
                  <path d={d} fill="currentColor" />
                </svg>
              </div>

              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  {opt.title}
                </div>
                <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  {opt.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
