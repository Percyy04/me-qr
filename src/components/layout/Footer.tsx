import React from 'react';
import { QrCode, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <QrCode size={20} />
            </div>
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              ME<span className="text-blue-500">-QR</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nền tảng tạo mã QR miễn phí 100% Client-Side. Không lưu trữ dữ liệu, không giới hạn lượt quét, không chèn quảng cáo trung gian.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Loại mã QR
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#generator-widget" className="hover:text-white transition-colors">Website URL</a></li>
            <li><a href="#generator-widget" className="hover:text-white transition-colors">Wi-Fi tự động kết nối</a></li>
            <li><a href="#generator-widget" className="hover:text-white transition-colors">Danh bạ vCard</a></li>
            <li><a href="#generator-widget" className="hover:text-white transition-colors">Email & SMS</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Tài nguyên & Hướng dẫn
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/blog" className="hover:text-white transition-colors">Cẩm nang kiến thức QR (Blog)</a></li>
            <li><a href="/#faq" className="hover:text-white transition-colors">Câu hỏi thường gặp (FAQ)</a></li>
            <li><a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Sơ đồ trang (Sitemap)</a></li>
            <li><a href="/#generator-widget" className="hover:text-white transition-colors">Xuất SVG & PDF sắc nét</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Cam kết quyền riêng tư
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ứng dụng hoạt động độc lập ngay trên trình duyệt của bạn bằng JavaScript & HTML5 Canvas. Dữ liệu của bạn được giữ an toàn tuyệt đối 100%.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 ME-QR Clone. Hoàn toàn miễn phí & mã nguồn mở.</p>
        <p className="flex items-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> for community
        </p>
      </div>
    </footer>
  );
};

