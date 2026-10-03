# USER STORY: US01 - QUẢN LÝ DANH MỤC ĐẦU SÁCH (BOOK CATALOG MANAGEMENT)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US01** |
| **Tên User Story** | Quản lý Danh mục Đầu sách gốc |
| **Phân hệ (Module)** | Phân hệ 1: Quản lý Danh mục & Bản sao |
| **Use Case liên quan** | **UC01: Quản lý Danh mục Đầu sách** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-CAT-01] Quản lý Thông tin Đầu sách** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Must-Have (Cao nhất)** |
| **Tác nhân chính (Primary Actor)** | Quản trị viên / Thủ thư chuyên trách (*Librarian/Admin*) |
| **Tác nhân phụ (Secondary Actor)** | Độc giả (Tra cứu OPAC) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một (As a):** Thủ thư chuyên trách hoặc Quản trị viên thư viện,
* **Tôi muốn (I want to):** Tạo mới, cập nhật, tra cứu và lưu trữ hồ sơ biên mục chi tiết cho từng đầu sách (Mã sách, Nhan đề, Tác giả, Nhà xuất bản, Năm XB, ISBN/ISSN, Số trang, Ngôn ngữ, Mã phân loại DDC và Call Number),
* **Để (So that):** Thiết lập dữ liệu định danh học thuật chuẩn mực, phục vụ công tác tra cứu OPAC công cộng và quản lý các bản sao vật lý trong kho.

---

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Tại thư viện đại học, mỗi tài liệu học thuật cần được định danh chuẩn mực theo quy tắc quốc tế (ISBN, Call Number, DDC). Đầu sách đại diện cho tác phẩm trừu tượng (Bib Record), từ đó sẽ liên kết với $N$ bản sao vật lý (Item Copies) để phục vụ cho mượn hoặc đọc tại chỗ. Dữ liệu đầu sách chuẩn xác giúp bạn đọc dễ dàng tra cứu trên cổng OPAC theo nhiều tiêu chí (từ khóa, tác giả, chuyên ngành).

---

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

* **[BR-CAT-01.1] Tính duy nhất của ISBN/Mã sách:** Mỗi đầu sách bắt buộc phải có Mã sách (`MaSach`) duy nhất. Nếu có mã chuẩn quốc tế ISBN, hệ thống kiểm tra tính hợp lệ và cảnh báo trùng lặp.
* **[BR-CAT-01.2] Khóa xóa cứng (Soft Delete Only):** Nếu đầu sách đã có bản sao vật lý từng phát sinh phiếu mượn hoặc giữ chỗ, hệ thống tuyệt đối không cho phép xóa cứng (Hard Delete) mà chỉ cho phép chuyển trạng thái `Ngừng phục vụ`.
* **[BR-CAT-01.3] Bắt buộc Phân loại DDC:** Mỗi đầu sách phải được gán ít nhất một mã phân loại DDC (ví dụ: `004` - Khoa học máy tính, `330` - Kinh tế học, `620` - Kỹ thuật) và Ký hiệu xếp giá (Call Number).

---

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Thêm mới đầu sách thành công (Happy Path)
* **Given:** Thủ thư đã đăng nhập với vai trò `LIBRARIAN` và truy cập màn hình "Biên mục & Danh mục Sách".
* **When:** Thủ thư bấm "Thêm đầu sách", điền đầy đủ các trường bắt buộc:
  * Mã sách: `BK-2024-001`
  * Nhan đề: `Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại`
  * Tác giả: `GS.TS. Nguyễn Văn An, ThS. Trần Minh Đức`
  * Nhà xuất bản: `NXB Đại học Quốc gia TP.HCM`
  * Năm xuất bản: `2024`
  * ISBN: `978-604-73-9821-4`
  * Mã DDC: `330.015`
  * Call Number: `HB 137 .N573K 2024`
  Và bấm "Lưu".
* **Then:** Hệ thống kiểm tra hợp lệ, lưu đầu sách vào CSDL với trạng thái `Đang phục vụ`, hiển thị thông báo "Thêm mới đầu sách thành công".

### Kịch bản 2: Báo lỗi khi thiếu thông tin hoặc trùng mã sách (Validation)
* **Given:** Thủ thư đang ở form thêm mới sách.
* **When:** Thủ thư nhập Mã sách đã tồn tại HOẶC để trống Nhan đề / Tác giả và bấm "Lưu".
* **Then:** Hệ thống từ chối lưu, đánh dấu đỏ các trường vi phạm kèm thông báo "Mã sách đã tồn tại trên hệ thống" hoặc "Nhan đề không được để trống".

---

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL SPECS)

### 6.1. Entity CSDL liên quan
```prisma
model Book {
  id          String     @id @default(uuid())
  code        String     @unique @map("book_code")
  title       String
  author      String
  publisher   String?
  publishYear Int?       @map("publish_year")
  isbn        String?    @unique
  ddcCode     String?    @map("ddc_code")
  callNumber  String?    @map("call_number")
  pageCount   Int?       @map("page_count")
  language    String     @default("VIE")
  summary     String?    @db.Text
  status      String     @default("ACTIVE")
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  copies      BookCopy[]

  @@map("books")
}
```
