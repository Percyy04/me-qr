import { FrameId } from '../types/qr.types';
import { ME_QR_TEMPLATES } from './meQrTemplates';

export interface FramePresetItem {
  id: FrameId;
  label: string;
  templateUrl: string | null;
}

export const FRAME_PRESETS: FramePresetItem[] = [
  { id: 'none', label: 'Không khung', templateUrl: null },
  ...ME_QR_TEMPLATES.map((t) => ({
    id: t.id,
    label: t.label,
    templateUrl: t.url,
  })),
];
