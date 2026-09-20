# QUY CHUẨN THIẾT KẾ & HỆ THỐNG MÀU SẮC (DESIGN SYSTEM & COLOR PALETTE)

> **Dự án**: UniLibrary - Academic Portal & Digital Library System  
> **Phong cách thiết kế**: Academic Clarity (Editorial Academic Heritage & Precise Institutional Modernism)  
> **Tài liệu tham chiếu**: `docs/stitch_unilibrary_academic_portal/academic_clarity/DESIGN.md`

---

## 1. Bảng Màu Chuẩn (Color Tokens & Palette)

Dưới đây là toàn bộ bảng màu chuẩn cố định cho giao diện UniLibrary. Toàn bộ mã màu phải được khai báo và tái sử dụng thông qua các Tailwind CSS Utility Classes hoặc CSS Variables.

| Tên Token (Tailwind Class) | Mã HEX | Vai trò & Mục đích sử dụng |
| :--- | :--- | :--- |
| **`primary`** | `#022448` | Màu Navy thương hiệu chính: Thanh điều hướng header, tiêu đề chính, nút nhấn quan trọng, khung khung cấu trúc lớn. |
| **`on-primary`** | `#ffffff` | Chữ trắng hiển thị trên nền `primary`. |
| **`primary-container`** | `#1e3a5f` | Container phụ của Navy: Nền block thông báo trạng thái, thẻ vận hành. |
| **`on-primary-container`** | `#8aa4cf` | Chữ phụ/nhãn hiển thị trên nền `primary-container`. |
| **`primary-fixed`** | `#d5e3ff` | Tông Navy nhạt cố định: Tiêu đề nổi bật trong banner tối màu. |
| **`secondary`** | `#0051d5` | Màu Xanh Lam Tương tác (Interactive Blue): Đường link, button hành động chính, viền focus, tab tìm kiếm active. |
| **`on-secondary`** | `#ffffff` | Chữ trên nền `secondary`. |
| **`secondary-container`** | `#316bf3` | Nền xanh phụ tương tác. |
| **`secondary-fixed`** | `#dbe1ff` | Nền xanh nhạt cố định cho badge/tag. |
| **`tertiary`** | `#002926` | Tông Ngọc Bích Đậm (Teal Accent): Thư mục tài liệu chọn lọc, nhãn bài báo phản biện. |
| **`tertiary-container`** | `#00413c` | Container cho các thông số ngọc bích. |
| **`on-tertiary-container`**| `#5bb1a8` | Chữ hiển thị trên `tertiary-container`. |
| **`background`** | `#f8f9ff` | Màu nền trang toàn cục (Canvas Background) giúp giảm mỏi mắt khi đọc lâu. |
| **`on-background`** | `#0b1c30` | Màu chữ chính toàn trang (Slate Đậm). |
| **`surface`** | `#f8f9ff` | Bề mặt lớp 0. |
| **`surface-container-lowest`** | `#ffffff` | Bề mặt thẻ card, modal, container màu trắng tinh nét cao. |
| **`surface-container-low`** | `#eff4ff` | Nền block phụ nhạt, ô input tra cứu. |
| **`surface-container`** | `#e5eeff` | Nền hover, container cấp trung. |
| **`surface-container-high`** | `#dce9ff` | Nền phân cách hoặc badge thông tin cấp cao. |
| **`surface-container-highest`** | `#d3e4fe` | Nền highlight đậm hơn cho các badge đặc biệt. |
| **`on-surface`** | `#0b1c30` | Màu chữ trên bề mặt Surface. |
| **`on-surface-variant`**| `#43474e` | Màu chữ phụ (Secondary text), mô tả, tác giả, năm xuất bản. |
| **`outline`** | `#74777f` | Đường viền phân cách mặc định. |
| **`outline-variant`** | `#c4c6cf` | Đường viền nhạt hơn cho thẻ card và input border. |
| **`error`** | `#ba1a1a` | Màu đỏ cảnh báo lỗi, tài liệu quá hạn. |
| **`error-container`** | `#ffdad6` | Nền nhạt cho trạng thái sách đang mượn hết / báo lỗi. |
| **`on-error-container`** | `#93000a` | Chữ đỏ cảnh báo trên nền `error-container`. |

### Trạng thái Ngữ nghĩa Trực quan (Semantic Status Palette):
- **Thành công / Sẵn sàng (`status-success`)**: Nền `#DCFCE7`, Chữ `#166534`, Viền `#BBF7D0` (Sách còn trên kệ, SSO Proxy kết nối, phòng đọc trống).
- **Cảnh báo / Sắp hạn (`status-warning`)**: Nền `#FEF3C7`, Chữ `#92400E`, Viền `#FDE68A` (Sách còn 2 ngày mượn, sắp hết chỗ).
- **Nguy cấp / Hết hàng / Quá hạn (`status-danger`)**: Nền `#FEE2E2`, Chữ `#991B1B`, Viền `#FECACA` (Quá hạn mượn, đã mượn hết).

---

## 2. Quy Chuẩn Typography & Phông Chữ

Dự án kết hợp 2 họ phông chữ chuẩn xuất bản & học thuật:
1. **Source Serif 4**: Dùng cho các tiêu đề chính (`headline-display`, `headline-lg`, `headline-md`, `headline-sm`), nhan đề sách, tạo điểm nhấn trang trọng, chuẩn mực xuất bản viện trường.
2. **Inter**: Dùng cho toàn bộ giao diện vận hành (`title-*`, `body-*`, `label-*`), thanh điều hướng, ô tìm kiếm, bảng biểu dữ liệu, thông số kĩ thuật (ISBN, DOI, Call Number).

### Thang đo Typographic Scale (Tailwind Configuration):
- **`headline-display`**: `Source Serif 4`, `48px` / LineHeight `56px`, Weight `600`, LetterSpacing `-0.02em`
- **`headline-lg`**: `Source Serif 4`, `32px` / LineHeight `40px`, Weight `600`, LetterSpacing `-0.015em`
- **`headline-md`**: `Source Serif 4`, `24px` / LineHeight `32px`, Weight `600`
- **`headline-sm`**: `Source Serif 4`, `20px` / LineHeight `28px`, Weight `600`
- **`title-lg`**: `Inter`, `18px` / LineHeight `26px`, Weight `600`
- **`title-md`**: `Inter`, `16px` / LineHeight `24px`, Weight `600`
- **`title-sm`**: `Inter`, `14px` / LineHeight `20px`, Weight `600`
- **`body-lg`**: `Inter`, `16px` / LineHeight `26px`, Weight `400`
- **`body-md`**: `Inter`, `14px` / LineHeight `22px`, Weight `400`
- **`body-sm`**: `Inter`, `12px` / LineHeight `18px`, Weight `400`
- **`label-md`**: `Inter`, `12px` / LineHeight `16px`, Weight `500`, LetterSpacing `0.02em`
- **`label-sm`**: `Inter`, `11px` / LineHeight `14px`, Weight `600`, LetterSpacing `0.04em`

---

## 3. Quy Định Khoảng Cách, Bo Góc & Đổ Bóng (Spacing, Radius & Depth)

### Bo góc (Border Radius):
- `rounded-sm`: `0.25rem` (4px) cho các badge nhỏ, nhãn DDC/ISBN.
- `rounded-DEFAULT` / `rounded-md`: `0.5rem` (8px) cho thẻ card, ô input, nút bấm button.
- `rounded-lg`: `0.75rem` (12px) cho dialog, modal, container chính.
- `rounded-xl`: `1.5rem` (24px) cho hero search box và các banner tổng quan.
- `rounded-full`: `9999px` cho status pill, chip từ khóa trending và avatar.

### Khoảng cách (Spacing Scale):
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `1.0rem` (16px)
- `space-lg`: `1.5rem` (24px)
- `space-xl`: `2.5rem` (40px)
- `gutter`: `1.5rem` (24px) trên desktop, `1.0rem` (16px) trên mobile.

### Độ sâu & Đổ bóng (Elevation & Shadow):
- **Level 0**: Base canvas `#F8FAFC`, phẳng.
- **Level 1 (Card/Container)**: Nền trắng `#FFFFFF`, viền `1px solid #E2E8F0`, shadow `0 1px 3px rgba(15,23,42,0.04)`.
- **Level 2 (Hover State)**: Nền trắng `#FFFFFF`, viền `#CBD5E1`, shadow `0 4px 6px -1px rgba(30,58,95,0.06)`.
- **Level 3 (Modal / Overlays)**: Shadow `0 10px 15px -3px rgba(30,58,95,0.08)`.

---

## 4. Nguyên Tắc Cấu Trúc Component Giao Diện

1. **Header & Navigation**:
   - Topbar màu Navy `primary` chứa hotline, giờ mở cửa, thông báo, chuyển ngữ VN/EN.
   - Main Header cao 80px (`h-20`), chứa Logo UniLibrary, Menu chính, Thẻ thư viện số và Thông tin độc giả.
2. **Unified Search Box (Thanh Tra Cứu Học Thuật)**:
   - Hệ thống tab phân vùng tìm kiếm (Tất cả, Sách in, Tạp chí Scopus, Luận văn, CSDL số).
   - Ô nhập dữ liệu tích hợp chọn trường thông tin (Mọi trường, Nhan đề, Tác giả, Chủ đề, ISBN/DOI).
   - Danh sách từ khóa phổ biến (Trending Keywords) bên dưới.
3. **Thẻ Tài Liệu & Sách (Book Card)**:
   - Ảnh bìa tỷ lệ 2:3 với badge loại tài liệu (Sách in, Open Access, Luận án Tiến sĩ).
   - Mã DDC/DOI/ISBN và Badge trạng thái tình trạng mượn (Có sẵn / Đang mượn hết / PDF Toàn văn).
   - Tiêu đề dùng `Source Serif 4`, tác giả và khoa quản lý dùng `Inter`.
4. **Bảng Trạng Thái Vận Hành Trực Tiếp (Live Occupancy Status)**:
   - Đèn xanh nhấp nháy (Real-time Ping Indicator).
   - Thanh phần trăm công suất khu tự học Tầng 1, Tầng 2-3, Cafe học tập.
   - Thống kê quy mô (1.2M+ Tài liệu, 48k+ Bạn đọc, 240+ CSDL, 99.8% Uptime).

---
*Tài liệu này là quy chuẩn cố định bắt buộc tuân thủ khi viết mã giao diện (Frontend) cho dự án.*
