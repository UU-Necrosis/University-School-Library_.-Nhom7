# USER STORY: US10 - GIA HẠN THỜI GIAN MƯỢN SÁCH (LOAN RENEWAL)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US10** |
| **Tên User Story** | Gia hạn Sách Mượn Trực tuyến & Tại quầy Lưu thông |
| **Phân hệ (Module)** | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **Use Case liên quan** | **UC10: Gia hạn Thời gian Mượn Sách** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-CIR-03] Gia hạn Sách (Renewal)** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **High (Quan trọng)** |
| **Tác nhân chính (Primary Actor)** | Độc giả (*Patron/Student*) |
| **Tác nhân phụ (Secondary Actor)** | Thủ thư (*Librarian*) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Độc giả đang mượn sách học tập / nghiên cứu,
* **Tôi muốn:** Tự bấm nút "Gia hạn" trên trang Thẻ thư viện số của mình (hoặc nhờ thủ thư gia hạn tại quầy),
* **Để:** Kéo dài thêm thời hạn mượn (thêm 14 ngày) mà không cần phải mang sách trực tiếp đến quầy thư viện, với điều kiện sách chưa quá hạn và chưa có người khác đặt trước.

---

## 3. QUY TẮC ĐIỀU KIỆN GIA HẠN (RENEWAL RULES)

* **[BR-REN-01] Số lần tối đa:** Mỗi phiếu mượn chỉ được gia hạn tối đa **2 lần** (tổng cộng mượn tối đa 14 + 14 + 14 = 42 ngày đối với Sinh viên).
* **[BR-REN-02] Không có người chờ (No Holds):** Nếu đầu sách đó đang có ít nhất 1 độc giả trong hàng đợi Đặt trước (`Reservation Queue`), hệ thống **từ chối gia hạn** để bảo đảm quyền lợi người đến sau.
* **[BR-REN-03] Không quá hạn:** Sách đã quá hạn trả (`status = OVERDUE`) không được phép gia hạn online mà bắt buộc phải mang tới quầy xử lý nộp phạt.

---

## 4. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Gia hạn trực tuyến thành công
* **Given:** Sinh viên đang mượn cuốn `Kinh tế học Lượng tử`, hạn trả là `05/10/2026`, số lần đã gia hạn là `0/2`, không có ai đặt trước cuốn này.
* **When:** Sinh viên truy cập Cổng Thẻ thư viện và bấm "Gia hạn".
* **Then:** Hệ thống cộng thêm 14 ngày vào hạn trả (mới: `19/10/2026`), cập nhật số lần gia hạn thành `1/2` và hiển thị thông báo "Gia hạn thành công".
