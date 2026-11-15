import { describe, it, expect } from 'vitest';
import { generateQRMatrix, isFunctionalModule } from './qrMatrixHelper';
import { generateHalftoneQRSvg } from './halftoneQrRenderer';

describe('Halftone QR Engine', () => {
  it('generates a valid QR matrix with Error Correction level H', () => {
    const data = generateQRMatrix('https://me-qr.com', 'H');
    expect(data.size).toBeGreaterThanOrEqual(21);
    expect(data.matrix.length).toBe(data.size);
    expect(data.matrix[0].length).toBe(data.size);
  });

  it('accurately identifies functional modules (finder, timing, format)', () => {
    const data = generateQRMatrix('https://me-qr.com', 'H');
    const { size, version } = data;

    // Top-Left Finder
    expect(isFunctionalModule(0, 0, version, size)).toBe(true);
    expect(isFunctionalModule(6, 6, version, size)).toBe(true);
    expect(isFunctionalModule(7, 7, version, size)).toBe(true);

    // Top-Right Finder
    expect(isFunctionalModule(0, size - 1, version, size)).toBe(true);

    // Bottom-Left Finder
    expect(isFunctionalModule(size - 1, 0, version, size)).toBe(true);

    // Timing patterns
    expect(isFunctionalModule(6, 12, version, size)).toBe(true);
    expect(isFunctionalModule(12, 6, version, size)).toBe(true);
  });

  it('generates a clean scalable SVG string without errors', () => {
    const data = generateQRMatrix('https://me-qr.com', 'H');
    const svg = generateHalftoneQRSvg(data, null, {
      size: 500,
      logoScale: 0.75,
      darkColor: '#000000',
      lightColor: '#ffffff',
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 500 500"');
    expect(svg).toContain('</svg>');
  });
});
