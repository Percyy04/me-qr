import { BlogPost } from '../../types/blog.types';

export const qrBusinessPosts: BlogPost[] = [
  {
    id: 'post-vcard-qr',
    slug: 'cach-tao-ma-qr-danh-thiep-vcard',
    title: 'Cách tạo mã QR danh thiếp điện tử vCard thông minh 1 chạm',
    description: 'Nâng tầm phong cách chuyên nghiệp: đối tác chỉ cần quét mã QR để lưu đầy đủ họ tên, số điện thoại, email và chức danh vào danh bạ.',
    category: 'Doanh nghiệp',
    readingTime: '5 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Elena Vance',
    authorRole: 'Head of Product & Growth',
    coverImage: '/blog-images/vcard-qr-ai.svg',
    coverAlt: 'Minh họa danh thiếp điện tử vCard đồng bộ danh bạ 1 chạm',
    relatedType: 'vcard',
    tags: ['vCard QR', 'Danh thiếp số', 'Networking'],
    sections: [
      {
        heading: 'Thời kỳ chuyển đổi số từ Card Visit giấy sang vCard QR',
        paragraphs: [
          'Hơn 88% danh thiếp giấy bị vứt bỏ trong vòng một tuần sau khi nhận. Thay vì in lại hàng ngàn tấm card mỗi khi đổi chức danh, mã QR vCard in mặt sau điện thoại hoặc standee là giải pháp hiện đại và bền vững.',
          'Mã QR vCard tạo trên QuickQR Studio tuân thủ định dạng tiêu chuẩn quốc tế vCard 3.0 (BEGIN:VCARD ... END:VCARD), tương thích tự nhiên với ứng dụng Danh bạ mặc định trên cả iPhone (Apple Contacts) và điện thoại Android (Google Contacts).'
        ],
        callout: {
          type: 'tip',
          text: 'Bạn có thể in mã vCard nhỏ gọn kích thước 2x2 cm lên góc thẻ nhân viên hoặc mặt sau ốp lưng điện thoại.'
        }
      },
      {
        heading: 'Các trường thông tin khuyên dùng',
        paragraphs: [
          'Hãy điền đầy đủ: Họ tên, Chức danh, Công ty, Số điện thoại di động chính và Email công việc. Tránh nhồi nhét quá nhiều ghi chú dài để mã giữ được kích thước module thông thoáng.'
        ]
      }
    ]
  },
  {
    id: 'post-whatsapp-qr',
    slug: 'cach-tao-ma-qr-whatsapp',
    title: 'Cách tạo mã QR WhatsApp mở chat tư vấn khách hàng tức thì',
    description: 'Chuyển đổi khách hàng từ quảng cáo offline vào luồng tư vấn bán hàng 1:1 trên WhatsApp bằng đường dẫn wa.me soạn sẵn câu chào.',
    category: 'Doanh nghiệp',
    readingTime: '4 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Minh Trí',
    authorRole: 'Senior Marketing Technologist',
    coverImage: '/blog-images/whatsapp-qr-ai.svg',
    coverAlt: 'Minh họa mã QR WhatsApp mở cuộc trò chuyện tức thì',
    relatedType: 'whatsapp',
    tags: ['WhatsApp QR', 'Bán hàng trực tiếp', 'Chăm sóc khách hàng'],
    sections: [
      {
        heading: 'Tối ưu tỷ lệ phản hồi của khách hàng với câu chào mẫu',
        paragraphs: [
          'Khi khách hàng quét mã, ứng dụng WhatsApp sẽ tự động mở cuộc trò chuyện với số điện thoại doanh nghiệp kèm nội dung soạn sẵn (ví dụ: "Chào bạn, tôi muốn nhận báo giá gói ưu đãi...").',
          'Khách hàng không cần phải lưu số điện thoại vào danh bạ trước khi nhắn tin, loại bỏ rào cản lớn nhất trong quy trình mua hàng đa kênh.'
        ]
      },
      {
        heading: 'Cấu hình mã quốc tế đúng chuẩn',
        paragraphs: [
          'Luôn nhớ chọn đúng mã vùng quốc gia (Việt Nam là +84) và bỏ số 0 ở đầu số điện thoại di động (ví dụ: số 0901234567 nhập thành 901234567).'
        ],
        callout: {
          type: 'note',
          text: 'Mã QR WhatsApp hoạt động mượt mà trên cả WhatsApp cá nhân lẫn WhatsApp Business.'
        }
      }
    ]
  },
  {
    id: 'post-social-qr',
    slug: 'cach-tao-ma-qr-mang-xa-hoi',
    title: 'Cách tạo mã QR mạng xã hội đa kênh kết nối Facebook và Instagram',
    description: 'Gia tăng lượng người theo dõi trên Facebook, YouTube, TikTok và X (Twitter) chỉ với một mã QR đa năng duy nhất.',
    category: 'Doanh nghiệp',
    readingTime: '4 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Minh Trí',
    authorRole: 'Senior Marketing Technologist',
    coverImage: '/blog-images/social-qr-ai.svg',
    coverAlt: 'Minh họa mã QR trung tâm kết nối các kênh mạng xã hội',
    relatedType: 'social',
    tags: ['Social Hub', 'Tăng follow', 'Marketing đa kênh'],
    sections: [
      {
        heading: 'Giải pháp tổng hợp liên kết đa kênh tiện lợi',
        paragraphs: [
          'Thay vì in 4 mã QR riêng biệt cho Facebook, Instagram, YouTube và TikTok khiến ấn phẩm quảng cáo trở nên rối mắt, bạn có thể tạo một mã QR Social Hub duy nhất.',
          'Mã dẫn thẳng người dùng về trang mạng xã hội chính hoặc trang liên kết tổng hợp thông tin, giúp người theo dõi tự do lựa chọn nền tảng họ yêu thích.'
        ]
      },
      {
        heading: 'Ứng dụng hiệu quả tại điểm bán (POS)',
        paragraphs: [
          'Đặt mã QR mạng xã hội tại quầy thu ngân, menu để bàn hoặc túi đựng quà kèm lời kêu gọi hành động: "Quét mã theo dõi Fanpage nhận ngay mã giảm giá 10%".'
        ],
        callout: {
          type: 'tip',
          text: 'Nên kết hợp khung viền có chữ CTA "FOLLOW US" hoặc "THEO DÕI NGAY" để kích thích hành vi quét mã.'
        }
      }
    ]
  },
  {
    id: 'post-maps-qr',
    slug: 'cach-tao-ma-qr-google-maps',
    title: 'Cách tạo mã QR vị trí Google Maps chỉ đường cho khách hàng',
    description: 'Chỉ đường trực tiếp đến cửa hàng, chi nhánh hoặc địa điểm tổ chức tiệc cưới bằng mã QR Google Maps liên kết GPS chính xác.',
    category: 'Doanh nghiệp',
    readingTime: '3 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Hoàng Long',
    authorRole: 'Lead UI/UX Designer',
    coverImage: '/blog-images/maps-qr-ai.svg',
    coverAlt: 'Minh họa định vị GPS Google Maps trên mã QR',
    relatedType: 'map',
    tags: ['Google Maps QR', 'Chỉ đường', 'Địa điểm cửa hàng'],
    sections: [
      {
        heading: 'Chỉ đường không nhầm lẫn cho thiệp cưới và sự kiện',
        paragraphs: [
          'Nhiều khách mời gặp khó khăn khi tìm địa chỉ nhà hàng hoặc trung tâm tiệc cưới nằm trong các con hẻm nhỏ. In mã QR Google Maps lên thiệp mời cho phép khách quét và kích hoạt ứng dụng dẫn đường GPS tức thì.',
          'Người dùng chỉ cần lấy liên kết "Chia sẻ vị trí" từ ứng dụng Google Maps và dán vào công cụ tạo mã tại QuickQR Studio.'
        ]
      },
      {
        heading: 'Tối ưu hiển thị trên thiệp in',
        paragraphs: [
          'Kích thước tối thiểu khuyên dùng cho mã QR chỉ đường trên thiệp giấy là 2.5 x 2.5 cm, đảm bảo camera bắt nét nhanh ngay cả với điện thoại ống kính góc rộng.'
        ],
        callout: {
          type: 'note',
          text: 'Liên kết Google Maps dạng ngắn (maps.app.goo.gl) giúp giảm thiểu số lượng chấm trên mã QR đáng kể.'
        }
      }
    ]
  }
];
