import React from 'react';
import { QRHistoryItem, QRDesign } from '../../../types/qr.types';
import { X, Trash2, Download, History, RotateCcw } from 'lucide-react';

interface QRHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: QRHistoryItem[];
  onRestoreDesign: (design: QRDesign) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const QRHistoryDrawer: React.FC<QRHistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onRestoreDesign,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const downloadThumb = (item: QRHistoryItem) => {
    const link = document.createElement('a');
    link.href = item.thumbnail;
    link.download = `qr-${item.type}-${item.id}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <History size={20} />
            </span>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Lịch Sử Mã QR Đã Tạo
              </h3>
              <p className="text-[11px] text-slate-500">
                Lưu 100% trong trình duyệt ({history.length}/20)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <History size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Chưa có mã QR nào được tạo</p>
              <p className="text-xs text-slate-400 mt-1">
                Mỗi khi bạn tải mã hoặc quét thử, mã sẽ tự động xuất hiện tại đây.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50 transition-all shadow-subtle"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-14 h-14 object-contain rounded-xl border border-slate-100 bg-slate-50"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {item.payload}
                  </p>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onRestoreDesign(item.design);
                      onClose();
                    }}
                    title="Khôi phục thiết kế này"
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => downloadThumb(item)}
                    title="Tải ảnh PNG"
                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    title="Xóa bản ghi này"
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-150 bg-slate-50 flex justify-between items-center">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5"
            >
              <Trash2 size={14} />
              <span>Xóa tất cả</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Chỉ lưu trên máy này
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

