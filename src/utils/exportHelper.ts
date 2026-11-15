import jsPDF from 'jspdf';
import QRCodeStyling, { Options } from 'qr-code-styling';

function triggerDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportPNG(canvas: HTMLCanvasElement, filename = 'quickqr-code.png') {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

export function exportSVG(svgElementOrString: string | SVGElement, filename = 'quickqr-code.svg') {
  const content = typeof svgElementOrString === 'string'
    ? svgElementOrString
    : new XMLSerializer().serializeToString(svgElementOrString);
  const blob = new Blob([content], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  URL.revokeObjectURL(url);
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') return resolve(false);
    canvas.toBlob(async (blob) => {
      if (!blob) return resolve(false);
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        resolve(true);
      } catch {
        resolve(false);
      }
    }, 'image/png');
  });
}

export function exportPDF(canvas: HTMLCanvasElement, filename = 'quickqr-document.pdf') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const imgData = canvas.toDataURL('image/png');
  const imgW = 140;
  const imgH = (canvas.height / canvas.width) * imgW;
  const x = (pw - imgW) / 2;
  const y = (ph - imgH) / 2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229);
  doc.text('QUICKQR STUDIO PRO', pw / 2, y - 18, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Scan with your smartphone camera', pw / 2, y - 8, { align: 'center' });
  doc.addImage(imgData, 'PNG', x, y, imgW, imgH);
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('Created with QuickQR Studio (100% Client-Side)', pw / 2, y + imgH + 16, { align: 'center' });
  doc.save(filename);
}

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
  size: number
): Promise<HTMLCanvasElement | null> {
  const targetQrSize = size || 1000;
  const qr = new QRCodeStyling(optionsBuilder(targetQrSize));
  const qrCanvas = await getQrCanvas(qr);
  if (!qrCanvas) return null;

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
  filename = 'quickqr-code.png'
) {
  const canvas = await renderHighResCanvas(frameEl, optionsBuilder, size);
  if (canvas) exportPNG(canvas, filename);
}

export async function exportHighResSVG(
  frameEl: HTMLElement | null,
  optionsBuilder: (size: number) => Options,
  size: number,
  filename = 'quickqr-vector.svg'
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
  clone.appendChild(nested);
  exportSVG(new XMLSerializer().serializeToString(clone), filename);
}

export function exportFramedPNG(_frameEl: HTMLElement | null, fallbackCanvas: HTMLCanvasElement, filename = 'quickqr-code.png') {
  exportPNG(fallbackCanvas, filename);
}
