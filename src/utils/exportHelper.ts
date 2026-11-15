import QRCodeStyling, { Options } from 'qr-code-styling';
import { drawClassicCenterLogo } from './classicLogoHelper';
import { exportPNG, exportSVG, exportPDF, copyCanvasToClipboard } from './fileDownloader';

export { exportPNG, exportSVG, exportPDF, copyCanvasToClipboard };

async function getQrCanvas(qr: QRCodeStyling): Promise<HTMLCanvasElement | null> {
  try {
    if (typeof (qr as any)._getElement === 'function') {
      return (await (qr as any)._getElement('canvas')) as HTMLCanvasElement;
    }
  } catch {}
  const tempDiv = document.createElement('div');
  qr.append(tempDiv);
  await new Promise((r) => setTimeout(r, 80));
  return tempDiv.querySelector('canvas');
}

export async function renderHighResCanvas(
  frameEl: HTMLElement | null,
  optionsBuilder: (size: number) => Options,
  size: number,
  logoImg?: HTMLImageElement | null,
  logoScale?: number,
  bgColor?: string
): Promise<HTMLCanvasElement | null> {
  const targetQrSize = size || 1000;
  const qr = new QRCodeStyling(optionsBuilder(targetQrSize));
  const qrCanvas = await getQrCanvas(qr);
  if (!qrCanvas) return null;

  if (logoImg) {
    const ctx = qrCanvas.getContext('2d');
    if (ctx) drawClassicCenterLogo(ctx, logoImg, targetQrSize, logoScale, bgColor);
  }

  const svg = frameEl?.querySelector('svg');
  if (!svg) return qrCanvas;

  const clone = svg.cloneNode(true) as SVGElement;
  const fo = clone.querySelector('foreignObject');
  if (fo) fo.remove();

  const scale = targetQrSize / 200;
  const fw = Math.round(320 * scale);
  const fh = Math.round(380 * scale);
  const qx = Math.round(60 * scale);
  const qy = Math.round(110 * scale);

  clone.setAttribute('width', String(fw));
  clone.setAttribute('height', String(fh));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const xml = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  return new Promise((resolve) => {
    img.onload = () => {
      const out = document.createElement('canvas');
      out.width = fw;
      out.height = fh;
      const ctx = out.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, fw, fh);
        ctx.drawImage(qrCanvas, qx, qy, targetQrSize, targetQrSize);
        URL.revokeObjectURL(url);
        resolve(out);
      } else {
        URL.revokeObjectURL(url);
        resolve(qrCanvas);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(qrCanvas);
    };
    img.src = url;
  });
}

export async function exportHighResPNG(
  frameEl: HTMLElement | null,
  optionsBuilder: (size: number) => Options,
  size: number,
  filename = 'quickqr-code.png',
  logoImg?: HTMLImageElement | null,
  logoScale?: number,
  bgColor?: string
) {
  const canvas = await renderHighResCanvas(frameEl, optionsBuilder, size, logoImg, logoScale, bgColor);
  if (canvas) exportPNG(canvas, filename);
}

export async function exportHighResSVG(
  frameEl: HTMLElement | null,
  optionsBuilder: (size: number) => Options,
  size: number,
  filename = 'quickqr-vector.svg',
  logoUrl?: string | null,
  logoScale?: number,
  bgColor?: string
) {
  const targetQrSize = size || 1000;
  const qr = new QRCodeStyling(optionsBuilder(targetQrSize));
  const svg = frameEl?.querySelector('svg');
  if (!svg) {
    qr.download({ extension: 'svg', name: filename.replace(/\.svg$/, '') });
    return;
  }
  const qrSvgBlob = await qr.getRawData('svg');
  if (!qrSvgBlob) return;
  const qrSvgText = await (qrSvgBlob as Blob).text();
  const clone = svg.cloneNode(true) as SVGElement;
  const fo = clone.querySelector('foreignObject');
  if (fo) fo.remove();

  const qrDoc = new DOMParser().parseFromString(qrSvgText, 'image/svg+xml');
  const nested = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  nested.setAttribute('x', '60');
  nested.setAttribute('y', '110');
  nested.setAttribute('width', '200');
  nested.setAttribute('height', '200');
  nested.setAttribute('viewBox', `0 0 ${targetQrSize} ${targetQrSize}`);
  Array.from(qrDoc.documentElement.childNodes).forEach((n) => nested.appendChild(n.cloneNode(true)));

  if (logoUrl) {
    const safeScale = Math.min(Math.max(logoScale || 0.22, 0.15), 0.30);
    const logoW = Math.round(targetQrSize * safeScale);
    const padding = Math.max(3, Math.round(logoW * 0.08));
    const badgeSize = logoW + padding * 2;
    const bx = Math.round((targetQrSize - badgeSize) / 2);
    const by = bx;
    const lx = bx + padding;
    const ly = lx;
    const radius = Math.round(badgeSize * 0.24);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', String(bx));
    rect.setAttribute('y', String(by));
    rect.setAttribute('width', String(badgeSize));
    rect.setAttribute('height', String(badgeSize));
    rect.setAttribute('rx', String(radius));
    rect.setAttribute('fill', bgColor || '#FFFFFF');
    rect.setAttribute('stroke', 'rgba(0,0,0,0.08)');
    rect.setAttribute('stroke-width', '2');
    nested.appendChild(rect);

    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttribute('x', String(lx));
    img.setAttribute('y', String(ly));
    img.setAttribute('width', String(logoW));
    img.setAttribute('height', String(logoW));
    img.setAttribute('href', logoUrl);
    nested.appendChild(img);
  }

  clone.appendChild(nested);
  exportSVG(new XMLSerializer().serializeToString(clone), filename);
}
