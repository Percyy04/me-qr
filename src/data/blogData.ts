import { QRType } from '../types/qr.types';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  author: string;
  relatedType: QRType;
  content: string[];
}

export const BLOG_POSTS_VI: BlogPost[] = [
  {
    id: 'p1-free-qr',
    slug: 'cach-tao-ma-qr-mien-phi-online',
    title: 'Cách tạo mã QR miễn phí online không giới hạn quét',
    description: 'Hướng dẫn tạo mã QR tĩnh miễn phí 100% trên trình duyệt, không cần tài khoản, không hết hạn và tải file SVG/PNG sắc nét.',
    category: 'Cơ bản',
    readingTime: '3 phút đọc',
    publishedAt: '2026-11-15',
    author: 'Đội ngũ Kỹ thuật QuickQR',
    relatedType: 'url',
    content: [
      'Mã QR (Quick Response) đã trở thành công cụ không thể thiếu trong thanh toán, tiếp thị và chia sẻ thông tin. Tuy nhiên, nhiều dịch vụ trực tuyến hiện nay chèn quảng cáo trung gian hoặc giới hạn số lần quét mã.',
      'Tại QuickQR Studio, toàn bộ mã QR được tạo trực tiếp 100% bằng JavaScript và HTML5 Canvas trên thiết bị của bạn. Điều này đảm bảo mã QR tĩnh (Static QR) của bạn tồn tại vĩnh viễn và không bao giờ bị giới hạn lượt quét.',
      'Bước 1: Chọn định dạng nội dung cần tạo (URL, Văn bản, Wi-Fi, vCard...).',
      'Bước 2: Điền thông tin chính xác vào biểu mẫu.',
      'Bước 3: Tùy chỉnh màu sắc, hoa văn hoặc nhúng logo thương hiệu.',
      'Bước 4: Tải xuống định dạng PNG để chia sẻ mạng xã hội hoặc SVG để in ấn chất lượng cao.'
    ]
  },
  {
    id: 'p1-wifi-qr',
    slug: 'cach-tao-ma-qr-wifi',
    title: 'Cách tạo mã QR Wi-Fi giúp khách hàng kết nối không cần nhập mật khẩu',
    description: 'Bí quyết chia sẻ mật khẩu Wi-Fi nhanh chóng cho quán cafe, văn phòng bằng mã QR chuẩn giao thức WPA/WPA2 an toàn.',
    category: 'Mạng & Tiện ích',
    readingTime: '4 phút đọc',
    publishedAt: '2026-11-15',
    author: 'Đội ngũ Kỹ thuật QuickQR',
    relatedType: 'wifi',
    content: [
      'Việc nhập các mật khẩu Wi-Fi phức tạp thường gây bất tiện cho khách hàng và tốn thời gian giải thích. Mã QR Wi-Fi chuẩn hóa giao thức kết nối tự động chỉ với một lần quét camera.',
      'Chuẩn mã hóa: Ứng dụng hỗ trợ WPA, WPA2, WEP và cả mạng không mật khẩu. Toàn bộ chuỗi cấu hình `WIFI:T:WPA;S:TenMang;P:MatKhau;;` được lưu trực tiếp trong mã.',
      'Bảo mật tuyệt đối: Mật khẩu Wi-Fi của bạn không bao giờ được gửi lên máy chủ hay lưu vào cơ sở dữ liệu bên ngoài. Mọi thứ xử lý ngay trên máy tính của bạn.'
    ]
  },
  {
    id: 'p1-logo-qr',
    slug: 'cach-tao-ma-qr-co-logo',
    title: 'Cách tạo mã QR có logo ở giữa không làm hỏng khả năng quét',
    description: 'Khám phá công nghệ Halftone Logo QR Engine: giữ nguyên hình ảnh logo thương hiệu mà vẫn đảm bảo camera quét mượt mà 100%.',
    category: 'Thiết kế thương hiệu',
    readingTime: '4 phút đọc',
    publishedAt: '2026-11-15',
    author: 'Đội ngũ Kỹ thuật QuickQR',
    relatedType: 'url',
    content: [
      'Chèn logo vào mã QR thường khiến người tạo lo lắng mã sẽ bị lỗi hoặc khó nhận diện. QuickQR Studio áp dụng thuật toán Halftone 0.44 Sub-module kết hợp Error Correction cấp H (30%).',
      'Logo của bạn hiển thị liên tục, sắc nét ở trung tâm trong khi 3 mắt định vị (Corner Finder Patterns) và các chấm dữ liệu được bảo toàn độ tương phản tối đa.',
      'Khuyến nghị: Sử dụng logo có độ tương phản rõ ràng với nền và chọn mức sửa lỗi Tốt nhất (H) khi in trên bao bì hoặc standee.'
    ]
  },
  {
    id: 'p2-vcard-qr',
    slug: 'cach-tao-ma-qr-danh-thiep-vcard',
    title: 'Cách tạo mã QR danh thiếp điện tử vCard thông minh',
    description: 'Thay thế danh thiếp giấy truyền thống: quét mã lưu danh bạ trực tiếp vào điện thoại iOS và Android chỉ với 1 chạm.',
    category: 'Doanh nghiệp',
    readingTime: '3 phút đọc',
    publishedAt: '2026-11-15',
    author: 'Đội ngũ Kỹ thuật QuickQR',
    relatedType: 'vcard',
    content: [
      'Danh thiếp điện tử vCard chuẩn RFC giúp đối tác lưu đầy đủ họ tên, số điện thoại, email, công ty và địa chỉ vào danh bạ điện thoại mà không cần gõ từng dòng.',
      'Mã QR vCard tạo tại đây tuân thủ tiêu chuẩn vCard 3.0 quốc tế, tương thích hoàn toàn với ứng dụng Danh bạ mặc định trên cả iPhone và điện thoại Android.'
    ]
  }
];

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    id: 'p1-free-qr-en',
    slug: 'how-to-create-qr-code-online-free',
    title: 'How to Create a Free QR Code Online with Unlimited Scans',
    description: 'Complete guide to creating 100% private, client-side static QR codes with zero scan limits and crisp SVG vector exports.',
    category: 'Basics',
    readingTime: '3 min read',
    publishedAt: '2026-11-15',
    author: 'QuickQR Engineering Team',
    relatedType: 'url',
    content: [
      'QR codes have become an essential medium for contactless sharing, marketing, and direct payments.',
      'At QuickQR Studio, all QR codes are rendered directly in your browser using JavaScript and HTML5 Canvas. Your data never leaves your computer.',
      'Static QR codes generated here have no expiration date, no redirected intermediary URLs, and no scan limits.'
    ]
  },
  {
    id: 'p1-wifi-qr-en',
    slug: 'how-to-create-wifi-qr-code',
    title: 'How to Create a Wi-Fi QR Code for Instant Auto-Connect',
    description: 'Learn how to generate a seamless Wi-Fi QR code for guests, cafes, and offices with WPA/WPA2 protocol support.',
    category: 'Networking',
    readingTime: '4 min read',
    publishedAt: '2026-11-15',
    author: 'QuickQR Engineering Team',
    relatedType: 'wifi',
    content: [
      'Stop typing long complex Wi-Fi passwords. Generating a Wi-Fi QR code embeds the network configuration directly into the QR code.',
      'Supported protocols include WPA, WPA2, WEP, and Open networks. Zero network requests are made during generation.'
    ]
  }
];
