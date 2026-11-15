export interface VietnamTemplateItem {
  id: string;
  name: string;
  templateIndex: number;
  templateUrl: string;
  badge?: string;
  ctaText: string;
  dotColor: string;
  dotType: 'rounded' | 'dots' | 'square' | 'extra-rounded' | 'classy' | 'classy-rounded';
  cornerColor?: string;
  gradient?: { start: string; end: string };
}

export interface VietnamCategory {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  iconType: 'bank' | 'school' | 'flag' | 'users' | 'coffee' | 'sparkles';
  items: VietnamTemplateItem[];
}

const tplUrl = (idx: number) => (idx === 0 ? '/templete/default.webp' : `/templete/default (${idx}).webp`);

export const VIETNAM_STUDENT_CATEGORIES: VietnamCategory[] = [
  {
    id: 'vietqr',
    title: 'Chuyển Khoản & Chia Tiền Sinh Viên (VietQR / MoMo)',
    subtitle: 'Mẫu mã chuyển khoản chia tiền ăn uống, phòng trọ, góp quỹ lớp',
    badge: 'HOT Sinh Viên',
    iconType: 'bank',
    items: [
      { id: 'vqr-split', name: 'Chia Tiền Ăn Uống & Trà Sữa', templateIndex: 1, templateUrl: tplUrl(1), ctaText: 'QUÉT CHIA TIỀN', dotColor: '#0052D4', dotType: 'extra-rounded', gradient: { start: '#0052D4', end: '#4364F7' } },
      { id: 'vqr-rent', name: 'Đóng Tiền Phòng Trọ & Điện Nước', templateIndex: 10, templateUrl: tplUrl(10), ctaText: 'TIỀN TRỌ THÁNG', dotColor: '#059669', dotType: 'rounded', cornerColor: '#10B981' },
      { id: 'vqr-fund', name: 'Góp Quỹ Lớp & Quỹ CLB Sinh Viên', templateIndex: 22, templateUrl: tplUrl(22), ctaText: 'GÓP QUỸ LỚP', dotColor: '#D97706', dotType: 'classy', gradient: { start: '#D97706', end: '#F59E0B' } },
      { id: 'vqr-momo', name: 'Ví MoMo / ZaloPay Chuyển Khoản', templateIndex: 35, templateUrl: tplUrl(35), ctaText: 'MOMO / ZALOPAY', dotColor: '#C13584', dotType: 'dots', cornerColor: '#E11D48' },
      { id: 'vqr-coffee', name: 'Quét Trả Cafe Tán Gẫu Nhóm', templateIndex: 50, templateUrl: tplUrl(50), ctaText: 'SCAN TO PAY', dotColor: '#78350F', dotType: 'rounded', cornerColor: '#92400E' },
      { id: 'vqr-party', name: 'Tiệc Liên Hoan & Tất Niên Lớp', templateIndex: 68, templateUrl: tplUrl(68), ctaText: 'QUÉT THANH TOÁN', dotColor: '#7C3AED', dotType: 'classy-rounded' },
    ],
  },
  {
    id: 'academic',
    title: 'Học Tập, Đồ Án & Nghiên Cứu (Đại Học)',
    subtitle: 'Gắn bìa slide thuyết trình, đồ án tốt nghiệp, khảo sát NCKH, CV',
    badge: 'Đại Học',
    iconType: 'school',
    items: [
      { id: 'aca-thesis', name: 'Báo Cáo Đồ Án & Khóa Luận Tốt Nghiệp', templateIndex: 85, templateUrl: tplUrl(85), ctaText: 'XEM ĐỒ ÁN', dotColor: '#1E293B', dotType: 'square', cornerColor: '#334155' },
      { id: 'aca-pdf', name: 'Tài Liệu Học Tập & Giáo Trình PDF', templateIndex: 100, templateUrl: tplUrl(100), ctaText: 'TẢI SLIDE BÀI', dotColor: '#DC2626', dotType: 'rounded', cornerColor: '#B91C1C' },
      { id: 'aca-survey', name: 'Khảo Sát Nghiên Cứu Khoa Học (NCKH)', templateIndex: 120, templateUrl: tplUrl(120), ctaText: 'KHẢO SÁT 1 PHÚT', dotColor: '#2563EB', dotType: 'extra-rounded' },
      { id: 'aca-cv', name: 'CV & Portfolio Thực Tập Sinh (Intern)', templateIndex: 140, templateUrl: tplUrl(140), ctaText: 'MY PORTFOLIO', dotColor: '#4F46E5', dotType: 'classy', cornerColor: '#6366F1' },
      { id: 'aca-group', name: 'Nhóm Học Tập Zalo / Discord', templateIndex: 160, templateUrl: tplUrl(160), ctaText: 'VÀO NHÓM ÔN THI', dotColor: '#0891B2', dotType: 'dots' },
      { id: 'aca-demo', name: 'Source Code & Demo Dự Án', templateIndex: 180, templateUrl: tplUrl(180), ctaText: 'SCAN CODE DEMO', dotColor: '#0F172A', dotType: 'classy' },
    ],
  },
  {
    id: 'vietnam_festivals',
    title: 'Lễ Hội & Dịp Lễ Truyền Thống Việt Nam',
    subtitle: 'Khung hoa mai đào Tết, Giỗ tổ Hùng Vương, 30/4 - 2/9, Tri ân 20/11',
    badge: 'Văn Hóa VN',
    iconType: 'flag',
    items: [
      { id: 'fest-tet', name: 'Tết Nguyên Đán & Lì Xì Đầu Năm', templateIndex: 200, templateUrl: tplUrl(200), ctaText: 'LÌ XÌ TẾT MAY MẮN', dotColor: '#B91C1C', dotType: 'extra-rounded', gradient: { start: '#DC2626', end: '#EAB308' } },
      { id: 'fest-hung', name: 'Lễ Giỗ Tổ Hùng Vương (10/3)', templateIndex: 225, templateUrl: tplUrl(225), ctaText: 'HƯỚNG VỀ CỘI NGUỒN', dotColor: '#854D0E', dotType: 'classy', cornerColor: '#A16207' },
      { id: 'fest-national', name: 'Đại Lễ 30/4 & Quốc Khánh 2/9', templateIndex: 250, templateUrl: tplUrl(250), ctaText: 'TỰ HÀO VIỆT NAM', dotColor: '#DC2626', dotType: 'square', cornerColor: '#EAB308' },
      { id: 'fest-teacher', name: 'Tri Ân Thầy Cô 20/11 (Nhà Giáo VN)', templateIndex: 280, templateUrl: tplUrl(280), ctaText: 'TRI ÂN THẦY CÔ', dotColor: '#065F46', dotType: 'rounded', cornerColor: '#047857' },
      { id: 'fest-midautumn', name: 'Tết Trung Thu Rước Đèn', templateIndex: 300, templateUrl: tplUrl(300), ctaText: 'ĐÊM HỘI TRĂNG RẰM', dotColor: '#D97706', dotType: 'dots', cornerColor: '#F59E0B' },
      { id: 'fest-women', name: 'Ngày Phụ Nữ Việt Nam 20/10 & 8/3', templateIndex: 350, templateUrl: tplUrl(350), ctaText: 'YÊU THƯƠNG 20/10', dotColor: '#BE185D', dotType: 'rounded', cornerColor: '#DB2777' },
    ],
  },
  {
    id: 'campus_life',
    title: 'Đời Sống Sinh Viên & CLB / Đoàn - Hội',
    subtitle: 'Tuyển quân Gen Z, check-in sự kiện, wifi KTX, link Bio mạng xã hội',
    badge: 'Gen Z',
    iconType: 'users',
    items: [
      { id: 'cam-recruitment', name: 'Tuyển Thành Viên CLB (Gen Z Recruiting)', templateIndex: 380, templateUrl: tplUrl(380), ctaText: 'JOIN OUR TEAM', dotColor: '#6366F1', dotType: 'extra-rounded', gradient: { start: '#4F46E5', end: '#EC4899' } },
      { id: 'cam-checkin', name: 'Vé Check-in Sự Kiện & Hội Thảo SV', templateIndex: 400, templateUrl: tplUrl(400), ctaText: 'QUÉT CHECK-IN', dotColor: '#0F172A', dotType: 'square' },
      { id: 'cam-wifi', name: 'Wifi Ký Túc Xá & Thư Viện Trường', templateIndex: 405, templateUrl: tplUrl(405), ctaText: 'KẾT NỐI WIFI', dotColor: '#0284C7', dotType: 'rounded', cornerColor: '#0EA5E9' },
      { id: 'cam-bio', name: 'Link Bio TikTok / Instagram Sinh Viên', templateIndex: 410, templateUrl: tplUrl(410), ctaText: 'FOLLOW ME', dotColor: '#E11D48', dotType: 'dots', gradient: { start: '#833AB4', end: '#FD1D1D' } },
    ],
  },
  {
    id: 'student_cafe',
    title: 'Quán Cà Phê, Trà Sữa & Khởi Nghiệp Trẻ',
    subtitle: 'Menu điện tử, gọi món quán xá sinh viên, review 5 sao Google Maps',
    badge: 'Kinh Doanh',
    iconType: 'coffee',
    items: [
      { id: 'biz-menu', name: 'Menu Điện Tử Quán Cà Phê / Trà Sữa', templateIndex: 15, templateUrl: tplUrl(15), ctaText: 'XEM MENU GỌI MÓN', dotColor: '#92400E', dotType: 'rounded', cornerColor: '#B45309' },
      { id: 'biz-review', name: 'Đánh Giá 5 Sao Quán Ăn Sinh Viên', templateIndex: 75, templateUrl: tplUrl(75), ctaText: 'ĐÁNH GIÁ 5 SAO', dotColor: '#EAB308', dotType: 'classy', cornerColor: '#CA8A04' },
      { id: 'biz-voucher', name: 'Ưu Đãi Giảm Giá Thẻ Sinh Viên -20%', templateIndex: 95, templateUrl: tplUrl(95), ctaText: 'VOUCHER -20%', dotColor: '#DC2626', dotType: 'extra-rounded', cornerColor: '#EF4444' },
      { id: 'biz-takeaway', name: 'Đặt Hàng Take-away / Giao Trọ', templateIndex: 105, templateUrl: tplUrl(105), ctaText: 'ORDER MÓN NGAY', dotColor: '#059669', dotType: 'rounded' },
    ],
  },
];
