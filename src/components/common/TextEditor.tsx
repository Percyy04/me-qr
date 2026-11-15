import React, { useRef } from 'react';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Eraser, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix = prefix) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end) || (language === 'vi' ? 'văn bản' : 'text');
    const updated = text.substring(0, start) + prefix + selected + suffix + text.substring(end);
    onChange(updated);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 10);
  };

  const applyLinePrefix = (linePrefix: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end);
    const lines = selected.split('\n');
    const prefixed = lines.map((l, i) => `${linePrefix === '1. ' ? `${i + 1}. ` : linePrefix}${l}`).join('\n');
    const updated = text.substring(0, start) + (prefixed || linePrefix) + text.substring(end);
    onChange(updated);
    setTimeout(() => el.focus(), 10);
  };

  const applySnippet = (snippet: string) => {
    onChange(snippet);
    setTimeout(() => textareaRef.current?.focus(), 10);
  };

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={`border border-border-subtle rounded-xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-primary-container focus-within:border-transparent transition-all ${className}`}>
      {/* Formatting Action Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-canvas-bg border-b border-border-subtle text-slate-600 flex-wrap gap-1">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => applyFormat('**')}
            title={t('textEditorBold')}
            aria-label={t('textEditorBold')}
            className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Bold size={14} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('*')}
            title={t('textEditorItalic')}
            aria-label={t('textEditorItalic')}
            className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Italic size={14} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('<u>', '</u>')}
            title={t('textEditorUnderline')}
            aria-label={t('textEditorUnderline')}
            className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Underline size={14} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('~~')}
            title="Strikethrough"
            aria-label="Strikethrough"
            className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Strikethrough size={14} strokeWidth={2.5} />
          </button>
          <span className="w-px h-4 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => applyLinePrefix('• ')}
            title={t('textEditorBullet')}
            aria-label={t('textEditorBullet')}
            className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            onClick={() => applyLinePrefix('1. ')}
            title={t('textEditorNumbered')}
            aria-label={t('textEditorNumbered')}
            className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ListOrdered size={14} />
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            title={t('textEditorClear')}
            aria-label={t('textEditorClear')}
            className="p-1.5 rounded hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer ml-1"
          >
            <Eraser size={14} />
          </button>
        </div>

        {/* Quick Sample Snippets */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500" />
            <span>{t('snippets')}</span>
          </span>
          <button
            type="button"
            onClick={() =>
              applySnippet(
                language === 'vi'
                  ? '📌 Ghi chú quan trọng:\n- Nội dung cần ghi nhớ\n- Hạn chót: 30/11/2026'
                  : '📌 Important Note:\n- Key action item\n- Deadline: 30/11/2026'
              )
            }
            className="px-2 py-0.5 rounded bg-white hover:bg-indigo-50 hover:text-primary-container border border-border-subtle font-medium text-slate-600 transition-colors"
          >
            {t('snippetNote')}
          </button>
          <button
            type="button"
            onClick={() =>
              applySnippet(
                language === 'vi'
                  ? '🎉 Kính chúc bạn và gia đình an khang thịnh vượng, vạn sự như ý!'
                  : '🎉 Wishing you success, joy, and prosperity in all your journeys!'
              )
            }
            className="px-2 py-0.5 rounded bg-white hover:bg-indigo-50 hover:text-primary-container border border-border-subtle font-medium text-slate-600 transition-colors"
          >
            {t('snippetWish')}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <textarea
        ref={textareaRef}
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t('textEditorPlaceholder')}
        className="w-full p-3 text-xs text-slate-text-strong font-sans focus:outline-none resize-y min-h-[110px]"
      />

      {/* Live Counter & Capacity Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span>{charCount} {t('charCount')}</span>
          <span>•</span>
          <span>{wordCount} {t('wordCount')}</span>
        </div>
        <span className={charCount > 1000 ? 'text-amber-600 font-bold' : 'text-slate-400'}>
          {charCount > 1000 ? (language === 'vi' ? '⚠️ Dung lượng văn bản lớn' : '⚠️ High density text') : '100% Client-Side'}
        </span>
      </div>
    </div>
  );
};
