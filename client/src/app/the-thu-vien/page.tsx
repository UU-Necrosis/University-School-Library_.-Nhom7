"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

interface LoanItem {
  id: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  status: "Đang mượn" | "Sắp đến hạn" | "Quá hạn";
  renewCount: number;
}

const mockLoans: LoanItem[] = [
  {
    id: "LOAN-101",
    bookTitle: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính",
    borrowDate: "15/09/2026",
    dueDate: "29/09/2026",
    status: "Sắp đến hạn",
    renewCount: 0,
  },
  {
    id: "LOAN-102",
    bookTitle: "Mô hình Máy học & Trí tuệ Nhân tạo",
    borrowDate: "10/09/2026",
    dueDate: "10/10/2026",
    status: "Đang mượn",
    renewCount: 1,
  },
  {
    id: "LOAN-103",
    bookTitle: "Phương pháp Nghiên cứu Khoa học Xã hội",
    borrowDate: "01/09/2026",
    dueDate: "22/09/2026",
    status: "Quá hạn",
    renewCount: 0,
  },
];

export default function DigitalPatronPage() {
  const [user, setUser] = useState<{ name: string; code: string; email: string } | null>(null);
  const [loans, setLoans] = useState<LoanItem[]>(mockLoans);
  const [renewMsg, setRenewMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("unilibrary_user") || sessionStorage.getItem("unilibrary_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRenew = (loanId: string) => {
    setLoans((prev) =>
      prev.map((item) => {
        if (item.id === loanId && item.renewCount < 2) {
          return {
            ...item,
            dueDate: "15/10/2026",
            status: "Đang mượn",
            renewCount: item.renewCount + 1,
          };
        }
        return item;
      })
    );
    setRenewMsg(`Gia hạn thành công cho mã mượn ${loanId}! Hạn trả mới là 15/10/2026.`);
    setTimeout(() => setRenewMsg(null), 3000);
  };

  const patronName = user?.name || "Lê Hoàng Nam";
  const patronCode = user?.code || "UL-202488";

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        {/* Banner */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <nav className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <Link href="/" className="hover:text-secondary flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Thẻ Thư viện Số & Quản lý Bạn đọc</span>
            </nav>

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Cổng Độc giả & Thẻ Thư viện Số Định danh
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Quản lý thẻ thư viện Barcode/QR thông minh, gia hạn sách trực tuyến và theo dõi lịch sử mượn trả tài liệu cá nhân.
              </p>
            </div>
          </div>
        </section>

        {/* Patron Content */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Digital Card Preview */}
          <div className="lg:col-span-1 space-y-space-md">
            <div className="bg-gradient-to-br from-[#022448] via-[#1e3a5f] to-[#0051d5] text-white rounded-2xl p-space-lg shadow-xl relative overflow-hidden border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
                    UL
                  </div>
                  <span className="font-bold tracking-wider text-sm">UniLibrary Digital ID</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-green-400/20 text-green-300 text-xs font-mono font-bold border border-green-400/30">
                  ACTIVE
                </span>
              </div>

              <div className="mt-6 space-y-1">
                <p className="text-xs text-blue-200 uppercase tracking-widest font-mono">Độc giả / Student</p>
                <h2 className="text-xl font-bold tracking-tight">{patronName}</h2>
                <p className="text-sm font-mono text-blue-100">Mã thẻ: {patronCode}</p>
                <p className="text-xs text-blue-200">Đơn vị: ĐHQG TP.HCM • Khoa CNTT</p>
              </div>

              {/* Barcode Mock */}
              <div className="mt-6 pt-4 border-t border-white/20 flex flex-col items-center gap-1">
                <div className="w-full h-12 bg-white/90 rounded p-1 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-sm flex items-center justify-evenly px-2">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-full ${i % 3 === 0 ? "w-1 bg-white" : "w-0.5 bg-white/80"}`}
                      ></div>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-blue-200">*{patronCode}*</span>
              </div>
            </div>

            {/* Quick Summary Stats */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-outline-variant/40 space-y-3">
              <h3 className="font-title-md text-title-md text-primary font-bold">Hạn mức & Tình trạng</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <span className="text-2xl font-bold text-primary">{loans.length}</span>
                  <p className="text-xs text-on-surface-variant font-medium">Sách đang mượn</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
                  <span className="text-2xl font-bold text-secondary">8</span>
                  <p className="text-xs text-on-surface-variant font-medium">Hạn mức tối đa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Loans Table */}
          <div className="lg:col-span-2 space-y-space-md">
            {renewMsg && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-medium">
                ✅ {renewMsg}
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">
                Danh sách Sách Đang Mượn
              </h2>
              <span className="text-xs text-on-surface-variant font-mono">Tự động gia hạn trực tuyến</span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/30 text-xs font-semibold text-on-surface-variant uppercase font-mono">
                      <th className="p-space-md">Mã phiếu</th>
                      <th className="p-space-md">Tên sách</th>
                      <th className="p-space-md">Hạn trả</th>
                      <th className="p-space-md">Trạng thái</th>
                      <th className="p-space-md text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20 text-sm">
                    {loans.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-space-md font-mono text-xs text-on-surface-variant">{item.id}</td>
                        <td className="p-space-md font-semibold text-primary">{item.bookTitle}</td>
                        <td className="p-space-md font-mono text-xs font-medium">{item.dueDate}</td>
                        <td className="p-space-md">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              item.status === "Đang mượn"
                                ? "bg-green-100 text-green-800 border border-green-300"
                                : item.status === "Sắp đến hạn"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-red-100 text-red-800 border border-red-300"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-space-md text-right">
                          <button
                            onClick={() => handleRenew(item.id)}
                            disabled={item.renewCount >= 2}
                            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                              item.renewCount >= 2
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-secondary text-on-secondary hover:bg-secondary-container"
                            }`}
                          >
                            {item.renewCount >= 2 ? "Hết lượt gia hạn" : "Gia hạn +7 ngày"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
