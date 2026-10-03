# USER STORY: US05 - BIÊN MỤC TỰ ĐỘNG & XẾP GIÁ KỆ (AUTO-CATALOGING & SHELVING)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US05** |
| **Tên User Story** | Tự động Gán Mã ĐKCB, Biên mục DDC & Xếp giá Kệ |
| **Phân hệ (Module)** | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **Use Case liên quan** | **UC05: Tự động Gán Mã ĐKCB & Xếp giá Kệ** (DacTa_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **Medium (Trung bình)** |
| **Tác nhân chính (Primary Actor)** | Hệ thống Tự động / Thủ thư Biên mục |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Thủ thư phụ trách biên mục & xử lý kỹ thuật tài liệu,
* **Tôi muốn:** Hệ thống tự động sinh dải Barcode đăng ký cá biệt tuần tự (ví dụ: `UL-2024-0001` $\rightarrow$ `UL-2024-0010`), tự động gợi ý Call Number theo bảng phân loại DDC và xuất file in nhãn dán gáy sách (Spine Label),
* **Để:** Giảm thiểu thao tác thủ công, đảm bảo tính chuẩn hóa và đẩy nhanh tiến độ đưa sách mới lên kệ phục vụ bạn đọc.

---

## 3. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

* **[BR-CAT-05.1] Cấu trúc Call Number:** Gồm 3 dòng in trên nhãn gáy:
  - Dòng 1: Mã phân loại DDC (ví dụ: `005.133`)
  - Dòng 2: Mã Tác giả Cutter-Sanborn (ví dụ: `.N573K`)
  - Dòng 3: Năm xuất bản (ví dụ: `2024`)
