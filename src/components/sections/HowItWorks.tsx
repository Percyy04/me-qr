import React from 'react';
import { FileEdit, Palette, DownloadCloud } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Chọn loại nội dung',
    desc: 'Chọn loại mã QR bạn muốn tạo: liên kết trang web, mạng Wi-Fi, danh bạ cá nhân vCard hoặc văn bản.',
    icon: <FileEdit size={24} className="text-blue-600" />,
  },
  {
    step: '02',
    title: 'Tùy biến phong cách',
    desc: 'Lựa chọn khung kêu gọi hành động (SCAN ME), hoa văn chấm bo tròn, phối màu gradient hoặc gắn logo thương hiệu.',
    icon: <Palette size={24} className="text-blue-600" />,
  },
  {
    step: '03',
    title: 'Tải xuống & Chia sẻ',
    desc: 'Xuất file PNG độ phân giải cực nét, file Vector SVG chuẩn in ấn không vỡ hạt, hoặc bản in tài liệu PDF A4 tiện lợi.',
    icon: <DownloadCloud size={24} className="text-blue-600" />,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Quy trình đơn giản
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3">
            Tạo mã QR chỉ với 3 bước dễ dàng
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Không cần đăng ký tài khoản, không thủ tục rườm rà. Bắt đầu ngay trên trình duyệt của bạn!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col relative group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <span className="font-display font-black text-3xl text-slate-200 group-hover:text-blue-200 transition-colors">
                  {s.step}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

