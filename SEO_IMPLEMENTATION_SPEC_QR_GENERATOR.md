# SEO Implementation Specification --- QR Code Generator

> **Mục tiêu:** Giao coding agent triển khai khu vực Blog, FAQ và hoàn
> thiện Technical SEO / On-page SEO cho website QR Code Generator hiện
> tại.
>
> **Phạm vi sản phẩm đã xác nhận:** 11 chức năng tạo QR gồm Link / URL,
> Văn bản (Text), vCard Business, Wi-Fi Access, WhatsApp Direct, Social
> Hub, Google Maps Location, Event & Calendar, E-mail Dispatch, Phone
> Call Dial và SMS Message. Website có giao diện QR tùy chỉnh với logo ở
> trung tâm.
>
> **Định hướng:** SEO Organic, song ngữ Việt Nam và tiếng Anh. Sản phẩm
> hiện tại là bản Basic. Không tự quảng bá hoặc tạo nội dung cho tính
> năng chưa tồn tại như QR analytics, bulk QR, dashboard quản lý hoặc
> Dynamic QR cho mọi loại. Link / URL hiện có nhãn "Dynamic Active";
> agent phải kiểm tra implementation thực tế trước khi mô tả tính năng
> này.

------------------------------------------------------------------------

## 1. Nguyên tắc bắt buộc

1.  **Audit trước khi sửa:** đọc cấu trúc repository, framework,
    routing, i18n, component hiện tại, cách tạo QR, metadata và
    deployment. Không tự giả định website dùng Next.js nếu repo không
    phải Next.js.
2.  **Không phá UI/UX hiện tại:** giữ nguyên thiết kế generator, màu
    sắc, typography, responsive behavior và logic tạo QR hiện hữu.
    Blog/FAQ phải đồng bộ design system.
3.  **Không thay đổi chức năng QR:** không refactor QR engine, format
    payload hoặc luồng tải xuống trừ khi cần thiết và được yêu cầu rõ.
4.  **Không bịa tính năng:** chỉ viết về chức năng đang hoạt động và đã
    kiểm thử. Không gọi QR tĩnh là dynamic, không hứa "không hết hạn"
    nếu chưa xác minh điều kiện.
5.  **Nội dung hữu ích, không SEO spam:** không sinh hàng loạt trang
    mỏng, nội dung trùng lặp, keyword stuffing hoặc bài viết chỉ thay
    tên nền tảng.
6.  **Song ngữ thực chất:** nội dung tiếng Việt và tiếng Anh phải tự
    nhiên, phù hợp search intent từng ngôn ngữ; không dịch máy nguyên
    văn.
7.  **Không nhồi keyword:** mỗi URL có một primary intent; dùng từ đồng
    nghĩa tự nhiên.
8.  **Không thêm dependency nặng** nếu có thể dùng giải pháp sẵn trong
    dự án.
9.  **Không auto-accept thay đổi / không tự deploy / không tự push** nếu
    chưa được chủ dự án cho phép.
10. Sau khi hoàn thành, chạy lint, typecheck (nếu có), build và báo cáo
    các vấn đề còn lại.

## 2. Sản phẩm và các nhóm nội dung được phép SEO

### 2.1 Các loại QR hiện có

  -----------------------------------------------------------------------
  Chức năng UI            Search intent / chủ đề  Slug gợi ý
  ----------------------- ----------------------- -----------------------
  Link / URL              Tạo QR từ URL / website `qr-link`

  Văn bản (Text)          Tạo QR chứa văn bản     `qr-text`

  vCard Business          QR danh thiếp / thông   `qr-vcard`
                          tin liên hệ             

  Wi-Fi Access            QR kết nối Wi-Fi        `qr-wifi`

  WhatsApp Direct         QR mở cuộc trò chuyện   `qr-whatsapp`
                          WhatsApp                

  Social Hub              QR dẫn đến các hồ sơ /  `qr-social-media`
                          kênh mạng xã hội        

  Google Maps Location    QR mở vị trí Google     `qr-google-maps`
                          Maps                    

  Event & Calendar        QR sự kiện / lịch /     `qr-event`
                          thông tin thời gian     

  E-mail Dispatch         QR mở ứng dụng email    `qr-email`
                          với thông tin đã điền   

  Phone Call Dial         QR gọi số điện thoại    `qr-phone`

  SMS Message             QR mở SMS với số nhận   `qr-sms`
                          và nội dung             

  QR logo/custom design   Tùy chỉnh QR có logo ở  `qr-code-with-logo`
                          giữa (nếu tính năng     
                          hiện tại hỗ trợ)        
  -----------------------------------------------------------------------

Các slug chỉ là đề xuất. Ưu tiên giữ URL hiện có nếu đã được index hoặc
có backlink. Nếu đổi URL, phải có redirect 301 từ URL cũ sang URL mới và
cập nhật toàn bộ internal links/canonical/sitemap.

### 2.2 Keyword định hướng

**Tiếng Việt** - tạo mã QR miễn phí - tạo mã QR online - tạo mã QR link
/ website - tạo mã QR Wi-Fi - tạo mã QR văn bản - tạo mã QR danh thiếp -
tạo mã QR WhatsApp - tạo mã QR mạng xã hội - tạo mã QR Google Maps - tạo
mã QR sự kiện - tạo mã QR email - tạo mã QR số điện thoại - tạo mã QR
SMS - tạo mã QR có logo

**English** - free QR code generator - online QR code generator - URL QR
code generator - WiFi QR code generator - text QR code generator - vCard
QR code generator - WhatsApp QR code - social media QR code - Google
Maps QR code generator - event QR code - email QR code - phone number QR
code - SMS QR code - QR code with logo

Đây là keyword targets ban đầu, **không phải volume/KD/CPC đã xác
minh**. Không ghi số liệu volume, CPC hoặc tuyên bố "low competition"
trong nội dung nếu chưa có nguồn dữ liệu cụ thể.

## 3. Kiến trúc Blog

### 3.1 Yêu cầu chức năng

Xây dựng khu vực blog hoàn chỉnh: - Trang danh sách bài viết theo
locale. - Trang chi tiết bài viết. - Category/tag nếu thực sự cần; không
tạo taxonomy rỗng. - Bài viết liên quan. - Breadcrumb. - Mục lục tự động
từ H2/H3 nếu bài đủ dài. - Thời gian đọc ước tính. - Ngày xuất bản và
ngày cập nhật (chỉ hiển thị ngày cập nhật khi nội dung thực sự được
sửa). - CTA dẫn đến generator liên quan. - Responsive tốt trên mobile. -
Trang 404 cho slug không tồn tại. - Pagination hoặc load-more có URL
crawlable; ưu tiên pagination URL rõ ràng.

### 3.2 Data-driven content

Ưu tiên lưu nội dung bài viết trong Markdown/MDX hoặc cấu trúc dữ liệu
hiện có của dự án. Chọn một phương án phù hợp với stack hiện tại, không
thêm CMS/backend nếu chưa cần.

Mỗi bài viết tối thiểu có: - `slug` - `locale` (`vi` hoặc `en`) -
`title` - `description` - `publishedAt` - `updatedAt` (optional) -
`author` (chỉ dùng tác giả có thật; không tạo nhân vật giả) -
`category` - `tags` - `readingTime` (có thể tính tự động) - `coverImage`
(optional; phải có alt text) - `content` - `relatedGenerator` -
`translationGroup` (nếu có bản dịch tương ứng)

Không tạo trang bản dịch giả chỉ để lấp đủ số URL. Nếu bài chưa có bản
dịch, hreflang không được trỏ tới URL không tồn tại.

### 3.3 Danh sách bài viết khởi đầu

Ưu tiên 8 bài đầu tiên, sau đó mở rộng. Không bắt buộc xuất bản toàn bộ
cùng một lúc.

  -----------------------------------------------------------------------
  Priority          Tiêu đề tiếng     Tiêu đề tiếng Anh Generator liên
                    Việt                                quan
  ----------------- ----------------- ----------------- -----------------
  P1                Cách tạo mã QR    How to Create a   Homepage
                    miễn phí online   QR Code Online    
                                      for Free          

  P1                Cách tạo mã QR    How to Create a   Wi-Fi
                    Wi-Fi để chia sẻ  WiFi QR Code      
                    mạng                                

  P1                Cách tạo mã QR có How to Create a   Logo / Custom QR
                    logo ở giữa       QR Code with a    
                                      Logo              

  P1                Cách tạo mã QR    How to Create a   Link / URL
                    cho website và    QR Code for a     
                    đường link        Website or URL    

  P1                Cách tạo mã QR    How to Create a   WhatsApp
                    WhatsApp để khách WhatsApp QR Code  
                    liên hệ                             

  P2                Cách tạo mã QR    How to Create a   vCard
                    danh thiếp điện   vCard QR Code     
                    tử                                  

  P2                Cách tạo mã QR    How to Create a   Social Hub
                    cho mạng xã hội   Social Media QR   
                                      Code              

  P2                Cách tạo mã QR    How to Create a   Google Maps
                    Google Maps cho   Google Maps QR    
                    địa điểm          Code              
  -----------------------------------------------------------------------

Các bài bổ sung sau khi có dữ liệu Search Console: - QR code là gì và
hoạt động như thế nào? - QR tĩnh và QR động khác nhau như thế nào? (chỉ
giải thích đúng khả năng sản phẩm; không quảng bá dynamic nếu không hỗ
trợ) - Cách tạo mã QR cho email. - Cách tạo mã QR số điện thoại. - Cách
tạo mã QR SMS. - Cách tạo QR cho sự kiện và lịch. - Vì sao mã QR không
quét được? Cách kiểm tra và khắc phục. - Cách tải và in mã QR rõ nét.

### 3.4 Tiêu chuẩn chất lượng bài viết

Mỗi bài phải: 1. Trả lời trực tiếp search intent trong phần mở đầu. 2.
Có hướng dẫn từng bước dựa trên giao diện thực tế của website. 3. Có ví
dụ cụ thể và chính xác. 4. Nêu rõ giới hạn/điều kiện của loại QR nếu có.
5. Có ít nhất một internal link tới generator tương ứng. 6. Có 2--4
internal links liên quan nếu tự nhiên. 7. Có FAQ ngắn phù hợp nội dung,
tránh lặp FAQ sitewide. 8. Có title và meta description riêng. 9. Có
heading phân cấp đúng (một H1 chính; H2/H3 logic). 10. Không sao chép
nội dung đối thủ hoặc tạo nội dung chung chung chỉ để đủ số từ.

Không ép độ dài bài viết. Viết đủ sâu để giải quyết nhu cầu, tránh nội
dung rỗng.

## 4. FAQ -- yêu cầu triển khai

### 4.1 FAQ ở cấp website

Tạo một trang FAQ/Help Center, ví dụ: - `/vi/faq` - `/en/faq`

Nhóm câu hỏi: - Bắt đầu sử dụng / tạo QR. - Các loại QR được hỗ trợ. -
Tùy chỉnh logo và thiết kế. - Tải xuống và sử dụng. - Quyền riêng tư và
bảo mật. - Khắc phục lỗi quét QR.

Chỉ trả lời những điều đã xác minh từ code và hành vi sản phẩm. Nếu chưa
biết dữ liệu được xử lý ở client hay server, agent phải kiểm tra trước
khi viết tuyên bố về quyền riêng tư.

### 4.2 FAQ theo từng generator

Mỗi landing page có 3--6 câu hỏi liên quan trực tiếp đến loại QR đó. Ví
dụ:

**Wi-Fi QR** - Làm thế nào để tạo mã QR Wi-Fi? - Người quét có cần nhập
mật khẩu không? - QR Wi-Fi hỗ trợ loại bảo mật nào? - QR có hoạt động
với mạng ẩn không? (chỉ trả lời nếu sản phẩm hỗ trợ) - Làm sao kiểm tra
QR Wi-Fi trước khi chia sẻ?

**URL QR** - Làm thế nào để tạo QR từ một đường link? - Người dùng sẽ
được mở URL như thế nào? - Có thể đổi URL sau khi tạo không? (phải xác
minh chức năng Dynamic Active) - QR có hết hạn không? (không khẳng định
nếu chưa kiểm tra cơ chế)

**vCard** - vCard QR là gì? - QR có thể lưu những thông tin liên hệ
nào? - Người quét lưu danh bạ như thế nào? - Có thể thêm công ty, chức
danh, email và số điện thoại không? (đối chiếu form thực tế)

**Logo QR** - Có thể thêm logo vào giữa mã QR không? - Định dạng logo
nào được hỗ trợ? - Logo lớn có ảnh hưởng khả năng quét không? - Làm thế
nào để kiểm tra QR trước khi in?

**Social Hub** - Social Hub QR là gì? - Có thể thêm những nền tảng
nào? - Một QR có thể dẫn tới nhiều hồ sơ không? - Người quét nhìn thấy
gì sau khi quét?

**Google Maps** - Làm thế nào để tạo QR cho vị trí Google Maps? - Có thể
dùng link chia sẻ Google Maps không? - Người quét có mở được chỉ đường
không?

### 4.3 FAQ UI và structured data

-   FAQ phải hiển thị thật trên trang, không chỉ thêm JSON-LD ẩn.
-   Accordion phải truy cập được bằng bàn phím, có trạng thái mở/đóng rõ
    ràng và semantic HTML phù hợp.
-   Dùng `FAQPage` structured data chỉ khi đáp ứng đúng hướng dẫn hiện
    hành của Google. Không kỳ vọng FAQ rich result sẽ xuất hiện; Google
    giới hạn hiển thị FAQ rich results cho một số website có thẩm quyền
    phù hợp.
-   Không đánh dấu FAQ không hiển thị cho người dùng.
-   Không tạo câu trả lời giả hoặc lặp cùng một bộ câu hỏi trên mọi
    trang.
-   Nếu dùng schema FAQ, nội dung câu hỏi và câu trả lời trong JSON-LD
    phải khớp chính xác nội dung nhìn thấy trên trang.

## 5. Technical SEO

### 5.1 Metadata

Mỗi indexable page cần: - `<title>` duy nhất, mô tả đúng nội dung, tự
nhiên. - Meta description riêng, hấp dẫn và không nhồi keyword. -
Canonical URL tuyệt đối, tự tham chiếu với URL chuẩn. - Open Graph
title/description/image. - Twitter/X card metadata nếu phù hợp. - Một H1
chính. - HTML lang đúng locale. - Không để metadata mặc định giống nhau
trên mọi route.

Không cam kết title/description sẽ được Google hiển thị nguyên văn;
Google có thể tự tạo snippet/title khác.

### 5.2 International SEO

-   Dùng cấu trúc locale hiện tại nếu đã tồn tại; không đổi routing tùy
    tiện.
-   Nếu chưa có, có thể dùng `/vi/` và `/en/`.
-   Mỗi trang bản dịch có URL riêng.
-   `hreflang="vi"` hoặc `vi-VN` và `en` hoặc `en-US` phải nhất quán.
-   Các bản dịch tương ứng phải khai báo hreflang hai chiều.
-   Chỉ thêm `x-default` khi có trang mặc định phù hợp.
-   Không khai báo hreflang tới URL 404, redirect hoặc `noindex`.
-   Không dùng canonical của trang tiếng Việt trỏ sang tiếng Anh hoặc
    ngược lại nếu hai trang là bản địa hóa tương ứng độc lập.

### 5.3 Sitemap và robots

-   Tạo/cập nhật XML sitemap.
-   Chỉ đưa URL canonical, trả về 200, indexable.
-   Không đưa URL query parameters, preview, admin, trang tìm kiếm nội
    bộ hoặc trang noindex vào sitemap.
-   Cập nhật `lastmod` dựa trên lần sửa nội dung thực tế; không cập nhật
    giả mỗi lần build.
-   robots.txt phải cho phép crawl tài nguyên cần thiết và trỏ tới
    sitemap.
-   Không dùng robots.txt để thay thế `noindex`.
-   Kiểm tra sitemap và robots.txt sau build/deploy.

### 5.4 Structured data

Dùng schema phù hợp với nội dung thực tế: - `WebSite` cho website. -
`Organization` nếu có tên thương hiệu và thông tin tổ chức xác thực. -
`BreadcrumbList` cho trang có breadcrumb. - `Article` hoặc `BlogPosting`
cho bài blog. - `SoftwareApplication` cho công cụ QR nếu các thuộc tính
cần thiết là đúng và có thể xác minh. - `FAQPage` chỉ khi đáp ứng chính
sách hiện hành.

Yêu cầu: - JSON-LD hợp lệ. - Không bịa rating, review, giá, tác giả hoặc
thông tin tổ chức. - Không thêm `AggregateRating` nếu không có đánh giá
thật. - Không đánh dấu nội dung không hiển thị. - Kiểm tra bằng Rich
Results Test và Schema Markup Validator.

### 5.5 Rendering và indexability

-   Nội dung SEO quan trọng phải có trong HTML render ban đầu
    (SSR/SSG/ISR tùy framework).
-   Generator vẫn phải hoạt động bình thường; không hy sinh UX để nhồi
    nội dung.
-   Trang bài viết phải trả đúng HTTP status.
-   Slug không tồn tại phải trả 404 thực sự.
-   Tránh soft-404.
-   Không tạo hàng loạt URL filter/parameter có nội dung trùng.
-   Internal links phải là anchor `<a>` crawlable, có href hợp lệ.

### 5.6 Performance và Core Web Vitals

Mục tiêu tham khảo theo ngưỡng "Good" của Google: - LCP ≤ 2.5 giây. -
INP ≤ 200 ms. - CLS ≤ 0.1.

Thực hiện: - Tối ưu ảnh cover, dùng kích thước responsive và định dạng
hiện đại. - Lazy-load ảnh dưới fold; không lazy-load ảnh LCP chính. -
Tránh tải thư viện nặng chỉ cho blog/FAQ. - Hạn chế layout shift bằng
khai báo width/height hoặc aspect ratio. - Giữ generator phản hồi nhanh
trên thiết bị cấu hình thấp. - Kiểm tra Lighthouse mobile và PageSpeed
Insights.

### 5.7 Image SEO

-   Tên file có ý nghĩa, không dùng tên mặc định.
-   Alt text mô tả ảnh đúng ngữ cảnh, không nhồi keyword.
-   Ảnh cover có kích thước và tỷ lệ thống nhất.
-   Dùng WebP/AVIF khi phù hợp.
-   Không dùng ảnh logo QR trang trí làm ảnh minh họa nếu ảnh không liên
    quan nội dung.
-   Nếu ảnh QR là ví dụ, bảo đảm QR mẫu quét được nếu bài viết tuyên bố
    có thể quét.

## 6. On-page SEO và internal linking

### Homepage

-   Primary intent: Free QR Code Generator / Tạo mã QR miễn phí.
-   Hiển thị generator và danh sách 11 loại QR rõ ràng.
-   Có mô tả ngắn giải thích website làm gì.
-   Liên kết tới các generator chính, trang FAQ và blog.
-   Không để phần nội dung SEO đẩy công cụ xuống quá sâu.

### Generator landing pages

Mỗi trang nên có: 1. H1 rõ ràng. 2. Công cụ tương ứng ở phần đầu trang.
3. Mô tả lợi ích và loại dữ liệu QR tạo ra. 4. Hướng dẫn sử dụng. 5. Ví
dụ tình huống thực tế. 6. Lưu ý tương thích/giới hạn. 7. FAQ riêng. 8.
Related generators. 9. Liên kết tới bài blog hướng dẫn.

### Blog

-   Bài blog liên kết đến generator liên quan bằng anchor tự nhiên.
-   Generator liên kết tới bài hướng dẫn chuyên sâu.
-   Related posts phải cùng chủ đề, không chọn ngẫu nhiên.
-   Breadcrumb: Home \> Blog \> Category \> Article.
-   Không tạo orphan pages.

### Anchor text

Dùng biến thể tự nhiên như: - tạo mã QR Wi-Fi - công cụ tạo QR Wi-Fi
miễn phí - hướng dẫn tạo QR Wi-Fi - WiFi QR code generator

Không lặp một exact-match anchor ở mọi vị trí.

## 7. Search UX và chuyển đổi

-   Blog phải có CTA phù hợp dẫn tới công cụ, không pop-up gây cản trở.
-   FAQ không được che khuất generator hoặc chiếm quá nhiều màn hình
    đầu.
-   Có liên kết "Tạo QR ngay" từ bài viết.
-   CTA có tracking event nếu analytics đã được cấu hình.
-   Không ép đăng ký tài khoản nếu sản phẩm hiện cho phép dùng không cần
    tài khoản.
-   Không đưa thông tin quảng cáo hoặc claim "100% free", "unlimited",
    "no expiration", "private" nếu chưa xác minh.

## 8. Analytics và đo lường

Nếu GA4 đã có, bổ sung event có kiểm soát: - `qr_type_selected` -
`qr_generate` - `qr_generate_success` - `qr_download` - `qr_logo_upload`
(chỉ khi có chức năng upload logo) - `blog_cta_click` - `faq_expand`

Không gửi nội dung QR, mật khẩu Wi-Fi, email, số điện thoại, URL riêng
tư hoặc dữ liệu cá nhân người dùng vào analytics. Chỉ gửi loại QR và
metadata không nhạy cảm cần thiết.

Kết nối Google Search Console: - Xác minh domain/property. - Submit
sitemap. - Theo dõi Pages indexing, Search results, Core Web Vitals. -
Phân tích queries theo page, country, device. - Không tự động kết luận
index chỉ vì URL có trong sitemap.

## 9. Acceptance criteria -- tiêu chí nghiệm thu

### Blog

-   [ ] Blog index hoạt động trên cả locale được hỗ trợ.
-   [ ] Article detail hoạt động, slug duy nhất.
-   [ ] Bài viết có title, description, H1 và canonical riêng.
-   [ ] Có breadcrumb và internal links.
-   [ ] Ảnh có alt text.
-   [ ] Ngày xuất bản/cập nhật chính xác.
-   [ ] Trang không tồn tại trả 404.
-   [ ] Responsive mobile/desktop.

### FAQ

-   [ ] Có trang FAQ tổng.
-   [ ] Có FAQ liên quan trên các generator.
-   [ ] Accordion keyboard accessible.
-   [ ] Nội dung trả lời đúng implementation thực tế.
-   [ ] Structured data (nếu có) khớp nội dung hiển thị.

### Technical SEO

-   [ ] Sitemap hợp lệ, chỉ chứa URL canonical/indexable.
-   [ ] robots.txt hợp lệ.
-   [ ] Canonical đúng cho mọi route.
-   [ ] Hreflang hai chiều đúng cho các bản dịch thực sự tồn tại.
-   [ ] Không có metadata trùng hàng loạt.
-   [ ] Không có broken internal links.
-   [ ] Không có redirect chain không cần thiết.
-   [ ] Schema JSON-LD hợp lệ.
-   [ ] Không có trang quan trọng bị `noindex` hoặc robots block.
-   [ ] Nội dung chính render được trong HTML.
-   [ ] Build và lint thành công.

### Nội dung

-   [ ] Không có claim chưa xác minh.
-   [ ] Không có nội dung copy đối thủ.
-   [ ] Không có trang mỏng tạo chỉ để nhắm keyword.
-   [ ] Mỗi trang có search intent rõ ràng.
-   [ ] Nội dung Việt/Anh tự nhiên và đúng thuật ngữ.

## 10. Quy trình làm việc agent

### Bước 1 --- Audit

Xuất báo cáo ngắn: - Framework và phiên bản. - Cấu trúc routes hiện
tại. - Locale/i18n đang dùng. - Metadata hiện tại. - Sitemap/robots hiện
tại. - Analytics hiện tại. - Các chức năng QR đã xác minh. - Những claim
nào cần chủ dự án xác nhận.

### Bước 2 --- Plan

Đưa ra danh sách file sẽ tạo/sửa và lý do. Giữ nguyên URL đang có nếu
không có lý do SEO/kỹ thuật rõ ràng để đổi.

### Bước 3 --- Implement

Triển khai theo thứ tự: 1. Technical SEO nền tảng. 2. Blog data model và
blog listing/detail. 3. FAQ page và FAQ components. 4. FAQ theo
generator. 5. Metadata và structured data. 6. Internal linking. 7.
Analytics events (nếu analytics đã sẵn sàng).

### Bước 4 --- Verify

Chạy: - lint - typecheck nếu có - production build - kiểm tra routes -
kiểm tra sitemap/robots - kiểm tra canonical/hreflang - kiểm tra
JSON-LD - kiểm tra responsive - kiểm tra không ảnh hưởng generator hiện
tại

### Bước 5 --- Report

Báo cáo: - Files created/modified. - Routes mới. - SEO features đã triển
khai. - Nội dung đã tạo. - Các kiểm thử đã chạy và kết quả. - Các vấn đề
chưa xử lý. - Những thông tin cần chủ dự án xác nhận. - Không tuyên bố
website đã lên top hoặc đã được Google index nếu chưa có dữ liệu xác
minh.

------------------------------------------------------------------------

## 11. Ràng buộc nội dung và claim sản phẩm

Trước khi xuất bản, agent phải kiểm tra code và xác nhận: - Link / URL
có thực sự hỗ trợ Dynamic QR hay chỉ có nhãn giao diện. - QR được tạo
hoàn toàn ở client hay có gửi dữ liệu lên server. - Có thực sự không cần
tài khoản không. - Có giới hạn lượt tạo, lượt quét, thời hạn hoặc
watermark không. - Có hỗ trợ PNG/SVG/JPG hay định dạng nào. - Logo
upload hỗ trợ định dạng và dung lượng nào. - Wi-Fi hỗ trợ loại bảo mật
nào. - Social Hub hỗ trợ nền tảng nào. - Event & Calendar xuất payload
theo chuẩn nào. - QR sau khi tạo có thể chỉnh sửa nội dung hay không.

Nếu chưa xác minh được, viết trung tính hoặc để TODO cho chủ dự án xác
nhận. Không tự suy diễn.

## 12. Deliverables cuối cùng

Agent cần bàn giao: 1. Blog listing và article detail. 2. FAQ tổng và
FAQ theo generator. 3. Technical SEO đã triển khai. 4. Metadata cho các
trang hiện có và trang mới. 5. Sitemap/robots/canonical/hreflang. 6.
Structured data phù hợp. 7. Internal linking. 8. Analytics events an
toàn dữ liệu (nếu có). 9. Nội dung khởi đầu theo danh sách ưu tiên. 10.
Báo cáo nghiệm thu theo checklist ở mục 9.

**Ưu tiên chất lượng hơn số lượng.** Hoàn thành nền tảng kỹ thuật và các
trang có giá trị trước; không tự tạo 50+ trang mỏng để đạt số lượng URL.
