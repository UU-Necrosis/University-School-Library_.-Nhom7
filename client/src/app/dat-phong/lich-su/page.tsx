"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { BookingHistoryItem } from "@/types/library";

const initialBookingHistory: BookingHistoryItem[] = [
  {
    id: "BK-2026-0928",
    roomId: "r101",
    roomName: "Phòng Thảo luận Nhóm R-101",
    location: "Tầng 1 • Khu A",
    bookingDate: "04/10/2026",
    timeSlot: "14:00 - 16:00 (Ca Chiều 1)",
    attendeesCount: "6 Người",
    purpose: "Thảo luận Đồ án Tốt nghiệp K31 - Khoa CNTT",
    createdAt: "01/10/2026 09:30",
    status: "Sắp tới",
    equipmentList: ["Màn hình TV 65 inch", "Bảng kính tương tác", "Ổ cắm điện đa năng", "Điều hòa 24°C"],
    checkInCode: "CHECKIN-9921",
  },
  {
    id: "BK-2026-0815",
    roomId: "cabin05",
    roomName: "Cabin Học cá nhân Quiet-Pod #05",
    location: "Tầng 2 • Khu Tự học",
    bookingDate: "28/09/2026",
    timeSlot: "08:00 - 10:00 (Ca Sáng 1)",
    attendeesCount: "1 Người",
    purpose: "Nghiên cứu tài liệu Scopus & viết luận văn",
    createdAt: "26/09/2026 15:10",
    status: "Đã hoàn thành",
    equipmentList: ["Bàn học chống mỏi", "Đèn học 3 cấp độ", "Cách âm 95%", "Cổng sạc USB-C"],
    checkInCode: "CHECKIN-7742",
  },
  {
    id: "BK-2026-0790",
    roomId: "r308",
    roomName: "Phòng Hội thảo & Seminar R-308",
    location: "Tầng 3 • Khu C",
    bookingDate: "15/09/2026",
    timeSlot: "13:30 - 15:30 (Ca Chiều 1)",
    attendeesCount: "20 Người",
    purpose: "Workshop Kỹ năng Trích dẫn Khoa học & Sử dụng Zotero",
    createdAt: "10/09/2026 11:00",
    status: "Đã hoàn thành",
    equipmentList: ["Hệ thống âm thanh đa kênh", "2 Màn hình TV 75 inch", "Micro không dây", "Bàn ghế di động"],
    checkInCode: "CHECKIN-5510",
  },
  {
    id: "BK-2026-0650",
    roomId: "r204",
    roomName: "Phòng Nghiên cứu Chuyên sâu R-204",
    location: "Tầng 2 • Khu B (Yên tĩnh)",
    bookingDate: "02/09/2026",
    timeSlot: "10:00 - 12:00 (Ca Sáng 2)",
    attendeesCount: "4 Người",
    purpose: "Họp nhóm môn Phương pháp Nghiên cứu Khoa học",
    createdAt: "01/09/2026 08:20",
    status: "Đã hủy",
    equipmentList: ["Máy chiếu HD", "Loa trợ giảng", "Bảng từ", "Wifi 6 Tốc độ cao"],
    checkInCode: "CHECKIN-3390",
  },
];

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<BookingHistoryItem[]>(initialBookingHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [selectedCheckIn, setSelectedCheckIn] = useState<BookingHistoryItem | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<BookingHistoryItem | null>(null);
  const [cancelModalItem, setCancelModalItem] = useState<BookingHistoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Statistics
  const upcomingCount = bookings.filter((b) => b.status === "Sắp tới").length;
  const completedCount = bookings.filter((b) => b.status === "Đã hoàn thành").length;
  const cancelledCount = bookings.filter((b) => b.status === "Đã hủy").length;

  // Filtered List
  const filteredBookings = bookings.filter((item) => {
    const matchSearch =
      item.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.purpose && item.purpose.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Handle Cancel Booking Mock
  const handleConfirmCancel = () => {
    if (!cancelModalItem) return;

    setBookings((prev) =>
      prev.map((item) =>
        item.id === cancelModalItem.id ? { ...item, status: "Đã hủy" } : item
      )
    );
    setToastMessage(`Đã hủy lịch đặt phòng "${cancelModalItem.roomName}" (${cancelModalItem.id}) thành công.`);
    setCancelModalItem(null);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1 pb-space-xl">
        {/* Banner Section */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Đặt phòng & Tiện ích", href: "/dat-phong" },
                { label: "Lịch sử đặt phòng" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Nhật Ký & Lịch Sử Đặt Không Gian Học Tập
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Theo dõi các phiên đặt trước phòng thảo luận nhóm, cabin nghiên cứu cá nhân, tra cứu mã check-in QR và quản lý lịch sử sử dụng tiện ích thư viện.
              </p>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-space-xs overflow-x-auto pt-space-xs border-b border-outline-variant/30">
              <Link
                href="/dat-phong"
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent"
              >
                Không gian & Tiện ích khả dụng
              </Link>
              <Link
                href="/dat-phong/lich-su"
                className="px-space-md py-2 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/60 rounded-t-lg flex items-center gap-1.5"
              >
                <span>Lịch sử đặt phòng</span>
                <span className="px-1.5 py-0.5 text-xs font-semibold bg-secondary/10 text-secondary rounded-full">
                  {bookings.length}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-md">
            <div className="p-space-md bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-space-xs font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[22px]">check_circle</span>
                <span>{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-[#166534] hover:opacity-70 p-1"
                aria-label="Đóng thông báo"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
            {/* Stat 1: Upcoming */}
            <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-outline-variant/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block">Lịch sắp tới</span>
                <span className="font-headline-md text-headline-md font-bold text-[#16A34A]">{upcomingCount}</span>
                <span className="text-xs text-on-surface-variant block mt-0.5">Cần check-in đúng giờ</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">event_upcoming</span>
              </div>
            </div>

            {/* Stat 2: Completed */}
            <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-outline-variant/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block">Đã hoàn thành</span>
                <span className="font-headline-md text-headline-md font-bold text-primary">{completedCount}</span>
                <span className="text-xs text-on-surface-variant block mt-0.5">Phiên sử dụng hợp lệ</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">task_alt</span>
              </div>
            </div>

            {/* Stat 3: Cancelled */}
            <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-outline-variant/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block">Đã hủy bỏ</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface-variant">{cancelledCount}</span>
                <span className="text-xs text-on-surface-variant block mt-0.5">Hủy trước giờ sử dụng</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">cancel</span>
              </div>
            </div>

            {/* Stat 4: Quick Action */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white p-space-md rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs text-blue-100 uppercase tracking-wider font-semibold">Cần phòng mới?</span>
                <p className="text-xs text-blue-100/90 mt-0.5 leading-tight">Đặt nhanh không gian tự học hoặc hội thảo</p>
              </div>
              <Link
                href="/dat-phong"
                className="inline-flex items-center justify-center gap-1 mt-2 py-1.5 px-3 bg-white text-primary text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Đặt phòng ngay</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-xs flex-1">
              {/* Search */}
              <div className="relative min-w-[260px] flex-1 max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Tìm theo tên phòng, mã đặt, vị trí..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 text-on-surface font-medium"
              >
                <option value="all">Tất cả trạng thái ({bookings.length})</option>
                <option value="Sắp tới">Sắp tới ({upcomingCount})</option>
                <option value="Đã hoàn thành">Đã hoàn thành ({completedCount})</option>
                <option value="Đã hủy">Đã hủy ({cancelledCount})</option>
              </select>
            </div>

            {(searchTerm || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="text-xs text-secondary font-medium hover:underline self-start md:self-auto"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </section>

        {/* Booking History List */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-md">
          {filteredBookings.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-space-2xl text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-space-md">
                <span className="material-symbols-outlined text-[32px]">event_busy</span>
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold">
                Không tìm thấy lịch đặt phòng nào
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mt-1">
                Không có phiên đặt phòng nào phù hợp với bộ lọc tìm kiếm hiện tại của bạn.
              </p>
              <div className="mt-space-lg flex gap-2">
                {(searchTerm || statusFilter !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                )}
                <Link href="/dat-phong">
                  <Button variant="primary" size="sm">
                    Khám phá không gian học
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-space-md">
              {filteredBookings.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-space-md sm:p-space-lg hover:border-secondary/60 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"
                >
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-md">
                        {item.id}
                      </span>
                      <Badge
                        variant={
                          item.status === "Sắp tới"
                            ? "success"
                            : item.status === "Đã hoàn thành"
                            ? "primary"
                            : "neutral"
                        }
                        size="sm"
                        dot={item.status === "Sắp tới"}
                      >
                        {item.status}
                      </Badge>
                      <span className="text-xs text-on-surface-variant">
                        Tạo lúc: <span className="text-on-surface">{item.createdAt}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="font-title-lg text-title-lg text-primary font-bold">
                        {item.roomName}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>Sức chứa: {item.attendeesCount}</span>
                      </p>
                    </div>

                    {item.purpose && (
                      <div className="p-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                        <strong className="text-on-surface font-semibold">Mục đích sử dụng:</strong> {item.purpose}
                      </div>
                    )}
                  </div>

                  {/* Right: Date, Time & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-outline-variant/20 shrink-0">
                    <div className="text-left lg:text-right space-y-0.5">
                      <div className="flex items-center lg:justify-end gap-1.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>
                        <span className="font-bold text-primary">{item.bookingDate}</span>
                      </div>
                      <div className="flex items-center lg:justify-end gap-1.5 text-xs font-semibold text-secondary">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span>{item.timeSlot}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {item.status === "Sắp tới" && (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedCheckIn(item)}
                            className="bg-[#16A34A] hover:bg-[#15803D] text-white text-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                            <span>Mã Check-in</span>
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCancelModalItem(item)}
                            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <span>Hủy lịch</span>
                          </Button>
                        </>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDetail(item)}
                        className="text-xs"
                      >
                        <span>Chi tiết</span>
                      </Button>

                      {item.status !== "Sắp tới" && (
                        <Link href="/dat-phong">
                          <Button variant="secondary" size="sm" className="text-xs">
                            <span className="material-symbols-outlined text-[16px]">refresh</span>
                            <span>Đặt lại</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Room Booking Guidelines Box */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-xl">
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/40 p-space-lg">
            <h3 className="font-title-md text-title-md text-primary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">info</span>
              <span>Quy Định & Hướng Dẫn Sử Dụng Không Gian Học Tập</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-md text-xs text-on-surface-variant leading-relaxed">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-1">
                <strong className="text-on-surface font-semibold block flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[16px]">how_to_reg</span>
                  1. Check-in đúng giờ
                </strong>
                <p>Vui lòng xuất trình mã QR Check-in hoặc thẻ sinh viên tại cửa phòng trước 15 phút để kích hoạt hệ thống điện và thiết bị phòng.</p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-1">
                <strong className="text-on-surface font-semibold block flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#D97706] text-[16px]">alarm</span>
                  2. Tự động hủy nếu trễ
                </strong>
                <p>Sau 15 phút kể từ thời gian bắt đầu ca nếu không thực hiện check-in, phiên đặt sẽ tự động giải phóng để nhường chỗ cho độc giả khác.</p>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-1">
                <strong className="text-on-surface font-semibold block flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#16A34A] text-[16px]">clean_hands</span>
                  3. Giữ gìn vệ sinh & tài sản
                </strong>
                <p>Bảo quản màn hình tương tác, cáp kết nối và sắp xếp lại bàn ghế ngăn nắp sau khi kết thúc buổi thảo luận nhóm.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* MODAL: Mã Check-in QR */}
      {selectedCheckIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-sm w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-6 space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#16A34A]">qr_code_2</span>
                <span>Mã Check-in Phòng</span>
              </h3>
              <button
                onClick={() => setSelectedCheckIn(null)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="w-40 h-40 mx-auto bg-white p-2 rounded-2xl border border-outline-variant/60 shadow-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-[100px] text-primary">qr_code_scanner</span>
              </div>

              <div>
                <span className="font-mono text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-lg">
                  {selectedCheckIn.checkInCode || selectedCheckIn.id}
                </span>
                <h4 className="font-title-md text-title-md text-primary font-bold mt-2">
                  {selectedCheckIn.roomName}
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {selectedCheckIn.bookingDate} • {selectedCheckIn.timeSlot}
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant text-left leading-relaxed">
                Quét mã này tại đầu đọc cảm ứng trước cửa phòng để mở khóa cửa thông minh.
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/30">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => setSelectedCheckIn(null)}
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Chi Tiết Đặt Phòng */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">info</span>
                <span>Chi Tiết Phiên Đặt Phòng</span>
              </h3>
              <button
                onClick={() => setSelectedDetail(null)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Mã đặt phòng:</span>
                <span className="font-mono font-bold text-primary">{selectedDetail.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Không gian:</span>
                <span className="font-bold text-primary text-right">{selectedDetail.roomName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Vị trí:</span>
                <span className="text-on-surface">{selectedDetail.location}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Ngày sử dụng:</span>
                <span className="font-bold text-primary">{selectedDetail.bookingDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Khung giờ:</span>
                <span className="font-semibold text-secondary">{selectedDetail.timeSlot}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Quy mô nhóm:</span>
                <span className="text-on-surface">{selectedDetail.attendeesCount}</span>
              </div>
              {selectedDetail.purpose && (
                <div className="py-1.5 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant block mb-0.5">Nội dung học tập:</span>
                  <span className="text-on-surface font-medium">{selectedDetail.purpose}</span>
                </div>
              )}
              {selectedDetail.equipmentList && (
                <div className="py-1.5">
                  <span className="text-on-surface-variant block mb-1">Trang thiết bị kèm theo:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedDetail.equipmentList.map((eq) => (
                      <span key={eq} className="px-2 py-0.5 bg-surface-container-low rounded border border-outline-variant/30 text-[11px]">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-outline-variant/30">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedDetail(null)}
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Xác nhận Hủy Đặt Phòng */}
      {cancelModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-primary font-bold">
                  Hủy Phiên Đặt Phòng
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Bạn có chắc chắn muốn giải phóng lịch đặt phòng này?
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-50/60 border border-red-200/60 rounded-xl text-xs space-y-1 text-red-900">
              <p>• <strong>Phòng:</strong> {cancelModalItem.roomName}</p>
              <p>• <strong>Thời gian:</strong> {cancelModalItem.bookingDate} ({cancelModalItem.timeSlot})</p>
              <p className="pt-1 text-[11px] text-red-700 italic">
                Sau khi hủy, khung giờ này sẽ được mở lại cho các nhóm độc giả khác đặt trước.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCancelModalItem(null)}
              >
                Giữ lại
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmCancel}
              >
                Xác nhận hủy đặt phòng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
