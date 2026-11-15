import React from 'react';
import { QrFrameTemplate, QrFrameCategory } from '../../../types/qrFrame';
import { QR_FRAME_REGISTRY, FRAME_CATEGORIES } from '../../../constants/qrFrameRegistry';
import { ChevronDown, ChevronUp, GraduationCap, HeartHandshake, Gamepad2, Flag, Coffee, ShoppingBag } from 'lucide-react';

interface ModalCategoryAccordionProps {
  search: string;
  openCatId: string;
  onToggleCat: (catId: string) => void;
  selectedFrameId: string;
  onSelectFrame: (frame: QrFrameTemplate) => void;
}

const CAT_ICONS: Record<QrFrameCategory, React.ReactNode> = {
  campus: <GraduationCap size={16} className="text-blue-600" />,
  'student-life': <HeartHandshake size={16} className="text-rose-600" />,
  'esports-tech': <Gamepad2 size={16} className="text-purple-600" />,
  'vn-festival': <Flag size={16} className="text-red-600" />,
  fnb: <Coffee size={16} className="text-amber-700" />,
  ecommerce: <ShoppingBag size={16} className="text-emerald-600" />,
};

export const ModalCategoryAccordion: React.FC<ModalCategoryAccordionProps> = ({
  search,
  openCatId,
  onToggleCat,
  selectedFrameId,
  onSelectFrame,
}) => {
  const q = search.toLowerCase().trim();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {FRAME_CATEGORIES.map((cat) => {
        const isExp = openCatId === cat.id;
        const catFrames = QR_FRAME_REGISTRY.filter((f) => f.category === cat.id);
        const filtered = catFrames.filter(
          (f) => !q || f.name.toLowerCase().includes(q) || f.defaultLabel.toLowerCase().includes(q) || f.id.toLowerCase().includes(q)
        );

        if (q && filtered.length === 0) return null;

        return (
          <div key={cat.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => onToggleCat(isExp ? '' : cat.id)}
              className="w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {CAT_ICONS[cat.id]}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{cat.label}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-purple-100 text-purple-700">{cat.badge}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{filtered.length} khung vector SVG</p>
                </div>
              </div>
              {isExp ? <ChevronUp size={16} className="text-slate-500 shrink-0" /> : <ChevronDown size={16} className="text-slate-500 shrink-0" />}
            </button>

            {isExp && (
              <div className="p-3 bg-white grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filtered.map((item) => {
                  const isSel = selectedFrameId.toUpperCase() === item.id.toUpperCase();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectFrame(item)}
                      title={item.name}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-between transition-all cursor-pointer text-left group ${
                        isSel ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-500/20 shadow-xs' : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="w-full aspect-[320/380] max-h-36 overflow-hidden pointer-events-none flex items-center justify-center p-1">
                        {item.renderSvg({
                          labelText: item.defaultLabel,
                          primaryColor: item.defaultColors.primary,
                          secondaryColor: item.defaultColors.secondary,
                        })}
                      </div>
                      <div className="w-full mt-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800 truncate">{item.name}</span>
                        <span className="text-[9px] font-mono text-purple-600">{item.id}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
