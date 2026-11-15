import React from 'react';
import { ShieldCheck, Infinity, Sparkles, Layers } from 'lucide-react';

const FEATURES = [
  {
    icon: <ShieldCheck size={28} className="text-emerald-500" />,
    title: '100% Bảo mật & Riêng tư',
    desc: 'Toàn bộ quá trình tạo mã QR diễn ra hoàn toàn trên trình duyệt của bạn (Client-Side). Mật khẩu Wi-Fi, email, danh bạ không bao giờ được gửi lên bất kỳ máy chủ nào.',
    badge: 'Bảo mật',
    span: 'col-span-1 lg:col-span-2',
  },
  {
    icon: <Infinity size={28} className="text-blue-500" />,
    title: 'Không Giới Hạn Quét & Không Hết Hạn',
    desc: 'Mã QR tĩnh chứa trực tiếp thông tin gốc. Bạn có thể quét hàng triệu lần mà không bao giờ lo lắng về việc mã bị khóa hoặc bị tính phí gia hạn.',
    badge: 'Vĩnh viễn',
    span: 'col-span-1',
  },
  {
    icon: <Layers size={28} className="text-indigo-500" />,
    title: 'Xuất Vector SVG & PNG 4K Sắc Nét',
    desc: 'Xuất file chuẩn đồ họa in ấn khổ lớn cho biển bảng, poster, bao bì sản phẩm mà hoàn toàn không lo bị nhòe hay vỡ hạt.',
    badge: 'Chuẩn in ấn',
    span: 'col-span-1',
  },
  {
    icon: <Sparkles size={28} className="text-amber-500" />,
    title: 'Khung Nhận Diện & Tùy Biến Đỉnh Cao',
    desc: 'Tăng 40% tỷ lệ quét với 8 mẫu khung kêu gọi (SCAN ME), hoa văn bo tròn cao cấp, dải màu gradient và logo thương hiệu ở giữa.',
    badge: 'Độc quyền',
    span: 'col-span-1 lg:col-span-2',
  },
];

export const FeaturesHighlight: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Ưu thế vượt trội
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3">
            Tại sao nên chọn ME-QR Clone?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Trải nghiệm tối giản, hiện đại, không quảng cáo làm phiền và tôn trọng quyền riêng tư của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`${f.span} bg-white rounded-3xl p-8 border border-slate-200/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    {f.icon}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

