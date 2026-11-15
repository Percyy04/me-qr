import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Code, RotateCcw, RotateCw, Eraser, Sparkles
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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
    ],
    content: value || '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[120px] text-xs text-gray-800 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-primary-container [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_code]:bg-slate-100 [&_code]:text-purple-600 [&_code]:px-1 [&_code]:rounded',
        'data-placeholder': placeholder || t('textEditorPlaceholder'),
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getText({ blockSeparator: '\n' }));
    },
  });

  useEffect(() => {
    if (editor && editor.getText({ blockSeparator: '\n' }).trim() !== value.trim()) {
      editor.commands.setContent(value || '<p></p>');
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean, act: () => void, title: string, icon: React.ReactNode) => (
    <button
      key={title}
      type="button"
      onClick={act}
      title={title}
      className={`p-1.5 rounded cursor-pointer transition-colors ${
        active ? 'bg-gray-200 text-gray-900 font-bold shadow-2xs' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {icon}
    </button>
  );

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={`w-full border border-gray-200 rounded-xl bg-gray-50 overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-primary-container focus-within:border-transparent transition-all ${className}`}>
      {/* Flowbite Official WYSIWYG Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50 flex-wrap gap-1.5">
        <div className="flex flex-wrap items-center divide-gray-200 divide-x text-gray-500">
          {/* Format Group */}
          <div className="flex items-center space-x-0.5 pr-2">
            {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), t('textEditorBold'), <Bold size={14} strokeWidth={2.5} />)}
            {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), t('textEditorItalic'), <Italic size={14} strokeWidth={2.5} />)}
            {btn(editor.isActive('underline'), () => editor.chain().focus().toggleUnderline().run(), t('textEditorUnderline'), <UnderlineIcon size={14} strokeWidth={2.5} />)}
            {btn(editor.isActive('strike'), () => editor.chain().focus().toggleStrike().run(), 'Gạch ngang', <Strikethrough size={14} strokeWidth={2.5} />)}
          </div>

          {/* List & Block Group */}
          <div className="flex items-center space-x-0.5 px-2">
            {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), t('textEditorBullet'), <List size={14} />)}
            {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), t('textEditorNumbered'), <ListOrdered size={14} />)}
            {btn(editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), 'Trích dẫn', <Quote size={14} />)}
            {btn(editor.isActive('codeBlock'), () => editor.chain().focus().toggleCodeBlock().run(), 'Mã nguồn', <Code size={14} />)}
          </div>

          {/* Undo / Redo & Clear */}
          <div className="flex items-center pl-2 space-x-0.5">
            {btn(false, () => editor.chain().focus().undo().run(), 'Hoàn tác (Undo)', <RotateCcw size={14} />)}
            {btn(false, () => editor.chain().focus().redo().run(), 'Làm lại (Redo)', <RotateCw size={14} />)}
            <button
              type="button"
              onClick={() => { editor.commands.clearContent(); onChange(''); }}
              title={t('textEditorClear')}
              className="p-1.5 rounded hover:bg-rose-50 hover:text-rose-600 text-gray-400 cursor-pointer transition-colors ml-1"
            >
              <Eraser size={14} />
            </button>
          </div>
        </div>

        {/* Quick Document Templates */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-400 flex items-center gap-1 text-[11px]">
            <Sparkles size={11} className="text-amber-500" />
            <span>{t('snippets')}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              const tpl = language === 'vi'
                ? '<p><strong>📌 GHI CHÚ QUAN TRỌNG</strong></p><ul><li>Nội dung công việc cần hoàn thành</li><li>Hạn chót: 30/11/2026</li><li>Liên hệ bộ phận điều phối khi cần hỗ trợ.</li></ul>'
                : '<p><strong>📌 IMPORTANT NOTICE</strong></p><ul><li>Key action item to complete</li><li>Deadline: November 30, 2026</li><li>Contact coordinator for assistance.</li></ul>';
              editor.commands.setContent(tpl);
              onChange(editor.getText({ blockSeparator: '\n' }));
            }}
            className="px-2 py-0.5 rounded bg-white hover:bg-gray-100 border border-gray-200 font-medium text-gray-600 text-[11px] cursor-pointer shadow-2xs"
          >
            {t('snippetNote')}
          </button>
          <button
            type="button"
            onClick={() => {
              const tpl = language === 'vi'
                ? '<p><strong>🎉 KÍNH CHÚC BẠN VÀ GIA ĐÌNH</strong></p><p><em>An khang thịnh vượng, vạn sự như ý, thành công rực rỡ!</em></p>'
                : '<p><strong>🎉 BEST WISHES TO YOU</strong></p><p><em>May joy, good health, and success follow you in every step!</em></p>';
              editor.commands.setContent(tpl);
              onChange(editor.getText({ blockSeparator: '\n' }));
            }}
            className="px-2 py-0.5 rounded bg-white hover:bg-gray-100 border border-gray-200 font-medium text-gray-600 text-[11px] cursor-pointer shadow-2xs"
          >
            {t('snippetWish')}
          </button>
        </div>
      </div>

      {/* Flowbite TipTap Editor Body */}
      <div className="p-3.5 bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Flowbite WYSIWYG Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-500 font-mono">
        <div className="flex items-center gap-2">
          <span>{charCount} {t('charCount')}</span>
          <span>•</span>
          <span>{wordCount} {t('wordCount')}</span>
        </div>
        <span className="font-sans text-gray-400">
          Flowbite WYSIWYG Editor
        </span>
      </div>
    </div>
  );
};
