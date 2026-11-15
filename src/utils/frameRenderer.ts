import { FrameId } from '../types/qr.types';

export interface FrameOptions {
  id: FrameId;
  templateUrl: string | null;
  text?: string;
  frameColor?: string;
  textColor?: string;
  qrScale?: number;
  qrOffsetY?: number;
}

const imageCache = new Map<string, HTMLImageElement>();

export async function preloadTemplateImage(url: string): Promise<HTMLImageElement | null> {
  if (!url) return null;
  if (imageCache.has(url)) return imageCache.get(url)!;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export function getCachedTemplateImage(url: string | null): HTMLImageElement | null {
  if (!url) return null;
  return imageCache.get(url) || null;
}

export function renderCompositedCanvas(
  qrCanvas: HTMLCanvasElement,
  frame: FrameOptions,
  templateImg?: HTMLImageElement | null
): HTMLCanvasElement {
  const S = qrCanvas.width;
  if (frame.id === 'none' || !frame.templateUrl) {
    const copy = document.createElement('canvas');
    copy.width = S;
    copy.height = S;
    copy.getContext('2d')?.drawImage(qrCanvas, 0, 0);
    return copy;
  }

  const img = templateImg || getCachedTemplateImage(frame.templateUrl);
  if (!img) {
    // If template image is still loading, return raw QR canvas
    const copy = document.createElement('canvas');
    copy.width = S;
    copy.height = S;
    copy.getContext('2d')?.drawImage(qrCanvas, 0, 0);
    return copy;
  }

  const out = document.createElement('canvas');
  out.width = S;
  out.height = S;
  const ctx = out.getContext('2d');
  if (!ctx) return qrCanvas;

  // Scale and offset calculation for QR code inside the frame
  const scale = frame.qrScale || 0.72;
  const offsetY = ((frame.qrOffsetY || 0) * S) / 300;
  const innerSize = Math.round(S * scale);
  const innerX = Math.round((S - innerSize) / 2);
  const innerY = Math.round((S - innerSize) / 2 + offsetY);

  // 1. Draw solid white background behind QR to ensure contrast
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(innerX, innerY, innerSize, innerSize);

  // 2. Draw core QR code canvas
  ctx.drawImage(qrCanvas, innerX, innerY, innerSize, innerSize);

  // 3. Draw authentic ME-QR WebP template frame on top (with transparent window)
  ctx.drawImage(img, 0, 0, S, S);

  return out;
}
