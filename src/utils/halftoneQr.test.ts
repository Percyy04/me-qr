import { describe, it, expect } from 'vitest';
import { generateQRMatrix, isFinderPattern, isFunctionalModule } from './qrMatrixHelper';
import { generateHalftoneQRSvg } from './halftoneQrRenderer';

describe('Halftone QR Engine', () => {
  it('generates a valid QR matrix with Error Correction level H', () => {
    const data = generateQRMatrix('https://me-qr.com', 'H');
    expect(data.size).toBeGreaterThanOrEqual(21);
    expect(data.matrix.length).toBe(data.size);
    expect(data.matrix[0].length).toBe(data.size);
  });

  it('accurately identifies only the 3 corner finder patterns as protected blocks', () => {
    const data = generateQRMatrix('https://me-qr.com', 'H');
    const { size, version } = data;

    // Top-Left Finder
    expect(isFinderPattern(0, 0, size)).toBe(true);
    expect(isFinderPattern(6, 6, size)).toBe(true);
    expect(isFinderPattern(7, 7, size)).toBe(true);
    expect(isFunctionalModule(0, 0, version, size)).toBe(true);

    // Top-Right Finder
    expect(isFinderPattern(0, size - 1, size)).toBe(true);
    expect(isFinderPattern(7, size - 8, size)).toBe(true);

    // Bottom-Left Finder
    expect(isFinderPattern(size - 1, 0, size)).toBe(true);
    expect(isFinderPattern(size - 8, 7, size)).toBe(true);

    // Timing and middle data modules are NOT blocked, keeping the logo continuous
    expect(isFinderPattern(6, 12, size)).toBe(false);
    expect(isFinderPattern(12, 6, size)).toBe(false);
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
