/**
 * Helper to render clean center logo badge on Classic QR codes.
 * Ensures maximum scannability compliant with Reed-Solomon Level H error correction.
 */
export function drawClassicCenterLogo(
  ctx: CanvasRenderingContext2D,
  logoImg: HTMLImageElement,
  canvasSize: number,
  scale = 0.22,
  bgColor = '#FFFFFF'
): void {
  const safeScale = Math.min(Math.max(scale, 0.15), 0.30);
  const logoW = Math.round(canvasSize * safeScale);
  const logoH = logoW;
  const padding = Math.max(3, Math.round(logoW * 0.08));
  const badgeSize = logoW + padding * 2;
  const bx = Math.round((canvasSize - badgeSize) / 2);
  const by = Math.round((canvasSize - badgeSize) / 2);
  const lx = bx + padding;
  const ly = by + padding;
  const radius = Math.round(badgeSize * 0.24);

  ctx.save();
  // Draw solid quiet-zone badge behind logo
  ctx.fillStyle = bgColor || '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.10)';
  ctx.shadowBlur = Math.round(badgeSize * 0.06);
  ctx.shadowOffsetY = Math.max(1, Math.round(badgeSize * 0.02));

  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(bx, by, badgeSize, badgeSize, radius);
  } else {
    ctx.rect(bx, by, badgeSize, badgeSize);
  }
  ctx.fill();

  // Draw subtle protective outline
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = Math.max(1, Math.round(canvasSize / 400));
  ctx.stroke();

  // Clip logo image slightly for modern rounded aesthetic
  ctx.beginPath();
  const logoRadius = Math.round(radius * 0.75);
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(lx, ly, logoW, logoH, logoRadius);
  } else {
    ctx.rect(lx, ly, logoW, logoH);
  }
  ctx.clip();

  ctx.drawImage(logoImg, lx, ly, logoW, logoH);
  ctx.restore();
}
