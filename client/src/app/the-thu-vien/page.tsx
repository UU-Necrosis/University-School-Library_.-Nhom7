import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { LoanItem } from "@/types/library";
import { useAuth } from "@/context/AuthContext";
import { PatronGuard } from "@/components/layout/PatronGuard";

export default function DigitalPatronPage() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<LoanItem[]>([]);
  const [renewMsg, setRenewMsg] = useState<string | null>(null);

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

  const patronName = user?.name || "";
  const patronCode = user?.code || "";

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1 pb-space-xl">
        <PatronGuard pageTitle="Thẻ Thư viện Số & Quản lý Bạn đọc">
        {/* Banner */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Thẻ Thư viện Số & Quản lý Bạn đọc" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                Cổng Độc Giả & Thẻ Thư Viện Số Định Danh
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Quản lý thẻ thư viện Barcode/QR thông minh, gia hạn sách trực tuyến và theo dõi lịch sử mượn trả tài liệu cá nhân.
              </p>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-space-xs overflow-x-auto pt-space-xs border-b border-outline-variant/30">
              <Link
                href="/the-thu-vien"
                className="px-space-md py-2.5 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/80 rounded-t-xl flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">badge</span>
                <span>Sách đang mượn & Thẻ ID</span>
              </Link>
              <Link
                href="/the-thu-vien/lich-su"
                className="px-space-md py-2.5 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">history</span>
                <span>Lịch sử mượn trả</span>
              </Link>
              <Link
                href="/the-thu-vien/dat-truoc"
                className="px-space-md py-2.5 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">event_seat</span>
                <span>Sách đặt trước (2)</span>
              </Link>
              <Link
                href="/the-thu-vien/phi-phat"
                className="px-space-md py-2.5 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span>Phí phạt & Khoản nợ</span>
                <span className="px-1.5 py-0.5 text-xs font-semibold bg-[#FEE2E2] text-[#DC2626] rounded-full">
                  2
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Patron Content */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Digital Card Preview */}
          <div className="lg:col-span-1 space-y-space-md">
            <div className="bg-gradient-to-br from-primary via-primary-container to-secondary text-white rounded-2xl p-space-lg shadow-xl relative overflow-hidden border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
                    UL
                  </div>
                  <span className="font-bold tracking-wider text-sm">UniLibrary Digital ID</span>
                </div>
                <Badge variant="success" size="sm" dot>
                  ACTIVE
                </Badge>
              </div>

              <div className="mt-6 space-y-1">
                <p className="text-xs text-blue-200 uppercase tracking-widest font-mono">Độc giả / Student</p>
                <h2 className="text-xl font-bold tracking-tight">{patronName}</h2>
                <p className="text-sm font-mono text-blue-100">Mã thẻ: {patronCode}</p>
                <p className="text-xs text-blue-200">Đơn vị: ĐHQG TP.HCM • Khoa CNTT</p>
              </div>

              {/* Barcode Mock */}
              <div className="mt-6 pt-4 border-t border-white/20 flex flex-col items-center gap-1">
                <div className="w-full h-12 bg-white/95 rounded-lg p-1 flex items-center justify-center shadow-inner">
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
            <div className="bg-surface-container-lowest rounded-2xl p-space-md border border-outline-variant/40 shadow-sm space-y-3">
              <h3 className="font-title-md text-title-md text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">analytics</span>
                <span>Hạn mức & Tình trạng</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <span className="text-2xl font-bold text-primary">{loans.length}</span>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">Sách đang mượn</p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <span className="text-2xl font-bold text-secondary">8</span>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">Hạn mức tối đa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Loans Table */}
          <div className="lg:col-span-2 space-y-space-md">
            {renewMsg && (
              <div className="p-3.5 bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-xl text-sm font-medium flex items-center justify-between shadow-sm animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#16A34A] text-[20px]">check_circle</span>
                  <span>{renewMsg}</span>
                </div>
                <button onClick={() => setRenewMsg(null)} className="text-[#166534] hover:opacity-70 p-1">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-primary font-bold">
                Danh Sách Sách Đang Mượn
              </h2>
              <span className="text-xs text-on-surface-variant font-mono">Tự động gia hạn trực tuyến</span>
            </div>

            {loans.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50 p-space-xl text-center">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2">
                  menu_book
                </span>
                <h3 className="font-title-md text-title-md text-primary font-bold">
                  Hiện Tại Bạn Không Có Sách Nào Đang Mượn
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-md mx-auto">
                  Bạn có thể tra cứu sách giáo trình, tài liệu chuyên ngành trong danh mục và đến quầy thư viện để mượn hoặc đăng ký đặt trước.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <Link
                    href="/danh-muc"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-title-sm text-title-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    <span>Tra cứu danh mục sách</span>
                  </Link>
                  <Link
                    href="/the-thu-vien/da-luu"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">bookmark</span>
                    <span>Xem sách đã lưu</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-body-sm text-body-sm">
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
                          <td className="p-space-md font-mono text-xs text-on-surface-variant font-bold">{item.id}</td>
                          <td className="p-space-md">
                            <p className="font-semibold text-primary">{item.bookTitle}</p>
                            <span className="text-[11px] text-on-surface-variant font-mono">Đã gia hạn: {item.renewCount}/2 lần</span>
                          </td>
                          <td className="p-space-md font-mono text-xs font-semibold text-primary">{item.dueDate}</td>
                          <td className="p-space-md">
                            <Badge
                              variant={
                                item.status === "Đang mượn"
                                  ? "success"
                                  : item.status === "Sắp đến hạn"
                                  ? "warning"
                                  : "danger"
                              }
                              size="sm"
                              dot={item.status === "Sắp đến hạn"}
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="p-space-md text-right">
                            <Button
                              variant={item.renewCount >= 2 ? "ghost" : "secondary"}
                              size="sm"
                              onClick={() => handleRenew(item.id)}
                              disabled={item.renewCount >= 2}
                              icon={item.renewCount >= 2 ? "block" : "autorenew"}
                            >
                              {item.renewCount >= 2 ? "Hết lượt gia hạn" : "Gia hạn +7 ngày"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
        </PatronGuard>
      </main>

      <Footer />
    </div>
  );
}
