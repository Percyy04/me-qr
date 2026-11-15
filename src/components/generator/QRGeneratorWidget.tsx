import React, { useState } from 'react';
import { QRState } from '../../types/qr.types';
import { formatQRPayload } from '../../utils/qrFormatters';
import { useQRHistory } from '../../hooks/useQRHistory';
import { TypeSelector } from './TypeSelector';
import { ActiveTypeForm } from './ActiveTypeForm';
import { LivePreviewCard } from './preview/LivePreviewCard';
import { QRHistoryDrawer } from './history/QRHistoryDrawer';
import { History, ShieldCheck } from 'lucide-react';

const initialQRState: QRState = {
  type: 'url',
  inputs: {
    url: 'https://me-qr.com',
    wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    vcard: {
      firstName: '', lastName: '', organization: '', title: '',
      phoneMobile: '', phoneWork: '', email: '', website: '',
      addressStreet: '', city: '', country: '',
    },
    text: '',
    email: { email: '', subject: '', body: '' },
    sms: { phoneNumber: '', message: '' },
    event: { title: '', location: '', startTime: '', endTime: '', description: '' },
  },
  design: {
    frame: { id: 'none', templateUrl: null, text: '', qrScale: 0.72, qrOffsetY: 0 },
    dots: {
      type: 'rounded',
      color: '#0F172A',
      gradient: { enabled: false, type: 'linear', rotation: 0, startColor: '#0052D4', endColor: '#4364F7' },
    },
    cornersSquare: { type: 'extra-rounded', color: '#0066FF', customColor: false },
    cornersDot: { type: 'dot', color: '#0066FF', customColor: false },
    background: { color: '#FFFFFF', isTransparent: false },
    logo: { url: null, size: 0.25, margin: 4, hideBackgroundDots: true },
  },
};

export const QRGeneratorWidget: React.FC = () => {
  const [qrState, setQRState] = useState<QRState>(initialQRState);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { history, addHistoryItem, removeHistoryItem, clearHistory } = useQRHistory();

  const payload = formatQRPayload(qrState.type, qrState.inputs);

  const handleRecordHistory = (thumb: string) => {
    addHistoryItem(qrState.type, qrState.inputs.url || qrState.type.toUpperCase(), payload, thumb, qrState.design);
  };

  return (
    <div id="generator-widget" className="max-w-6xl mx-auto bg-white rounded-3xl shadow-generator border border-slate-200/90 overflow-hidden p-6 sm:p-8">
      {/* Top tool banner */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Trình tạo mã QR Client-Side Pro</span>
        </span>
        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <History size={15} className="text-blue-600" />
          <span>Lịch sử ({history.length})</span>
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Left col */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <TypeSelector
              currentType={qrState.type}
              onSelectType={(type) => setQRState((prev) => ({ ...prev, type }))}
            />

            <div className="mt-6">
              <ActiveTypeForm
                type={qrState.type}
                inputs={qrState.inputs}
                onChangeInputs={(inputs) => setQRState((prev) => ({ ...prev, inputs }))}
              />
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
            <span className="text-xl">💡</span>
            <p className="text-xs text-blue-900 leading-relaxed">
              <strong>Mẹo bảo mật:</strong> Dữ liệu mã QR của bạn được tạo trực tiếp trên trình duyệt bằng chuẩn mã hóa ISO/IEC 18004. Không có dữ liệu nào gửi lên máy chủ!
            </p>
          </div>
        </div>

        {/* Right col: Live Preview */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <LivePreviewCard
              payload={payload}
              design={qrState.design}
              onChangeDesign={(design) => setQRState((prev) => ({ ...prev, design }))}
              onRecordHistory={handleRecordHistory}
            />
          </div>
        </div>
      </div>

      <QRHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestoreDesign={(design) => setQRState((prev) => ({ ...prev, design }))}
        onRemoveItem={removeHistoryItem}
        onClearAll={clearHistory}
      />
    </div>
  );
};
