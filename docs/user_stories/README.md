# HỆ THỐNG USER STORIES - UNILIBRARY ACADEMIC PORTAL
## HỆ THỐNG QUẢN LÝ THƯ VIỆN SỐ & HỌC LIỆU ĐẠI HỌC (UNILIBRARY)

---

## 1. TỔNG QUAN

Tập hợp tài liệu này bao gồm **15 User Stories** chi tiết được chuyển đổi và xây dựng chuẩn mực theo mô hình Agile / Scrum cho dự án **UniLibrary**. Mỗi User Story định nghĩa đầy đủ:
- **Story Statement:** Theo cú pháp chuẩn *(As a... I want to... So that...)*
- **Bối cảnh & Nghiệp vụ (Business Context):** Phân tích thực tế quy trình tại thư viện viện trường.
- **Quy tắc Nghiệp vụ (Business Rules):** Ràng buộc logic, hạn mức mượn, tính phí phạt, kiểm tra điều kiện.
- **Tiêu chí Chấp nhận (Acceptance Criteria):** Định dạng Gherkin *(Given - When - Then)* bao phủ Happy Path, Validation và Edge Cases.
- **Đặc tả Dữ liệu & Kỹ thuật:** Entity quan hệ, API Payload và xử lý ràng buộc toàn vẹn.

---

## 2. DANH MỤC 15 USER STORIES

| Mã US | Tiêu đề | Phân hệ |
| :--- | :--- | :--- |
| **[US01](./US01_QuanLyDanhMucDauSach.md)** | Quản lý Danh mục Đầu sách gốc | Phân hệ 1: Quản lý Danh mục & Bản sao |
| **[US02](./US02_QuanLyBanSaoVatLy_Barcode_RFID.md)** | Quản lý Bản sao Vật lý (Barcode/RFID) | Phân hệ 1: Quản lý Danh mục & Bản sao |
| **[US03](./US03_ThietLapHanMucVaChinhSachMuonTra.md)** | Thiết lập Hạn mức & Chính sách Mượn Trả | Phân hệ 1: Quản lý Danh mục & Bản sao |
| **[US04](./US04_LapPhieuNhapSach_BoSungTaiLieu.md)** | Lập Phiếu Nhập Sách & Bổ sung Tài liệu | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **[US05](./US05_BienMucTuDong_PhanLoaiDDC_ISBN.md)** | Biên mục Tự động & Xếp giá Kệ (DDC) | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **[US06](./US06_KiemKeKhoSach_XacDinhTrangThaiBanSao.md)** | Kiểm kê Kho Sách & Điều chỉnh Trạng thái | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **[US07](./US07_XuLySachHuHong_Mat_ThanhLy.md)** | Xử lý Sách Hư hỏng, Báo mất & Thanh lý | Phân hệ 2: Bổ sung & Kiểm kê Kho Sách |
| **[US08](./US08_LapPhieuMuonSach_KiemTraDieuKien.md)** | Lập Phiếu Mượn Sách tại Quầy | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **[US09](./US09_XuLyTraSach_TuDongTinhPhiQuaHan.md)** | Xử lý Trả Sách & Tự động Tính Phí Quá hạn | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **[US10](./US10_GiaHanSachMuon_ChinhSachDacCach.md)** | Gia hạn Sách Mượn Trực tuyến & Tại quầy | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **[US11](./US11_DatTruocSach_HangDoiUuTienReservation.md)** | Đặt trước Sách & Quản lý Hàng đợi FIFO | Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước |
| **[US12](./US12_QuetCanhBao_NhacNhoSachSapDenHanQuaHan.md)** | Quét & Cảnh báo Sách Sắp hết hạn / Quá hạn | Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản |
| **[US13](./US13_BaoCaoThongKeLuuThong_MatDoMuon.md)** | Xem Báo cáo Lưu thông & Mật độ Mượn Sách | Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản |
| **[US14](./US14_QuanLyThuPhiPhat_BaoCaoTaiChinhThuVien.md)** | Quản lý Thu Phí Phạt & Báo cáo Tài chính | Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản |
| **[US15](./US15_QuanLyTheDocGia_PhanQuyenHeThong.md)** | Quản lý Thẻ Độc giả & Phân quyền Hệ thống | Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản |
