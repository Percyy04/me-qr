export type QRType =
  | 'url'
  | 'pdf'
  | 'image'
  | 'app'
  | 'text'
  | 'whatsapp'
  | 'map'
  | 'social'
  | 'wifi'
  | 'vcard'
  | 'audio'
  | 'event'
  | 'multiurl'
  | 'phone'
  | 'email'
  | 'pptx'
  | 'sms';

export type FormVariant = 'form-a' | 'form-b' | 'form-c' | 'form-d';

export function getFormVariant(type: QRType): FormVariant {
  switch (type) {
    case 'url':
    case 'app':
    case 'multiurl':
    case 'social':
    case 'map':
      return 'form-a';
    case 'pdf':
    case 'image':
    case 'audio':
    case 'pptx':
      return 'form-b';
    case 'vcard':
      return 'form-c';
    case 'wifi':
    case 'whatsapp':
    case 'phone':
    case 'email':
    case 'text':
    case 'event':
    case 'sms':
    default:
      return 'form-d';
  }
}

export type BodyDotType = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type CornerSquareType = 'square' | 'extra-rounded' | 'dot';
export type CornerDotType = 'square' | 'dot';
export type FrameId = 'none' | string;

export interface GradientSetting {
  enabled: boolean;
  type: 'linear' | 'radial';
  rotation: number;
  startColor: string;
  endColor: string;
}

export interface QRInputs {
  url: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  iosUrl?: string;
  androidUrl?: string;
  conditionalRouting?: boolean;
  file?: {
    name: string;
    size: string;
    type: string;
    url?: string;
    title: string;
    description: string;
    ctaText: string;
  };
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  whatsapp?: {
    countryCode: string;
    phoneNumber: string;
    message: string;
  };
  phone?: {
    phoneNumber: string;
  };
  vcard: {
    firstName: string;
    lastName: string;
    organization: string;
    title: string;
    phoneMobile: string;
    phoneWork: string;
    email: string;
    website: string;
    addressStreet: string;
    city: string;
    country: string;
    avatarUrl?: string;
  };
  text: string;
  email: {
    email: string;
    subject: string;
    body: string;
  };
  sms: {
    phoneNumber: string;
    message: string;
  };
  event: {
    title: string;
    location: string;
    startTime: string;
    endTime: string;
    description: string;
  };
}

export interface QRDesign {
  frame: {
    id: FrameId;
    templateUrl: string | null;
    text: string;
    frameColor?: string;
    textColor?: string;
    qrScale?: number;
    qrOffsetY?: number;
  };
  dots: {
    type: BodyDotType;
    color: string;
    gradient: GradientSetting;
  };
  cornersSquare: {
    type: CornerSquareType;
    color: string;
    customColor: boolean;
  };
  cornersDot: {
    type: CornerDotType;
    color: string;
    customColor: boolean;
  };
  background: {
    color: string;
    isTransparent: boolean;
  };
  logo: {
    url: string | null;
    size: number;
    margin: number;
    hideBackgroundDots: boolean;
  };
}

export interface QRState {
  type: QRType;
  inputs: QRInputs;
  design: QRDesign;
}

export interface PreMadeTemplate {
  id: string;
  name: string;
  category: 'business' | 'creative' | 'minimal' | 'social' | 'modern';
  design: QRDesign;
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  title: string;
  payload: string;
  timestamp: number;
  thumbnail: string;
  design: QRDesign;
}
