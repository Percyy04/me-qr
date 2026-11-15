export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Mã QR tạo tại đây có miễn phí và vĩnh viễn không?',
    answer: 'Có! Toàn bộ mã QR được tạo trực tiếp 100% trên trình duyệt của bạn (Client-Side), không qua máy chủ trung gian, không bị gắn quảng cáo chuyển hướng và không bao giờ hết hạn sử dụng.',
  },
  {
    question: 'Có giới hạn số lần quét mã QR không?',
    answer: 'Hoàn toàn không giới hạn. Dữ liệu (URL, Wi-Fi, vCard...) được mã hóa trực tiếp vào các ô vuông của mã QR tĩnh (Static QR), nên bất kỳ ai quét bằng camera đều đọc trực tiếp dữ liệu mà không thông qua bất kỳ server nào.',
  },
  {
    question: 'Nên tải định dạng nào: PNG, SVG hay PDF?',
    answer: 'PNG phù hợp để chia sẻ trên mạng xã hội hoặc gửi tin nhắn. SVG là định dạng vector vô hạn độ nét, lý tưởng cho in ấn bao bì, ấn phẩm kích thước lớn. PDF thích hợp để in ngay ra giấy A4 kèm tiêu đề trang trọng.',
  },
  {
    question: 'Làm sao để đảm bảo mã QR luôn quét được khi thêm logo hoặc đổi màu?',
    answer: 'Ứng dụng tự động nâng mức sửa lỗi (Error Correction) lên mức cao (Q hoặc H) khi bạn thêm logo. Bạn nên giữ độ tương phản cao giữa màu hoa văn và màu nền (tốt nhất là hoa văn đậm trên nền sáng).',
  },
  {
    question: 'Thông tin cá nhân hoặc mật khẩu Wi-Fi của tôi có an toàn không?',
    answer: 'Tuyệt đối an toàn. Vì ứng dụng chạy 100% phía trình duyệt (Client-Side), không có bất kỳ dữ liệu nào được gửi lên server hoặc lưu trữ ở bất kỳ cơ sở dữ liệu nào.',
  },
];

