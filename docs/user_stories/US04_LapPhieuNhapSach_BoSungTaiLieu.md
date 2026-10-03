# USER STORY: US04 - LẬP PHIẾU NHẬP SÁCH & BỔ SUNG TÀI LIỆU (ACQUISITIONS & INGEST)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US04** |
| **Tên User Story** | Lập Phiếu Nhập Sách & Bổ sung Tài liệu từ Nhà cung cấp |
| **Phân hệ (Module)** | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **Use Case liên quan** | **UC04: Lập Phiếu Nhập Sách & Bổ sung Tài liệu** (DacTa_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **High (Quan trọng)** |
| **Tác nhân chính (Primary Actor)** | Thủ thư phụ trách Bổ sung (*Acquisitions Librarian*) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Thủ thư phụ trách tiếp nhận tài liệu mới,
* **Tôi muốn:** Lập phiếu nhập sách từ Nhà xuất bản / Nhà phân phối hoặc Nguồn tài trợ (Số hóa đơn, Nhà cung cấp, Ngày nhập, Danh sách các đầu sách kèm số lượng bản in và đơn giá nhập),
* **Để:** Ghi nhận nguồn gốc, kinh phí bổ sung học liệu và làm cơ sở sinh các bản sao vật lý nhập kho.

---

## 3. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản: Lập phiếu nhập thành công
* **Given:** Thủ thư đang ở màn hình "Lập Phiếu Nhập Sách".
* **When:** Thủ thư chọn Nhà cung cấp `NXB Trẻ`, thêm dòng sách `Nhập môn Trí tuệ Nhân tạo`, số lượng `10` cuốn, đơn giá `150.000 đ/cuốn` và bấm "Lưu Phiếu Nhập".
* **Then:** Hệ thống tạo phiếu nhập thành công với tổng tiền `1.500.000 đ`, tự động kích hoạt tạo 10 bản sao với trạng thái `AVAILABLE`.
