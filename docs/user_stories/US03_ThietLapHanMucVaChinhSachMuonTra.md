# USER STORY: US03 - THIẾT LẬP HẠN MỨC & CHÍNH SÁCH MƯỢN TRẢ (CIRCULATION POLICY CONFIGURATION)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US03** |
| **Tên User Story** | Thiết lập Hạn mức & Chính sách Mượn Trả theo Nhóm Độc giả |
| **Phân hệ (Module)** | Phân hệ 1: Quản lý Danh mục & Bản sao |
| **Use Case liên quan** | **UC03: Thiết lập Hạn mức & Chính sách Mượn Trả** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-CIR-01] & [FR-AUT-02]** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **High (Quan trọng)** |
| **Tác nhân chính (Primary Actor)** | Quản trị viên Thư viện (*Library Admin*) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Quản trị viên Thư viện,
* **Tôi muốn:** Cấu hình chính sách lưu thông chi tiết cho từng nhóm độc giả (Hạn mức số sách mượn tối đa, Thời gian mượn tiêu chuẩn, Số lần gia hạn tối đa, Mức phí phạt mỗi ngày trễ hạn),
* **Để:** Tự động hóa việc kiểm soát quyền lợi của từng đối tượng độc giả (Sinh viên đại học, Học viên cao học, Nghiên cứu sinh, Cán bộ giảng viên) một cách công bằng và minh bạch.

---

## 3. BẢNG CẤU HÌNH CHÍNH SÁCH MẶC ĐỊNH (DEFAULT POLICY MATRIX)

| Nhóm Độc giả (`Role`) | Số sách tối đa (`maxLoans`) | Thời hạn mượn (`loanDays`) | Số lần gia hạn (`maxRenewals`) | Mức phạt trễ (`finePerDay`) |
| :--- | :---: | :---: | :---: | :---: |
| **Sinh viên Đại học (`STUDENT`)** | 5 cuốn | 14 ngày | 2 lần (+14 ngày/lần) | 5.000 đ/cuốn/ngày |
| **Học viên Cao học (`STUDENT/K31`)** | 8 cuốn | 30 ngày | 2 lần (+14 ngày/lần) | 5.000 đ/cuốn/ngày |
| **Giảng viên / Cán bộ (`STAFF/FACULTY`)** | 12 cuốn | 60 ngày | 3 lần (+30 ngày/lần) | 2.000 đ/cuốn/ngày |
| **Thành viên Khách ngoài (`GUEST`)** | 2 cuốn (Chỉ đọc) | 1 ngày | 0 lần | 10.000 đ/cuốn/ngày |

---

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

* **[BR-POL-01] Áp dụng tức thì:** Khi quản trị viên cập nhật chính sách, quy tắc mới sẽ áp dụng ngay cho các giao dịch mượn mới phát sinh kể từ thời điểm lưu.
* **[BR-POL-02] Không thay đổi hồi tố:** Các phiếu mượn đang diễn ra vẫn giữ nguyên hạn trả và mức phạt đã ấn định tại thời điểm lập phiếu.
