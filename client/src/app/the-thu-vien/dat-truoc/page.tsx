"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { ReservationItem } from "@/types/library";

const initialReservations: ReservationItem[] = [
  {
    id: "RES-2026-008",
    bookId: "4",
    bookTitle: "Nghiên cứu Tác động của Biến đổi Khí hậu đến Đồng bằng Sông Cửu Long",
    author: "TS. Phạm Quốc Hùng",
    callNumber: "QC 903 .P43 2022",
    requestDate: "28/09/2026",
    status: "Sẵn sàng nhận",
    pickupDeadline: "05/10/2026 (20:00)",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
    barcode: "UL-TS-2022-02",
  },
  {
    id: "RES-2026-012",
    bookId: "b4",
    bookTitle: "Quy Hoạch Lưới Điện Thông Minh & Tích Hợp Năng Lượng Tái Tạo",
    author: "PGS.TS. Nguyễn Văn Thịnh",
    callNumber: "TK 1005 .C55 2023",
    requestDate: "30/09/2026",
    status: "Đang chờ",
    queuePosition: 1,
    estimatedAvailableDate: "28/10/2026",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "RES-2026-002",
    bookId: "1",
    bookTitle: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    author: "GS.TS. Nguyễn Văn An",
    callNumber: "HB 137 .N573K 2024",
    requestDate: "10/08/2026",
    status: "Đã hết hạn",
    pickupDeadline: "15/08/2026",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationItem[]>(initialReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [cancelModalItem, setCancelModalItem] = useState<ReservationItem | null>(null);
  const [pickupModalItem, setPickupModalItem] = useState<ReservationItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleConfirmCancel = () => {
    if (!cancelModalItem) return;
    setReservations((prev) =>
      prev.map((item) =>
        item.id === cancelModalItem.id ? { ...item, status: "Đã hủy" } : item
      )
    );
    setToastMessage(`Đã hủy đặt trước cho cuốn "${cancelModalItem.bookTitle}" thành công.`);
    setCancelModalItem(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmPickup = () => {
    if (!pickupModalItem) return;
    setToastMessage(`Vui lòng xuất trình Thẻ Thư viện số tại Quầy Lưu hành (${pickupModalItem.campus}) để nhận tài liệu.`);
    setPickupModalItem(null);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filteredReservations = reservations.filter((item) => {
    const matchSearch =
      item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "expired_cancelled"
        ? item.status === "Đã hết hạn" || item.status === "Đã hủy"
        : item.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const readyCount = reservations.filter((r) => r.status === "Sẵn sàng nhận").length;
  const waitingCount = reservations.filter((r) => r.status === "Đang chờ").length;
  const expiredCount = reservations.filter((r) => r.status === "Đã hết hạn" || r.status === "Đã hủy").length;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1 pb-space-xl">
        {/* Banner & Breadcrumb */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Thẻ thư viện số", href: "/the-thu-vien" },
                { label: "Sách đặt trước & Hàng đợi" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Danh Sách Sách Đặt Trước & Hàng Đợi (Reserve Queue)
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Theo dõi vị trí hàng đợi giữ chỗ khi sách đang được người khác mượn, nhận thông báo khi sách về quầy và quản lý thời hạn đến nhận tài liệu.
              </p>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-space-xs overflow-x-auto pt-space-xs border-b border-outline-variant/30">
              <Link
                href="/the-thu-vien"
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent"
              >
                Sách đang mượn & Thẻ ID
              </Link>
              <Link
                href="/the-thu-vien/lich-su"
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent"
              >
                Lịch sử mượn trả
              </Link>
              <Link
                href="/the-thu-vien/dat-truoc"
                className="px-space-md py-2 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/60 rounded-t-lg"
              >
                Sách đặt trước ({readyCount + waitingCount})
              </Link>
              <Link
                href="/the-thu-vien/phi-phat"
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
              >
                <span>Phí phạt & Khoản nợ</span>
                <span className="px-1.5 py-0.5 text-xs font-semibold bg-[#FEE2E2] text-[#DC2626] rounded-full">
                  2
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-md">
            <div className="p-space-md bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-space-xs font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[22px]">check_circle</span>
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-[#166534] hover:opacity-70">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant">Sẵn sàng nhận tại quầy</span>
                <p className="font-headline-md text-headline-md font-bold text-[#166534] mt-0.5">{readyCount}</p>
                <span className="text-[11px] text-[#16A34A] font-medium">Giữ sách trong 48h</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">inventory</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant">Đang chờ trong hàng đợi</span>
                <p className="font-headline-md text-headline-md font-bold text-secondary mt-0.5">{waitingCount}</p>
                <span className="text-[11px] text-on-surface-variant">Tự động báo khi có sách</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">event_seat</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant">Hết hạn / Đã hủy</span>
                <p className="font-headline-md text-headline-md font-bold text-on-surface-variant mt-0.5">{expiredCount}</p>
                <span className="text-[11px] text-on-surface-variant">Lịch sử đặt trước</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-low text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">history_toggle_off</span>
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar Filter */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg space-y-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm">
            <div className="relative flex-1 flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên sách, mã đặt trước (RES-...), tác giả..."
                className="w-full h-10 pl-10 pr-4 font-body-md text-body-md bg-surface-container-low rounded-lg border border-outline-variant/30 focus:outline-none focus:border-secondary"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-space-xs flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 bg-surface-container-low font-title-sm text-title-sm text-primary rounded-lg border border-outline-variant/30 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Sẵn sàng nhận">Sẵn sàng nhận tại quầy</option>
                <option value="Đang chờ">Đang chờ trong hàng đợi</option>
                <option value="expired_cancelled">Đã hết hạn / Đã hủy</option>
              </select>
            </div>
          </div>

          {/* Reservation Items List */}
          {filteredReservations.length > 0 ? (
            <div className="space-y-space-md">
              {filteredReservations.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/40 shadow-sm hover:border-secondary/60 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md"
                >
                  {/* Left: Book & Status Details */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-mono text-xs font-bold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      <Badge
                        variant={
                          item.status === "Sẵn sàng nhận"
                            ? "success"
                            : item.status === "Đang chờ"
                            ? "warning"
                            : item.status === "Đã hủy"
                            ? "danger"
                            : "neutral"
                        }
                        size="sm"
                        dot={item.status === "Sẵn sàng nhận" || item.status === "Đang chờ"}
                        pulse={item.status === "Sẵn sàng nhận"}
                      >
                        {item.status}
                        {item.status === "Đang chờ" && item.queuePosition ? ` • Hàng đợi #${item.queuePosition}` : ""}
                      </Badge>
                      <span className="text-xs text-on-surface-variant font-mono">
                        Ngày đặt: {item.requestDate}
                      </span>
                    </div>

                    <div>
                      <Link
                        href={`/tra-cuu/${item.bookId}`}
                        className="font-headline-sm text-headline-sm text-primary font-bold hover:text-secondary transition-colors line-clamp-1"
                      >
                        {item.bookTitle}
                      </Link>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                        Tác giả: <strong className="text-on-surface">{item.author}</strong> • Mã phân loại:{" "}
                        <span className="font-mono text-xs text-primary font-semibold">{item.callNumber}</span>
                      </p>
                    </div>

                    {/* Operational Details by Status */}
                    <div className="p-space-sm bg-surface-container-low/70 rounded-lg text-body-sm text-body-sm space-y-1">
                      {item.status === "Sẵn sàng nhận" && (
                        <>
                          <p className="text-[#166534] font-semibold flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            Sách đã về quầy! Hạn chót đến lấy: <strong>{item.pickupDeadline}</strong>
                          </p>
                          <p className="text-on-surface-variant text-xs">
                            Địa điểm nhận: <strong>{item.campus}</strong> (Mã bản sao: <span className="font-mono">{item.barcode}</span>)
                          </p>
                        </>
                      )}

                      {item.status === "Đang chờ" && (
                        <>
                          <p className="text-[#92400E] font-medium flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            Bạn đang ở vị trí <strong>#{item.queuePosition}</strong> trong hàng đợi. Dự kiến có sách: <strong>{item.estimatedAvailableDate}</strong>
                          </p>
                          <p className="text-on-surface-variant text-xs">
                            Cơ sở đăng ký nhận: <strong>{item.campus}</strong>
                          </p>
                        </>
                      )}

                      {item.status === "Đã hết hạn" && (
                        <p className="text-on-surface-variant text-xs flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">info</span>
                          Đã quá 48 giờ kể từ ngày sách về quầy mà chưa đến nhận ({item.pickupDeadline}). Suất mượn đã chuyển cho độc giả tiếp theo.
                        </p>
                      )}

                      {item.status === "Đã hủy" && (
                        <p className="text-[#991B1B] text-xs flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">cancel</span>
                          Yêu cầu đặt trước đã được hủy bởi độc giả.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-end gap-space-xs shrink-0 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-outline-variant/20">
                    {item.status === "Sẵn sàng nhận" && (
                      <Button
                        variant="secondary"
                        size="md"
                        icon="check_circle"
                        onClick={() => setPickupModalItem(item)}
                      >
                        Hướng dẫn nhận sách
                      </Button>
                    )}

                    {item.status === "Đang chờ" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#DC2626] border-red-200 hover:bg-red-50"
                        icon="cancel"
                        onClick={() => setCancelModalItem(item)}
                      >
                        Hủy đặt trước
                      </Button>
                    )}

                    <Link href={`/tra-cuu/${item.bookId}`}>
                      <Button variant="ghost" size="sm" icon="visibility">
                        Xem chi tiết sách
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl border border-outline-variant/40 shadow-sm text-center space-y-space-md">
              <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[32px]">event_seat</span>
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="font-title-lg text-title-lg text-primary font-bold">
                  Không tìm thấy sách đặt trước
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Hiện bạn không có yêu cầu giữ chỗ nào phù hợp với bộ lọc. Hãy tra cứu kho sách để đặt mượn các tài liệu bạn cần.
                </p>
              </div>
              <Link href="/tra-cuu">
                <Button variant="secondary" size="md" icon="search">
                  Tra cứu tài liệu OPAC ngay
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Modal: Xác nhận hủy đặt trước */}
        {cancelModalItem && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-outline-variant/40">
              <button
                onClick={() => setCancelModalItem(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="flex items-center gap-space-xs text-[#DC2626]">
                <span className="material-symbols-outlined text-[24px]">cancel</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                  Hủy Đăng Ký Đặt Trước
                </h3>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-xl text-body-sm text-body-sm space-y-1">
                <p>
                  Tên tài liệu: <strong className="text-primary">{cancelModalItem.bookTitle}</strong>
                </p>
                <p>
                  Mã phiếu đặt: <span className="font-mono font-bold">{cancelModalItem.id}</span>
                </p>
              </div>

              <p className="text-xs text-on-surface-variant">
                Bạn có chắc chắn muốn hủy đặt trước cuốn sách này? Vị trí hàng đợi số <strong>#{cancelModalItem.queuePosition || 1}</strong> của bạn sẽ được chuyển nhượng cho bạn đọc kế tiếp.
              </p>

              <div className="pt-2 flex justify-end gap-space-xs">
                <Button variant="outline" size="md" onClick={() => setCancelModalItem(null)}>
                  Giữ lại
                </Button>
                <Button variant="danger" size="md" onClick={handleConfirmCancel}>
                  Xác nhận hủy
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Hướng dẫn nhận sách tại quầy */}
        {pickupModalItem && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-outline-variant/40">
              <button
                onClick={() => setPickupModalItem(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="flex items-center gap-space-xs text-[#166534]">
                <span className="material-symbols-outlined text-[24px]">verified</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                  Hướng Dẫn Nhận Sách Tại Quầy
                </h3>
              </div>

              <div className="p-space-md bg-[#DCFCE7]/60 rounded-xl text-body-sm text-body-sm space-y-1.5 border border-[#BBF7D0]">
                <p className="font-bold text-[#166534]">
                  Tài liệu: {pickupModalItem.bookTitle}
                </p>
                <p className="text-xs text-[#166534]">
                  Mã bản sao giữ chỗ: <span className="font-mono font-bold">{pickupModalItem.barcode}</span>
                </p>
                <p className="text-xs text-[#166534]">
                  Hạn chót đến quầy nhận: <strong>{pickupModalItem.pickupDeadline}</strong>
                </p>
              </div>

              <div className="space-y-2 text-xs text-on-surface-variant">
                <p className="font-semibold text-on-surface">Các bước nhận sách:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Đến <strong>Quầy Lưu hành & Mượn trả ({pickupModalItem.campus})</strong> trong giờ phục vụ.</li>
                  <li>Mở ứng dụng UniLibrary hoặc xuất trình <strong>Thẻ Thư viện Số RFID / Barcode</strong>.</li>
                  <li>Cung cấp mã phiếu <strong>{pickupModalItem.id}</strong> cho thủ thư phụ trách để hoàn tất thủ tục mượn.</li>
                </ol>
              </div>

              <div className="pt-2 flex justify-end gap-space-xs">
                <Button variant="secondary" size="md" onClick={handleConfirmPickup}>
                  Đã hiểu, đóng hướng dẫn
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
