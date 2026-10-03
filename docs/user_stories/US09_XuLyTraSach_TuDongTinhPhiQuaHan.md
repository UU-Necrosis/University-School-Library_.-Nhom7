# USER STORY: US09 - XỬ LÝ TRẢ SÁCH & TÍNH PHÍ QUÁ HẠN (CHECK-IN & FINES)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US09** |
| **Tên User Story** | Xử lý Trả Sách & Tự động Tính Phí Phạt Quá Hạn |
| **Phân hệ (Module)** | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **Use Case liên quan** | **UC09: Xử lý Trả Sách & Tự động Tính Phí Quá hạn** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-CIR-02] Xử lý Trả Sách & Tính Phí Quá Hạn** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Must-Have (Cốt lõi)** |
| **Tác nhân chính (Primary Actor)** | Thủ thư Lưu thông (*Circulation Staff*) |
| **Tác nhân phụ (Secondary Actor)** | Hệ thống Tự động (Tính toán phí phạt) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Thủ thư phụ trách quầy nhận trả sách,
* **Tôi muốn:** Quét mã vạch Barcode/RFID của cuốn sách được độc giả trả về, hệ thống tự động xác định phiếu mượn tương ứng, tính toán số ngày trễ hạn (nếu có), tự động tính số tiền phạt và cập nhật trạng thái bản sao sách,
* **Để:** Hoàn tất ghi nhận trả sách, cập nhật ngay lập tức sách về trạng thái `AVAILABLE` (hoặc chuyển sang `RESERVED` nếu có người đặt trước) và ghi nhận công nợ phí phạt chính xác.

---

## 3. CÔNG THỨC TÍNH PHÍ PHẠT TRỄ HẠN (FINE CALCULATION FORMULA)

$$\text{Số ngày trễ} = \max(0, \text{Ngày trả thực tế} - \text{Hạn trả quy định})$$
$$\text{Tiền phạt (VND)} = \text{Số ngày trễ} \times \text{Mức phạt (5.000 đ/cuốn/ngày)}$$

*Ví dụ:* Hạn trả: `15/09/2026`, Ngày trả thực tế: `20/09/2026` $\rightarrow$ Trễ 5 ngày $\rightarrow$ Phí phạt = $5 \times 5.000 = 25.000\text{ đ}$.

---

## 4. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Trả sách đúng hạn (Happy Path)
* **Given:** Bản sao `UL-BC-001` đang được mượn, hạn trả là ngày `10/10/2026`. Hôm nay là ngày `03/10/2026`.
* **When:** Thủ thư quét mã `UL-BC-001` vào màn hình Nhận trả.
* **Then:** Hệ thống đóng phiếu mượn với trạng thái `RETURNED`, ghi nhận ngày trả, phí phạt = 0đ, chuyển trạng thái sách sang `AVAILABLE` và hiển thị "Trả sách đúng hạn thành công".

### Kịch bản 2: Trả sách trễ hạn (Overdue Penalty)
* **Given:** Bản sao `UL-BC-002` có hạn trả `25/09/2026`. Hôm nay là ngày `03/10/2026` (quá hạn 8 ngày).
* **When:** Thủ thư quét mã `UL-BC-002`.
* **Then:** Hệ thống tính phí phạt: $8 \times 5.000 = 40.000\text{ đ}$, hiển thị cảnh báo đỏ "Sách quá hạn 8 ngày - Phí phạt: 40.000 đ", tạo hóa đơn phạt chờ thanh toán trong hồ sơ độc giả.
