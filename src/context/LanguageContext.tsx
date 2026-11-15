import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationKey, TRANSLATIONS } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY = 'quickqr_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'vi' || saved === 'en') return saved;
    } catch {}
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (language === 'en') {
        document.title = 'QuickQR Studio | Professional QR Code Generator & 100% Client-Side Free';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', 'Professional QR code generator with halftone logo customization, SVG and PNG exports. 100% private in your browser.');
      } else {
        document.title = 'QuickQR Studio | Tạo mã QR chuyên nghiệp & Miễn phí 100% Client-Side';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', 'Trình tạo mã QR chuyên nghiệp, tùy biến logo halftone, khung viền, hoa văn và tải xuống PNG, SVG, PDF. 100% riêng tư và bảo mật trên trình duyệt.');
      }
    }
  }, [language]);

  const t = (key: TranslationKey): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.vi;
    return dict[key] || TRANSLATIONS.vi[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback safe defaults if used outside provider
    return {
      language: 'vi',
      setLanguage: () => {},
      t: (key: TranslationKey) => TRANSLATIONS.vi[key] || key,
    };
  }
  return ctx;
};
