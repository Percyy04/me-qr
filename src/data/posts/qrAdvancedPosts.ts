import { BlogPost } from '../../types/blog.types';

export const qrAdvancedPosts: BlogPost[] = [
  {
    id: 'post-event-qr',
    slug: 'cach-tao-ma-qr-su-kien-lich',
    title: 'Cách tạo mã QR sự kiện tự động thêm lịch hẹn vào Google Calendar',
    description: 'Tăng tỷ lệ người tham dự hội thảo, webinar và lễ ra mắt sản phẩm bằng mã QR sự kiện chuẩn định dạng iCalendar RFC 5545.',
    category: 'Doanh nghiệp',
    readingTime: '4 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Minh Trí',
    authorRole: 'Senior Marketing Technologist',
    coverImage: '/blog-images/event-qr-ai.svg',
    coverAlt: 'Minh họa mã QR đồng bộ sự kiện vào lịch thông minh',
    relatedType: 'event',
    tags: ['QR Sự kiện', 'Google Calendar', 'Hội thảo sự kiện'],
    sections: [
      {
        heading: 'Đồng bộ lịch hẹn tự động không cần nhập thủ công',
        paragraphs: [
          'Người tham gia sự kiện thường quên ngày giờ nếu không lưu vào lịch. Mã QR Event tạo ra khối dữ liệu VEVENT chứa Tiêu đề sự kiện, Địa điểm, Giờ bắt đầu và Giờ kết thúc.',
          'Khi quét, người dùng chỉ cần nhấn "Lưu vào Lịch", điện thoại sẽ tự động đặt lịch nhắc nhở 15 phút trước khi sự kiện diễn ra.'
        ],
        callout: {
          type: 'tip',
          text: 'Nên ghi rõ múi giờ (ví dụ: Giờ Việt Nam GMT+7) trong phần mô tả chi tiết sự kiện.'
        }
      },
      {
        heading: 'Ứng dụng cho vé mời và banner sự kiện',
        paragraphs: [
          'In mã QR lên vé điện tử hoặc standee tại sảnh hội trường giúp khách mời theo dõi lịch trình các phiên thuyết trình trong ngày thuận tiện.'
        ]
      }
    ]
  },
  {
    id: 'post-fix-scan',
    slug: 'vi-sao-ma-qr-khong-quet-duoc-va-cach-khac-phuc',
    title: 'Vì sao mã QR không quét được? 5 lỗi phổ biến và cách khắc phục',
    description: 'Khắc phục triệt để lỗi quét mã QR: quy tắc độ tương phản màu sắc, khoảng đệm bảo vệ Quiet Zone và cấp độ sửa lỗi Error Correction.',
    category: 'Kỹ thuật',
    readingTime: '6 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Elena Vance',
    authorRole: 'Head of Product & Growth',
    coverImage: '/blog-images/fix-scan-qr-ai.svg',
    coverAlt: 'Minh họa kiểm tra khả năng quét và đo độ tương phản mã QR',
    relatedType: 'url',
    tags: ['Sửa lỗi mã QR', 'Độ tương phản', 'Kiểm tra khả năng quét'],
    sections: [
      {
        heading: 'Lỗi 1: Nghịch đảo màu sắc hoặc độ tương phản quá thấp',
        paragraphs: [
          'Hầu hết cảm biến camera và thuật toán xử lý hình ảnh (như Binarization) mặc định tìm kiếm các khối đen đậm trên nền sáng trắng. Nếu bạn in hoa văn màu vàng nhạt trên nền trắng hoặc đảo ngược hoa văn trắng trên nền đen, nhiều dòng điện thoại sẽ không thể nhận diện được.',
          'Quy tắc vàng: Luôn đảm bảo tỷ lệ tương phản giữa màu chấm và màu nền đạt tối thiểu 3:1 theo tiêu chuẩn WCAG.'
        ],
        callout: {
          type: 'warning',
          text: 'Bộ kiểm tra Scannability tự động trên QuickQR Studio sẽ cảnh báo màu cam nếu độ tương phản dưới ngưỡng an toàn.'
        }
      },
      {
        heading: 'Lỗi 2: Cắt mất khoảng cách an toàn (Quiet Zone)',
        paragraphs: [
          'Mã QR bắt buộc phải có một khoảng đệm màu trắng bao quanh tối thiểu rộng 3 đến 4 module (Quiet Zone). Nếu bạn đặt viền hoặc các chi tiết đồ họa dính sát mép mắt quét, camera sẽ không thể xác định ranh giới ma trận.'
        ]
      },
      {
        heading: 'Lỗi 3: Logo chèn quá to che mất mắt định vị',
        paragraphs: [
          'Tuyệt đối không đè logo lên 3 cụm vuông ở 3 góc (Finder Patterns). Hãy sử dụng công cụ Halftone Logo QR để hệ thống tự động bảo vệ mắt định vị và cân đối kích thước an toàn.'
        ]
      }
    ]
  },
  {
    id: 'post-vector-svg',
    slug: 'cach-in-ma-qr-vector-svg-ro-net-khong-bi-vo-hat',
    title: 'Cách tải và in mã QR Vector SVG sắc nét cho bao bì và pano lớn',
    description: 'Tại sao file PNG bị vỡ hạt khi phóng to và bí quyết sử dụng định dạng Vector SVG để in ấn kích thước từ 1cm đến 10 mét chuẩn nét.',
    category: 'Thiết kế',
    readingTime: '5 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Hoàng Long',
    authorRole: 'Lead UI/UX Designer',
    coverImage: '/blog-images/vector-svg-ai.svg',
    coverAlt: 'Minh họa công nghệ phóng to vô hạn của định dạng Vector SVG',
    relatedType: 'url',
    tags: ['Vector SVG', 'In ấn bao bì', 'Độ phân giải cao'],
    sections: [
      {
        heading: 'So sánh file Raster (PNG, JPG) và file Vector (SVG)',
        paragraphs: [
          'Ảnh PNG và JPG được cấu tạo từ các điểm ảnh cố định (pixels). Khi phóng to để in pano hay bảng hiệu ngoài trời, các cạnh của mã QR sẽ bị nhòe mờ, răng cưa và vỡ hạt khiến camera không thể nhận diện.',
          'Ngược lại, file SVG (Scalable Vector Graphics) lưu trữ tọa độ toán học thuần túy của từng khối hình chữ nhật và đường cong. Bạn có thể phóng to gấp 100 lần mà các góc cạnh vẫn sắc nét đến từng micromet.'
        ],
        callout: {
          type: 'tip',
          text: 'Phần mềm đồ họa chuyên nghiệp như Adobe Illustrator, Photoshop, Figma hay CorelDRAW đều tương thích hoàn hảo với file SVG tải từ QuickQR Studio.'
        }
      },
      {
        heading: 'Kích thước in ấn vật lý tối thiểu',
        paragraphs: [
          'Với tài liệu cầm tay (danh thiếp, flyer): tối thiểu 2 x 2 cm.',
          'Với bao bì sản phẩm hộp bánh, chai nước: tối thiểu 2.5 x 2.5 cm.',
          'Với banner triển lãm nhìn từ 2 mét: tối thiểu 10 x 10 cm.'
        ]
      }
    ]
  }
];
