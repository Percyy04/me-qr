import React from 'react';
import { Button } from '../common/Button';
import { ArrowUp, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold mb-6">
          <Sparkles size={14} />
          <span>Sẵn sàng tạo mã cho dự án của bạn?</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
          Tạo Mã QR Nhanh Chóng, Đẹp Mắt & Hoàn Toàn Miễn Phí
        </h2>
        <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Không cần thẻ tín dụng, không cần tài khoản. Mọi thứ hoạt động ngay tức thì trên thiết bị của bạn.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToGenerator}
            className="bg-white text-blue-600 hover:bg-blue-50 border-transparent shadow-xl font-bold"
            icon={<ArrowUp size={18} />}
          >
            Cuộn lên để tạo mã ngay
          </Button>
        </div>
      </div>
    </section>
  );
};

