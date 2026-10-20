"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui";
import { BookItem } from "@/types/library";
import { CATALOG_BOOKS } from "@/data/catalog";

function ReserveContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedBookId = searchParams.get("bookId");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "out_of_stock" | "available">("all");
  const [selectedBook, setSelectedBook] = useState<(BookItem & { categoryName: string }) | null>(null);
  const [campus, setCampus] = useState("Cơ sở 1 (Khuôn viên Trung tâm)");
  const [notes, setNotes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedBookId) {
      const found = CATALOG_BOOKS.find((b) => b.id === preselectedBookId);
      if (found) {
        setSelectedBook(found);
        setModalOpen(true);
      }
    }
  }, [preselectedBookId]);

  const filteredBooks = CATALOG_BOOKS.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.callNumber && b.callNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      b.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchType =
      filterType === "all"
        ? true
        : filterType === "out_of_stock"
        ? !b.available
        : Boolean(b.available);

    return matchSearch && matchType;
  });

  const handleOpenReserveModal = (book: (BookItem & { categoryName: string })) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleConfirmReservation = () => {
    if (!selectedBook) return;

    // Simulate saving reservation
    const newReservation = {
      id: `RES-2026-${Math.floor(100 + Math.random() * 900)}`,
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      author: selectedBook.author,
      callNumber: selectedBook.callNumber || "DDC 000",
      requestDate: new Date().toLocaleDateString("vi-VN"),
      status: selectedBook.available ? "Sẵn sàng nhận" : "Đang chờ",
      queuePosition: selectedBook.available ? undefined : 1,
      campus,
      pickupDeadline: selectedBook.available ? "48 giờ kể từ khi duyệt" : undefined,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("unilibrary_user_reservations") || "[]");
      localStorage.setItem(
        "unilibrary_user_reservations",
        JSON.stringify([newReservation, ...existing])
      );
    } catch {
      // ignore
    }

    setModalOpen(false);
    setSuccessToast(
      `Đã gửi yêu cầu đặt sách thành công cho cuốn "${selectedBook.title}". Bạn có thể theo dõi trong mục "Đặt trước của tôi".`
    );
    setTimeout(() => setSuccessToast(null), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
      {/* Search & Mode Filter */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high shadow-sm mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm sách muốn đặt trước theo nhan đề, tác giả..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/50 text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:bg-surface-container-lowest"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider shrink-0">
            Lọc tình trạng:
          </span>
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === "all"
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Tất cả ({CATALOG_BOOKS.length})
          </button>
          <button
            onClick={() => setFilterType("out_of_stock")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filterType === "out_of_stock"
                ? "bg-amber-600 text-white"
                : "bg-[#FEF3C7] text-[#92400E] hover:bg-amber-200"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Cần đặt trước (Đang mượn hết)
          </button>
          <button
            onClick={() => setFilterType("available")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filterType === "available"
                ? "bg-[#166534] text-white"
                : "bg-[#DCFCE7] text-[#166534] hover:bg-green-200"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Còn bản in trên kệ
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {successToast && (
        <div className="mb-space-lg p-4 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] flex items-center justify-between gap-4 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-[#16A34A]">check_circle</span>
            <p className="text-sm font-medium">{successToast}</p>
          </div>
          <Link
            href="/the-thu-vien/dat-truoc"
            className="px-3 py-1 rounded-lg bg-[#166534] text-white text-xs font-semibold hover:bg-green-800 transition-colors shrink-0"
          >
            Xem Đặt trước của tôi
          </Link>
        </div>
      )}

      {/* Book Catalog Table / Cards */}
      <div className="space-y-4">
        {filteredBooks.map((book) => {
          const isAvailable = Boolean(book.available);
          return (
            <div
              key={book.id}
              className="bg-surface-container-lowest rounded-2xl border border-surface-container-high/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-secondary bg-surface-container-low px-2 py-0.5 rounded-md border border-surface-container-high">
                    {book.categoryName}
                  </span>
                  <span className="text-xs text-on-surface-variant font-mono">{book.callNumber}</span>
                  <span className="text-on-surface-variant/40">•</span>
                  <span className="text-xs text-on-surface-variant">{book.publisher} ({book.year})</span>
                </div>

                <Link href={`/tra-cuu/${book.id}`} className="hover:text-secondary transition-colors">
                  <h3 className="font-headline-sm text-base md:text-lg text-primary font-bold">
                    {book.title}
                  </h3>
                </Link>

                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Tác giả: <strong className="text-on-surface">{book.author}</strong>
                </p>

                <div className="flex items-center gap-4 text-xs text-on-surface-variant mt-2">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-on-surface-variant">location_on</span>
                    <span>{book.location}</span>
                  </span>
                  <span>Tổng bản sao: <strong>{book.totalCopies}</strong> cuốn</span>
                </div>
              </div>

              {/* Status and Action Button */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-surface-container shrink-0">
                {isAvailable ? (
                  <div className="text-left md:text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                      Có sẵn {book.availableCopies}/{book.totalCopies} cuốn
                    </span>
                    <span className="block text-[11px] text-on-surface-variant mt-0.5">
                      Đến quầy mượn trực tiếp
                    </span>
                  </div>
                ) : (
                  <div className="text-left md:text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#991B1B] bg-[#FEE2E2] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                      Đang mượn hết (0/{book.totalCopies})
                    </span>
                    <span className="block text-[11px] text-amber-700 font-medium mt-0.5">
                      Hàng đợi FIFO khả dụng
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Link
                    href={`/tra-cuu/${book.id}`}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                  >
                    Xem vị trí kệ
                  </Link>

                  <button
                    onClick={() => handleOpenReserveModal(book)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                      !isAvailable
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-secondary hover:bg-primary text-on-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                    <span>{!isAvailable ? "Đặt trước ngay" : "Giữ chỗ trước"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Đặt trước sách */}
      {modalOpen && selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high animate-scale-in">
            <div className="flex items-start justify-between pb-3 border-b border-surface-container">
              <div>
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                  Xác nhận đặt trước tài liệu (FIFO Hold)
                </span>
                <h3 className="font-title-lg text-lg text-primary font-bold mt-0.5">
                  {selectedBook.title}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5 my-4 text-sm text-on-surface">
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <p className="text-xs text-on-surface-variant">
                  Tác giả: <strong className="text-primary">{selectedBook.author}</strong>
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Ký hiệu xếp giá: <span className="font-mono text-secondary font-semibold">{selectedBook.callNumber}</span>
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Tình trạng:{" "}
                  {selectedBook.available ? (
                    <strong className="text-[#166534]">Có sẵn {selectedBook.availableCopies} cuốn tại thư viện</strong>
                  ) : (
                    <strong className="text-[#991B1B]">Tất cả {selectedBook.totalCopies} bản in đang được mượn</strong>
                  )}
                </p>
              </div>

              {!selectedBook.available ? (
                <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>Quy tắc Hàng đợi Đặt trước (FIFO Queue):</span>
                  </div>
                  <p>• Bạn sẽ được xếp ở <strong>Vị trí hàng đợi #1</strong> cho đầu sách này.</p>
                  <p>• Ngay khi độc giả khác hoàn trả sách, hệ thống sẽ tự động gán bản sao và gửi thông báo.</p>
                  <p>• Thư viện sẽ <strong>giữ chỗ tối đa trong 48 giờ</strong> để bạn đến nhận sách.</p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] text-xs">
                  Sách hiện còn trên giá. Bạn có thể đặt giữ chỗ trước để thủ thư chuẩn bị sẵn tại quầy lưu thông.
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Địa điểm nhận tài liệu:
                </label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-container-high bg-surface-container-low font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                >
                  <option value="Cơ sở 1 (Khuôn viên Trung tâm)">
                    Cơ sở 1 (Khuôn viên Trung tâm - Quầy Lưu thông Tầng 1)
                  </option>
                  <option value="Cơ sở 2 (Khu Công nghệ Cao)">
                    Cơ sở 2 (Khu Công nghệ Cao - Quầy Dịch vụ Tầng 1)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Ghi chú cho thủ thư (tùy chọn):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ví dụ: Cần mượn phục vụ đề tài nghiên cứu..."
                  className="w-full px-3 py-2 rounded-xl border border-surface-container-high bg-surface-container-low font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-secondary text-on-primary transition-colors shadow-sm"
              >
                Xác nhận đăng ký giữ chỗ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookReservationPage() {
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
                { label: "Đặt sách & Giữ chỗ tài liệu" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                  Dịch Vụ Lưu Thông & Hàng Đợi Tự Động (FIFO Reservation)
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Tìm & Đặt Trước Sách (Hold Request)
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Chủ động đăng ký giữ chỗ sách trước khi đến thư viện hoặc xếp hàng tự động theo thứ tự ưu tiên (FIFO) khi sách chuyên ngành đã được mượn hết bản sao.
                </p>
              </div>

              <Link
                href="/the-thu-vien/dat-truoc"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-secondary font-title-sm text-title-sm border border-secondary/30 shadow-xs transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">event_seat</span>
                <span>Theo dõi Đặt trước của tôi</span>
              </Link>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="text-center py-12">Đang tải danh sách đặt sách...</div>}>
          <ReserveContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
