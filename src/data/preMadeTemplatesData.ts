import { PreMadeTemplate, QRDesign } from '../types/qr.types';

const makeTpl = (
  id: string,
  name: string,
  category: PreMadeTemplate['category'],
  templateIndex: number | null,
  dotType: QRDesign['dots']['type'],
  dotColor: string,
  gradient?: { start: string; end: string; type?: 'linear' | 'radial' },
  cornerType?: QRDesign['cornersSquare']['type'],
  cornerColor?: string
): PreMadeTemplate => {
  const templateUrl = templateIndex === null
    ? null
    : templateIndex === 0
    ? '/templete/default.webp'
    : `/templete/default (${templateIndex}).webp`;

  return {
    id,
    name,
    category,
    design: {
      frame: {
        id: templateIndex === null ? 'none' : templateIndex === 0 ? 'default' : `tpl_${templateIndex}`,
        templateUrl,
        text: '',
        qrScale: 0.72,
        qrOffsetY: 0,
      },
      dots: {
        type: dotType,
        color: dotColor,
        gradient: gradient
          ? { enabled: true, type: gradient.type || 'linear', rotation: 45, startColor: gradient.start, endColor: gradient.end }
          : { enabled: false, type: 'linear', rotation: 0, startColor: dotColor, endColor: dotColor },
      },
      cornersSquare: {
        type: cornerType || 'extra-rounded',
        color: cornerColor || dotColor,
        customColor: Boolean(cornerColor),
      },
      cornersDot: {
        type: 'dot',
        color: cornerColor || dotColor,
        customColor: Boolean(cornerColor),
      },
      background: { color: '#FFFFFF', isTransparent: false },
      logo: { url: null, size: 0.25, margin: 4, hideBackgroundDots: true },
    },
  };
};

export const PREMADE_TEMPLATES: PreMadeTemplate[] = [
  // Business
  makeTpl('corp-navy', 'Corporate Navy', 'business', 1, 'rounded', '#0F2B5C', undefined, 'square'),
  makeTpl('gold-vip', 'Luxury Gold', 'business', 10, 'classy', '#1A1A1A', { start: '#D4AF37', end: '#AA7C11' }, 'square', '#D4AF37'),
  makeTpl('slate-pro', 'Slate Professional', 'business', 22, 'square', '#1E293B'),
  makeTpl('emerald-corp', 'Emerald Partner', 'business', 35, 'rounded', '#047857', undefined, 'extra-rounded', '#059669'),

  // Creative & Neon
  makeTpl('neon-cyber', 'Neon Cyberpunk', 'creative', 50, 'dots', '#00F0FF', { start: '#00F0FF', end: '#FF007F' }, 'dot', '#FF007F'),
  makeTpl('sunset-glow', 'Sunset Glow', 'creative', 68, 'classy-rounded', '#EA580C', { start: '#8A2387', end: '#F27121' }, 'dot'),
  makeTpl('cosmic-purple', 'Cosmic Purple', 'creative', 85, 'extra-rounded', '#7E22CE', { start: '#9333EA', end: '#C084FC' }),
  makeTpl('ticket-red', 'Event Ticket', 'creative', 100, 'rounded', '#991B1B', undefined, 'square', '#DC2626'),

  // Social
  makeTpl('social-insta', 'Instagram Story', 'social', 120, 'dots', '#C13584', { start: '#833AB4', end: '#FD1D1D' }),
  makeTpl('social-youtube', 'YouTube Video', 'social', 140, 'extra-rounded', '#CC0000', undefined, 'square'),
  makeTpl('social-tiktok', 'TikTok Trend', 'social', 160, 'extra-rounded', '#000000', { start: '#000000', end: '#25F4EE' }),
  makeTpl('social-telegram', 'Telegram Channel', 'social', 180, 'rounded', '#0284C7', undefined, 'dot'),

  // Modern
  makeTpl('ocean-blue', 'Ocean Blue', 'modern', 200, 'extra-rounded', '#0066FF', { start: '#0052D4', end: '#4364F7' }),
  makeTpl('mint-fresh', 'Mint Eco', 'modern', 225, 'dots', '#0F766E', { start: '#0D9488', end: '#34D399' }, 'dot'),
  makeTpl('coffee-artisan', 'Artisan Coffee', 'modern', 250, 'rounded', '#78350F', undefined, 'extra-rounded'),
  makeTpl('indigo-tech', 'Indigo Tech', 'modern', 280, 'classy', '#4338CA', undefined, 'square', '#4F46E5'),

  // Minimal
  makeTpl('minimal-noir', 'Monochrome Noir', 'minimal', 300, 'square', '#0F172A', undefined, 'square'),
  makeTpl('pure-dots', 'Pure Dots', 'minimal', null, 'dots', '#000000', undefined, 'dot', '#000000'),
  makeTpl('vintage-frame', 'Vintage Frame', 'minimal', 350, 'rounded', '#334155'),
  makeTpl('clean-circle', 'Round Badge', 'minimal', 400, 'extra-rounded', '#1D4ED8', undefined, 'dot'),
];
