# USER STORY: US11 - ĐẶT TRƯỚC SÁCH & HÀNG ĐỢI FIFO (HOLD & RESERVATION QUEUE)

---

## 1. THÔNG TIN CHUNG (METADATA)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã User Story** | **US11** |
| **Tên User Story** | Đặt Trước Sách Khi Hết Bản Sao & Quản lý Hàng Đợi Ưu Tiên FIFO |
| **Phân hệ (Module)** | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **Use Case liên quan** | **UC11: Đặt trước Sách & Quản lý Hàng đợi FIFO** (DacTa_UniLibrary.md) |
| **Yêu cầu SRS** | **[FR-RES-01] & [FR-RES-02]** (SRS_UniLibrary.md) |
| **Độ ưu tiên (Priority)** | **High (Quan trọng)** |
| **Tác nhân chính (Primary Actor)** | Độc giả (*Patron/Student*) |
| **Tác nhân phụ (Secondary Actor)** | Hệ thống Tự động (Xử lý chuyển trạng thái và gửi thông báo) |
| **Trạng thái (Status)** | Ready for Development |

---

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

* **Là một:** Độc giả đang cần mượn một cuốn sách chuyên ngành mà tất cả các bản in đều đang được người khác mượn (`availableCopies = 0`),
* **Tôi muốn:** Bấm nút "Đặt trước tài liệu" trên trang chi tiết OPAC để ghi danh vào hàng đợi ưu tiên theo thứ tự thời gian (FIFO - First In, First Out),
* **Để:** Khi bất kỳ ai trả cuốn sách đó về thư viện, hệ thống sẽ tự động giữ cuốn sách đó cho tôi trong 48 giờ và gửi thông báo qua Email/SMS mời tôi đến quầy nhận sách.

---

## 3. LUỒNG XỬ LÝ HÀNG ĐỢI ĐẶT TRƯỚC (RESERVATION WORKFLOW)

```
[ Độc giả A bấm "Đặt trước" ] ──> Đưa vào Hàng đợi FIFO (Queue Position: #1, #2...)
              │
              ▼
[ Người khác trả 1 bản sao về thư viện ]
              │
              ▼
[ Hệ thống tự động gán bản sao sang trạng thái RESERVED cho Độc giả #1 ]
              │
              ├──> Gửi Email/Notification: "Sách đã có sẵn, vui lòng nhận trước [Hiện tại + 48h]"
              │
              ▼
[ Trong vòng 48h: Độc giả đến nhận ] ──(Yes)──> [ Chuyển thành Phiếu Mượn chính thức ]
              │ (Không đến sau 48h)
              └──> [ Hủy giữ chỗ Độc giả #1 ] ──> [ Tự động chuyển quyền giữ chỗ cho Độc giả #2 ]
```

---

## 4. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Đặt trước thành công khi sách hết bản sao
* **Given:** Đầu sách `Quantum Computing` có 1 bản sao duy nhất đang được mượn (`availableCopies = 0`).
* **When:** Độc giả `Lê Hoàng Nam` đã đăng nhập và bấm "Đặt trước sách".
* **Then:** Hệ thống tạo yêu cầu đặt trước với vị trí hàng đợi `#1`, hiển thị thông báo "Bạn đã đặt trước thành công. Hệ thống sẽ thông báo ngay khi sách được trả về".

### Kịch bản 2: Không cho phép đặt trước khi sách còn bản sao trên kệ
* **Given:** Đầu sách `Kinh tế học Lượng tử` đang có 3 cuốn có sẵn trên kệ (`availableCopies = 3`).
* **When:** Độc giả bấm nút "Đặt trước".
* **Then:** Hệ thống thông báo: "Sách hiện đang có sẵn 3 cuốn tại Tầng 3. Bạn có thể đến trực tiếp thư viện để mượn mà không cần đặt trước".
