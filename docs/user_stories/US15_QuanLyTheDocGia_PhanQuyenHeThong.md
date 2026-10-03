# USER STORY: US15 - QUẢN LÝ THẺ ĐỘC GIẢ & PHÂN QUYỀN (PATRON MANAGEMENT & RBAC)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US15** |
| **Tên User Story** | Quản lý Thẻ Độc Giả, Kích Hoạt RFID & Phân Quyền Hệ Thống (RBAC) |
| **Phân hệ (Module)** | Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản |
| **Use Case liên quan** | **UC15: Quản lý Thẻ Độc giả & Phân quyền Hệ thống** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-AUT-01] & [FR-AUT-02]** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Must-Have (Cốt lõi)** |
| **Tác nhân chính (Primary Actor)** | Quản trị viên Hệ thống (*System Admin*) |
| **Tác nhân phụ (Secondary Actor)** | Độc giả (*Student/Patron*), Thủ thư (*Librarian*) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Quản trị viên hệ thống thư viện,
* **Tôi muốn:** Quản lý danh sách tài khoản người dùng, cấp phát và gia hạn thẻ thư viện số, kích hoạt mã RFID thẻ sinh viên, gán vai trò quyền hạn (`STUDENT`, `STAFF`, `LIBRARIAN`, `ADMIN`) và kiểm soát trạng thái hoạt động của tài khoản,
* **Để:** Đảm bảo an ninh thông tin, phân quyền đúng chức năng cho từng nhân viên và phục vụ xác thực tập trung cho toàn bộ hệ thống thư viện.

---

## 3. MA TRẬN PHÂN QUYỀN TRUY CẬP (RBAC PERMISSION MATRIX)

| Chức năng / Phân hệ | `STUDENT` (Bạn đọc) | `STAFF` (Cán bộ trường) | `LIBRARIAN` (Thủ thư) | `ADMIN` (Quản trị) |
| :--- | :---: | :---: | :---: | :---: |
| Tra cứu OPAC & CSDL số | Xem | Xem | Xem | Xem |
| Xem Thẻ thư viện số cá nhân | Xem/Gia hạn | Xem/Gia hạn | Xem | Xem |
| Đặt trước tài liệu (Queue) | Tạo yêu cầu | Tạo yêu cầu | Quản lý | Toàn quyền |
| Quầy Lưu thông Mượn / Trả | ❌ | ❌ | Thực hiện | Toàn quyền |
| Bổ sung & Biên mục Đầu sách | ❌ | ❌ | Thực hiện | Toàn quyền |
| Kiểm kê Kho & Xử lý sách hỏng | ❌ | ❌ | Thực hiện | Toàn quyền |
| Thu phí phạt & Báo cáo tài chính | ❌ | ❌ | Thu tiền | Toàn quyền |
| Quản lý Người dùng & Phân quyền | ❌ | ❌ | ❌ | **Toàn quyền** |

---

## 4. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Đăng ký và kích hoạt tài khoản thành công
* **Given:** Sinh viên mới truy cập trang Đăng ký.
* **When:** Sinh viên nhập Họ tên, Mã sinh viên `2506022021`, Email ĐHQG và Mật khẩu mạnh, bấm "Đăng ký".
* **Then:** Hệ thống tạo tài khoản với vai trò mặc định `STUDENT`, cấp thẻ thư viện số ảo và trả về JWT accessToken để đăng nhập tự động.

### Kịch bản 2: Bảo vệ Route & API Guard (Authorization Check)
* **Given:** Người dùng đang đăng nhập với vai trò `STUDENT`.
* **When:** Người dùng cố gắng gọi API quản lý mượn trả `/api/circulation/loan` hoặc truy cập module thủ thư.
* **Then:** Hệ thống NestJS RolesGuard trả về mã lỗi `403 Forbidden` ("Bạn không có quyền thực hiện chức năng này").
