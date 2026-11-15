import React from 'react';
import { QRGeneratorWidget } from '../generator/QRGeneratorWidget';
import { Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-400/10 via-teal-300/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles size={14} className="text-blue-600" />
            <span>100% Client-Side • Miễn phí vĩnh viễn • Không quảng cáo</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Tạo Mã QR Chuyên Nghiệp <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 bg-clip-text text-transparent">Chỉ Trong Vài Giây</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Trình tạo mã QR hiện đại hỗ trợ Website URL, Wi-Fi, vCard danh bạ, Email, SMS kèm bộ sưu tập khung trang trí và logo thương hiệu sắc nét.
          </p>
        </div>

        {/* Master Generator Widget */}
        <QRGeneratorWidget />
      </div>
    </section>
  );
};

