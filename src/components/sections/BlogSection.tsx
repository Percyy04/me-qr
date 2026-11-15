import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_BLOG_POSTS } from '../../data/blogData';
import { Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const featuredPosts = ALL_BLOG_POSTS.slice(0, 4);

  return (
    <section id="blog" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              <Sparkles size={12} />
              Cẩm nang & Kiến thức QR Pro
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-3">
              Kinh nghiệm tối ưu & Khai thác Mã QR đa lĩnh vực
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Bộ bài viết chuyên sâu về kỹ thuật quét mã, bảo mật 100% Client-Side, in ấn vector và ứng dụng chuyển đổi kinh doanh.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all"
          >
            <span>Khám phá toàn bộ Blog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-purple-700 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-purple-100 shadow-xs">
                    {post.category}
                  </span>
                </Link>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-2">
                    <Clock size={12} />
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Bởi {post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Chi tiết</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-purple-600 transition-colors"
          >
            <BookOpen size={14} />
            <span>Xem đầy đủ 11 bài viết hướng dẫn chuyên sâu mã QR</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};
