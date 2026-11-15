# ME-QR Clone Pro (100% Client-Side)

> Trình tạo mã QR cao cấp, trực quan và chạy hoàn toàn 100% Client-Side (không backend, không lưu dữ liệu người dùng trên server, không giới hạn lượt quét, không hết hạn mã), nâng cấp vượt trội từ kiến trúc gốc của [ME-QR](https://me-qr.com/).

---

## ✨ Điểm nổi bật & Tính năng Pro (Vượt trội hơn ME-QR gốc)

- **100% Client-Side & Bảo mật tuyệt đối:** Toàn bộ thuật toán mã hóa, vẽ Canvas và kiểm tra quét thử đều diễn ra trực tiếp trên trình duyệt của người dùng. Mật khẩu Wi-Fi, email, danh bạ không bao giờ rời khỏi thiết bị.
- **✨ Thư viện 24+ Mẫu thiết kế có sẵn (Pre-made Templates Gallery):**
  - Tuyển chọn 24 phong cách phối màu & kiểu dáng chuyên nghiệp: *Corporate Navy, Luxury Gold, Neon Cyberpunk, Sunset Glow, Instagram Story, TikTok Vibe, Vintage Photo, Event Ticket, Minimalist Noir...*
  - **1-Click Apply:** Tự động điền trọn bộ hoa văn, mắt quét, gradient và khung viền vào trình chỉnh sửa.
- **🖼️ Thư viện 16 Kiểu Khung (Expanded Frames System):**
  - Hỗ trợ 16 mẫu khung phong phú: *Bảng trên (Badge Top), Băng đáy (Badge Bottom), Smartphone Mockup, Speech Bubble, Polaroid Card, Ticket Coupon, Huy hiệu tròn (Circular Badge), Ruy băng trên/dưới, Biển hiệu treo (Hanging Sign), Thẻ hiện đại (Modern Card), Kệ trưng bày (Store Display), Viền đôi (Double Line), Viền tối giản...*
- **🔍 Bộ kiểm tra Quét thử thời gian thực (Live Scannability Engine):**
  - Tích hợp động cơ barcode reader ảo (`jsQR`) chạy ngầm trên Canvas.
  - Hiển thị thanh đo chất lượng: 🟢 *100% Hoàn hảo* / 🟡 *Cảnh báo khó quét*.
  - **Nút "Tự sửa" (Auto-Fix):** Tự động cân chỉnh tương phản màu sắc và nâng mức Error Correction lên `H` (30%) để đảm bảo mã luôn quét được 100%.
- **🕒 Bộ nhớ Lịch sử Mã QR Cục bộ (Local QR History):**
  - Tự động lưu 20 mã QR gần nhất vào `LocalStorage` mà **không cần đăng ký tài khoản**.
  - Xem lại danh sách, click tải lại ảnh hoặc phục hồi thiết kế cũ bất kỳ lúc nào.
- **📋 Sao chép ảnh vào Clipboard (1-Click Copy):**
  - Sao chép trực tiếp ảnh PNG vào khay nhớ tạm để dán (Paste) ngay vào Figma, Word, Canva hay Photoshop.
- **🌐 7 Loại Mã QR Chuẩn:**
  - Website URL, Wi-Fi Hotspot (WPA/WPA2/WPA3, WEP, Open, Hidden), vCard 3.0 RFC 2426, Text, Email RFC 6068, SMS SMSTO, Event iCalendar RFC 5545.
- **🚀 Xuất file đa định dạng:**
  - PNG (500px, 1000px HD, 2000px 4K), Vector SVG vô hạn phóng đại, Bản in tài liệu PDF A4.

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (bảng màu ME-QR, custom shadows, Plus Jakarta Sans & Inter fonts)
- **Mã hóa QR & Đồ họa:** `qr-code-styling`, HTML5 Canvas Composite Engine
- **Bộ đọc mã QR:** `jsqr`
- **In ấn PDF:** `jspdf`
- **Biểu tượng:** `lucide-react`
- **Testing:** Vitest

---

## 🚀 Khởi chạy dự án

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại `http://localhost:5173`.

### 3. Chạy kiểm thử tự động (Unit Tests)
```bash
npm test
```

### 4. Build bản sản xuất tối ưu (Production Build)
```bash
npm run build
```

---

## 📐 Cấu trúc thư mục

```
src/
├── components/
│   ├── common/             # Button, Input, ColorPicker, Accordion (< 60 dòng)
│   ├── generator/          # TypeSelector, ActiveTypeForm, QRGeneratorWidget (< 110 dòng)
│   │   ├── forms/          # Form riêng cho 7 loại QR (< 95 dòng)
│   │   ├── history/        # QRHistoryDrawer.tsx
│   │   ├── templates/      # PreMadeTemplatesModal.tsx
│   │   └── preview/        # LivePreviewCard, ScannabilityIndicator, FrameSelector...
│   ├── layout/             # Navbar, Footer
│   └── sections/           # Hero, TrustedBrands, HowItWorks, FAQ, v.v.
├── data/                   # Presets màu, logo, 16 khung, 24 pre-made templates, FAQ
├── hooks/                  # useScannability, useQRHistory
├── types/                  # TypeScript interfaces cho QR State
└── utils/                  # qrFormatters, frameRenderer, exportHelper
```
*Tất cả 49 file mã nguồn đều được kiểm tra nghiêm ngặt dưới 200 dòng theo nguyên tắc KISS, YAGNI và quy trình /cook.*
