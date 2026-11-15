import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Crown, Globe, ChevronDown, Check } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../locales/translations';

export const StudioHeader: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-surface-card border-b border-border-subtle sticky top-0 z-40 px-4 sm:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Version Pill */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity">
            <Logo size="md" />
          </Link>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-tint text-primary-container border border-indigo-200">
            {t('proBadge')}
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <Link to="/" className="hover:text-purple-600 transition-colors">
            {language === 'en' ? 'Studio' : 'Tạo mã QR'}
          </Link>
          <Link to="/blog" className="hover:text-purple-600 transition-colors">
            {language === 'en' ? 'Blog & Guides' : 'Cẩm nang QR'}
          </Link>
          <a href="/#faq" className="hover:text-purple-600 transition-colors">
            {language === 'en' ? 'FAQ' : 'Hỏi đáp'}
          </a>
        </nav>

        {/* Right Badges & Language Selector */}
        <div className="flex items-center gap-3">
          {/* Privacy Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <ShieldCheck size={14} />
            <span>{t('privacyPill')}</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-label={t('langSelect')}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-subtle bg-canvas-bg hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <Globe size={14} className="text-primary-container" />
              <span>{language === 'vi' ? '🇻🇳 VN' : '🇬🇧 EN'}</span>
              <ChevronDown size={12} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white border border-border-subtle rounded-xl shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => handleSelectLanguage('vi')}
                  className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-indigo-tint/40 transition-colors ${
                    language === 'vi' ? 'text-primary-container font-bold bg-indigo-tint/20' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇻🇳</span>
                    <span>Tiếng Việt</span>
                  </span>
                  {language === 'vi' && <Check size={14} className="text-primary-container" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectLanguage('en')}
                  className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-indigo-tint/40 transition-colors ${
                    language === 'en' ? 'text-primary-container font-bold bg-indigo-tint/20' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    <span>English</span>
                  </span>
                  {language === 'en' && <Check size={14} className="text-primary-container" />}
                </button>
              </div>
            )}
          </div>

          {/* Upgrade PRO CTA */}
          <a
            href="#pricing"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Crown size={14} className="text-amber-300" />
            <span>{t('upgradePro')}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
