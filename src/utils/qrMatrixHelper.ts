import qrcode from 'qrcode-generator';

export interface QRMatrixData {
  matrix: boolean[][];
  version: number;
  size: number;
}

export const ALIGNMENT_PATTERN_POSITIONS: number[][] = [
  [], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54],
  [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70],
  [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86],
  [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170],
];

export function isFunctionalModule(
  row: number,
  col: number,
  version: number,
  matrixSize: number
): boolean {
  // 1. Finder patterns + separators (8x8 at corners)
  if (row <= 7 && col <= 7) return true;
  if (row <= 7 && col >= matrixSize - 8) return true;
  if (row >= matrixSize - 8 && col <= 7) return true;

  // 2. Timing patterns
  if (row === 6 || col === 6) return true;

  // 3. Format & Dark Module Info
  if (row === 8 && (col <= 8 || col >= matrixSize - 8)) return true;
  if (col === 8 && (row <= 8 || row >= matrixSize - 7)) return true;

  // 4. Alignment patterns (5x5 centers)
  const pos = ALIGNMENT_PATTERN_POSITIONS[version] || [];
  for (let i = 0; i < pos.length; i++) {
    for (let j = 0; j < pos.length; j++) {
      const ar = pos[i];
      const ac = pos[j];
      if (ar <= 8 && ac <= 8) continue;
      if (ar <= 8 && ac >= matrixSize - 8) continue;
      if (ar >= matrixSize - 8 && ac <= 8) continue;

      if (Math.abs(row - ar) <= 2 && Math.abs(col - ac) <= 2) {
        return true;
      }
    }
  }

  return false;
}

export function generateQRMatrix(
  text: string,
  ecLevel: 'L' | 'M' | 'Q' | 'H' = 'H'
): QRMatrixData {
  const qr = qrcode(0, ecLevel);
  qr.addData(text || 'https://quickqr.io');
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
