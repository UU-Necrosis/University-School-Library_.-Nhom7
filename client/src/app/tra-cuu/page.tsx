"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { BookItem } from "@/types/library";

const mockBooks: BookItem[] = [
  {
    id: "1",
    title: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    author: "GS.TS. Nguyễn Văn An, ThS. Trần Minh Đức",
    year: 2024,
    publisher: "NXB Đại học Quốc gia TP.HCM",
    callNumber: "HB 137 .N573K 2024",
    isbn: "978-604-73-9821-4",
    format: "Sách in",
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    location: "Tầng 3 • Khu Sách Chuyên ngành Kinh tế",
  },
  {
    id: "2",
    title: "Quantum Computing & Information Theory for Academic Research",
    author: "Prof. David Vance, Dr. Elena Rostova",
    year: 2023,
    publisher: "Cambridge University Press",
    callNumber: "QA 76.88 .V36 2023",
    isbn: "978-1-108-49210-2",
    format: "Open Access",
    available: true,
    totalCopies: 1,
    availableCopies: 1,
    location: "Cơ sở dữ liệu số • Toàn văn PDF",
  },
  {
    id: "3",
    title: "Mô hình Máy học & Trí tuệ Nhân tạo trong Phân tích Dữ liệu Chuỗi thời gian",
    author: "PGS.TS. Lê Hoàng Nam",
    year: 2024,
    publisher: "NXB Bách Khoa",
    callNumber: "Q335 .L402M 2024",
    isbn: "978-604-95-1234-5",
    format: "Ebook PDF",
    available: true,
    totalCopies: 10,
    availableCopies: 8,
    location: "Thư viện số UniLibrary Proxy",
  },
  {
    id: "4",
    title: "Nghiên cứu Tác động của Biến đổi Khí hậu đến Đồng bằng Sông Cửu Long",
    author: "TS. Phạm Quốc Hùng",
    year: 2022,
    publisher: "Đại học Quốc gia Hà Nội",
    callNumber: "QC 903 .P43 2022",
    isbn: "Luận án Tiến sĩ • LA-2022-88",
    format: "Luận án TS",
    available: false,
    totalCopies: 2,
    availableCopies: 0,
    location: "Phòng Bảo quàn Tài liệu Đặt trước",
  },
];

export default function OpacSearchPage() {
  const [searchTerm, setSearchTerm] = useState("Kinh tế học lượng tử");
  const [searchScope, setSearchScope] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);

  const filteredBooks = mockBooks.filter((book) => {
    const matchTerm =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.callNumber && book.callNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchFormat = selectedFormat === "all" || book.format === selectedFormat;
    const matchAvail = !availabilityOnly || Boolean(book.available);

    return matchTerm && matchFormat && matchAvail;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        {/* Search Hero Header */}
        <section className="bg-surface-container-low py-space-xl px-space-md lg:px-margin border-b border-outline-variant/30">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Tra cứu & Danh mục học thuật (OPAC)" },
              ]}
            />

            <div className="flex flex-col gap-space-xs mt-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Tra cứu Tài nguyên Học thuật & Danh mục Tổng hợp (OPAC)
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Truy xuất đồng thời sách in, tài liệu số toàn văn, luận án tiến sĩ, cơ sở dữ liệu quốc tế Scopus/IEEE và các bộ sưu tập đặc biệt thuộc hệ thống thư viện thành viên.
              </p>
            </div>

            {/* Search Controls Form */}
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-md">
              <div className="flex flex-col lg:flex-row items-stretch gap-space-xs bg-surface-container-low rounded-lg p-space-xs">
                <select
                  value={searchScope}
                  onChange={(e) => setSearchScope(e.target.value)}
                  className="min-w-[180px] h-12 px-space-md font-title-sm text-title-sm text-primary bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">Tất cả các trường</option>
                  <option value="title">Nhan đề (Title)</option>
                  <option value="author">Tác giả / Nhóm NC</option>
                  <option value="isbn">Mã ISBN / ISSN</option>
                  <option value="ddc">Chủ đề phân loại DDC</option>
                </select>

                <div className="hidden lg:block w-[1px] bg-outline-variant/30 my-2"></div>

                <div className="relative flex-1 flex items-center">
                  <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant text-[22px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập từ khóa, tên tài liệu, tác giả hoặc mã số chuyên biệt..."
                    className="w-full h-12 pl-12 pr-space-xl font-body-lg text-body-lg text-on-surface bg-transparent focus:outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-space-sm text-outline hover:text-on-surface transition-colors p-1"
                      aria-label="Xóa từ khóa"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>

                <Button variant="secondary" size="lg" icon="search" className="h-12 px-space-xl">
                  Tìm kiếm
                </Button>
              </div>

              {/* Scope Tags */}
              <div className="flex flex-wrap items-center gap-space-xs font-label-md text-label-md pt-2">
                <span className="text-on-surface-variant">Phạm vi:</span>
                {["Tất cả kho sách", "Sách in ĐHQG", "CSDL Số Scopus", "Luận án TS", "Bộ sưu tập đặc biệt"].map(
                  (tag, idx) => (
                    <button
                      key={tag}
                      className={`px-space-sm py-1 rounded-full border transition-colors ${
                        idx === 0
                          ? "bg-primary text-on-primary border-primary font-semibold"
                          : "bg-surface-container-low text-on-surface-variant border-outline-variant/40 hover:bg-surface-container"
                      }`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results & Filters Section */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin grid grid-cols-1 lg:grid-cols-4 gap-space-lg">
          {/* Sidebar Filter */}
          <aside className="lg:col-span-1 bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 h-fit space-y-space-md">
            <h3 className="font-title-lg text-title-lg text-primary font-bold border-b border-outline-variant/30 pb-2">
              Lọc kết quả OPAC
            </h3>

            {/* Format Filter */}
            <div className="space-y-space-xs">
              <label className="font-title-sm text-title-sm text-on-surface block font-semibold">Loại tài liệu</label>
              {[
                { label: "Tất cả các loại", value: "all" },
                { label: "Sách in (Physical)", value: "Sách in" },
                { label: "Ebook PDF toàn văn", value: "Ebook PDF" },
                { label: "Luận án Tiến sĩ", value: "Luận án TS" },
                { label: "Open Access Journal", value: "Open Access" },
              ].map((fmt) => (
                <label key={fmt.value} className="flex items-center gap-space-xs cursor-pointer text-body-md text-on-surface-variant hover:text-on-surface">
                  <input
                    type="radio"
                    name="format"
                    value={fmt.value}
                    checked={selectedFormat === fmt.value}
                    onChange={() => setSelectedFormat(fmt.value)}
                    className="accent-secondary"
                  />
                  <span>{fmt.label}</span>
                </label>
              ))}
            </div>

            {/* Availability Checkbox */}
            <div className="pt-space-xs border-t border-outline-variant/30">
              <label className="flex items-center gap-space-xs cursor-pointer text-body-md font-semibold text-on-surface">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="accent-secondary w-4 h-4"
                />
                <span>Chỉ hiển thị sách sẵn có</span>
              </label>
            </div>
          </aside>

          {/* Book Cards Grid */}
          <div className="lg:col-span-3 flex flex-col gap-space-md">
            <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant bg-surface-container-lowest p-space-sm rounded-lg border border-outline-variant/30">
              <span>Tìm thấy <strong>{filteredBooks.length}</strong> kết quả phù hợp</span>
              <span>Sắp xếp: <strong>Độ liên quan cao nhất</strong></span>
            </div>

            <div className="flex flex-col gap-space-md">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-surface-container-lowest rounded-xl p-space-md border border-outline-variant/40 hover:border-secondary transition-all shadow-sm flex flex-col md:flex-row gap-space-md"
                >
                  {/* Book Cover Placeholder */}
                  <Link
                    href={`/tra-cuu/${book.id}`}
                    className="w-24 h-32 bg-primary/10 rounded-lg flex-shrink-0 flex flex-col items-center justify-center text-primary font-bold border border-primary/20 text-center p-2 hover:bg-primary/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[32px] mb-1">menu_book</span>
                    <span className="text-[10px] uppercase font-mono">{book.format}</span>
                  </Link>

                  {/* Book Info */}
                  <div className="flex-1 flex flex-col justify-between gap-space-xs">
                    <div>
                      <div className="flex items-center gap-space-xs mb-1">
                        <Badge
                          variant={book.available ? "success" : "danger"}
                          size="sm"
                        >
                          {book.available ? `Có sẵn (${book.availableCopies}/${book.totalCopies})` : "Đã mượn hết"}
                        </Badge>
                        <span className="text-xs text-on-surface-variant font-mono">{book.callNumber}</span>
                      </div>

                      <Link href={`/tra-cuu/${book.id}`}>
                        <h2 className="font-headline-sm text-headline-sm text-primary font-semibold hover:text-secondary cursor-pointer">
                          {book.title}
                        </h2>
                      </Link>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        Tác giả: <strong className="text-on-surface">{book.author}</strong> • Năm xuất bản: {book.year}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-0.5">
                        Nhà xuất bản: {book.publisher} • ISBN: {book.isbn}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-space-xs pt-space-xs border-t border-outline-variant/20 mt-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {book.location}
                      </span>
                      <div className="flex items-center gap-space-xs">
                        <Link href={`/tra-cuu/${book.id}`}>
                          <Button variant="secondary" size="sm">
                            {book.available ? "Đặt mượn ngay" : "Xem chi tiết & Đặt trước"}
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" icon="bookmark" aria-label="Lưu tài liệu" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
