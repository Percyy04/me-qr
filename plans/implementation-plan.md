# Implementation Plan: ME-QR Clone (100% Client-Side)

Áp dụng workflow **/cook** kết hợp triết lý **/ponytail** (KISS, YAGNI, không over-engineer, giữ mọi file < 200 dòng, code tối giản nhất nhưng chạy chuẩn 100%).

## 1. Mục tiêu & Acceptance Criteria
- Web app tạo QR code 100% client-side (không backend, không lưu dữ liệu người dùng).
- 7 loại nội dung QR: URL, Wi-Fi, vCard, Text, Email, SMS, Event.
- Live preview thời gian thực sử dụng `qr-code-styling`.
- Customizer:
  - 8 kiểu khung (none, badge-top, badge-bottom, phone-mockup, speech-bubble, polaroid-card, ticket-coupon, circular-badge).
  - 6 hoa văn thân QR & 3 kiểu góc mắt.
  - Màu đơn & Gradient (linear/radial).
  - 10+ logo preset & upload logo cá nhân (Base64).
- Export: PNG (nhiều kích thước), SVG, PDF in ấn.
- Landing sections: Navbar, Hero, Trusted Brands, How It Works, QR Types Grid, Features Bento, FAQ, Pre-footer CTA, Footer.
- Kiểm thử tự động: Vitest cho formatters, export helper, validation.
- Build clean, zero TypeScript errors.

## 2. Các bước triển khai (Step-by-step)

### Bước 1: Khởi tạo dự án & Dependencies (Milestone 1)
- Tạo Vite React TS trong thư mục hiện tại.
- Cài đặt: `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`, `qr-code-styling`, `jspdf`.
- Cài đặt dev dependencies cho test: `vitest`.
- Cấu hình Tailwind theme, fonts, custom shadows.

### Bước 2: Core Data Types & Formatters (Milestone 2)
- Định nghĩa interfaces trong `src/types/qr.types.ts`.
- Viết `src/utils/qrFormatters.ts` chuyển đổi 7 loại dữ liệu sang chuỗi chuẩn.
- Viết unit tests cho `qrFormatters` với Vitest.

### Bước 3: Canvas Composite Engine & Export Helpers (Milestone 3)
- Xây dựng `src/utils/frameRenderer.ts`: Vẽ 8 kiểu khung composite lên canvas.
- Xây dựng `src/utils/exportHelper.ts`: Xuất PNG, SVG, PDF.
- Viết unit tests kiểm tra export helper & color helper.

### Bước 4: UI Primitives & Preset Data
- Tạo `src/data/`: `qrTypes.ts`, `presetLogos.ts`, `framePresets.ts`, `faqData.ts`.
- Tạo components UI cơ bản: `Button`, `Input`, `Select`, `ColorPicker`, `Accordion` (đều < 150 dòng).

### Bước 5: Generator Components & Live Preview
- `TypeSelector.tsx`: Thanh chọn loại QR.
- `forms/`: Từng form nhỏ riêng biệt cho 7 types (URL, Wi-Fi, vCard, Text, Email, SMS, Event).
- `preview/LivePreviewCard.tsx`: Tích hợp `qr-code-styling` canvas.
- `preview/DesignAccordion.tsx`: Khung, hoa văn, màu sắc, logo.
- `preview/DownloadButtons.tsx`: Nút xuất file PNG/SVG/PDF.
- `QRGeneratorWidget.tsx`: Ghép form + preview.

### Bước 6: Landing Page Sections & Layout (Milestone 4)
- `Navbar.tsx` & `Footer.tsx`.
- `HeroSection.tsx`, `TrustedBrands.tsx`, `HowItWorks.tsx`, `QRTypesGrid.tsx`, `FeaturesHighlight.tsx`, `FAQSection.tsx`, `CTASection.tsx`.
- Ghép vào `App.tsx`.

### Bước 7: Verification & Testing
- Chạy unit tests: `npm test`.
- Type check: `npx tsc --noEmit`.
- Production build: `npm run build`.
- Kiểm tra tính năng quét mã QR thực tế.

