import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { QuickQRStudioApp } from './components/studio/QuickQRStudioApp';
import { HowItWorks } from './components/sections/HowItWorks';
import { FeaturesHighlight } from './components/sections/FeaturesHighlight';
import { BlogSection } from './components/sections/BlogSection';
import { FAQSection } from './components/sections/FAQSection';
import { CTASection } from './components/sections/CTASection';
import { Footer } from './components/layout/Footer';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';

const HomePage: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-canvas-bg text-slate-text-strong font-sans antialiased selection:bg-primary-container selection:text-white">
    <QuickQRStudioApp />
    <HowItWorks />
    <FeaturesHighlight />
    <BlogSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
