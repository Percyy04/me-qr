import qrcode from 'qrcode-generator';

export interface QRMatrixData {
  matrix: boolean[][];
  version: number;
  size: number;
}

/**
 * Only the 3 Corner Finder Patterns (7x7 + 1-module separator = 8x8) are protected
 * as solid blocks. All other modules (Timing, Alignment, Format) render as uniform
 * halftone dots to allow the background logo to stay continuous and legible.
 */
export function isFinderPattern(row: number, col: number, matrixSize: number): boolean {
  if (row <= 7 && col <= 7) return true;
  if (row <= 7 && col >= matrixSize - 8) return true;
  if (row >= matrixSize - 8 && col <= 7) return true;
  return false;
}

export function isFunctionalModule(
  row: number,
  col: number,
  _version: number,
  matrixSize: number
): boolean {
  return isFinderPattern(row, col, matrixSize);
}

export function generateQRMatrix(
  text: string,
  ecLevel: 'L' | 'M' | 'Q' | 'H' = 'H'
): QRMatrixData {
  const qr = qrcode(0, ecLevel);
  qr.addData(text || 'https://www.facebook.com/percy1584');
  qr.make();

  const size = qr.getModuleCount();
  const version = Math.max(1, Math.round((size - 17) / 4));
  const matrix: boolean[][] = [];

  for (let r = 0; r < size; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < size; c++) {
      row.push(qr.isDark(r, c));
    }
    matrix.push(row);
  }

  return { matrix, version, size };
}
