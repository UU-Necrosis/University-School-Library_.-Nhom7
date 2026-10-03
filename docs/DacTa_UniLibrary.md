# BẢN ĐẶC TẢ TÁC NHÂN VÀ USE CASE
## HỆ THỐNG QUẢN LÝ THƯ VIỆN SỐ & HỌC LIỆU ĐẠI HỌC (UNILIBRARY)
**Chủ đề tập trung:** Quản lý Bản sao cá biệt, Lưu thông Mượn/Trả, Hàng đợi Đặt trước (FIFO Queue) & Phân quyền Độc giả (RBAC)

---

## 1. TỔNG QUAN HỆ THỐNG (SYSTEM OVERVIEW)

Hệ thống Quản lý Thư viện UniLibrary hỗ trợ toàn diện chu trình vận hành tại Trung tâm Học liệu & Thư viện Đại học, từ biên mục tài liệu, bổ sung bản sao vật lý, phục vụ lưu thông mượn/trả tại quầy, quản lý hàng đợi đặt trước, đến cổng tra cứu học thuật OPAC trực tuyến dành cho bạn đọc. Hệ thống giải quyết 4 bài toán nghiệp vụ cốt lõi:
1. **Quản lý Bản sao cá biệt & Định vị kệ (Copy-level Tracking):** Mỗi cuốn sách vật lý sở hữu một Mã Đăng ký cá biệt duy nhất (Barcode/RFID Chip), định vị chính xác vị trí tầng, phòng đọc và dãy kệ.
2. **Kiểm soát Lưu thông & Hạn mức mượn (Circulation Rule Engine):** Tự động kiểm tra điều kiện thẻ độc giả, hạn mức số lượng sách được mượn theo vai trò (Sinh viên: 5 cuốn/14 ngày, Cao học: 8 cuốn/30 ngày, Giảng viên: 12 cuốn/60 ngày).
3. **Hàng đợi Đặt trước Thông minh (FIFO Reservation Queue):** Tự động xếp hàng độc giả khi sách mượn hết, tự động giữ chỗ 48h và gửi thông báo khi sách được hoàn trả về thư viện.
4. **Quản lý Quá hạn & Phí phạt Minh bạch (Overdue & Fine Calculation):** Tự động tính phí phạt theo ngày trễ, hỗ trợ gia hạn sách online khi đủ điều kiện.

---

## 2. DANH SÁCH TÁC NHÂN (ACTORS)

| STT | Tên Tác nhân (Actor) | Loại Tác nhân | Mô tả vai trò & Trách nhiệm |
| :--- | :--- | :--- | :--- |
| **1** | **Sinh viên / Học viên / Độc giả** *(Patron/Student)* | Human (Primary) | Tra cứu tài liệu OPAC, xem thẻ thư viện số, theo dõi hạn trả, tự gia hạn sách online, đăng ký hàng đợi đặt trước khi sách hết. |
| **2** | **Thủ thư / Nhân viên Lưu thông** *(Librarian/Circulation Staff)* | Human (Primary) | Quét mã thực hiện thủ tục mượn sách, nhận trả sách, thu phí phạt quá hạn, kiểm tra tình trạng sách, xử lý sách hỏng/mất. |
| **3** | **Quản lý Thư viện / Quản trị viên** *(Library Manager/Admin)* | Human (Primary) | Quản lý danh mục đầu sách, biên mục, nhập sách bổ sung, cấu hình hạn mức mượn/phí phạt, xem báo cáo thống kê, phân quyền. |
| **4** | **Hệ thống Cron Tự động** *(System Worker/Cron Job)* | System (Secondary) | Tự động quét kho sách hàng đêm: tính số ngày quá hạn, gửi email nhắc nhở trước 2 ngày, tự động hủy giữ chỗ quá hạn 48 giờ. |
| **5** | **Cổng Dịch vụ Liên trường & CSDL Quốc tế** *(External System)* | System (Secondary) | Kết nối xác thực SSO ĐHQG, tích hợp truy cập CSDL số toàn văn (Scopus, IEEE Xplore, ScienceDirect). |

---

## 3. MA TRẬN TÁC NHÂN VS USE CASE (ACTOR - USE CASE MATRIX)

| Mã UC | Tên Use Case | Độc giả | Thủ thư | Quản trị | Hệ thống Tự động |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **UC01** | Quản lý Danh mục Đầu sách & Biên mục | | | **X** | |
| **UC02** | Quản lý Bản sao Vật lý (Barcode/RFID) | | **X** | **X** | |
| **UC03** | Thiết lập Hạn mức & Chính sách Mượn Trả | | | **X** | |
| **UC04** | Lập Phiếu Nhập Sách & Bổ sung Tài liệu | | **X** | **X** | |
| **UC05** | Tự động Gán Mã ĐKCB & Xếp giá Kệ (DDC) | | **X** | | **X** |
| **UC06** | Kiểm kê Kho Sách & Cập nhật Trạng thái | | **X** | **X** | |
| **UC07** | Xử lý Sách Hư hỏng, Báo mất & Thanh lý | | **X** | **X** | |
| **UC08** | Lập Phiếu Mượn Sách tại Quầy | | **X** | | |
| **UC09** | Xử lý Trả Sách & Tự động Tính Phí Quá hạn | | **X** | | **X** |
| **UC10** | Gia hạn Thời gian Mượn Sách (Online/Quầy) | **X** | **X** | | |
| **UC11** | Đặt trước Sách & Quản lý Hàng đợi FIFO | **X** | **X** | | **X** |
| **UC12** | Quét & Cảnh báo Sách Sắp hết hạn / Quá hạn | | | | **X** |
| **UC13** | Xem Báo cáo Lưu thông & Mật độ Mượn Sách | | **X** | **X** | |
| **UC14** | Quản lý Thu Phí Phạt & Báo cáo Tài chính | | **X** | **X** | |
| **UC15** | Quản lý Thẻ Độc giả & Phân quyền Hệ thống | **X** | **X** | **X** | |

---

## 4. DANH SÁCH USE CASE CHI TIẾT THEO PHÂN HỆ

### 4.1. Phân hệ 1: Quản lý Danh mục & Bản sao (Master Catalog & Copies)
* **UC01: Quản lý Danh mục Đầu sách:** Thêm, sửa, tìm kiếm thông tin đầu sách (Nhan đề, Tác giả, ISBN, NXB, Năm, DDC, Số trang, Mô tả).
* **UC02: Quản lý Bản sao Vật lý:** Quản lý từng bản in theo Mã ĐKCB (Barcode/RFID), trạng thái (`AVAILABLE`, `BORROWED`, `RESERVED`, `LOST`, `DAMAGED`), vị trí kệ.
* **UC03: Thiết lập Hạn mức & Chính sách:** Cài đặt số lượng sách tối đa, thời gian mượn, số lần gia hạn cho từng nhóm độc giả (Sinh viên, Cao học, Giảng viên).

### 4.2. Phân hệ 2: Bổ sung & Kiểm kê Kho Sách
* **UC04: Lập Phiếu Nhập Sách:** Ghi nhận sách nhập từ nhà xuất bản, nguồn tài trợ kèm đơn giá, số lượng bản in.
* **UC05: Tự động Gán Mã ĐKCB & Xếp giá:** Tự động sinh dải Barcode/RFID cho các bản sao mới nhập và in nhãn gáy sách (Spine Label).
* **UC06: Kiểm kê Kho Sách:** Quét mã kiểm kê thực tế tại kệ, đối soát sai lệch với CSDL, phát hiện sách thất lạc.
* **UC07: Xử lý Sách Hư hỏng / Mất:** Ghi nhận sách mất/hỏng, tính tiền đền bù theo giá bìa hoặc khấu hao, chuyển trạng thái tài liệu.

### 4.3. Phân hệ 3: Lưu thông Mượn/Trả & Đặt Trước (Circulation & Reservation)
* **UC08: Lập Phiếu Mượn Sách:** Quét thẻ độc giả, quét mã sách $\rightarrow$ Kiểm tra điều kiện hợp lệ $\rightarrow$ Ghi nhận ngày mượn, hạn trả.
* **UC09: Xử lý Trả Sách & Phạt Quá hạn:** Quét mã bản sao $\rightarrow$ Hệ thống ghi nhận hoàn trả $\rightarrow$ Nếu quá hạn, tự động tính tiền phạt (5.000đ/ngày).
* **UC10: Gia hạn Sách:** Độc giả tự bấm "Gia hạn" trên web hoặc thủ thư hỗ trợ tại quầy (+14 ngày nếu sách chưa có ai đặt trước).
* **UC11: Đặt trước Sách (Reservation):** Khi sách hết bản sao trên kệ, cho phép độc giả đặt trước vào hàng đợi FIFO. Khi sách được trả về, tự động giữ chỗ 48h.

### 4.4. Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản
* **UC12: Quét Cảnh báo Sắp đến hạn / Quá hạn:** Tự động gửi Email/Notification nhắc độc giả trả sách trước 2 ngày và khi quá hạn.
* **UC13: Xem Báo cáo Lưu thông:** Thống kê đầu sách mượn nhiều nhất, tỷ lệ xoay vòng sách, độc giả mượn tích cực.
* **UC14: Quản lý Thu Phí Phạt:** Quản lý thu tiền phạt trễ hạn, in biên lai, theo dõi công nợ độc giả.
* **UC15: Quản lý Thẻ Độc giả & Phân quyền (RBAC):** Cấp phát thẻ thư viện số, kích hoạt RFID, phân quyền vai trò người dùng trong hệ thống.
