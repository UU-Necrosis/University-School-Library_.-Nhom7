"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { LoanHistoryItem } from "@/types/library";

const mockLoanHistory: LoanHistoryItem[] = [
  {
    id: "HIST-2026-108",
    bookTitle: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    bookId: "1",
    barcode: "UL-BK-202401-A",
    borrowDate: "01/08/2026",
    dueDate: "29/08/2026",
    returnDate: "25/08/2026",
    status: "Đúng hạn",
    fineAmount: 0,
    fineStatus: "Không có",
    renewCount: 1,
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "HIST-2026-095",
    bookTitle: "Quantum Computing & Information Theory for Academic Research",
    bookId: "2",
    barcode: "UL-QA-2023-99",
    borrowDate: "10/07/2026",
    dueDate: "07/08/2026",
    returnDate: "06/08/2026",
    status: "Đúng hạn",
    fineAmount: 0,
    fineStatus: "Không có",
    renewCount: 0,
    campus: "Thư viện Số Toàn văn",
  },
  {
    id: "HIST-2026-082",
    bookTitle: "Deep Learning (Adaptive Computation and Machine Learning series)",
    bookId: "b1",
    barcode: "UL-AI-01",
    borrowDate: "15/05/2026",
    dueDate: "12/06/2026",
    returnDate: "15/06/2026",
    status: "Trễ hạn",
    fineAmount: 6000,
    fineStatus: "Đã nộp",
    renewCount: 0,
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "HIST-2026-064",
    bookTitle: "Nghiên cứu Vật liệu Bán dẫn 2D Thế Hệ Mới Ứng Dụng Trong Quang Điện Tử",
    bookId: "b3",
    barcode: "UL-TS-2024-42",
    borrowDate: "02/04/2026",
    dueDate: "30/04/2026",
    returnDate: "28/04/2026",
    status: "Đúng hạn",
    fineAmount: 0,
    fineStatus: "Không có",
    renewCount: 1,
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "HIST-2026-041",
    bookTitle: "Phương pháp Nghiên cứu Định lượng trong Khoa học Xã hội & Hành vi",
    bookId: "1",
    barcode: "UL-SS-2024-11",
    borrowDate: "10/02/2026",
    dueDate: "10/03/2026",
    returnDate: "08/03/2026",
    status: "Đúng hạn",
    fineAmount: 0,
    fineStatus: "Không có",
    renewCount: 0,
    campus: "Cơ sở 2 (Khu Công nghệ Cao)",
  },
  {
    id: "HIST-2025-219",
    bookTitle: "Xác suất Thống kê Nâng cao & Ứng dụng Xử lý Dữ liệu Lớn",
    bookId: "3",
    barcode: "UL-MATH-2025-09",
    borrowDate: "14/11/2025",
    dueDate: "12/12/2025",
    returnDate: "11/12/2025",
    status: "Đúng hạn",
    fineAmount: 0,
    fineStatus: "Không có",
    renewCount: 1,
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
];

export default function LoanHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const filteredHistory = mockLoanHistory.filter((item) => {
    const matchSearch =
      item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchTime = timeFilter === "all" || item.borrowDate.includes(timeFilter);

    return matchSearch && matchStatus && matchTime;
  });

  const totalLoans = mockLoanHistory.length;
  const onTimeLoans = mockLoanHistory.filter((i) => i.status === "Đúng hạn").length;
  const onTimeRate = ((onTimeLoans / totalLoans) * 100).toFixed(1);
  const totalFinesPaid = mockLoanHistory.reduce((acc, curr) => acc + (curr.fineAmount || 0), 0);

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
                { label: "Lịch sử mượn trả tài liệu" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Nhật Ký & Lịch Sử Mượn Trả Tài Liệu
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Tra cứu chi tiết toàn bộ các lượt mượn sách in, luận văn và tài liệu số đã hoàn trả, đối soát thời hạn và biên lai xử lý phí phát sinh.
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
                className="px-space-md py-2 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/60 rounded-t-lg"
              >
                Lịch sử mượn trả
              </Link>
              <Link
                href="/the-thu-vien/dat-truoc"
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent"
              >
                Sách đặt trước (2)
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

        {/* Stats Row */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant">Tổng lượt mượn</span>
                <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
              </div>
              <p className="font-headline-md text-headline-md font-bold text-primary mt-1">{totalLoans}</p>
              <span className="text-[11px] text-on-surface-variant font-mono">Tích lũy từ 2025</span>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant">Tỉ lệ đúng hạn</span>
                <span className="material-symbols-outlined text-[#16A34A] text-[20px]">verified</span>
              </div>
              <p className="font-headline-md text-headline-md font-bold text-[#166534] mt-1">{onTimeRate}%</p>
              <span className="text-[11px] text-[#16A34A] font-medium">Bạn đọc gương mẫu</span>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant">Đã hoàn trả</span>
                <span className="material-symbols-outlined text-secondary text-[20px]">task_alt</span>
              </div>
              <p className="font-headline-md text-headline-md font-bold text-secondary mt-1">{totalLoans}</p>
              <span className="text-[11px] text-on-surface-variant">100% hồ sơ hoàn tất</span>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant">Phí phạt đã thanh toán</span>
                <span className="material-symbols-outlined text-outline text-[20px]">receipt_long</span>
              </div>
              <p className="font-headline-md text-headline-md font-bold text-primary mt-1">
                {totalFinesPaid.toLocaleString("vi-VN")} đ
              </p>
              <span className="text-[11px] text-[#16A34A] font-medium">Không còn nợ quá hạn</span>
            </div>
          </div>
        </section>

        {/* Filters & Table Section */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg space-y-space-md">
          {/* Filter Toolbar */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm">
            <div className="relative flex-1 flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên sách, mã phiếu (HIST-...), mã barcode..."
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
                <option value="all">Tất cả tình trạng</option>
                <option value="Đúng hạn">Trả đúng hạn</option>
                <option value="Trễ hạn">Trả trễ hạn</option>
              </select>

              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="h-10 px-3 bg-surface-container-low font-title-sm text-title-sm text-primary rounded-lg border border-outline-variant/30 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả thời gian</option>
                <option value="2026">Năm 2026</option>
                <option value="2025">Năm 2025</option>
              </select>
            </div>
          </div>

          {/* Loan History Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-body-sm text-body-sm">
                <thead>
                  <tr className="bg-surface-container-low text-xs font-mono font-semibold text-on-surface-variant uppercase border-b border-outline-variant/30">
                    <th className="p-space-md">Mã phiếu</th>
                    <th className="p-space-md">Tên sách & Tác giả</th>
                    <th className="p-space-md">Ngày mượn / Hạn trả</th>
                    <th className="p-space-md">Ngày thực trả</th>
                    <th className="p-space-md">Tình trạng</th>
                    <th className="p-space-md">Phí phạt</th>
                    <th className="p-space-md text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-space-md font-mono text-xs text-on-surface-variant font-bold">
                          {item.id}
                        </td>
                        <td className="p-space-md">
                          {item.bookId ? (
                            <Link
                              href={`/tra-cuu/${item.bookId}`}
                              className="font-title-sm text-title-sm text-primary font-bold hover:text-secondary hover:underline transition-colors line-clamp-1"
                            >
                              {item.bookTitle}
                            </Link>
                          ) : (
                            <p className="font-title-sm text-title-sm text-primary font-bold line-clamp-1">
                              {item.bookTitle}
                            </p>
                          )}
                          <p className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                            Barcode: {item.barcode} • {item.campus}
                          </p>
                        </td>
                        <td className="p-space-md font-mono text-xs">
                          <p className="text-on-surface">Mượn: {item.borrowDate}</p>
                          <p className="text-on-surface-variant">Hạn: {item.dueDate}</p>
                        </td>
                        <td className="p-space-md font-mono text-xs font-bold text-primary">
                          {item.returnDate}
                        </td>
                        <td className="p-space-md">
                          <Badge variant={item.status === "Đúng hạn" ? "success" : "warning"} size="sm">
                            {item.status}
                          </Badge>
                          {item.renewCount > 0 && (
                            <span className="block text-[10px] text-on-surface-variant font-mono mt-0.5">
                              (Đã gia hạn {item.renewCount} lần)
                            </span>
                          )}
                        </td>
                        <td className="p-space-md font-mono text-xs">
                          {item.fineAmount && item.fineAmount > 0 ? (
                            <div>
                              <span className="font-bold text-[#DC2626]">
                                {item.fineAmount.toLocaleString("vi-VN")} đ
                              </span>
                              <span className="block text-[10px] text-[#166534] font-medium">Đã thanh toán</span>
                            </div>
                          ) : (
                            <span className="text-on-surface-variant">0 đ</span>
                          )}
                        </td>
                        <td className="p-space-md text-right">
                          {item.bookId ? (
                            <Link href={`/tra-cuu/${item.bookId}`}>
                              <Button variant="outline" size="sm" icon="autorenew">
                                Mượn lại
                              </Button>
                            </Link>
                          ) : (
                            <Button variant="outline" size="sm" icon="visibility">
                              Chi tiết
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-space-xl text-center text-on-surface-variant">
                        Không tìm thấy lịch sử mượn trả nào phù hợp với bộ lọc tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
