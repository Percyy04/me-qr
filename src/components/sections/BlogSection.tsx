import React, { useState } from 'react';
import { BLOG_POSTS_VI, BLOG_POSTS_EN, BlogPost } from '../../data/blogData';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles } from 'lucide-react';
import { QRType } from '../../types/qr.types';

interface BlogSectionProps {
  onSelectType?: (type: QRType) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectType }) => {
  const { language } = useLanguage();
  const posts = language === 'en' ? BLOG_POSTS_EN : BLOG_POSTS_VI;
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleActionClick = (type: QRType) => {
    setSelectedPost(null);
    if (onSelectType) onSelectType(type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="blog" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {language === 'en' ? 'Guides & Insights' : 'Cẩm nang & Hướng dẫn'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-3">
            {language === 'en' ? 'QR Code Knowledge Base' : 'Kiến thức mã QR chuyên sâu'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            {language === 'en'
              ? 'Best practices on QR scannability, vector printing, and client-side security.'
              : 'Kinh nghiệm tối ưu khả năng quét mã, kỹ thuật in ấn vector và bảo mật 100% trên thiết bị.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-sm hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock size={12} />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{post.publishedAt}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
                >
                  <span>{language === 'en' ? 'Read Guide' : 'Đọc hướng dẫn'}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[85vh] overflow-y-auto relative animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-lg hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold mb-3">
              <BookOpen size={14} />
              <span>{selectedPost.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-slate-400">
                <Calendar size={12} />
                <span>{selectedPost.publishedAt}</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-4">
              {selectedPost.title}
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-b border-slate-100 py-4 my-4">
              {selectedPost.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 italic">
                {language === 'en' ? 'By' : 'Tác giả:'} {selectedPost.author}
              </span>

              <button
                type="button"
                onClick={() => handleActionClick(selectedPost.relatedType)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                <Sparkles size={14} />
                <span>{language === 'en' ? 'Create this QR Type' : 'Tạo mã QR này ngay'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
