# USER STORY: US02 - QUẢN LÝ BẢN SAO VẬT LÝ (BOOK COPY MANAGEMENT)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US02** |
| **Tên User Story** | Quản lý Bản sao Vật lý (Barcode & RFID) |
| **Phân hệ (Module)** | Phân hệ 1: Quản lý Danh mục & Bản sao |
| **Use Case liên quan** | **UC02: Quản lý Bản sao Vật lý** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-CAT-02] Quản lý Bản sao Cá biệt** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Must-Have (Cao nhất)** |
| **Tác nhân chính (Primary Actor)** | Thủ thư / Nhân viên kho sách (*Librarian*) |
| **Tác nhân phụ (Secondary Actor)** | Độc giả (Xem vị trí và tình trạng bản sao trên OPAC) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một (As a):** Thủ thư phụ trách kho sách,
* **Tôi muốn (I want to):** Quản lý chi tiết từng bản in vật lý thuộc một đầu sách (Mã Đăng ký cá biệt / Barcode, Mã Chip RFID, Vị trí tầng/dãy/kệ, Trạng thái sử dụng, Loại hình lưu thông: Mượn về nhà hoặc Đọc tại chỗ),
* **Để (So that):** Quản lý chính xác số lượng tồn kho thực tế, định vị vị trí cuốn sách trên kệ và kiểm soát trạng thái mượn/trả của từng cá thể sách.

---

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Một đầu sách (ví dụ: *Giáo trình Giải tích 1*) thường được nhập về từ 5 đến 50 bản in. Mỗi bản in là một thực thể vật lý độc lập có nhãn Barcode dán ở bìa trong và gắn chip RFID để kiểm soát an ninh tại cổng ra vào. Bạn đọc khi tra cứu OPAC sẽ thấy rõ: "Tổng cộng 10 cuốn: 7 cuốn có sẵn tại Tầng 2 - Kệ B4, 3 cuốn đang được mượn".

---

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

* **[BR-CAT-02.1] Mã ĐKCB là duy nhất:** Mỗi bản sao bắt buộc phải có một Mã Đăng ký cá biệt (`Barcode`) duy nhất trên toàn hệ thống (ví dụ: `UL-BC-0001928`).
* **[BR-CAT-02.2] Các trạng thái hợp lệ của bản sao:**
  - `AVAILABLE`: Có sẵn trên kệ, sẵn sàng cho mượn.
  - `BORROWED`: Đang được độc giả mượn.
  - `RESERVED`: Đang được giữ chỗ cho độc giả đặt trước (trong vòng 48h).
  - `MAINTENANCE`: Đang đóng bìa / bảo quản / phục chế.
  - `LOST_DAMAGED`: Báo mất hoặc hư hỏng nặng.
* **[BR-CAT-02.3] Đồng bộ số lượng tổng:** Số lượng bản sao khả dụng hiển thị trên đầu sách (`availableCopies`) luôn bằng tổng số bản sao có trạng thái `AVAILABLE`.

---

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Thêm bản sao vật lý cho đầu sách (Happy Path)
* **Given:** Thủ thư đang xem chi tiết đầu sách `Kinh tế học Lượng tử` (đang có 3 bản sao).
* **When:** Thủ thư bấm "Thêm bản sao", quét mã Barcode `UL-BC-004`, chọn Vị trí `Tầng 3 • Kệ E2` và Loại lưu thông `Mượn về nhà`.
* **Then:** Hệ thống lưu bản sao mới với trạng thái `AVAILABLE`, cập nhật tổng số bản sao lên 4, tăng số bản sao khả dụng lên 4.

### Kịch bản 2: Không cho phép trùng Mã Đăng ký cá biệt (Validation)
* **Given:** Mã Barcode `UL-BC-001` đã tồn tại trong CSDL.
* **When:** Thủ thư nhập hoặc quét mã `UL-BC-001` cho một bản sao khác.
* **Then:** Hệ thống từ chối lưu và thông báo lỗi: "Mã ĐKCB này đã được gán cho một bản sao khác trên hệ thống".
