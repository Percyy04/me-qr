import React, { useState } from 'react';
import { QRType, QRInputs, QRDesign } from '../../types/qr.types';
import { formatQRPayload } from '../../utils/qrFormatters';
import { StudioHeader } from './StudioHeader';
import { Step1TypeBento } from './Step1TypeBento';
import { Step2ContentWrapper } from './Step2ContentWrapper';
import { Step3CustomizeStudio } from './Step3CustomizeStudio';
import { StudioPreviewColumn } from './preview/StudioPreviewColumn';
import { useLanguage } from '../../context/LanguageContext';

const INITIAL_INPUTS: QRInputs = {
  url: 'https://quickqr.io/launch',
  utmSource: 'qr-campaign',
  utmMedium: 'print',
  utmCampaign: 'launch-2026',
  conditionalRouting: false,
  wifi: {
    ssid: 'Studio_Coffee_5G',
    password: 'SuperSecretPassword',
    encryption: 'WPA',
    hidden: false,
  },
  whatsapp: {
    countryCode: '+84',
    phoneNumber: '901234567',
    message: 'Xin chào QuickQR Studio! Tôi cần tư vấn chiến dịch mã QR.',
  },
  vcard: {
    firstName: 'Elena',
    lastName: 'Vance',
    organization: 'Studio Corp',
    title: 'Head of Growth',
    phoneMobile: '+84 901 234 567',
    phoneWork: '+84 28 3822 1234',
    email: 'elena@studiocorp.io',
    website: 'https://studiocorp.io',
    addressStreet: '123 Nguyen Hue',
    city: 'TP. Ho Chi Minh',
    country: 'Vietnam',
  },
  text: 'Chào mừng bạn đến với QuickQR Studio — 100% Client-Side QR Suite.',
  email: {
    email: 'hello@quickqr.io',
    subject: 'Feedback QuickQR Studio',
    body: 'Tôi muốn yêu cầu hỗ trợ thêm tính năng...',
  },
  sms: {
    phoneNumber: '+84901234567',
    message: 'Mã xác thực của bạn là: 888999',
  },
  event: {
    title: 'Hội thảo AI & Design Systems 2026',
    location: 'TP. Hồ Chí Minh',
    startTime: '2026-12-01T09:00',
    endTime: '2026-12-01T17:00',
    description: 'Chia sẻ về AI Frontend Architecture và Design Tokens.',
  },
};

const INITIAL_DESIGN: QRDesign = {
  frame: {
    id: 'none',
    templateUrl: null,
    text: 'SCAN ME',
    frameColor: '#4F46E5',
    textColor: '#FFFFFF',
    qrScale: 0.72,
    qrOffsetY: 0,
  },
  dots: {
    type: 'rounded',
    color: '#4F46E5',
    gradient: {
      enabled: false,
      type: 'linear',
      rotation: 45,
      startColor: '#4F46E5',
      endColor: '#10B981',
    },
  },
  cornersSquare: {
    type: 'extra-rounded',
    color: '#4F46E5',
    customColor: false,
  },
  cornersDot: {
    type: 'dot',
    color: '#4F46E5',
    customColor: false,
  },
  background: {
    color: '#FFFFFF',
    isTransparent: false,
  },
  logo: {
    url: null,
    size: 0.28,
    margin: 3,
    hideBackgroundDots: true,
  },
};

export const QuickQRStudioApp: React.FC = () => {
  const { t } = useLanguage();
  const [type, setType] = useState<QRType>('url');
  const [inputs, setInputs] = useState<QRInputs>(INITIAL_INPUTS);
  const [design, setDesign] = useState<QRDesign>(INITIAL_DESIGN);

  const payload = formatQRPayload(type, inputs);

  const handleAutoFixContrast = () => {
    setDesign((prev) => ({
      ...prev,
      dots: { ...prev.dots, color: '#0F172A' },
      cornersSquare: { ...prev.cornersSquare, color: '#0F172A', customColor: true },
    }));
  };

  return (
    <div className="min-h-screen bg-canvas-bg text-slate-text-strong font-sans antialiased">
      <StudioHeader />

      {/* Hero Title Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-text-strong font-display tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-text-muted mt-1 leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <Step1TypeBento selectedType={type} onSelectType={setType} />
            <Step2ContentWrapper type={type} inputs={inputs} onChange={setInputs} />
            <Step3CustomizeStudio
              design={design}
              onChange={setDesign}
              onReset={() => setDesign(INITIAL_DESIGN)}
            />
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-20 self-start z-30">
            <StudioPreviewColumn
              type={type}
              payload={payload}
              inputs={inputs}
              design={design}
              onAutoFix={handleAutoFixContrast}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
