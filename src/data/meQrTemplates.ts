export interface MeQrTemplateItem {
  id: string;
  filename: string;
  url: string;
  label: string;
}

export const TOTAL_MEQR_TEMPLATES = 417;

// Generate all 417 templates from public/templete/
export const ME_QR_TEMPLATES: MeQrTemplateItem[] = Array.from(
  { length: TOTAL_MEQR_TEMPLATES },
  (_, i) => {
    const filename = i === 0 ? 'default.webp' : `default (${i}).webp`;
    return {
      id: i === 0 ? 'default' : `tpl_${i}`,
      filename,
      url: `/templete/${filename}`,
      label: i === 0 ? 'Mẫu mặc định' : `Mẫu ${i}`,
    };
  }
);

