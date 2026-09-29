"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

interface DatabaseItem {
  id: string;
  name: string;
  publisher: string;
  category: string;
  description: string;
  accessType: "SSO Direct" | "Proxy IP ĐHQG" | "Tài khoản Cán bộ";
  journalsCount: string;
  coverage: string;
}

const mockDatabases: DatabaseItem[] = [
  {
    id: "scopus",
    name: "Scopus & ScienceDirect (Elsevier)",
    publisher: "Elsevier B.V.",
    category: "Đa ngành • STEM & Y sinh",
    description: "Cơ sở dữ liệu trích dẫn hàng đầu thế giới với hơn 24.000 tạp chí phản biện, 1.4 tỷ trích dẫn và toàn văn công trình nghiên cứu khoa học công nghệ.",
    accessType: "SSO Direct",
    journalsCount: "24.600+ Tạp chí",
    coverage: "1970 - Nay",
  },
  {
    id: "ieee",
    name: "IEEE Xplore Digital Library",
    publisher: "Institute of Electrical and Electronics Engineers",
    category: "Kỹ thuật Điện • CNTT & AI",
    description: "Kho dữ liệu chuyên ngành hàng đầu về kỹ thuật điện tử, viễn thông, khoa học máy tính và hệ thống tự động hóa với hơn 5 triệu tài liệu toàn văn.",
    accessType: "Proxy IP ĐHQG",
    journalsCount: "5.000.000+ Bài báo",
    coverage: "1884 - Nay",
  },
  {
    id: "springer",
    name: "SpringerLink Complete Collection",
    publisher: "Springer Nature",
    category: "Khoa học Tự nhiên & Y học",
    description: "Truy cập không giới hạn hàng nghìn sách điện tử (Ebooks) và tạp chí chuyên sâu trong các lĩnh vực Toán học, Vật lý, Sinh học và Y khoa.",
    accessType: "SSO Direct",
    journalsCount: "12.000+ Sách & Tạp chí",
    coverage: "1997 - Nay",
  },
  {
    id: "jstor",
    name: "JSTOR Archival Collections",
    publisher: "ITHAKA",
    category: "Khoa học Xã hội & Nhân văn",
    description: "Lưu trữ số toàn vẹn các tạp chí nghiên cứu khoa học xã hội, lịch sử, văn học, triết học và chính trị học quốc tế.",
    accessType: "Proxy IP ĐHQG",
    journalsCount: "2.800+ Tạp chí",
    coverage: "Bộ sưu tập di sản",
  },
];

export default function DatabasesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDatabases = mockDatabases.filter((db) => {
    const matchSearch =
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "all" || db.category.includes(selectedCategory);
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        {/* Banner Section */}
        <section className="bg-primary text-on-primary py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <nav className="flex items-center gap-space-xs font-label-md text-label-md text-primary-fixed">
              <Link href="/" className="hover:underline flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </Link>
              <span className="opacity-60">/</span>
              <span className="text-white font-semibold">Cơ sở Dữ liệu Số & Nhà xuất bản</span>
            </nav>

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg font-semibold tracking-tight">
                Cơ sở Dữ liệu Số Chuyên ngành & Nhà Xuất bản Quốc tế
              </h1>
              <p className="font-body-lg text-body-lg text-primary-fixed max-w-3xl">
                Cung cấp quyền truy cập toàn văn tới hơn 240+ cơ sở dữ liệu số bản quyền (Scopus, IEEE, SpringerLink, Nature, Web of Science) phục vụ nghiên cứu & học tập.
              </p>
            </div>

            {/* Filter Search */}
            <div className="mt-space-md bg-white rounded-xl p-space-sm shadow-lg flex flex-col md:flex-row items-center gap-space-sm text-on-surface">
              <div className="relative flex-1 w-full flex items-center">
                <span className="material-symbols-outlined absolute left-space-md text-slate-400">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm cơ sở dữ liệu (ví dụ: Scopus, IEEE, Springer, Toán học)..."
                  className="w-full h-12 pl-12 pr-space-md font-body-md bg-transparent focus:outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-space-md bg-slate-100 font-title-sm text-primary rounded-lg focus:outline-none cursor-pointer w-full md:w-auto"
              >
                <option value="all">Tất cả ngành học</option>
                <option value="STEM">STEM & Công nghệ</option>
                <option value="CNTT">CNTT & AI</option>
                <option value="Y học">Y học & Sinh học</option>
                <option value="Xã hội">Khoa học Xã hội</option>
              </select>
            </div>
          </div>
        </section>

        {/* CSDL Grid Section */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin space-y-space-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Danh mục Cơ sở Dữ liệu Khả dụng ({filteredDatabases.length})
            </h2>
            <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span>Proxy ĐHQG Online 24/7</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {filteredDatabases.map((db) => (
              <div
                key={db.id}
                className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/40 hover:border-secondary transition-all shadow-sm flex flex-col justify-between gap-space-md"
              >
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between gap-space-xs">
                    <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                      {db.category}
                    </span>
                    <span className="text-xs font-mono text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">lock_open</span>
                      {db.accessType}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold hover:text-secondary cursor-pointer">
                    {db.name}
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                    Nhà xuất bản: {db.publisher}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {db.description}
                  </p>
                </div>

                <div className="pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
                  <div className="text-xs font-mono text-on-surface-variant">
                    Quy mô: <strong>{db.journalsCount}</strong> • Phạm vi: {db.coverage}
                  </div>
                  <button className="px-space-md py-2 rounded-lg bg-secondary text-on-secondary font-title-sm text-title-sm hover:bg-secondary-container transition-colors flex items-center gap-1">
                    <span>Truy cập CSDL</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
