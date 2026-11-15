import { QRType } from '../types/qr.types';

export interface QRTypeMeta {
  id: QRType;
  label: string;
  icon: string;
  description: string;
  badge?: string;
}

export const QR_TYPES: QRTypeMeta[] = [
  { id: 'url', label: 'Website URL', icon: 'Globe', description: 'Mở đường link trang web hoặc mạng xã hội', badge: 'Phổ biến' },
  { id: 'wifi', label: 'Wi-Fi', icon: 'Wifi', description: 'Tự động kết nối mạng Wi-Fi không cần gõ mật khẩu', badge: 'Hot' },
  { id: 'vcard', label: 'vCard Danh bạ', icon: 'Contact', description: 'Lưu thông tin liên hệ trực tiếp vào điện thoại' },
  { id: 'text', label: 'Văn bản (Text)', icon: 'FileText', description: 'Hiển thị đoạn tin nhắn hoặc thông báo văn bản' },
  { id: 'email', label: 'Email', icon: 'Mail', description: 'Gửi thư điện tử với tiêu đề và nội dung soạn sẵn' },
  { id: 'sms', label: 'SMS', icon: 'MessageSquare', description: 'Gửi tin nhắn SMS tự động tới số điện thoại' },
  { id: 'event', label: 'Sự kiện (Event)', icon: 'Calendar', description: 'Thêm lịch hẹn hoặc hội thảo vào ứng dụng Lịch' },
];

