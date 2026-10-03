# USER STORY: US08 - LẬP PHIẾU MƯỢN SÁCH TẠI QUẦY (CHECK-OUT LOAN DESK)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US08** |
| **Tên User Story** | Lập Phiếu Mượn Sách tại Quầy & Kiểm tra Điều kiện Độc giả |
| **Phân hệ (Module)** | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **Use Case liên quan** | **UC08: Lập Phiếu Mượn Sách tại Quầy** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-CIR-01] Lập Phiếu Mượn Sách tại Quầy** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Must-Have (Cốt lõi)** |
| **Tác nhân chính (Primary Actor)** | Thủ thư Lưu thông (*Circulation Staff*) |
| **Tác nhân phụ (Secondary Actor)** | Độc giả (*Patron/Student*) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Thủ thư phụ trách quầy lưu thông mượn/trả,
* **Tôi muốn:** Quét thẻ độc giả và quét mã vạch Barcode/RFID của các cuốn sách độc giả mang đến quầy, hệ thống tự động kiểm tra tính hợp lệ của thẻ (hạn thẻ, hạn mức số lượng sách còn lại, các khoản nợ phạt trễ hạn) và tạo Phiếu mượn ghi nhận ngày mượn và ngày hết hạn trả,
* **Để:** Hoàn tất thủ tục cho mượn sách nhanh chóng, chính xác dưới 15 giây và bảo đảm an toàn dữ liệu lưu thông.

---

## 3. QUY TRÌNH KIỂM TRA ĐIỀU KIỆN TỰ ĐỘNG (SYSTEM VALIDATION LOGIC)

```
[ Quét Thẻ Độc Giả ] ──> Thẻ còn hạn? ──(No)──> [ Từ chối: Thẻ hết hạn ]
           │ (Yes)
           ├──> Có sách trễ hạn chưa trả? ──(Yes)──> [ Từ chối: Yêu cầu trả sách quá hạn ]
           │ (No)
           ├──> Tiền phạt chưa đóng > 50.000đ? ──(Yes)──> [ Từ chối: Yêu cầu đóng phí phạt ]
           │ (No)
[ Quét Mã Sách Barcode ] ──> Số sách mượn + Đang giữ <= Hạn mức (maxLoans)? ──(No)──> [ Báo lỗi vượt hạn mức ]
           │ (Yes)
           └──> Sách ở trạng thái AVAILABLE? ──(Yes)──> [ Tạo Phiếu Mượn Thành Công! ]
```

---

## 4. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Mượn sách thành công (Happy Path)
* **Given:** Sinh viên `Lê Hoàng Nam` (Mã `UL-202488`, hạn mức 8 cuốn, hiện đang mượn 3 cuốn, không nợ phạt).
* **When:** Thủ thư quét thẻ sinh viên và quét mã sách `UL-BC-001` (Kinh tế học lượng tử).
* **Then:** Hệ thống tạo phiếu mượn với ngày mượn = hôm nay, hạn trả = hôm nay + 30 ngày, đổi trạng thái bản sao `UL-BC-001` sang `BORROWED`, số sách đang mượn của Nam tăng lên 4.

### Kịch bản 2: Từ chối khi vượt hạn mức mượn (Validation)
* **Given:** Sinh viên đang giữ 5/5 cuốn sách cho phép.
* **When:** Thủ thư cố gắng quét thêm cuốn thứ 6.
* **Then:** Hệ thống phát chuông cảnh báo và thông báo lỗi: "Độc giả đã đạt hạn mức mượn tối đa (5 cuốn). Vui lòng trả sách cũ trước khi mượn thêm".
