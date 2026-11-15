import { describe, it, expect } from 'vitest';
import { PREMADE_TEMPLATES } from './preMadeTemplatesData';
import { FRAME_PRESETS } from './framePresets';

describe('Pre-made Templates Gallery', () => {
  it('contains at least 20 curated templates', () => {
    expect(PREMADE_TEMPLATES.length).toBeGreaterThanOrEqual(20);
  });

  it('each template has valid unique id and name', () => {
    const ids = new Set();
    PREMADE_TEMPLATES.forEach((t) => {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.design).toBeDefined();
      expect(t.design.dots.color).toBeTruthy();
      expect(ids.has(t.id)).toBe(false);
      ids.add(t.id);
    });
  });

  it('covers all 5 design categories', () => {
    const categories = new Set(PREMADE_TEMPLATES.map((t) => t.category));
    expect(categories.has('business')).toBe(true);
    expect(categories.has('creative')).toBe(true);
    expect(categories.has('social')).toBe(true);
    expect(categories.has('modern')).toBe(true);
    expect(categories.has('minimal')).toBe(true);
  });
});

describe('ME-QR Frame Templates Integration', () => {
  it('contains none option plus 417 authentic ME-QR templates', () => {
    expect(FRAME_PRESETS.length).toBe(418);
    expect(FRAME_PRESETS[0].id).toBe('none');
    expect(FRAME_PRESETS[0].templateUrl).toBeNull();
  });

  it('has unique frame ids and valid WebP template URLs', () => {
    const ids = new Set<string>();
    FRAME_PRESETS.forEach((f) => {
      expect(f.id).toBeTruthy();
      expect(f.label).toBeTruthy();
      expect(ids.has(f.id)).toBe(false);
      ids.add(f.id);
      if (f.id !== 'none') {
        expect(f.templateUrl).toMatch(/^\/templete\/default.*\.webp$/);
      }
    });
  });
});

