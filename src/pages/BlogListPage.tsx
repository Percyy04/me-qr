import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ALL_BLOG_POSTS, getAllCategories } from '../data/blogData';
import { StudioHeader } from '../components/studio/StudioHeader';
import { Footer } from '../components/layout/Footer';
import { Search, Clock, Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('Tất cả');
  const categories = useMemo(() => getAllCategories(), []);

  useEffect(() => {
    document.title = 'Cẩm nang & Hướng dẫn tạo mã QR chuyên sâu | QuickQR Studio Blog';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Tổng hợp 10+ bài viết hướng dẫn tạo mã QR miễn phí, mã QR Wi-Fi, vCard, Google Maps, tối ưu khả năng quét và kỹ thuật in ấn vector SVG.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_BLOG_POSTS.filter((post) => {
      const matchCat = selectedCat === 'Tất cả' || post.category === selectedCat;
      const matchQ =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, selectedCat]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <StudioHeader />

      {/* Hero Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-4 shadow-2xs">
            <Sparkles size={13} />
            <span>Cẩm nang kiến thức mã QR chuyên nghiệp</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Tất cả những gì bạn cần biết về mã QR
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Hướng dẫn thực chiến từ cơ bản đến chuyên sâu: kỹ thuật in ấn vector, tối ưu khả năng quét, bảo mật Wi-Fi và danh thiếp điện tử thông minh.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết (ví dụ: wifi, vcard, logo, in ấn, sửa lỗi...)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-3 focus:ring-purple-100 transition-all shadow-xs"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-purple-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Danh sách bài viết ({filteredPosts.length})
            </h2>
          </div>
          <span className="text-xs text-slate-500">Cập nhật tháng 11/2026</span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-8">
            <p className="text-sm font-semibold text-slate-700">Không tìm thấy bài viết nào phù hợp với từ khóa.</p>
            <button
              type="button"
              onClick={() => { setQuery(''); setSelectedCat('Tất cả'); }}
              className="mt-4 px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-purple-700"
            >
              Xem tất cả bài viết
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col group"
              >
                <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={post.coverImage}
                    alt={post.coverAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    {post.category}
                  </span>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2.5">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{post.publishedAt}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">
                      Bởi <strong className="text-slate-700">{post.author}</strong>
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
