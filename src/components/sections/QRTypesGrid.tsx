import React from 'react';
import { QR_TYPES } from '../../data/qrTypes';
import {
  Globe,
  Wifi,
  Contact,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={24} className="text-blue-600" />,
  Wifi: <Wifi size={24} className="text-teal-600" />,
  Contact: <Contact size={24} className="text-indigo-600" />,
  FileText: <FileText size={24} className="text-amber-600" />,
  Mail: <Mail size={24} className="text-rose-600" />,
  MessageSquare: <MessageSquare size={24} className="text-emerald-600" />,
  Calendar: <Calendar size={24} className="text-purple-600" />,
};

export const QRTypesGrid: React.FC = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="qr-types" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Hỗ trợ đa dạng
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3">
            Mọi loại mã QR bạn cần
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Tối ưu hóa khả năng tương thích với camera mặc định trên cả hệ điều hành iOS và Android.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QR_TYPES.map((t) => (
            <div
              key={t.id}
              onClick={scrollToGenerator}
              className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[t.icon]}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {t.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-xs font-semibold text-blue-600 gap-1 group-hover:gap-2 transition-all">
                <span>Tạo mã này</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

