import { QRMatrixData, isFunctionalModule } from './qrMatrixHelper';

export interface HalftoneOptions {
  size: number;
  logoScale: number; // 0.4 to 0.85
  dotScale?: number; // 0.32 to 0.45
  darkColor?: string;
  lightColor?: string;
}

export function sampleLogoImage(
  logoImg: HTMLImageElement | null,
  size: number,
  logoScale: number
): Uint8ClampedArray | null {
  if (!logoImg || !logoImg.complete || !logoImg.naturalWidth) return null;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = size;
  offCanvas.height = size;
  const ctx = offCanvas.getContext('2d');
  if (!ctx) return null;

  const logoDim = size * Math.min(Math.max(logoScale, 0.4), 0.85);
  const logoX = (size - logoDim) / 2;
  const logoY = (size - logoDim) / 2;
  ctx.drawImage(logoImg, logoX, logoY, logoDim, logoDim);
  return ctx.getImageData(0, 0, size, size).data;
}

function getPixel(imgData: Uint8ClampedArray | null, size: number, x: number, y: number) {
  if (!imgData) return { r: 255, g: 255, b: 255, a: 0, y: 255 };
  const px = Math.min(Math.max(Math.floor(x), 0), size - 1);
  const py = Math.min(Math.max(Math.floor(y), 0), size - 1);
  const idx = (py * size + px) * 4;
  const r = imgData[idx];
  const g = imgData[idx + 1];
  const b = imgData[idx + 2];
  const a = imgData[idx + 3];
  return { r, g, b, a, y: 0.299 * r + 0.587 * g + 0.114 * b };
}

export function renderHalftoneQRToCanvas(
  canvas: HTMLCanvasElement,
  data: QRMatrixData,
  logoImg: HTMLImageElement | null,
  options: HalftoneOptions
) {
  const { size, logoScale, dotScale = 0.36, darkColor = '#000000', lightColor = '#ffffff' } = options;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = lightColor;
  ctx.fillRect(0, 0, size, size);

  const imgData = sampleLogoImage(logoImg, size, logoScale);
  const N = data.size;
  const cellSize = size / N;
  const centerRadius = (cellSize * dotScale) / 2;
  const mosaicRadius = (cellSize * 0.88) / 2;
  const regularRadius = (cellSize * 0.80) / 2;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const isDark = data.matrix[r][c];
      const isFunc = isFunctionalModule(r, c, data.version, N);
      const x = c * cellSize;
      const y = r * cellSize;
      const cx = x + cellSize / 2;
      const cy = y + cellSize / 2;

      if (isFunc) {
        ctx.fillStyle = isDark ? darkColor : lightColor;
        ctx.fillRect(x, y, cellSize, cellSize);
        continue;
      }

      const p = getPixel(imgData, size, cx, cy);
      if (p.a < 128) {
        if (isDark) {
          ctx.fillStyle = darkColor;
          ctx.beginPath();
          ctx.arc(cx, cy, regularRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
        ctx.beginPath();
        ctx.arc(cx, cy, mosaicRadius, 0, Math.PI * 2);
        ctx.fill();

        if (isDark) {
          ctx.fillStyle = p.y < 85 ? `rgb(${Math.floor(p.r * 0.5)},${Math.floor(p.g * 0.5)},${Math.floor(p.b * 0.5)})` : '#111111';
          ctx.beginPath();
          ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.y <= 175) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
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
  const { size, logoScale, dotScale = 0.36, darkColor = '#000000', lightColor = '#ffffff' } = options;
  const imgData = sampleLogoImage(logoImg, size, logoScale);
  const N = data.size;
  const cellSize = size / N;
  const centerRadius = (cellSize * dotScale) / 2;
  const mosaicRadius = (cellSize * 0.88) / 2;
  const regularRadius = (cellSize * 0.80) / 2;

  let el = `<rect width="${size}" height="${size}" fill="${lightColor}"/>`;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const isDark = data.matrix[r][c];
      const isFunc = isFunctionalModule(r, c, data.version, N);
      const x = c * cellSize;
      const y = r * cellSize;
      const cx = x + cellSize / 2;
      const cy = y + cellSize / 2;

      if (isFunc) {
        if (isDark) el += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${darkColor}"/>`;
        continue;
      }
      const p = getPixel(imgData, size, cx, cy);
      if (p.a < 128) {
        if (isDark) el += `<circle cx="${cx}" cy="${cy}" r="${regularRadius}" fill="${darkColor}"/>`;
      } else {
        el += `<circle cx="${cx}" cy="${cy}" r="${mosaicRadius}" fill="rgb(${p.r},${p.g},${p.b})"/>`;
        if (isDark) {
          const fill = p.y < 85 ? `rgb(${Math.floor(p.r * 0.5)},${Math.floor(p.g * 0.5)},${Math.floor(p.b * 0.5)})` : '#111111';
          el += `<circle cx="${cx}" cy="${cy}" r="${centerRadius}" fill="${fill}"/>`;
        } else if (p.y <= 175) {
          el += `<circle cx="${cx}" cy="${cy}" r="${centerRadius}" fill="rgba(255,255,255,0.95)"/>`;
        }
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
