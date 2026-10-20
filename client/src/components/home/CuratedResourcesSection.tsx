"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { CATALOG_BOOKS, toggleSavedBook, isBookSaved } from "@/data/catalog";

export const CuratedResourcesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, setRerender] = useState(0);

  useEffect(() => {
    const handleSavedChange = () => setRerender((v) => v + 1);
    window.addEventListener("unilibrary_saved_changed", handleSavedChange);
    return () => window.removeEventListener("unilibrary_saved_changed", handleSavedChange);
  }, []);

  const categories = [
    { id: "all", label: "Tất cả sách nổi bật" },
    { id: "cong-nghe", label: "Công nghệ & Máy tính" },
    { id: "kinh-te", label: "Kinh tế & Quản trị" },
    { id: "khoa-hoc", label: "Khoa học & Môi trường" },
    { id: "van-hoc", label: "Văn học & Nghệ thuật" },
    { id: "truyen-tranh", label: "Graphic Novels" },
  ];

  const displayedBooks = CATALOG_BOOKS.filter((book) => {
    if (activeCategory === "all") return true;
    return book.category === activeCategory;
  });

  const handleToggleSave = (bookId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toggleSavedBook(bookId);
    setRerender((v) => v + 1);
  };

  return (
    <section className="w-full py-space-xl bg-surface" id="tra-cuu">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        {/* Section Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider block mb-space-xs">
              Kho Tri Thức Học Thuật
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Danh Mục Sách & Giáo Trình Nổi Bật
            </h2>
          </div>

          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-space-md py-1.5 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-on-primary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container bg-surface-container-low"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {displayedBooks.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-surface-container-high">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2">
              menu_book
            </span>
            <h3 className="font-title-md text-title-md text-primary font-bold">Không tìm thấy tài liệu</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Hiện chưa có sách thuộc thể loại này trong danh mục chọn lọc.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {displayedBooks.map((book) => {
              const saved = isBookSaved(book.id);
              return (
                <div
                  key={book.id}
                  className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest overflow-hidden shadow-xs hover:shadow-md transition-all group border border-outline-variant/30"
                >
                  <div className="p-space-md">
                    {/* Book Cover Container */}
                    <div className="relative block w-full h-56 rounded-xl bg-surface-container-low overflow-hidden mb-space-md p-space-sm flex items-center justify-center">
                      {book.coverImage && (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-48 w-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {/* Top Badges */}
                      <span className="absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 font-label-sm text-label-sm font-semibold bg-primary/90 text-on-primary shadow-xs">
                        {book.categoryName}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleToggleSave(book.id, e)}
                        title={saved ? "Bỏ lưu sách" : "Lưu vào sách cá nhân"}
                        className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg shadow-sm transition-colors ${
                          saved
                            ? "bg-red-50 text-red-600"
                            : "bg-white/90 text-on-surface-variant hover:text-secondary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {saved ? "bookmark_added" : "bookmark_border"}
                        </span>
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono truncate max-w-[160px]">
                          {book.callNumber || book.identifier || "DDC"}
                        </span>
                        {book.available ? (
                          <Badge variant="success" size="sm">
                            Còn {book.availableCopies}/{book.totalCopies} cuốn
                          </Badge>
                        ) : (
                          <Badge variant="warning" size="sm">
                            Đã mượn hết
                          </Badge>
                        )}
                      </div>

                      <Link href={`/tra-cuu/${book.id}`} className="block">
                        <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-2 font-bold leading-snug">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        {book.author} ({book.year})
                      </p>

                      <div className="pt-space-xs">
                        <span className="inline-block rounded-md bg-surface-container-low px-2 py-0.5 font-label-sm text-label-sm text-primary font-medium">
                          {book.department || "Thư viện Trung tâm"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="p-space-md pt-0">
                    {!book.available ? (
                      <Link href={`/dat-sach?bookId=${book.id}`} className="block w-full">
                        <Button
                          variant="outline"
                          size="md"
                          fullWidth
                          icon="event_seat"
                          className="bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                        >
                          Đặt trước (Hold)
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/tra-cuu/${book.id}`} className="block w-full">
                        <Button
                          variant="outline"
                          size="md"
                          fullWidth
                          icon="arrow_forward"
                          className="bg-surface-container text-primary hover:bg-secondary hover:text-on-secondary"
                        >
                          Xem chi tiết & Mượn
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Books CTA */}
        <div className="mt-space-xl text-center">
          <Link
            href="/danh-muc"
            className="inline-flex items-center gap-2 px-space-xl py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm font-semibold border border-surface-container-high transition-colors"
          >
            <span>Khám phá toàn bộ {CATALOG_BOOKS.length} đầu sách trong Danh mục</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
