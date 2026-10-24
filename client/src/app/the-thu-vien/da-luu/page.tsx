"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui";
import { CATALOG_BOOKS, getSavedBookIds, toggleSavedBook } from "@/data/catalog";
import { PatronGuard } from "@/components/layout/PatronGuard";

export default function SavedBooksPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadSaved = () => {
    setSavedIds(getSavedBookIds());
  };

  useEffect(() => {
    loadSaved();
    const handleSavedChange = () => loadSaved();
    window.addEventListener("unilibrary_saved_changed", handleSavedChange);
    return () => window.removeEventListener("unilibrary_saved_changed", handleSavedChange);
  }, []);

  const handleRemove = (id: string, title: string) => {
    toggleSavedBook(id);
    loadSaved();
    setToastMessage(`Đã xóa cuốn "${title}" khỏi danh sách sách đã lưu.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const savedBooks = CATALOG_BOOKS.filter((b) => savedIds.includes(b.id));

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1 pb-space-xl">
        <PatronGuard pageTitle="Sách Đã Lưu">
        {/* Banner Section */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Thẻ thư viện & Độc giả", href: "/the-thu-vien" },
                { label: "Sách đã lưu cá nhân" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                  Tủ Sách Cá Nhân & Tài Liệu Đánh Dấu
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Danh Sách Sách Đã Lưu
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Quản lý các đầu sách và công trình nghiên cứu bạn đã đánh dấu để tiện theo dõi, chuẩn bị mượn hoặc đăng ký đặt trước.
                </p>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-space-xs overflow-x-auto pt-space-xs border-b border-outline-variant/30">
                <Link
                  href="/the-thu-vien"
                  className="px-space-md py-2.5 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                  <span>Sách đang mượn & Thẻ ID</span>
                </Link>
                <Link
                  href="/the-thu-vien/dat-truoc"
                  className="px-space-md py-2.5 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">event_seat</span>
                  <span>Đặt trước của tôi</span>
                </Link>
                <Link
                  href="/the-thu-vien/da-luu"
                  className="px-space-md py-2.5 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/80 rounded-t-xl flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark</span>
                  <span>Sách đã lưu ({savedBooks.length})</span>
                </Link>
                <Link
                  href="/the-thu-vien/lich-su"
                  className="px-space-md py-2.5 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  <span>Lịch sử mượn trả</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          {toastMessage && (
            <div className="mb-4 p-3 rounded-xl bg-surface-container-lowest border border-surface-container-high text-sm text-primary shadow-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {savedBooks.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-dashed border-surface-container-high">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2">
                bookmark_border
              </span>
              <h3 className="font-title-md text-title-md text-primary font-bold">Chưa có sách nào được lưu</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Bấm vào biểu tượng bookmark trên các thẻ sách để lưu vào tủ sách cá nhân.
              </p>
              <Link
                href="/danh-muc"
                className="inline-block mt-4 px-4 py-2 rounded-xl bg-secondary text-on-secondary font-title-sm text-title-sm"
              >
                Khám phá danh mục sách
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {savedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-surface-container-lowest rounded-2xl border border-surface-container-high p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-secondary bg-surface-container-low px-2 py-0.5 rounded-md">
                        {book.categoryName}
                      </span>
                      <button
                        onClick={() => handleRemove(book.id, book.title)}
                        className="text-xs text-red-500 hover:text-red-700 hover:underline flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        <span>Xóa</span>
                      </button>
                    </div>

                    <Link href={`/tra-cuu/${book.id}`} className="hover:text-secondary transition-colors block">
                      <h3 className="font-title-md text-base text-primary font-bold line-clamp-2">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                      {book.author} ({book.year})
                    </p>
                    <p className="font-mono text-[11px] text-secondary mt-1">
                      {book.callNumber}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-surface-container mt-4 flex items-center justify-between gap-2">
                    {book.available ? (
                      <span className="text-xs font-semibold text-[#166534]">
                        Có sẵn ({book.availableCopies} cuốn)
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#991B1B]">
                        Đang mượn hết
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {!book.available ? (
                        <Link
                          href={`/dat-sach?bookId=${book.id}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          Đặt trước
                        </Link>
                      ) : (
                        <Link
                          href={`/tra-cuu/${book.id}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary"
                        >
                          Chi tiết
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </PatronGuard>
      </main>

      <Footer />
    </div>
  );
}
