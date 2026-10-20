"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import {
  CATEGORIES,
  CATALOG_BOOKS,
  getBooksByCategory,
  toggleSavedBook,
  isBookSaved,
} from "@/data/catalog";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryDetailPage({ params }: PageProps) {
  const { category: categorySlug } = use(params);
  const currentCategory = CATEGORIES.find((c) => c.slug === categorySlug);
  const books = getBooksByCategory(categorySlug);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [, setRerender] = useState(0);

  const filteredBooks = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.callNumber && b.callNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchAvail = !availabilityOnly || Boolean(b.available);
    return matchSearch && matchAvail;
  });

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    toggleSavedBook(id);
    setRerender((v) => v + 1);
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
                { label: "Danh mục sách", href: "/danh-muc" },
                { label: currentCategory ? currentCategory.name : "Thể loại" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                    {currentCategory?.ddcRange || "DDC Thư viện"}
                  </span>
                  <span className="text-on-surface-variant/40">•</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-primary">
                    {books.length} đầu sách
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight flex items-center gap-2">
                  {currentCategory && (
                    <span className="material-symbols-outlined text-[32px] text-secondary">
                      {currentCategory.icon}
                    </span>
                  )}
                  <span>{currentCategory ? currentCategory.name : "Thể loại sách"}</span>
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {currentCategory?.description || "Các ấn phẩm và tài liệu học thuật theo chủ đề."}
                </p>
              </div>

              <Link
                href="/danh-muc"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
                <span>Xem tất cả danh mục</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          {/* Quick Sub-Category Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-container/60 mb-space-lg">
            {CATEGORIES.map((cat) => {
              const isCurrent = cat.slug === categorySlug;
              return (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  className={`px-4 py-2 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                    isCurrent
                      ? "bg-secondary text-on-secondary font-bold shadow-sm"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Filter Bar */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high shadow-sm mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Tìm trong thể loại ${currentCategory?.name || ""}...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/50 text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:bg-surface-container-lowest"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium text-on-surface">
              <input
                type="checkbox"
                checked={availabilityOnly}
                onChange={(e) => setAvailabilityOnly(e.target.checked)}
                className="rounded border-surface-container-high text-secondary focus:ring-secondary"
              />
              <span>Chỉ hiển thị sách còn trên kệ</span>
            </label>
          </div>

          {/* Books List Grid */}
          {filteredBooks.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-dashed border-surface-container-high">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2">
                menu_book
              </span>
              <h3 className="font-title-md text-title-md text-primary font-bold">
                Chưa có sách phù hợp trong thể loại này
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Vui lòng đổi từ khóa hoặc xem các thể loại khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredBooks.map((book) => {
                const saved = isBookSaved(book.id);
                return (
                  <div
                    key={book.id}
                    className="group bg-surface-container-lowest rounded-2xl border border-surface-container-high/80 p-5 shadow-xs hover:shadow-md hover:border-secondary/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-semibold text-secondary bg-surface-container-low px-2 py-0.5 rounded-md border border-surface-container-high">
                          {book.ddcCode || "DDC Chuẩn"}
                        </span>
                        <button
                          onClick={(e) => handleToggleSave(book.id, e)}
                          title={saved ? "Bỏ lưu sách" : "Lưu vào tủ sách cá nhân"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            saved
                              ? "text-red-500 bg-red-50 hover:bg-red-100"
                              : "text-on-surface-variant hover:text-secondary hover:bg-surface-container"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {saved ? "bookmark_added" : "bookmark_border"}
                          </span>
                        </button>
                      </div>

                      <Link href={`/tra-cuu/${book.id}`} className="block group-hover:text-secondary transition-colors">
                        <h3 className="font-headline-sm text-base md:text-lg text-primary font-bold line-clamp-2 leading-snug mb-1.5">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
                        Tác giả: <strong className="text-on-surface">{book.author}</strong> ({book.year})
                      </p>

                      <p className="font-body-sm text-xs text-on-surface-variant/80 line-clamp-2 mb-3">
                        {book.description}
                      </p>

                      <div className="space-y-1 text-xs text-on-surface-variant pt-2 border-t border-surface-container/60 mb-4">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span className="material-symbols-outlined text-[14px] text-secondary">label</span>
                          <span>{book.callNumber}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">location_on</span>
                          <span className="truncate">{book.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-surface-container flex items-center justify-between gap-2">
                      {book.available ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                          <span className="text-xs font-semibold text-[#166534]">
                            Còn {book.availableCopies}/{book.totalCopies} cuốn
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                          <span className="text-xs font-semibold text-[#991B1B]">
                            Đã mượn hết ({book.totalCopies} cuốn)
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5">
                        {!book.available ? (
                          <Link
                            href={`/dat-sach?bookId=${book.id}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]">event_seat</span>
                            <span>Đặt trước</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/tra-cuu/${book.id}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary transition-colors flex items-center gap-1"
                          >
                            <span>Chi tiết</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
