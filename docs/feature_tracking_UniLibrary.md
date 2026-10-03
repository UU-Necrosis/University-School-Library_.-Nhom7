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

