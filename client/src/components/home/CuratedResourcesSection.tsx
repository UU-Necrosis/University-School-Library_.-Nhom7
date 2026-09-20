"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookItem } from "@/types/library";

const mockBooks: BookItem[] = [
  {
    id: "b1",
    title: "Artificial Intelligence: A Modern Approach (4th Global Ed.)",
    author: "Stuart Russell, Peter Norvig • 2024",
    year: 2024,
    type: "Sách in",
    identifier: "DDC: QA76.73 .P98 2024",
    status: "available",
    statusText: "Có sẵn 4/5 cuốn",
    department: "Khoa CNTT",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdEmaKpoZx_6Xxbfgjsgj5ej6xqkLApHgwR8nf-dDXOIVS4hzQvCqFQYkHlWgDmEhQuUAgcHZjBXLAhzcBbO3NslpqTX1Exeqz50sJAAwyrWJZuegorg-emLSv38hQEmn1Q0ISieUcOGhMC9oWG1QnzuksAeVzb74v1gZpMWWCrZ-EiOfPOTxZx5ZUJxEIZEz1UMyJLaFGiAFZ_UhBjbZhX4rurOd6q9VVXGLQMWkyMoinnEo_BUwC",
  },
  {
    id: "b2",
    title: "Kinh Tế Lượng Ứng Dụng Trong Phân Tích Chuỗi Thời Gian",
    author: "GS.TS. Trần Đình Hưng • 2024",
    year: 2024,
    type: "Open Access",
    identifier: "DOI: 10.1016/j.econ.2024",
    status: "open_access",
    statusText: "PDF Toàn văn",
    department: "Khoa Kinh tế & QTKD",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcLFUd4eKRQalDw9P4qCohZDe7DyK1GfdCYjCYo9p_I8udLbQ43ye1In-lRgH1yjwrr2oo_qCYXA2PNFCwkXaRaOWJxwl95F-YEyxEnj9haYigWOzlITPu0fMAF4XyDcZD6Ql07z3kQ3NEfpbmYogO5IBvPu9HResBYRz6y8VxrWWlEBhIB0jkjjsAnpXeBZrsHxm3VjMD78DJ3B7LeP6R-cypTVZdzlMrjGRin5r_AEye_WN7IxNg",
  },
  {
    id: "b3",
    title: "Nghiên Cứu Vật Liệu Bán Dẫn 2D Thế Hệ Mới Ứng Dụng Trong Quang Điện Tử",
    author: "TS. Vũ Minh Châu (HD: GS. Lê Văn Bách) • 2024",
    year: 2024,
    type: "Luận án Tiến sĩ",
    identifier: "LVTS: 2024.LA.042",
    status: "print_digital",
    statusText: "Bản in & Bản số",
    department: "Viện Vật lý Ứng dụng",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr3K0IOzRKlXDQSpXDOEnvCPNliUgogzQeAfQb6YNQsDDkY9MGiO_v_ZRWdU8WtBSTu7dHsK3o1-0zRG6xFOqeqgt2pIPOUEvSdztq3tJjVVwgSKRgZV-XQ8h3kiR82MbvDwBijY4qz-0_LMTChgwifZtCjw5lre27wf9GvkWCrtvVO392zvfMqTNajpjkb457695CMV__GOlk1gIFCRCOjIKkZvQYDO9LdKIXIeOZFXa6VR3U2CRL",
  },
  {
    id: "b4",
    title: "Quy Hoạch Lưới Điện Thông Minh & Tích Hợp Năng Lượng Tái Tạo",
    author: "PGS.TS. Nguyễn Văn Thịnh • 2023",
    year: 2023,
    type: "Tạp chí Scopus",
    identifier: "DDC: TK1005 .C55 2023",
    status: "borrowed_out",
    statusText: "Dự kiến trả: 28/10",
    department: "Khoa Điện - Điện tử",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBizkQ6A22e9fKWLQqrAjf16ReDOrf946f4c8jTtXTGqhpJlyqbu7CGSDEqamY6JJeY54uCDugAmxLtmBdj5exImC5yO5AMQKuk3-uG9-c4ZjzX71oKi8IvhAbjmyHFJLSpSDlzFZ0Ta4uNEXIX09A43YqXDfLYGIqmUPXSoxaLvFW0zCYR8M-xUceHh0CQNWBW96l9FL1mut9Qs4VVyHRJZ-9db_4sikxbmXo6kuYSkqcEm1Vsgopq",
  },
];

export const CuratedResourcesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Sách chuyên ngành mới" },
    { id: "open_access", label: "Open Access" },
    { id: "theses", label: "Luận văn 2024" },
    { id: "scopus", label: "Tạp chí Q1 Scopus" },
  ];

  return (
    <section className="w-full py-space-xl bg-surface" id="tra-cuu">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        {/* Section Header & Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider block mb-space-xs">
              Tài Liệu Chọn Lọc
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Nguồn Học Liệu Mới Nhập & Nghiên Cứu Xuất Sắc
            </h2>
          </div>

          <div className="flex items-center gap-space-xs overflow-x-auto mt-space-sm md:mt-0 pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-space-md py-1.5 rounded-lg font-title-sm text-title-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {mockBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col justify-between rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-md transition-all group border border-outline-variant/30"
            >
              <div className="p-space-md">
                {/* Book Cover Container */}
                <div className="relative w-full h-56 rounded-lg bg-surface-container-high overflow-hidden mb-space-md flex items-center justify-center p-space-sm">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-36 h-48 object-cover rounded shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 rounded px-space-xs py-0.5 font-label-sm text-label-sm font-semibold ${
                      book.type === "Sách in"
                        ? "bg-primary/90 text-on-primary"
                        : book.type === "Open Access"
                        ? "bg-tertiary-container text-on-tertiary"
                        : book.type === "Luận án Tiến sĩ"
                        ? "bg-primary text-on-primary"
                        : "bg-error-container text-on-error-container"
                    }`}
                  >
                    {book.type}
                  </span>
                </div>

                {/* Metadata */}
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      {book.identifier}
                    </span>
                    <span
                      className={`rounded-full px-space-xs py-0.5 font-label-sm text-label-sm font-semibold ${
                        book.status === "available"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : book.status === "open_access"
                          ? "bg-surface-container-highest text-primary"
                          : book.status === "print_digital"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}
                    >
                      {book.statusText}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                    {book.author}
                  </p>

                  <div className="pt-space-xs">
                    <span className="inline-block rounded bg-surface-container-low px-space-xs py-0.5 font-label-sm text-label-sm text-primary font-medium">
                      {book.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-space-md pt-0">
                {book.type === "Open Access" ? (
                  <button className="w-full flex items-center justify-center gap-space-xs bg-secondary hover:bg-primary text-on-secondary font-title-sm text-title-sm py-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                    <span>Đọc trực tuyến ngay</span>
                  </button>
                ) : book.status === "borrowed_out" ? (
                  <button className="w-full flex items-center justify-center gap-space-xs bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-primary font-title-sm text-title-sm py-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px]">event_seat</span>
                    <span>Đặt hàng xếp hàng (Hold)</span>
                  </button>
                ) : (
                  <button className="w-full flex items-center justify-center gap-space-xs bg-surface-container hover:bg-secondary hover:text-on-secondary text-primary font-title-sm text-title-sm py-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                    <span>Xem chi tiết & Đặt mượn</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
