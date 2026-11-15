import React, { useState } from 'react';
import { QRInputs } from '../../../types/qr.types';
import { useLanguage } from '../../../context/LanguageContext';
import { UploadCloud, FileText, Trash2 } from 'lucide-react';

interface FormBProps {
  inputs: QRInputs;
  onChange: (inputs: QRInputs) => void;
}

export const FormBFileMedia: React.FC<FormBProps> = ({ inputs, onChange }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);

  const fileData = inputs.file || {
    name: 'Catalog-Spring-2026.pdf',
    size: '4.2 MB',
    type: 'application/pdf',
    title: 'Spring Collection 2026',
    description: 'Explore the newest design catalog and seasonal texture materials.',
    ctaText: 'Download PDF Catalog',
  };

  const handleSimulateUpload = (fileName: string, size: string, type: string) => {
    onChange({
      ...inputs,
      file: {
        ...fileData,
        name: fileName,
        size: size,
        type: type,
        title: fileName.replace(/\.[^/.]+$/, ''),
      },
    });
  };

  const removeFile = () => {
    onChange({
      ...inputs,
      file: {
        ...fileData,
        name: '',
        size: '0 MB',
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Attachment Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <span className="text-xs font-bold text-slate-text-strong">
          {t('fileMediaTitle')}
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-canvas-bg border border-border-subtle text-slate-text-muted">
          Max: 20 MB
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      {!fileData.name ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) {
              handleSimulateUpload(file.name, `${(file.size / 1024 / 1024).toFixed(1)} MB`, file.type);
            }
          }}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-primary-container bg-indigo-tint/40'
              : 'border-slate-300 hover:border-primary-container bg-indigo-tint/10'
          }`}
          onClick={() => handleSimulateUpload('Document-Presentation.pdf', '3.8 MB', 'application/pdf')}
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-indigo-tint text-primary-container flex items-center justify-center mb-2">
            <UploadCloud size={20} />
          </div>
          <p className="text-xs font-bold text-slate-text-strong">{t('fileDropPrompt')}</p>
          <p className="text-[11px] text-slate-text-muted mt-1">{t('fileDropSubtext')}</p>
        </div>
      ) : (
        /* Uploaded File State Card */
        <div className="p-3.5 bg-canvas-bg rounded-xl border border-border-subtle flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
            <FileText size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-text-strong truncate">{fileData.name}</span>
              <span className="text-slate-text-muted text-[11px] font-mono">{fileData.size}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary-cta h-full rounded-full w-full" />
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
            title={t('fileRemove')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Mini Landing Page Builder Inputs */}
      <div className="space-y-3 pt-2 border-t border-border-subtle">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {t('fileDisplayTitle')}
          </label>
          <input
            type="text"
            value={fileData.title}
            onChange={(e) =>
              onChange({
                ...inputs,
                file: { ...fileData, title: e.target.value },
              })
            }
            placeholder="Spring Collection 2026"
            className="w-full px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {t('fileDescription')}
          </label>
          <textarea
            rows={2}
            value={fileData.description}
            onChange={(e) =>
              onChange({
                ...inputs,
                file: { ...fileData, description: e.target.value },
              })
            }
            placeholder="Mô tả nội dung tài liệu..."
            className="w-full px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {t('fileCtaButton')}
          </label>
          <input
            type="text"
            value={fileData.ctaText}
            onChange={(e) =>
              onChange({
                ...inputs,
                file: { ...fileData, ctaText: e.target.value },
              })
            }
            placeholder="Tải tài liệu PDF"
            className="w-full px-3 py-2 text-xs bg-canvas-bg border border-border-subtle rounded-lg text-slate-text-strong focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>
      </div>
    </div>
  );
};
