"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { CATEGORIES, CATALOG_BOOKS, toggleSavedBook, isBookSaved } from "@/data/catalog";

export default function BookCategoriesIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "reserved">("all");
  const [, setRerender] = useState(0);

  const filteredBooks = CATALOG_BOOKS.filter((book) => {
    const matchCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.callNumber && book.callNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchAvail =
      availabilityFilter === "all"
        ? true
        : availabilityFilter === "available"
        ? Boolean(book.available)
        : !book.available;

    return matchCategory && matchSearch && matchAvail;
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
                { label: "Danh mục sách & Thể loại" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                  Phân loại Thập phân Dewey (DDC) & Kho Tri Thức
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Danh Mục Sách Theo Thể Loại
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Khám phá toàn bộ nguồn tài liệu được biên mục chuẩn viện trường: Kinh tế, Công nghệ, Khoa học nghiên cứu, Văn học và Truyện tranh graphic novels.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container-lowest px-3 py-2 rounded-xl border border-surface-container-high shrink-0">
                <span className="material-symbols-outlined text-secondary text-[20px]">auto_stories</span>
                <span>Tổng số: <strong className="text-primary font-bold">{CATALOG_BOOKS.length}</strong> đầu sách</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar & Search Filter */}
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-container/60 mb-space-lg">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">category</span>
              <span>Tất cả thể loại ({CATALOG_BOOKS.length})</span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = CATALOG_BOOKS.filter((b) => b.category === cat.slug).length;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-secondary text-on-secondary font-bold shadow-sm"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Status Filter */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high shadow-sm mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm nhan đề, tác giả hoặc ký hiệu xếp giá..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/50 text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:bg-surface-container-lowest"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto justify-end">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider shrink-0">
                Tình trạng:
              </span>
              <button
                onClick={() => setAvailabilityFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  availabilityFilter === "all"
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setAvailabilityFilter("available")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  availabilityFilter === "available"
                    ? "bg-[#166534] text-white"
                    : "bg-[#DCFCE7] text-[#166534] hover:bg-green-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Có sẵn trên kệ
              </button>
              <button
                onClick={() => setAvailabilityFilter("reserved")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  availabilityFilter === "reserved"
                    ? "bg-[#92400E] text-white"
                    : "bg-[#FEF3C7] text-[#92400E] hover:bg-amber-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Đang mượn hết / Đặt trước
              </button>
            </div>
          </div>

          {/* Books Grid */}
          {filteredBooks.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-dashed border-surface-container-high">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2">
                menu_book
              </span>
              <h3 className="font-title-md text-title-md text-primary font-bold">Không tìm thấy sách phù hợp</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Vui lòng thử đổi từ khóa tìm kiếm hoặc chọn thể loại khác.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setAvailabilityFilter("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-secondary text-on-secondary font-title-sm text-title-sm"
              >
                Xem tất cả sách
              </button>
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
                      {/* Top Info & Category Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-semibold tracking-wider text-secondary bg-surface-container-low px-2.5 py-1 rounded-md border border-surface-container-high">
                          {book.categoryName}
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

                      {/* Title & Author */}
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

                      {/* Metadata Chips */}
                      <div className="space-y-1.5 text-xs text-on-surface-variant pt-2 border-t border-surface-container/60 mb-4">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <span className="material-symbols-outlined text-[15px] text-secondary">label</span>
                          <span>{book.callNumber}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="material-symbols-outlined text-[15px] text-on-surface-variant">location_on</span>
                          <span className="truncate">{book.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions & Availability */}
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
