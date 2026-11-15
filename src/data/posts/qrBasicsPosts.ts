import { BlogPost } from '../../types/blog.types';

export const qrBasicsPosts: BlogPost[] = [
  {
    id: 'post-free-qr',
    slug: 'cach-tao-ma-qr-mien-phi-online',
    title: 'Cách tạo mã QR miễn phí online không giới hạn lượt quét',
    description: 'Hướng dẫn tạo mã QR tĩnh 100% trên trình duyệt với tính riêng tư tuyệt đối, không quảng cáo trung gian và tải vector SVG sắc nét.',
    category: 'Cơ bản',
    readingTime: '4 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Elena Vance',
    authorRole: 'Head of Product & Growth',
    coverImage: '/blog-images/free-qr-ai.svg',
    coverAlt: 'Minh họa 3D mã QR miễn phí bảo mật 100% Client-Side',
    relatedType: 'url',
    tags: ['Mã QR miễn phí', 'Tạo QR online', 'Bảo mật'],
    sections: [
      {
        heading: 'Mã QR tĩnh và cam kết không hết hạn',
        paragraphs: [
          'Hầu hết các nền tảng tạo mã QR thương mại hiện nay đều ép người dùng đăng ký tài khoản hoặc chèn link chuyển hướng trung gian có thời hạn. Khi hết hạn dùng thử, mã QR của bạn sẽ bị vô hiệu hóa.',
          'Tại QuickQR Studio, toàn bộ mã QR tĩnh (Static QR) được biên dịch trực tiếp trên trình duyệt của bạn (Client-Side) bằng thư viện toán học nhị phân chuẩn ISO/IEC 18004. Dữ liệu được khắc trực tiếp vào các khối module đen trắng, đảm bảo mã tồn tại vĩnh viễn và quét được mọi lúc mọi nơi.'
        ],
        callout: {
          type: 'tip',
          text: 'Mã QR tĩnh không phụ thuộc vào máy chủ trung gian. Bạn có thể in hàng vạn bản catalogue mà không sợ link bị chết.'
        }
      },
      {
        heading: '4 bước tạo mã QR tiêu chuẩn trên QuickQR Studio',
        paragraphs: [
          'Bước 1: Chọn loại dữ liệu bạn muốn chia sẻ (Liên kết URL, Văn bản, Wi-Fi, vCard...) trên thanh danh mục phía trên.',
          'Bước 2: Điền nội dung chính xác. Đối với website, bạn nên dán đầy đủ tiền tố https:// để trình quét nhận diện nhanh nhất.',
          'Bước 3: Tùy biến kiểu dáng ở bước 2: chọn khung viền mang thương hiệu, hoa văn chấm bo tròn và phối màu nhận diện.',
          'Bước 4: Kiểm tra trạng thái "Tuyệt vời! Mã QR của bạn dễ quét" ở cột bên phải và tải về định dạng PNG hoặc SVG.'
        ]
      }
    ]
  },
  {
    id: 'post-url-qr',
    slug: 'cach-tao-ma-qr-link-website',
    title: 'Cách tạo mã QR cho đường link website kèm gắn mã UTM đo lường',
    description: 'Tối ưu hóa chiến dịch marketing offline bằng cách nhúng UTM tracking vào mã QR website giúp đo lường chuyển đổi chính xác trên Google Analytics.',
    category: 'Cơ bản',
    readingTime: '5 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Minh Trí',
    authorRole: 'Senior Marketing Technologist',
    coverImage: '/blog-images/url-qr-ai.svg',
    coverAlt: 'Minh họa công nghệ điều hướng URL và gắn nhãn UTM cho mã QR',
    relatedType: 'url',
    tags: ['QR URL', 'Google Analytics', 'UTM Campaign'],
    sections: [
      {
        heading: 'Tại sao cần gắn UTM vào mã QR in ấn?',
        paragraphs: [
          'Khi in mã QR lên tờ rơi, bao bì sản phẩm hay banner sự kiện, lưu lượng truy cập thường bị gộp chung thành "Direct" trong Google Analytics 4 nếu bạn không gắn thẻ theo dõi.',
          'QuickQR Studio tích hợp sẵn công cụ cấu hình UTM: bạn chỉ cần bật "+ Thêm thông số theo dõi UTM" và điền utm_source (ví dụ: standee_cafe), utm_medium (print) và utm_campaign (tet_2026).'
        ]
      },
      {
        heading: 'Kiểm tra độ dài link và khả năng quét',
        paragraphs: [
          'Một URL quá dài (trên 150 ký tự) sẽ làm ma trận QR trở nên dày đặc, khiến camera điện thoại khó bắt nét trong điều kiện thiếu sáng. Hãy rút gọn link trước khi tạo hoặc chọn cấp độ sửa lỗi phù hợp.'
        ],
        callout: {
          type: 'note',
          text: 'Bạn luôn có thể xem trước thời gian thực mã QR ở cột bên phải để kiểm tra độ dày của ma trận.'
        }
      }
    ]
  },
  {
    id: 'post-wifi-qr',
    slug: 'cach-tao-ma-qr-wifi',
    title: 'Cách tạo mã QR Wi-Fi kết nối tự động không cần nhập mật khẩu',
    description: 'Bí quyết chia sẻ mạng Wi-Fi bảo mật chuẩn WPA/WPA2 bằng mã QR cho quán cafe, nhà hàng và văn phòng làm việc.',
    category: 'Kỹ thuật',
    readingTime: '4 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Elena Vance',
    authorRole: 'Head of Product & Growth',
    coverImage: '/blog-images/wifi-qr-ai.svg',
    coverAlt: 'Minh họa sóng Wi-Fi kết nối tự động từ mã QR',
    relatedType: 'wifi',
    tags: ['QR Wi-Fi', 'Mạng không dây', 'Bảo mật cafe'],
    sections: [
      {
        heading: 'Cơ chế hoạt động của mã QR Wi-Fi trên iOS và Android',
        paragraphs: [
          'Mã QR Wi-Fi sử dụng cú pháp chuẩn hóa: WIFI:T:WPA;S:SSID_Name;P:SecretKey;;. Khi camera điện thoại nhận diện cấu trúc này, hệ điều hành tự động hiển thị popup "Kết nối vào mạng Wi-Fi này?".',
          'Khách hàng không còn phải mất thời gian hỏi nhân viên mật khẩu là gì hay nhập nhầm ký tự hoa thường.'
        ]
      },
      {
        heading: 'Bảo mật mật khẩu khi tạo mã QR',
        paragraphs: [
          'Nhiều chủ quán lo ngại mật khẩu Wi-Fi nội bộ sẽ bị lộ khi nhập vào các trang web tạo QR. Tại QuickQR Studio, toàn bộ xử lý diễn ra trên trình duyệt của bạn, cam kết 100% không lưu mật khẩu lên bất kỳ máy chủ nào.'
        ],
        callout: {
          type: 'tip',
          text: 'Nếu quán có 2 băng tần 2.4GHz và 5GHz, hãy tạo mã QR kết nối vào mạng 5GHz để khách có trải nghiệm lướt web mượt nhất.'
        }
      }
    ]
  },
  {
    id: 'post-logo-qr',
    slug: 'cach-tao-ma-qr-co-logo',
    title: 'Cách tạo mã QR có logo ở giữa không làm hỏng khả năng nhận diện',
    description: 'Khám phá công nghệ Halftone Sub-module Engine: nhúng logo thương hiệu sắc nét ở trung tâm mà vẫn giữ 100% khả năng quét thành công.',
    category: 'Thiết kế',
    readingTime: '6 phút đọc',
    publishedAt: '15/11/2026',
    author: 'Hoàng Long',
    authorRole: 'Lead UI/UX Designer',
    coverImage: '/blog-images/logo-qr-ai.svg',
    coverAlt: 'Minh họa mã QR Halftone nhúng logo thương hiệu sắc nét',
    relatedType: 'url',
    tags: ['Logo QR', 'Halftone Engine', 'Nhận diện thương hiệu'],
    sections: [
      {
        heading: 'Vấn đề của phương pháp đè logo thông thường',
        paragraphs: [
          'Cách chèn logo truyền thống là đặt một hình ảnh đè lên giữa mã QR và hy vọng tính năng sửa lỗi (Error Correction) sẽ tự bù đắp phần bị che. Tuy nhiên nếu logo quá to (trên 30%), mã sẽ lập tức bị lỗi không thể quét được.',
          'QuickQR Studio phát triển Halftone Logo QR Engine: logo được vẽ liên tục ở trung tâm với các chấm control dot 0.44 kích thước đồng nhất, giữ nguyên 3 cụm Finder Pattern góc, giúp mã đạt chuẩn thẩm mỹ cao và quét tức thì.'
        ]
      },
      {
        heading: 'Quy tắc chọn logo chuẩn cho mã QR',
        paragraphs: [
          'Hãy sử dụng logo có độ tương phản cao với màu nền. Định dạng SVG hoặc PNG trong suốt có độ phân giải tối thiểu 500x500px sẽ cho chất lượng in ấn tốt nhất.'
        ],
        callout: {
          type: 'warning',
          text: 'Khi dùng chế độ Logo QR, hệ thống tự động khóa cấp độ sửa lỗi ở mức Tốt nhất (H - 30%) để bảo đảm an toàn dữ liệu.'
        }
      }
    ]
  }
];
