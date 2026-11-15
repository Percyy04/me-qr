import React, { useState } from 'react';
import { Menu, X, QrCode, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToGenerator = () => {
    document.getElementById('generator-widget')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={scrollToGenerator}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <QrCode size={24} />
            </div>
            <div className="flex items-baseline font-display font-extrabold text-2xl tracking-tight">
              <span className="text-blue-600">ME</span>
              <span className="text-slate-900">-QR</span>
              <span className="ml-1 text-[11px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full uppercase">
                Pro
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={scrollToGenerator} className="hover:text-blue-600 transition-colors">
              Trình tạo mã QR
            </button>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              Cách hoạt động
            </a>
            <a href="#qr-types" className="hover:text-blue-600 transition-colors">
              Các loại mã
            </a>
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Tính năng
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">
              Hỏi đáp (FAQ)
            </a>
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              100% Client-Side
            </span>
            <Button variant="primary" size="md" onClick={scrollToGenerator} icon={<Sparkles size={16} />}>
              Tạo mã ngay
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={scrollToGenerator}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-blue-600"
          >
            Trình tạo mã QR
          </button>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-medium text-slate-700 hover:text-blue-600"
          >
            Cách hoạt động
          </a>
          <a
            href="#qr-types"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-medium text-slate-700 hover:text-blue-600"
          >
            Các loại mã
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-medium text-slate-700 hover:text-blue-600"
          >
            Tính năng
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-medium text-slate-700 hover:text-blue-600"
          >
            Hỏi đáp (FAQ)
          </a>
          <div className="pt-2">
            <Button variant="primary" size="md" onClick={scrollToGenerator} className="w-full">
              Tạo mã ngay
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
