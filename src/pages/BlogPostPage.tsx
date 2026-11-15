import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../data/blogData';
import { StudioHeader } from '../components/studio/StudioHeader';
import { Footer } from '../components/layout/Footer';
import { Clock, Calendar, ChevronRight, Sparkles, BookOpen, ArrowLeft, ArrowRight, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | QuickQR Studio Blog`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', post.description);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <StudioHeader />
        <main className="flex-1 max-w-xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">404 - Không tìm thấy bài viết</h1>
          <p className="text-sm text-slate-600 mb-6">Bài viết bạn đang tìm kiếm có thể đã được đổi đường dẫn hoặc tạm gỡ.</p>
          <Link to="/blog" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-purple-700">
            <ArrowLeft size={14} /><span>Quay lại trang danh sách Blog</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <StudioHeader />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-purple-600">Trang chủ</Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <Link to="/blog" className="hover:text-purple-600">Blog</Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">{post.title}</span>
        </div>
      </nav>

      {/* Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Meta badges & Title */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-0.5 rounded-full border border-purple-200">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={13} /><span>{post.readingTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>Bởi <strong className="text-slate-800">{post.author}</strong> ({post.authorRole})</span>
            <span>•</span>
            <div className="flex items-center gap-1"><Calendar size={13} /><span>{post.publishedAt}</span></div>
          </div>
        </div>

        {/* AI Cover Banner */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs mb-8 aspect-video bg-slate-900">
          <img src={post.coverImage} alt={post.coverAlt} className="w-full h-full object-cover" />
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            <BookOpen size={15} className="text-purple-600" />
            <span>Mục lục bài viết</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {post.sections.map((sec, i) => (
              <li key={i} className="flex items-center gap-2 hover:text-purple-600">
                <span className="w-4 h-4 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <a href={`#sec-${i}`} className="hover:underline">{sec.heading}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body */}
        <article className="space-y-8 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          {post.sections.map((sec, idx) => (
            <section key={idx} id={`sec-${idx}`} className="space-y-3.5 scroll-mt-20">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.callout && (
                <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 my-3 ${
                  sec.callout.type === 'tip'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : sec.callout.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-purple-50 border-purple-200 text-purple-900'
                }`}>
                  {sec.callout.type === 'tip' && <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />}
                  {sec.callout.type === 'warning' && <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />}
                  {sec.callout.type === 'note' && <Info size={18} className="text-purple-600 shrink-0 mt-0.5" />}
                  <span className="leading-relaxed font-medium">{sec.callout.text}</span>
                </div>
              )}
            </section>
          ))}

          {/* Action CTA Widget */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white text-center sm:text-left sm:flex items-center justify-between gap-6 shadow-md mt-10">
            <div>
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles size={18} className="text-amber-300" />
                <span>Thực hành tạo mã QR ngay</span>
              </h3>
              <p className="text-xs text-purple-200 mt-1">100% riêng tư trên trình duyệt, không tài khoản, tải file SVG & PNG sắc nét.</p>
            </div>
            <Link to={`/?type=${post.relatedType}`} className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-purple-900 rounded-xl text-xs font-extrabold hover:bg-purple-50 transition-colors shadow-xs shrink-0 cursor-pointer">
              <span>Mở công cụ tạo mã</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-5">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <Link key={rel.id} to={`/blog/${rel.slug}`} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-purple-300 transition-all group shadow-2xs">
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{rel.category}</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-purple-600 mt-2 line-clamp-2 leading-snug">{rel.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2"><Clock size={11} /><span>{rel.readingTime}</span></div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
