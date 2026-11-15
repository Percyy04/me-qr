import jsPDF from 'jspdf';

export function triggerDownload(url: string, filename: string) {
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
