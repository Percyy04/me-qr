import { QRType } from '../types/qr.types';

export interface BentoCategory {
  id: QRType;
  title: string;
  badge: string;
  badgeType: 'dynamic' | 'static';
  description: string;
  highlight?: string;
  span?: 'col-span-1' | 'col-span-2' | 'col-span-3';
}

export const BENTO_CATEGORIES: BentoCategory[] = [
  {
    id: 'url',
    title: 'Link / URL',
    badge: 'Dynamic Active',
    badgeType: 'dynamic',
    description: 'Chuyển hướng đến website ngoài, landing page sản phẩm hoặc link tiếp thị theo dõi UTM.',
    highlight: 'Auto-shortened quickqr.io link',
    span: 'col-span-3',
  },
  {
    id: 'text',
    title: 'Văn bản (Text)',
    badge: '100% Client-Side',
    badgeType: 'static',
    description: 'Soạn thảo và hiển thị đoạn văn bản, ghi chú hoặc thông điệp định dạng phong phú khi quét.',
    highlight: '100% offline scannable payload',
    span: 'col-span-3',
  },
  {
    id: 'vcard',
    title: 'vCard Business',
    badge: 'Contact Sync',
    badgeType: 'dynamic',
    description: 'Danh bạ thông minh đồng bộ 1 chạm vào danh bạ điện thoại với avatar và mạng xã hội.',
    highlight: 'Native iOS & Android .vcf sync',
    span: 'col-span-2',
  },
  {
    id: 'wifi',
    title: 'Wi-Fi Access',
    badge: 'Zero-Typing',
    badgeType: 'static',
    description: 'Kết nối mạng Wi-Fi tự động không cần nhập mật khẩu thủ công cho quán cafe, văn phòng.',
    highlight: 'WPA/WPA2/WEP auto-connect protocol',
    span: 'col-span-2',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Direct',
    badge: 'Auto-Chat',
    badgeType: 'dynamic',
    description: 'Mở cửa sổ chat WhatsApp ngay lập tức với số điện thoại và nội dung soạn sẵn.',
    highlight: 'Direct wa.me deep-link trigger',
    span: 'col-span-2',
  },
  {
    id: 'social',
    title: 'Social Hub',
    badge: 'Channel Boost',
    badgeType: 'dynamic',
    description: 'Liên kết đồng thời Facebook, Instagram, YouTube, TikTok và Twitter trong một mã.',
    highlight: 'Omnichannel social follower growth',
    span: 'col-span-2',
  },
  {
    id: 'map',
    title: 'Google Maps Location',
    badge: 'Geo Pin',
    badgeType: 'static',
    description: 'Chỉ đường định vị trực tiếp trên bản đồ Google Maps cho cửa hàng và sự kiện.',
    highlight: 'Direct GPS navigation intent',
    span: 'col-span-2',
  },
  {
    id: 'event',
    title: 'Event & Calendar',
    badge: 'iCal / Google',
    badgeType: 'static',
    description: 'Thêm lịch hẹn sự kiện, hội thảo kèm thời gian và địa điểm vào ứng dụng Lịch.',
    highlight: 'RFC 5545 calendar standard',
    span: 'col-span-2',
  },
  {
    id: 'email',
    title: 'E-mail Dispatch',
    badge: 'Pre-filled Mail',
    badgeType: 'static',
    description: 'Kích hoạt ứng dụng email với địa chỉ nhận, tiêu đề và nội dung mẫu có sẵn.',
    highlight: 'Standard mailto: URI handler',
    span: 'col-span-2',
  },
  {
    id: 'phone',
    title: 'Phone Call Dial',
    badge: 'Direct Dial',
    badgeType: 'static',
    description: 'Khởi động cuộc gọi tức thì đến tổng đài hoặc số cá nhân chỉ với 1 lượt quét.',
    highlight: 'Native tel: dialing action',
    span: 'col-span-2',
  },
  {
    id: 'sms',
    title: 'SMS Message',
    badge: 'Quick SMS',
    badgeType: 'static',
    description: 'Gửi tin nhắn SMS tự động với số điện thoại và cú pháp xác thực được cài đặt sẵn.',
    highlight: 'Direct SMSTO: trigger',
    span: 'col-span-2',
  },
];
