# USER STORY: US07 - XỬ LÝ SÁCH HƯ HỎNG & BÁO MẤT (DAMAGED / LOST BOOK DISPOSAL)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US07** |
| **Tên User Story** | Xử lý Sách Hư hỏng, Báo mất & Thanh lý Tài liệu Cũ |
| **Phân hệ (Module)** | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **Use Case liên quan** | **UC07: Xử lý Sách Hư hỏng, Báo mất & Thanh lý** (DacTa_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Medium (Trung bình)** |
| **Tác nhân chính (Primary Actor)** | Thủ thư / Hội đồng Thanh lý Thư viện |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Thủ thư phụ trách bảo quản & xử lý sự cố sách,
* **Tôi muốn:** Ghi nhận biên bản xử lý đối với các bản sao bị hư hỏng (rách bìa, mất trang, ướt nước) hoặc báo mất từ độc giả, tự động chuyển trạng thái bản sao sang `DAMAGED` hoặc `LOST`, và tự động lập phiếu tính tiền đền bù (Giá bìa + 20% phí xử lý nghiệp vụ),
* **Để:** Loại bỏ tài liệu không còn khả dụng khỏi danh mục mượn trên OPAC và thu hồi kinh phí phục chế hoặc mua bổ sung bản in thay thế.
