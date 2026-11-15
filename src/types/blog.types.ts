import { QRType } from './qr.types';

export interface BlogArticleSection {
  heading: string;
  paragraphs: string[];
  callout?: {
    type: 'tip' | 'note' | 'warning';
    text: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Cơ bản' | 'Kỹ thuật' | 'Doanh nghiệp' | 'Thiết kế';
  readingTime: string;
  publishedAt: string;
  author: string;
  authorRole: string;
  coverImage: string;
  coverAlt: string;
  relatedType: QRType;
  tags: string[];
  sections: BlogArticleSection[];
}
