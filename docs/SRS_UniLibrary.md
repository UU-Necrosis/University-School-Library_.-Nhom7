# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

## HỆ THỐNG QUẢN LÝ THƯ VIỆN SỐ & HỌC LIỆU ĐẠI HỌC (UNILIBRARY)
**Dự án:** Cổng Tri Thức & Hệ Thống Quản Lý Thư Viện Đại Học (UniLibrary - Academic Digital Resource Center)  
**Tập trung giải pháp:** Quản lý Bản sao cá biệt (Barcode/RFID), Lưu thông Mượn/Trả, Hàng đợi Đặt trước (Reservation Queue) & Phân quyền Độc giả (RBAC)  
**Phiên bản:** 1.0  
**Ngày lập:** 03/10/2026  
**Đơn vị thực hiện:** Nhóm 7 - ĐHQG-HCM

---

## 1. GIỚI THIỆU (INTRODUCTION)

### 1.1. Mục đích
Tài liệu SRS này mô tả toàn diện các yêu cầu chức năng, phi chức năng, quy tắc nghiệp vụ và giao diện hệ thống cho **Hệ thống Quản lý Thư viện Số & Học liệu Đại học UniLibrary**. Tài liệu đóng vai trò làm căn cứ chính thức cho đội ngũ phân tích (BA), phát triển (Frontend/Backend Developers), kiểm thử (QA/QC) và quản lý dự án (PM).

### 1.2. Phạm vi hệ thống
Hệ thống là nền tảng quản lý thư viện học thuật hiện đại, hỗ trợ toàn diện các phân hệ:
*   **Quản lý Danh mục Đầu sách & Biên mục chuẩn:** Hỗ trợ chuẩn ISBN, Phân loại Thập phân Dewey (DDC), Call Number, tác giả, nhà xuất bản.
*   **Quản lý Bản sao Vật lý (Item/Copy Management):** Quản lý từng bản in cụ thể qua Mã đăng ký cá biệt (Barcode / Chip RFID), trạng thái thực tế (Có sẵn, Đang mượn, Đã đặt trước, Quá hạn, Bảo quản, Hỏng/Mất).
*   **Lưu thông Mượn / Trả (Circulation):** Kiểm tra điều kiện thẻ độc giả, hạn mức mượn sách theo nhóm độc giả, tính hạn trả, gia hạn tự động và trực tuyến.
*   **Hàng đợi Đặt trước (Reservation Queue):** Tự động đưa độc giả vào hàng đợi ưu tiên (FIFO) khi đầu sách đã được mượn hết bản sao, tự động thông báo giữ chỗ 48h khi sách được trả về.
*   **Quản lý Quá hạn & Phí phạt:** Tự động tính tiền phạt theo số ngày trễ hạn, cảnh báo tự động qua Email/Thông báo trước 2 ngày.
*   **Tra cứu OPAC Trực tuyến (Online Public Access Catalog):** Tìm kiếm đa tiêu chí kết hợp giữa sách in tại kệ, tài liệu Open Access và cơ sở dữ liệu số (Scopus, IEEE, Springer).
*   **Quản lý Độc giả & Thẻ thư viện số:** Định danh sinh viên, học viên cao học, giảng viên qua mã thẻ/SSO, phân quyền RBAC.

### 1.3. Định nghĩa và Viết tắt
*   **DDC (Dewey Decimal Classification):** Hệ thống phân loại thập phân tài liệu thư viện.
*   **Call Number (Ký hiệu xếp giá):** Mã số gắn trên gáy sách định vị chính xác vị trí sách trên kệ (ví dụ: `HB 137 .N573K 2024`).
*   **Mã Đăng ký cá biệt (Barcode/Copy ID):** Mã định danh duy nhất cho từng cuốn sách vật lý cụ thể của một đầu sách.
*   **OPAC (Online Public Access Catalog):** Cổng tra cứu tài liệu công cộng trực tuyến dành cho bạn đọc.
*   **RBAC (Role-Based Access Control):** Kiểm soát truy cập dựa trên vai trò người dùng (`STUDENT`, `STAFF`, `LIBRARIAN`, `ADMIN`).
*   **RFID (Radio Frequency Identification):** Công nghệ nhận dạng qua sóng vô tuyến hỗ trợ mượn/trả và kiểm kê tự động.

---

## 2. MÔ TẢ TỔNG QUAN (OVERALL DESCRIPTION)

### 2.1. Kiến trúc tổng thể (Product Architecture)
Hệ thống vận hành theo mô hình Client-Server hiện đại:
```
[ Frontend: Next.js + Tailwind CSS (Academic Clarity) ]
                     │  (REST API / JWT Token)
                     ▼
[ Backend API: NestJS Modular Architecture ]
   ├── AuthModule (JWT + Passport + RBAC)
   ├── UsersModule (Quản lý Độc giả & Thẻ thư viện)
   ├── BooksModule (Biên mục & Bản sao Barcode/RFID)
   ├── CirculationModule (Mượn/Trả, Gia hạn, Phạt quá hạn)
   └── ReservationModule (Hàng đợi Đặt trước tự động)
                     │  (Prisma ORM)
                     ▼
[ Database: PostgreSQL Relational Database ]
```

### 2.2. Đặc điểm Tác nhân Người dùng (User Characteristics)

| Tác nhân | Vai trò trong hệ thống | Mục tiêu chính |
| :--- | :--- | :--- |
| **Sinh viên / Bạn đọc (`STUDENT`)** | Người dùng cuối | Tra cứu OPAC, xem thẻ thư viện số, kiểm tra sách đang mượn, gia hạn sách online, đặt trước sách đang hết. |
| **Giảng viên / Nghiên cứu sinh (`USER/PATRON`)** | Người dùng ưu tiên | Hạn mức mượn cao hơn (tối đa 12 cuốn/60 ngày), yêu cầu tài liệu liên trường, đặt phòng nghiên cứu. |
| **Thủ thư / Nhân viên Lưu thông (`STAFF/LIBRARIAN`)** | Vận hành quầy | Quét mã làm thủ tục mượn/trả sách, kiểm tra vi phạm, thu phí phạt, duyệt đặt trước, kiểm kê kho sách. |
| **Quản trị viên Thư viện (`ADMIN`)** | Quản lý hệ thống | Cấu hình hạn mức mượn, quản lý tài khoản nhân viên, xem báo cáo lưu thông và tài chính, sao lưu dữ liệu. |
| **Hệ thống Cron Tự động (`System Worker`)** | Tác nhân ngầm | Hàng ngày 00:00 quét tính ngày quá hạn, gửi email nhắc nhở trước 2 ngày, hủy yêu cầu giữ chỗ quá hạn 48h. |

---

## 3. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 3.1. Phân hệ 1: Quản lý Danh mục Đầu sách & Biên mục (Master Catalog)
*   **[FR-CAT-01] Quản lý Thông tin Đầu sách:** Thêm/sửa/xóa thông tin đầu sách gồm: Mã sách, Nhan đề, Tác giả, Nhà xuất bản, Năm xuất bản, Mã chuẩn ISBN/ISSN, Ngôn ngữ, Số trang, Tóm tắt, Mã phân loại DDC và Ký hiệu xếp giá (Call Number).
*   **[FR-CAT-02] Quản lý Bản sao Cá biệt (Book Copies):** Cho phép tạo nhiều bản sao vật lý từ một đầu sách. Mỗi bản sao có Mã Đăng ký cá biệt duy nhất, vị trí giá sách (Tầng, Dãy, Kệ) và loại mượn (Mượn về nhà / Chỉ đọc tại chỗ).
*   **[FR-CAT-03] Tra cứu OPAC Đa năng:** Tìm kiếm theo từ khóa, nhan đề, tác giả, chuyên ngành, lọc theo tình trạng còn sách trên kệ (Real-time Availability).

### 3.2. Phân hệ 2: Lưu thông Mượn - Trả Sách (Circulation Management)
*   **[FR-CIR-01] Lập Phiếu Mượn Sách tại Quầy:** Quét thẻ độc giả và mã Barcode/RFID của từng cuốn sách. Hệ thống tự động kiểm tra:
    1. Thẻ độc giả còn hạn và không bị khóa.
    2. Tổng số sách đang mượn + sách mượn mới $\le$ Hạn mức nhóm độc giả.
    3. Độc giả không có sách quá hạn chưa trả hoặc phí phạt chưa đóng vượt ngưỡng 50.000đ.
    4. Bản sao đang ở trạng thái `AVAILABLE` (hoặc `RESERVED` đúng cho độc giả này).
*   **[FR-CIR-02] Xử lý Trả Sách & Tính Phí Quá Hạn:** Quét mã bản sao để ghi nhận trả sách. Hệ thống tự động tính số ngày trễ hạn:
    $$\text{Tiền phạt} = \text{Số ngày trễ} \times 5.000\text{đ/ngày/cuốn}$$
    Cập nhật trạng thái bản sao về `AVAILABLE` (hoặc chuyển sang giữ chỗ nếu có người trong hàng đợi đặt trước).
*   **[FR-CIR-03] Gia hạn Sách (Renewal):** Cho phép độc giả tự gia hạn trực tuyến qua cổng web hoặc thủ thư gia hạn tại quầy (mỗi lần gia hạn thêm 14 ngày, tối đa 2 lần nếu sách chưa có người khác đặt trước).

### 3.3. Phân hệ 3: Đặt Trước Sách (Hold & Reservation Queue)
*   **[FR-RES-01] Đăng ký Đặt Trước:** Khi tất cả bản sao của một đầu sách đều đang được mượn, độc giả có thể bấm "Đặt trước". Hệ thống đưa độc giả vào Hàng đợi FIFO.
*   **[FR-RES-02] Kích hoạt Giữ chỗ Tự động:** Khi một bản sao được trả về, hệ thống tự động gán bản sao này sang trạng thái `RESERVED` cho độc giả đầu tiên trong hàng đợi, gửi thông báo mời nhận sách và hẹn giữ chỗ tối đa trong 48 giờ. Hết 48 giờ không đến nhận, hệ thống tự động hủy và chuyển cho người kế tiếp.

### 3.4. Phân hệ 4: Quản lý Độc giả, Thẻ & Phân quyền (Patron & Auth)
*   **[FR-AUT-01] Đăng ký & Đăng nhập Độc giả:** Đăng ký bằng Email ĐHQG, Mã sinh viên/cán bộ. Đăng nhập bằng JWT Token bảo mật cao.
*   **[FR-AUT-02] Quản lý Thẻ Thư viện Số:** Hiển thị thẻ điện tử có mã QR/RFID, danh sách sách đang mượn, lịch sử mượn trả và công nợ phí phạt.

---

## 4. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)
*   **Hiệu năng (Performance):** Tra cứu OPAC phản hồi dưới 500ms đối với kho dữ liệu trên 1.000.000 bản ghi.
*   **Bảo mật (Security):** Mật khẩu băm chuẩn bcrypt, xác thực stateless JWT có thời hạn, phân quyền RBAC chặt chẽ ở cấp API Guards.
*   **Tính khả dụng (Availability & UI):** Giao diện chuẩn Academic Clarity, tương thích 100% Responsive trên Mobile, Tablet và Desktop.
