import React, { useState, useRef } from 'react';
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Code, Quote, Eye, Edit3, Eraser, Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function parseMarkdownToHtml(raw: string): string {
  if (!raw) return '<p class="text-slate-400 italic">Chưa có nội dung xem trước...</p>';
  const escaped = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del class="text-slate-400">$1</del>')
    .replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, '<u class="underline decoration-primary-container">$1</u>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-purple-600 px-1 py-0.5 rounded font-mono text-[11px]">$1</code>')
    .replace(/^[•\-]\s+(.*)$/gm, '<li class="ml-4 list-disc text-slate-700">$1</li>')
    .replace(/^(\d+)\.\s+(.*)$/gm, '<li class="ml-4 list-decimal text-slate-700">$2</li>')
    .replace(/^&gt;\s+(.*)$/gm, '<blockquote class="border-l-2 border-primary-container pl-2 text-slate-500 italic my-1">$1</blockquote>')
    .replace(/\n/g, '<br />');
}

export const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder, className = '' }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix = prefix) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const sel = text.substring(start, end) || (language === 'vi' ? 'văn bản' : 'text');
    onChange(text.substring(0, start) + prefix + sel + suffix + text.substring(end));
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + sel.length);
    }, 10);
  };

  const applyLinePrefix = (pfx: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const text = el.value;
    const sel = text.substring(start, el.selectionEnd);
    const lines = sel.split('\n').map((l, i) => `${pfx === '1. ' ? `${i + 1}. ` : pfx}${l}`).join('\n');
    onChange(text.substring(0, start) + (lines || pfx) + text.substring(el.selectionEnd));
    setTimeout(() => el.focus(), 10);
  };

  const stripMarkdown = () => {
    const clean = value
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/~~(.*?)~~/g, '$1')
      .replace(/<\/?u>/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^[•\-]\s+/gm, '')
      .replace(/^>\s+/gm, '');
    onChange(clean);
  };

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={`w-full border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-xs ${className}`}>
      {/* Flowbite WYSIWYG Header Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap gap-1.5">
        <div className="flex flex-wrap items-center divide-gray-200 divide-x text-gray-500">
          <div className="flex items-center space-x-0.5 pr-2">
            <button type="button" onClick={() => applyFormat('**')} title={t('textEditorBold')} className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <Bold size={14} strokeWidth={2.5} />
            </button>
            <button type="button" onClick={() => applyFormat('*')} title={t('textEditorItalic')} className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <Italic size={14} strokeWidth={2.5} />
            </button>
            <button type="button" onClick={() => applyFormat('<u>', '</u>')} title={t('textEditorUnderline')} className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <Underline size={14} strokeWidth={2.5} />
            </button>
            <button type="button" onClick={() => applyFormat('~~')} title="Strikethrough" className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <Strikethrough size={14} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex items-center space-x-0.5 px-2">
            <button type="button" onClick={() => applyLinePrefix('- ')} title={t('textEditorBullet')} className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <List size={14} />
            </button>
            <button type="button" onClick={() => applyLinePrefix('1. ')} title={t('textEditorNumbered')} className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <ListOrdered size={14} />
            </button>
            <button type="button" onClick={() => applyFormat('`')} title="Code" className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <Code size={14} />
            </button>
            <button type="button" onClick={() => applyLinePrefix('> ')} title="Quote" className="p-1.5 rounded hover:text-gray-900 hover:bg-gray-100 cursor-pointer">
              <Quote size={14} />
            </button>
          </div>
          <div className="flex items-center pl-2">
            <button type="button" onClick={stripMarkdown} title="Lọc bỏ mã Markdown" className="text-[11px] font-semibold text-gray-500 hover:text-primary-container px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer">
              Lọc MD
            </button>
            <button type="button" onClick={() => onChange('')} title={t('textEditorClear')} className="p-1.5 rounded hover:text-rose-600 hover:bg-rose-50 cursor-pointer text-gray-400">
              <Eraser size={14} />
            </button>
          </div>
        </div>

        {/* Flowbite Write / Preview Tabs */}
        <div className="flex items-center bg-gray-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button type="button" onClick={() => setActiveTab('write')} className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${activeTab === 'write' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}>
            <Edit3 size={12} /><span>Soạn thảo</span>
          </button>
          <button type="button" onClick={() => setActiveTab('preview')} className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${activeTab === 'preview' ? 'bg-white text-primary-container shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}>
            <Eye size={12} /><span>Xem trước MD</span>
          </button>
        </div>
      </div>

      {/* Editor Body: Write vs Flowbite Markdown Preview */}
      <div className="bg-white">
        {activeTab === 'write' ? (
          <textarea
            ref={textareaRef}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || t('textEditorPlaceholder')}
            className="block w-full p-3.5 text-xs text-gray-900 bg-white border-0 focus:ring-0 focus:outline-none resize-y min-h-[110px] font-sans"
          />
        ) : (
          <div
            className="w-full p-3.5 text-xs text-gray-800 bg-white min-h-[110px] leading-relaxed break-words font-sans"
            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(value) }}
          />
        )}
      </div>

      {/* Flowbite Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-500 font-mono flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">{charCount} {t('charCount')}</span>
          <span>•</span>
          <span className="font-semibold text-gray-700">{wordCount} {t('wordCount')}</span>
          <span className="text-gray-400">| Flowbite WYSIWYG Standard</span>
        </div>
        <div className="flex items-center gap-1.5 font-sans">
          <span className="text-gray-400 flex items-center gap-1"><Sparkles size={11} className="text-amber-500" />{t('snippets')}</span>
          <button type="button" onClick={() => onChange('📌 **Ghi chú quan trọng:**\n- Hạn chót: 30/11/2026\n- Vui lòng quét mã để xem chi tiết')} className="px-2 py-0.5 rounded bg-white hover:bg-gray-100 border border-gray-200 font-medium text-gray-600 text-[11px] cursor-pointer">
            {t('snippetNote')}
          </button>
          <button type="button" onClick={() => onChange('🎉 *Kính chúc bạn vạn sự như ý, an khang thịnh vượng!*')} className="px-2 py-0.5 rounded bg-white hover:bg-gray-100 border border-gray-200 font-medium text-gray-600 text-[11px] cursor-pointer">
            {t('snippetWish')}
          </button>
        </div>
      </div>
    </div>
  );
};
