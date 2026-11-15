import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { QuickQRStudioApp } from './components/studio/QuickQRStudioApp';
import { TrustedBrands } from './components/sections/TrustedBrands';
import { HowItWorks } from './components/sections/HowItWorks';
import { FeaturesHighlight } from './components/sections/FeaturesHighlight';
import { FAQSection } from './components/sections/FAQSection';
import { CTASection } from './components/sections/CTASection';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-canvas-bg text-slate-text-strong font-sans antialiased selection:bg-primary-container selection:text-white">
        {/* QuickQR Studio Master Application based on Stitch AI */}
        <QuickQRStudioApp />

        {/* Supporting Conversion Sections from ME-QR Ecosystem */}
        <TrustedBrands />
        <HowItWorks />
        <FeaturesHighlight />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
