"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import {
  AUTHORS_LIST,
  AuthorInfo,
  CATALOG_BOOKS,
  searchAuthors,
  getBooksByAuthor,
} from "@/data/catalog";

export default function AuthorsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorInfo | null>(null);

  const filteredAuthors = searchAuthors(searchTerm);
  const authorBooks = selectedAuthor ? getBooksByAuthor(selectedAuthor.name) : [];

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
                { label: "Danh bạ tác giả & Nhà khoa học" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                  Học Giả, Giáo Sư & Tác Giả Xuất Bản
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Tra Cứu Tác Giả & Ấn Phẩm Học Thuật
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Tìm kiếm tác giả theo tên, học hàm học vị, khoa viện trực thuộc để tra cứu toàn bộ sách, giáo trình và công trình nghiên cứu hiện có trong thư viện.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container-lowest px-3 py-2 rounded-xl border border-surface-container-high shrink-0">
                <span className="material-symbols-outlined text-secondary text-[20px]">groups</span>
                <span>Hiện có: <strong className="text-primary font-bold">{AUTHORS_LIST.length}</strong> tác giả tiêu biểu</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          {/* Search bar */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high shadow-sm mb-space-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-lg">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                person_search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tác giả theo tên (vd: Nguyễn Văn An, Lê Hoàng Nam, Murakami...)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/50 text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:bg-surface-container-lowest"
              />
            </div>

            {selectedAuthor && (
              <button
                onClick={() => setSelectedAuthor(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                <span>Đóng sách của tác giả đang chọn</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left: Author Cards Grid */}
            <div className={selectedAuthor ? "lg:col-span-5 space-y-3" : "lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md"}>
              {filteredAuthors.map((author) => {
                const isSelected = selectedAuthor?.id === author.id;
                return (
                  <div
                    key={author.id}
                    onClick={() => setSelectedAuthor(author)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-container-low border-secondary shadow-md ring-2 ring-secondary/30"
                        : "bg-surface-container-lowest border-surface-container-high hover:border-secondary/40 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                        {author.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-title-md text-title-md text-primary font-bold truncate">
                            {author.name}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary shrink-0">
                            {author.bookCount} sách
                          </span>
                        </div>
                        <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5 truncate">
                          {author.title}
                        </p>
                        <p className="text-xs text-on-surface-variant truncate mt-0.5">
                          {author.department}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-surface-container/60 flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="truncate">{author.affiliation}</span>
                      <span className="inline-flex items-center gap-0.5 text-secondary font-semibold shrink-0">
                        <span>Xem sách</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Author Books Detail Panel */}
            {selectedAuthor && (
              <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 border border-surface-container-high shadow-md">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
                      {selectedAuthor.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-xl text-primary font-bold">
                        {selectedAuthor.name}
                      </h2>
                      <p className="font-label-sm text-secondary font-semibold">
                        {selectedAuthor.title} • {selectedAuthor.department}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {selectedAuthor.affiliation}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAuthor(null)}
                    className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
                    aria-label="Đóng"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <div className="my-4 bg-surface-container-low/60 rounded-xl p-3 text-xs text-on-surface-variant leading-relaxed">
                  <strong className="text-primary block mb-0.5">Tiểu sử & Hướng nghiên cứu:</strong>
                  {selectedAuthor.bio}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-title-sm text-title-sm text-primary font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">menu_book</span>
                    <span>Tài liệu & Ấn phẩm ({authorBooks.length})</span>
                  </h4>
                </div>

                {authorBooks.length === 0 ? (
                  <p className="text-sm text-on-surface-variant italic py-6 text-center">
                    Chưa có sách nào của tác giả này trong cơ sở dữ liệu mẫu.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {authorBooks.map((book) => (
                      <div
                        key={book.id}
                        className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:border-secondary/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <Link href={`/tra-cuu/${book.id}`} className="hover:text-secondary transition-colors">
                            <h5 className="font-title-sm text-sm font-bold text-primary line-clamp-1">
                              {book.title}
                            </h5>
                          </Link>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            Năm: {book.year} • Thể loại: <strong>{book.categoryName}</strong> • {book.format}
                          </p>
                          <p className="text-[11px] font-mono text-secondary mt-0.5">
                            {book.callNumber} • {book.location}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {book.available ? (
                            <span className="text-[11px] font-semibold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                              Còn {book.availableCopies} cuốn
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-[#991B1B] bg-[#FEE2E2] px-2 py-0.5 rounded-full">
                              Đã mượn hết
                            </span>
                          )}

                          <Link
                            href={book.available ? `/tra-cuu/${book.id}` : `/dat-sach?bookId=${book.id}`}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                              book.available
                                ? "bg-surface-container hover:bg-surface-container-high text-primary"
                                : "bg-amber-500 hover:bg-amber-600 text-white"
                            }`}
                          >
                            <span>{book.available ? "Xem chi tiết" : "Đặt trước"}</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
