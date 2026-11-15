import React, { useRef, useEffect } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, RemoveFormatting, Eraser, Sparkles
} from 'lucide-react';
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
  const editorRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isTypingRef.current) {
      if (editorRef.current.innerText.trim() !== value.trim()) {
        editorRef.current.innerText = value;
      }
    }
  }, [value]);

  const handleInput = () => {
    if (!editorRef.current) return;
    isTypingRef.current = true;
    onChange(editorRef.current.innerText);
    setTimeout(() => { isTypingRef.current = false; }, 50);
  };

  const exec = (cmd: string) => {
    document.execCommand(cmd, false);
    if (editorRef.current) {
      onChange(editorRef.current.innerText);
      editorRef.current.focus();
    }
  };

  const loadTemplate = (html: string) => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = html;
    onChange(editorRef.current.innerText);
    editorRef.current.focus();
  };

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const btn = (cmd: string, title: string, icon: React.ReactNode) => (
    <button
      key={cmd}
      type="button"
      onMouseDown={(e) => { e.preventDefault(); exec(cmd); }}
      title={title}
      className="p-1.5 rounded hover:bg-white hover:text-slate-900 cursor-pointer transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className={`w-full border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-primary-container focus-within:border-transparent transition-all ${className}`}>
      {/* Ribbon Toolbar */}
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-200 bg-slate-100 flex-wrap gap-1 text-slate-700">
        <div className="flex items-center flex-wrap divide-x divide-slate-300">
          <div className="flex items-center space-x-0.5 pr-2">
            {btn('bold', t('textEditorBold'), <Bold size={14} strokeWidth={2.5} />)}
            {btn('italic', t('textEditorItalic'), <Italic size={14} strokeWidth={2.5} />)}
            {btn('underline', t('textEditorUnderline'), <Underline size={14} strokeWidth={2.5} />)}
            {btn('strikeThrough', 'Gạch ngang', <Strikethrough size={14} strokeWidth={2.5} />)}
          </div>
          <div className="flex items-center space-x-0.5 px-2">
            {btn('justifyLeft', 'Căn lề trái', <AlignLeft size={14} />)}
            {btn('justifyCenter', 'Căn lề giữa', <AlignCenter size={14} />)}
            {btn('justifyRight', 'Căn lề phải', <AlignRight size={14} />)}
          </div>
          <div className="flex items-center space-x-0.5 px-2">
            {btn('insertUnorderedList', t('textEditorBullet'), <List size={14} />)}
            {btn('insertOrderedList', t('textEditorNumbered'), <ListOrdered size={14} />)}
          </div>
          <div className="flex items-center pl-2 space-x-0.5">
            {btn('removeFormat', 'Xóa định dạng đang chọn', <RemoveFormatting size={14} />)}
            <button
              type="button"
              onClick={() => { if (editorRef.current) { editorRef.current.innerHTML = ''; onChange(''); } }}
              title={t('textEditorClear')}
              className="p-1.5 rounded hover:bg-rose-50 hover:text-rose-600 cursor-pointer text-slate-400 transition-colors"
            >
              <Eraser size={14} />
            </button>
          </div>
        </div>

        {/* Quick Document Templates */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Sparkles size={11} className="text-amber-500" />
            <span>{t('snippets')}</span>
          </span>
          <button
            type="button"
            onClick={() => loadTemplate(
              language === 'vi'
                ? '<div><b>📌 GHI CHÚ QUAN TRỌNG</b></div><div>• Nội dung công việc cần hoàn thành</div><div>• Hạn chót: 30/11/2026</div><div>• Liên hệ phòng điều phối khi cần hỗ trợ.</div>'
                : '<div><b>📌 IMPORTANT NOTICE</b></div><div>• Key action item to complete</div><div>• Deadline: November 30, 2026</div><div>• Please contact coordinator for details.</div>'
            )}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-200 border border-slate-300 font-medium text-slate-700 text-[11px] cursor-pointer shadow-2xs"
          >
            {t('snippetNote')}
          </button>
          <button
            type="button"
            onClick={() => loadTemplate(
              language === 'vi'
                ? '<div><b>🎉 KÍNH CHÚC BẠN VÀ GIA ĐÌNH</b></div><div><i>An khang thịnh vượng, vạn sự như ý, thành công rực rỡ!</i></div>'
                : '<div><b>🎉 BEST WISHES TO YOU</b></div><div><i>May joy, good health, and success follow you in every step!</i></div>'
            )}
            className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-200 border border-slate-300 font-medium text-slate-700 text-[11px] cursor-pointer shadow-2xs"
          >
            {t('snippetWish')}
          </button>
        </div>
      </div>

      {/* Word Document Sheet */}
      <div className="p-3 bg-slate-200/50">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          data-placeholder={placeholder || t('textEditorPlaceholder')}
          className="w-full min-h-[120px] max-h-[300px] overflow-y-auto p-4 bg-white rounded-lg border border-slate-200 shadow-xs text-xs text-slate-800 font-sans leading-relaxed focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span>{charCount} {t('charCount')}</span>
          <span>•</span>
          <span>{wordCount} {t('wordCount')}</span>
        </div>
        <span className="font-sans text-slate-400">
          {language === 'vi' ? 'Trang soạn thảo văn bản mini' : 'Mini Document Editor'}
        </span>
      </div>
    </div>
  );
};
