import React from 'react';
import { ShieldCheck, Crown } from 'lucide-react';
import { Logo } from '../common/Logo';

export const StudioHeader: React.FC = () => {
  return (
    <header className="bg-surface-card border-b border-border-subtle sticky top-0 z-40 px-4 sm:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Version Pill */}
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-tint text-primary-container border border-indigo-200">
            PRO v2.4
          </span>
        </div>

        {/* Center / Right Nav Badges & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <ShieldCheck size={14} />
            <span>100% Client-Side Private</span>
          </div>

          <a
            href="#pricing"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Crown size={14} className="text-amber-300" />
            <span>Nâng cấp PRO</span>
          </a>
        </div>
      </div>
    </header>
  );
};
