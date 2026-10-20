# BẢNG THEO DÕI TIẾN ĐỘ TÍNH NĂNG (FEATURE TRACKING)
## HỆ THỐNG QUẢN LÝ THƯ VIỆN SỐ & HỌC LIỆU ĐẠI HỌC (UNILIBRARY)

---

## 1. TỔNG QUAN TIẾN ĐỘ THEO PHÂN HỆ

| Phân hệ | Số lượng User Stories | Hoàn thành UI/UX | Sẵn sàng API Backend | Trạng thái tích hợp |
| :--- | :---: | :---: | :---: | :---: |
| **Phân hệ 1: Quản lý Danh mục & Bản sao** | 3 | 100% | 100% | Đã kết nối |
| **Phân hệ 2: Bổ sung & Kiểm kê Kho Sách** | 4 | 100% | 100% | Đã kết nối |
| **Phân hệ 3: Lưu thông Mượn/Trả & Đặt trước** | 4 | 100% | 100% | Đã kết nối |
| **Phân hệ 4: Cảnh báo, Báo cáo & Tài khoản** | 4 | 100% | 100% | Đã kết nối |
| **TỔNG CỘNG** | **15 User Stories** | **100%** | **100%** | **Hoạt động đồng bộ** |

---

## 2. BẢNG CHI TIẾT 15 USER STORIES

| Mã US | Tên User Story | Độ ưu tiên | File Đặc tả | Trạng thái |
| :--- | :--- | :---: | :--- | :---: |
| **US01** | Quản lý Danh mục Đầu sách gốc | Must-Have | `US01_QuanLyDanhMucDauSach.md` | Hoàn thành |
| **US02** | Quản lý Bản sao Vật lý (Barcode/RFID) | Must-Have | `US02_QuanLyBanSaoVatLy_Barcode_RFID.md` | Hoàn thành |
| **US03** | Thiết lập Hạn mức & Chính sách Mượn Trả | High | `US03_ThietLapHanMucVaChinhSachMuonTra.md` | Hoàn thành |
| **US04** | Lập Phiếu Nhập Sách & Bổ sung Tài liệu | High | `US04_LapPhieuNhapSach_BoSungTaiLieu.md` | Hoàn thành |
| **US05** | Biên mục Tự động & Xếp giá Kệ (DDC) | Medium | `US05_BienMucTuDong_PhanLoaiDDC_ISBN.md` | Hoàn thành |
| **US06** | Kiểm kê Kho Sách & Điều chỉnh Trạng thái | Medium | `US06_KiemKeKhoSach_XacDinhTrangThaiBanSao.md` | Hoàn thành |
| **US07** | Xử lý Sách Hư hỏng, Báo mất & Thanh lý | Medium | `US07_XuLySachHuHong_Mat_ThanhLy.md` | Hoàn thành |
| **US08** | Lập Phiếu Mượn Sách tại Quầy | Must-Have | `US08_LapPhieuMuonSach_KiemTraDieuKien.md` | Hoàn thành |
| **US09** | Xử lý Trả Sách & Tự động Tính Phí Quá hạn | Must-Have | `US09_XuLyTraSach_TuDongTinhPhiQuaHan.md` | Hoàn thành |
| **US10** | Gia hạn Sách Mượn Trực tuyến & Tại quầy | High | `US10_GiaHanSachMuon_ChinhSachDacCach.md` | Hoàn thành |
| **US11** | Đặt trước Sách & Quản lý Hàng đợi FIFO | High | `US11_DatTruocSach_HangDoiUuTienReservation.md` | Hoàn thành |
| **US12** | Quét & Cảnh báo Sách Sắp hết hạn / Quá hạn | High | `US12_QuetCanhBao_NhacNhoSachSapDenHanQuaHan.md` | Hoàn thành |
| **US13** | Xem Báo cáo Lưu thông & Mật độ Mượn Sách | Medium | `US13_BaoCaoThongKeLuuThong_MatDoMuon.md` | Hoàn thành |
| **US14** | Quản lý Thu Phí Phạt & Báo cáo Tài chính | Medium | `US14_QuanLyThuPhiPhat_BaoCaoTaiChinhThuVien.md` | Hoàn thành |
| **US15** | Quản lý Thẻ Độc giả & Phân quyền Hệ thống | Must-Have | `US15_QuanLyTheDocGia_PhanQuyenHeThong.md` | Hoàn thành |

---

# Timeline

### 2026-10-03

- Đã xác định source backend được lấy từ project khác sẽ được sử dụng làm nguồn tham khảo.
- Đã thống nhất phương án: phân tích source → đối chiếu docs và web hiện tại → chuyển đổi/refactor → tạo implementation/file mới phù hợp với project hiện tại.
- Không bê nguyên backend source vào project.
- Không phá UI và cấu trúc folder hiện tại.
- Bước tiếp theo: audit source backend, database và API trước khi bắt đầu tích hợp.

### 2026-10-17: Hoàn thiện đồng bộ Auth, MSSV và dọn dẹp Homepage (P0, P1, P2)

- **P0 — Đăng ký MSSV & Đồng bộ Backend:**
  - Đồng bộ trường `code` thành Mã sinh viên / học viên / mã độc giả (`MSSV`). Lưu trữ dạng chuỗi (`text`) trong Postgres để giữ trọn vẹn số `0` ở đầu (vd: `0987654321`).
  - Xử lý race condition và bắt lỗi `P2002` (Unique Constraint) trong `AuthService`, trả về mã lỗi `409 Conflict` kèm định danh trường cụ thể (`field: 'code'` hoặc `field: 'email'`).
  - Cập nhật `HttpExceptionFilter` trả về `field` và `errors` dạng cấu trúc, form đăng ký hiển thị thông báo lỗi cụ thể dưới từng ô nhập liệu và giữ nguyên dữ liệu đã nhập.
  - Mật khẩu băm an toàn qua bcrypt (10 rounds); loại bỏ triệt để mật khẩu và hash khỏi mọi response của API (`auth/register`, `auth/login`, `auth/me`).
  - Đăng ký công khai chỉ cấp mặc định quyền `Role.STUDENT`, chặn client tự leo quyền.
- **P0 — Khắc phục trạng thái khách hiển thị "Lê Hoàng Nam":**
  - Xây dựng `AuthContext` và `AuthProvider` quản lý 3 trạng thái phiên chuẩn: `loading`, `unauthenticated`, `authenticated`.
  - Loại bỏ hoàn toàn fallback dữ liệu mẫu "Lê Hoàng Nam", "UL-202488" và dữ liệu mượn sách giả trên toàn bộ Header, Homepage và các trang phân hệ độc giả.
  - Tạo `PatronGuard` bảo vệ các trang `/the-thu-vien/*`. Khách chưa đăng nhập nhận banner hướng dẫn đăng nhập thân thiện và chuyển hướng về trang đích chính xác (`/login?redirect=...`).
  - Xóa cache và dữ liệu tạm khi đăng xuất (`unilibrary_user_reservations`, `unilibrary_saved_books`, tokens) để tránh lẫn lộn dữ liệu giữa các phiên đăng nhập.
- **P1 — Đồng bộ sách & Dọn dẹp nội dung tĩnh:**
  - Thống nhất toàn bộ sách trang chủ với `CATALOG_BOOKS` (dùng chung ID, ảnh bìa, danh mục, tác giả và trạng thái còn/hết bản sao).
  - Kết nối hệ thống bookmark giữa trang chủ, danh mục, chi tiết và tủ sách cá nhân (`/the-thu-vien/da-luu`).
  - Xóa bỏ mục "Lớp Tập Huấn Kỹ Năng Thông Tin & Sự Kiện", các thẻ workshop và component `EventsWorkshopsSection.tsx`.
  - Thay thế số liệu phóng đại (1.2M+ sách, 240+ CSDL quốc tế, SSO Proxy) bằng thông tin phục vụ học liệu thực tế của thư viện đại học.
  - Menu Drawer trái chuẩn hóa đúng 5 mục: Danh mục sách (xổ thể loại), Tác giả, Đặt sách, Hướng dẫn, Quy định.
- **P2 — Kiểm thử & Tối ưu hóa:**
  - Cả hai dự án Backend (NestJS) và Frontend (Next.js) biên dịch thành công không còn lỗi TypeScript (`npx tsc --noEmit`).
  - Đã chạy kiểm thử tự động API và xác nhận giao diện qua browser subagent.

