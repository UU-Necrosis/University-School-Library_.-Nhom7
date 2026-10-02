export interface Account {
  name: string;
  code: string;
  email: string;
  password: string;
}

export interface PatronInfo {
  name: string;
  code: string;
  role: string;
  department: string;
  ssoConnected: boolean;
  activeLoans: number;
  maxLoans: number;
}

export type SearchScope = "all" | "books" | "journals" | "theses" | "databases";

export interface BookCopyItem {
  barcode: string;
  campus: string;
  location: string;
  callNumber: string;
  status: "Có sẵn" | "Đang mượn" | "Đã đặt trước" | "Bảo quản";
  dueDate?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  year: number;
  publisher?: string;
  callNumber?: string;
  isbn?: string;
  identifier?: string; // DDC, DOI, or ISBN
  type?: "Sách in" | "Open Access" | "Luận án Tiến sĩ" | "Tạp chí Scopus" | "Ebook PDF" | "Luận án TS";
  format?: "Sách in" | "Ebook PDF" | "Luận án TS" | "Open Access" | "Tạp chí Scopus";
  available?: boolean;
  totalCopies?: number;
  availableCopies?: number;
  location?: string;
  status?: "available" | "open_access" | "print_digital" | "borrowed_out";
  statusText?: string;
  department?: string;
  coverImage?: string;
  description?: string;
  language?: string;
  pageCount?: number;
  ddcCode?: string;
  tableOfContents?: string[];
  copies?: BookCopyItem[];
}

export interface LoanItem {
  id: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  status: "Đang mượn" | "Sắp đến hạn" | "Quá hạn";
  renewCount: number;
}

export interface LoanHistoryItem {
  id: string;
  bookTitle: string;
  bookId?: string;
  barcode: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string;
  status: "Đúng hạn" | "Trễ hạn" | "Đang xử lý";
  fineAmount?: number;
  fineStatus?: "Không có" | "Đã nộp" | "Chưa nộp";
  renewCount: number;
  campus: string;
}

export interface ReservationItem {
  id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  callNumber: string;
  requestDate: string;
  status: "Sẵn sàng nhận" | "Đang chờ" | "Đã hết hạn" | "Đã hủy";
  queuePosition?: number;
  estimatedAvailableDate?: string;
  pickupDeadline?: string;
  campus: string;
  barcode?: string;
}

export interface FineItem {
  id: string;
  bookTitle: string;
  bookId?: string;
  loanId?: string;
  barcode?: string;
  reason: "Trả tài liệu trễ hạn" | "Hư hỏng tài liệu" | "Làm mất tài liệu" | "Phí dịch vụ khác";
  issueDate: string;
  dueDate?: string;
  returnDate?: string;
  overdueDays?: number;
  amount: number;
  status: "Chưa thanh toán" | "Đang xử lý" | "Đã thanh toán";
  calculationDetail?: string;
  campus?: string;
}

export interface PaymentItem {
  id: string;
  fineId?: string;
  fineReason: string;
  bookTitle?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: "Cổng VNPAY" | "Chuyển khoản QR" | "Quầy Lưu hành" | "UniPay Thẻ SV";
  status: "Thành công" | "Đang xử lý" | "Thất bại";
  receiptCode?: string;
}

export interface RoomItem {
  id: string;
  name: string;
  floor: string;
  capacity: string;
  equipment: string[];
  status: "Trống" | "Đang sử dụng" | "Đã đặt trước";
  nextAvailable: string;
  imageIcon: string;
}

export interface BookingHistoryItem {
  id: string;
  roomId: string;
  roomName: string;
  location: string;
  bookingDate: string;
  timeSlot: string;
  attendeesCount: string;
  purpose?: string;
  createdAt: string;
  status: "Sắp tới" | "Đang sử dụng" | "Đã hoàn thành" | "Đã hủy";
  equipmentList?: string[];
  checkInCode?: string;
}

export interface DatabaseItem {
  id: string;
  name: string;
  publisher: string;
  category: string;
  description: string;
  accessType: "SSO Direct" | "Proxy IP ĐHQG" | "Tài khoản Cán bộ";
  journalsCount: string;
  coverage: string;
}

export interface ResearchService {
  id: string;
  title: string;
  target: string;
  description: string;
  features: string[];
  icon: string;
}

export interface RuleSection {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string[];
}

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
  detail: string;
  detailStatus: string;
  detailStatusColor: string;
  actionText: string;
  href?: string;
}

export interface DatabaseBadgeItem {
  id: string;
  name: string;
  provider: string;
  badgeType: string;
  url: string;
}

export interface EventItem {
  id: string;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  description: string;
  location: string;
  tags: string[];
  spotsLeft: string;
  actionText: string;
}
