import { QRMatrixData, isFinderPattern } from './qrMatrixHelper';

export interface HalftoneOptions {
  size: number;
  logoScale: number; // 0.4 to 0.85 (default ~0.68)
  dotScale?: number; // 0.44 uniform diameter
  darkColor?: string;
  lightColor?: string;
  margin?: number; // 3 modules quiet zone
}

export function renderHalftoneQRToCanvas(
  canvas: HTMLCanvasElement,
  data: QRMatrixData,
  logoImg: HTMLImageElement | null,
  options: HalftoneOptions
) {
  const { size, logoScale, dotScale = 0.44, darkColor = '#000000', lightColor = '#ffffff', margin = 3 } = options;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Fill Quiet Zone / Canvas Background
  ctx.fillStyle = lightColor;
  ctx.fillRect(0, 0, size, size);

  const N = data.size;
  const cellSize = size / (N + margin * 2);
  const matrixWidth = N * cellSize;
  const logoDim = matrixWidth * Math.min(Math.max(logoScale || 0.68, 0.4), 0.85);
  const logoX = (size - logoDim) / 2;
  const logoY = (size - logoDim) / 2;

  // 2. Draw Continuous Original Logo
  if (logoImg && logoImg.complete && logoImg.naturalWidth) {
    ctx.drawImage(logoImg, logoX, logoY, logoDim, logoDim);
  }

  // 3. Extract Image Data for Luminance Sampling
  const imgData = ctx.getImageData(0, 0, size, size).data;

  // 4. Clear & Draw 3 Unified Corner Finder Patterns
  const corners = [
    { fx: margin * cellSize, fy: margin * cellSize, sx: margin * cellSize, sy: margin * cellSize },
    { fx: (margin + N - 7) * cellSize, fy: margin * cellSize, sx: (margin + N - 8) * cellSize, sy: margin * cellSize },
    { fx: margin * cellSize, fy: (margin + N - 7) * cellSize, sx: margin * cellSize, sy: (margin + N - 8) * cellSize },
  ];

  corners.forEach(({ fx, fy, sx, sy }) => {
    ctx.fillStyle = lightColor;
    ctx.fillRect(sx, sy, 8 * cellSize, 8 * cellSize);
    ctx.fillStyle = darkColor;
    ctx.fillRect(fx, fy, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = lightColor;
    ctx.fillRect(fx + cellSize, fy + cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = darkColor;
    ctx.fillRect(fx + 2 * cellSize, fy + 2 * cellSize, 3 * cellSize, 3 * cellSize);
  });

  // 5. Render Uniform Small Circular Dots Everywhere (dotScale = 0.44)
  const dotRadius = (cellSize * dotScale) / 2;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (isFinderPattern(r, c, N)) continue;

      const cx = (c + margin + 0.5) * cellSize;
      const cy = (r + margin + 0.5) * cellSize;
      const px = Math.min(Math.max(Math.floor(cx), 0), size - 1);
      const py = Math.min(Math.max(Math.floor(cy), 0), size - 1);
      const idx = (py * size + px) * 4;
      const a = imgData[idx + 3];
      const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
      const isDark = data.matrix[r][c];

      if (a >= 128) {
        if (isDark) {
          ctx.fillStyle = darkColor;
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        } else if (lum <= 200) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        if (isDark) {
          ctx.fillStyle = darkColor;
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
}

export function generateHalftoneQRSvg(
  data: QRMatrixData,
  logoImg: HTMLImageElement | null,
  options: HalftoneOptions
): string {
  const { size, logoScale, dotScale = 0.44, darkColor = '#000000', lightColor = '#ffffff', margin = 3 } = options;
  const N = data.size;
  const cellSize = size / (N + margin * 2);
  const matrixWidth = N * cellSize;
  const logoDim = matrixWidth * Math.min(Math.max(logoScale || 0.68, 0.4), 0.85);
  const logoX = (size - logoDim) / 2;
  const logoY = (size - logoDim) / 2;
  const dotRadius = (cellSize * dotScale) / 2;

  let el = `<rect width="${size}" height="${size}" fill="${lightColor}"/>`;

  if (logoImg && logoImg.src) {
    el += `<image href="${logoImg.src}" x="${logoX}" y="${logoY}" width="${logoDim}" height="${logoDim}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  // 3 Unified Finder Patterns
  const corners = [
    { fx: margin * cellSize, fy: margin * cellSize, sx: margin * cellSize, sy: margin * cellSize },
    { fx: (margin + N - 7) * cellSize, fy: margin * cellSize, sx: (margin + N - 8) * cellSize, sy: margin * cellSize },
    { fx: margin * cellSize, fy: (margin + N - 7) * cellSize, sx: margin * cellSize, sy: (margin + N - 8) * cellSize },
  ];

  corners.forEach(({ fx, fy, sx, sy }) => {
    el += `<rect x="${sx}" y="${sy}" width="${8 * cellSize}" height="${8 * cellSize}" fill="${lightColor}"/>`;
    el += `<rect x="${fx}" y="${fy}" width="${7 * cellSize}" height="${7 * cellSize}" fill="${darkColor}"/>`;
    el += `<rect x="${fx + cellSize}" y="${fy + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="${lightColor}"/>`;
    el += `<rect x="${fx + 2 * cellSize}" y="${fy + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="${darkColor}"/>`;
  });

  // Dots
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (isFinderPattern(r, c, N)) continue;
      const cx = (c + margin + 0.5) * cellSize;
      const cy = (r + margin + 0.5) * cellSize;
      const isDark = data.matrix[r][c];

      const inLogoBox = cx >= logoX && cx <= logoX + logoDim && cy >= logoY && cy <= logoY + logoDim;
      if (inLogoBox) {
        if (isDark) {
          el += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${darkColor}"/>`;
        } else {
          el += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="#FFFFFF"/>`;
        }
      } else if (isDark) {
        el += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${darkColor}"/>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${el}</svg>`;
}

export async function exportHalftonePNG(
  data: QRMatrixData,
  logoImg: HTMLImageElement | null,
  options: HalftoneOptions,
  filename: string
): Promise<void> {
  const c = document.createElement('canvas');
  renderHalftoneQRToCanvas(c, data, logoImg, options);
  const blob = await new Promise<Blob | null>((res) => c.toBlob(res, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportHalftoneSVG(
  data: QRMatrixData,
  logoImg: HTMLImageElement | null,
  options: HalftoneOptions,
  filename: string
): void {
  const svg = generateHalftoneQRSvg(data, logoImg, options);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
