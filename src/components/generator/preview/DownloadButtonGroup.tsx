import React, { useState } from 'react';
import { Download, FileDown, Copy, Check } from 'lucide-react';
import { Button } from '../../common/Button';

interface DownloadButtonGroupProps {
  onDownloadPNG: (size: number) => void;
  onDownloadSVG: () => void;
  onDownloadPDF: () => void;
  onCopyClipboard: () => Promise<boolean>;
  loading?: boolean;
}

export const DownloadButtonGroup: React.FC<DownloadButtonGroupProps> = ({
  onDownloadPNG,
  onDownloadSVG,
  onDownloadPDF,
  onCopyClipboard,
  loading = false,
}) => {
  const [resolution, setResolution] = useState<number>(1000);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopyClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2.5 pt-2">
      {/* Resolution selector */}
      <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-100/80 p-1.5 rounded-xl">
        <span className="font-semibold text-slate-700 pl-1">Độ phân giải PNG:</span>
        <div className="flex items-center gap-1">
          {[
            { label: '500px', val: 500 },
            { label: '1000px (HD)', val: 1000 },
            { label: '2000px (4K)', val: 2000 },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => setResolution(r.val)}
              className={`px-2 py-1 rounded-lg font-medium transition-all ${
                resolution === r.val
                  ? 'bg-white text-blue-600 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Download PNG & Copy Button */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onDownloadPNG(resolution)}
          disabled={loading}
          className="col-span-2 text-sm font-bold shadow-lg shadow-blue-500/25"
          icon={<Download size={18} />}
        >
          TẢI MÃ QR (PNG)
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={handleCopy}
          disabled={loading}
          className="col-span-1 text-xs font-bold"
          icon={copied ? <Check size={16} /> : <Copy size={16} />}
        >
          {copied ? 'Đã chép!' : 'Sao chép'}
        </Button>
      </div>

      {/* Vector & Print options */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="md"
          onClick={onDownloadSVG}
          disabled={loading}
          icon={<FileDown size={16} />}
          className="text-xs font-semibold"
        >
          Vector SVG
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onDownloadPDF}
          disabled={loading}
          icon={<FileDown size={16} />}
          className="text-xs font-semibold"
        >
          Bản in PDF
        </Button>
      </div>
    </div>
  );
};
