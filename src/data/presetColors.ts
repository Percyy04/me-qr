export const COLOR_PRESETS = [
  '#0066FF', // Brand Blue
  '#0F172A', // Slate 900
  '#00C4B4', // Teal
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#EF4444', // Red
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#14B8A6', // Cyan
];

export interface GradientPreset {
  name: string;
  startColor: string;
  endColor: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { name: 'Ocean Blue', startColor: '#0052D4', endColor: '#4364F7' },
  { name: 'Sunset Violet', startColor: '#8A2387', endColor: '#F27121' },
  { name: 'Emerald Mint', startColor: '#0BA360', endColor: '#3CBA92' },
  { name: 'Midnight Noir', startColor: '#141E30', endColor: '#243B55' },
  { name: 'Neon Cyber', startColor: '#FF007F', endColor: '#7928CA' },
];

