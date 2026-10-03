# USER STORY: US12 - QUÉT CẢNH BÁO SÁCH SẮP ĐẾN HẠN & QUÁ HẠN (AUTOMATED NOTIFICATION)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US12** |
| **Tên User Story** | Quét Tự Động & Gửi Thông Báo Nhắc Nhở Sách Sắp Đến Hạn / Quá Hạn |
| **Phân hệ (Module)** | Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản |
| **Use Case liên quan** | **UC12: Quét & Cảnh báo Sách Sắp hết hạn / Quá hạn** (DacTa_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **High (Quan trọng)** |
| **Tác nhân chính (Primary Actor)** | Hệ thống Tự động (*Cron Job Worker*) |
| **Tác nhân phụ (Secondary Actor)** | Độc giả (*Patron/Student*) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Hệ thống tự động vận hành ngầm của Thư viện UniLibrary,
* **Tôi muốn:** Định kỳ quét cơ sở dữ liệu lưu thông vào 07:00 sáng mỗi ngày, phát hiện các phiếu mượn còn 2 ngày nữa đến hạn trả HOẶC đã trễ hạn, và tự động gửi thông báo / Email nhắc nhở đến độc giả kèm liên kết gia hạn nhanh,
* **Để:** Giảm tỷ lệ sách quá hạn, nâng cao tính tự giác của sinh viên và tăng tốc độ luân chuyển tài liệu trong toàn trường.

---

## 3. CÁC MỐC CẢNH BÁO (NOTIFICATION MILESTONES)

1. **Nhắc nhở trước 2 ngày:** Email tiêu đề: *"[UniLibrary] Nhắc nhở: Sách bạn đang mượn sắp đến hạn trả trong 2 ngày tới"*.
2. **Cảnh báo đúng ngày hết hạn:** Email tiêu đề: *"[UniLibrary] Hôm nay là hạn chót hoàn trả sách"*.
3. **Cảnh báo quá hạn (Mỗi 3 ngày):** Email tiêu đề: *"[UniLibrary] CẢNH BÁO: Sách của bạn đã quá hạn X ngày (Phí phạt hiện tại: Y đ)"*.
