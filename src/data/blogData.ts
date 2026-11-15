import { BlogPost } from '../types/blog.types';
import { qrBasicsPosts } from './posts/qrBasicsPosts';
import { qrBusinessPosts } from './posts/qrBusinessPosts';
import { qrAdvancedPosts } from './posts/qrAdvancedPosts';

export type { BlogPost };

export const ALL_BLOG_POSTS: BlogPost[] = [
  ...qrBasicsPosts,
  ...qrBusinessPosts,
  ...qrAdvancedPosts,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return ALL_BLOG_POSTS.slice(0, limit);

  return ALL_BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const cats = new Set(ALL_BLOG_POSTS.map((p) => p.category));
  return ['Tất cả', ...Array.from(cats)];
}
