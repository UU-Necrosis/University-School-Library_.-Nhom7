"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { FineItem, PaymentItem } from "@/types/library";

const initialFines: FineItem[] = [
  {
    id: "FINE-2026-003",
    bookTitle: "Nghiên cứu Tác động của Biến đổi Khí hậu đến Đồng bằng Sông Cửu Long",
    bookId: "4",
    loanId: "LOAN-2026-089",
    barcode: "UL-TS-2022-02",
    reason: "Trả tài liệu trễ hạn",
    issueDate: "25/09/2026",
    dueDate: "20/09/2026",
    returnDate: "25/09/2026",
    overdueDays: 5,
    amount: 25000,
    status: "Chưa thanh toán",
    calculationDetail: "5 ngày quá hạn x 5.000 đ/ngày",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "FINE-2026-004",
    bookTitle: "Quy Hoạch Lưới Điện Thông Minh & Tích Hợp Năng Lượng Tái Tạo",
    bookId: "b4",
    loanId: "LOAN-2026-092",
    barcode: "UL-EE-2023-01",
    reason: "Trả tài liệu trễ hạn",
    issueDate: "28/09/2026",
    dueDate: "25/09/2026",
    returnDate: "28/09/2026",
    overdueDays: 3,
    amount: 15000,
    status: "Chưa thanh toán",
    calculationDetail: "3 ngày quá hạn x 5.000 đ/ngày",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "FINE-2026-002",
    bookTitle: "Trí tuệ nhân tạo và Học máy trong Chẩn đoán Y tế Chuyên sâu",
    bookId: "b2",
    loanId: "LOAN-2026-044",
    barcode: "UL-AI-2024-03",
    reason: "Trả tài liệu trễ hạn",
    issueDate: "15/09/2026",
    dueDate: "13/09/2026",
    returnDate: "15/09/2026",
    overdueDays: 2,
    amount: 10000,
    status: "Đã thanh toán",
    calculationDetail: "2 ngày quá hạn x 5.000 đ/ngày",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
  {
    id: "FINE-2026-001",
    bookTitle: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    bookId: "1",
    loanId: "LOAN-2026-018",
    barcode: "UL-BK-2024-01",
    reason: "Hư hỏng tài liệu",
    issueDate: "05/08/2026",
    dueDate: "01/08/2026",
    returnDate: "05/08/2026",
    amount: 50000,
    status: "Đã thanh toán",
    calculationDetail: "Phí phục chế và gia cố gáy tài liệu theo định mức",
    campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
  },
];

const initialPayments: PaymentItem[] = [
  {
    id: "TXN-2026-0912",
    fineId: "FINE-2026-002",
    fineReason: "Trả tài liệu trễ hạn (2 ngày)",
    bookTitle: "Trí tuệ nhân tạo và Học máy trong Chẩn đoán Y tế Chuyên sâu",
    amount: 10000,
    paymentDate: "16/09/2026 14:35",
    paymentMethod: "Chuyển khoản QR",
    status: "Thành công",
    receiptCode: "REC-2026-8831",
  },
  {
    id: "TXN-2026-0884",
    fineId: "FINE-2026-001",
    fineReason: "Phí phục chế gáy sách hư hỏng nhẹ",
    bookTitle: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    amount: 50000,
    paymentDate: "06/08/2026 09:15",
    paymentMethod: "Quầy Lưu hành",
    status: "Thành công",
    receiptCode: "REC-2026-7642",
  },
];

export default function FinesPage() {
  const [fines, setFines] = useState<FineItem[]>(initialFines);
  const [payments, setPayments] = useState<PaymentItem[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [selectedFineForPay, setSelectedFineForPay] = useState<FineItem | null>(null);
  const [isPayAllModalOpen, setIsPayAllModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "Chuyển khoản QR" | "Cổng VNPAY" | "UniPay Thẻ SV" | "Quầy Lưu hành"
  >("Chuyển khoản QR");

  const [selectedFineDetail, setSelectedFineDetail] = useState<FineItem | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculations
  const unpaidFines = fines.filter((f) => f.status === "Chưa thanh toán");
  const totalUnpaidAmount = unpaidFines.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaidAmount = fines
    .filter((f) => f.status === "Đã thanh toán")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Filtered Fines
  const filteredFines = fines.filter((item) => {
    const matchSearch =
      item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.loanId && item.loanId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.barcode && item.barcode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Handle single payment mock
  const handleConfirmSinglePayment = () => {
    if (!selectedFineForPay) return;

    const newPayment: PaymentItem = {
      id: `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fineId: selectedFineForPay.id,
      fineReason: selectedFineForPay.reason,
      bookTitle: selectedFineForPay.bookTitle,
      amount: selectedFineForPay.amount,
      paymentDate: new Date().toLocaleString("vi-VN"),
      paymentMethod: selectedPaymentMethod,
      status: "Thành công",
      receiptCode: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setFines((prev) =>
      prev.map((f) => (f.id === selectedFineForPay.id ? { ...f, status: "Đã thanh toán" } : f))
    );
    setPayments((prev) => [newPayment, ...prev]);
    setToastMessage(`Đã thanh toán khoản phí ${selectedFineForPay.id} (${selectedFineForPay.amount.toLocaleString()} đ) thành công qua ${selectedPaymentMethod}!`);
    setSelectedFineForPay(null);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Handle pay all mock
  const handleConfirmPayAll = () => {
    if (unpaidFines.length === 0) return;

    const newPayments: PaymentItem[] = unpaidFines.map((f, idx) => ({
      id: `TXN-2026-${Math.floor(1000 + Math.random() * 9000) + idx}`,
      fineId: f.id,
      fineReason: f.reason,
      bookTitle: f.bookTitle,
      amount: f.amount,
      paymentDate: new Date().toLocaleString("vi-VN"),
      paymentMethod: selectedPaymentMethod,
      status: "Thành công",
      receiptCode: `REC-2026-${Math.floor(1000 + Math.random() * 9000) + idx}`,
    }));

    setFines((prev) =>
      prev.map((f) => (f.status === "Chưa thanh toán" ? { ...f, status: "Đã thanh toán" } : f))
    );
    setPayments((prev) => [...newPayments, ...prev]);
    setToastMessage(`Đã tất toán toàn bộ ${unpaidFines.length} khoản nợ (${totalUnpaidAmount.toLocaleString()} đ) thành công!`);
    setIsPayAllModalOpen(false);
    setTimeout(() => setToastMessage(null), 5000);
  };

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
                { label: "Phí phạt & Khoản nợ" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Phí Phạt & Quản Lý Khoản Nợ Thư Viện
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Theo dõi minh bạch các khoản phí phát sinh từ việc sử dụng tài liệu trễ hạn, hư hỏng hoặc dịch vụ thư viện, lịch sử giao dịch và hỗ trợ thanh toán trực tuyến mô phỏng.
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
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent"
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
                className="px-space-md py-2 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/60 rounded-t-lg flex items-center gap-1.5"
              >
                <span>Phí phạt & Khoản nợ</span>
                {unpaidFines.length > 0 && (
                  <span className="px-1.5 py-0.5 text-xs font-semibold bg-[#FEE2E2] text-[#DC2626] rounded-full">
                    {unpaidFines.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </section>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-md">
            <div className="p-space-md bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-space-xs font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[22px]">check_circle</span>
                <span>{toastMessage}</span>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-[#166534] hover:opacity-70 p-1"
                aria-label="Đóng thông báo"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Overview Stats & Quick Action */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Total Debt Box */}
            <div
              className={`p-space-lg rounded-2xl border shadow-sm flex flex-col justify-between ${
                totalUnpaidAmount > 0
                  ? "bg-gradient-to-br from-[#FEF2F2] to-[#FFF1F2] border-[#FECACA]"
                  : "bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-[#BBF7D0]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Tổng phí đang nợ
                  </span>
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      totalUnpaidAmount > 0 ? "text-[#DC2626]" : "text-[#16A34A]"
                    }`}
                  >
                    {totalUnpaidAmount > 0 ? "account_balance_wallet" : "check_circle"}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    className={`font-headline-lg text-headline-lg font-bold ${
                      totalUnpaidAmount > 0 ? "text-[#DC2626]" : "text-[#16A34A]"
                    }`}
                  >
                    {totalUnpaidAmount.toLocaleString()}
                  </span>
                  <span className="font-title-sm text-title-sm font-semibold text-on-surface-variant">VNĐ</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {totalUnpaidAmount > 0
                    ? `Gồm ${unpaidFines.length} khoản phí quá hạn cần thanh toán`
                    : "Không có khoản nợ cần thanh toán. Thẻ hoạt động bình thường!"}
                </p>
              </div>

              {totalUnpaidAmount > 0 && (
                <div className="mt-4 pt-3 border-t border-[#FECACA]/60">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setIsPayAllModalOpen(true)}
                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    <span>Thanh toán toàn bộ ({totalUnpaidAmount.toLocaleString()} đ)</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Total Paid Box */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Tổng đã thanh toán
                  </span>
                  <span className="material-symbols-outlined text-[24px] text-secondary">
                    payments
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-primary">
                    {totalPaidAmount.toLocaleString()}
                  </span>
                  <span className="font-title-sm text-title-sm font-semibold text-on-surface-variant">VNĐ</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Đã hoàn tất thanh toán và cấp biên lai hợp lệ
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Số biên lai đã lưu:</span>
                <span className="font-bold text-primary">{payments.length} phiếu</span>
              </div>
            </div>

            {/* Waiting items count */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Khoản phí chờ xử lý
                  </span>
                  <span className="material-symbols-outlined text-[24px] text-[#D97706]">
                    pending_actions
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-primary">
                    {unpaidFines.length}
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface-variant">khoản</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Cần thanh toán trước khi mượn thêm hoặc gia hạn sách
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Quy tắc quá hạn:</span>
                <span className="font-medium text-secondary">5.000 đ/ngày/cuốn</span>
              </div>
            </div>
          </div>
        </section>

        {/* Fines Management Section */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-xl">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
            {/* Header & Filter Bar */}
            <div className="p-space-lg border-b border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low/50">
              <div>
                <h2 className="font-title-lg text-title-lg text-primary font-bold">
                  Danh Sách Khoản Phí Phát Sinh
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Chi tiết các khoản phí phạt trễ hạn, bồi hoàn và tình trạng thanh toán
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-space-xs">
                {/* Search */}
                <div className="relative min-w-[240px]">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm theo mã phí, tên sách..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/30"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/30 text-on-surface font-medium"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="Chưa thanh toán">Chưa thanh toán</option>
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                </select>
              </div>
            </div>

            {/* List / Table of Fines */}
            {filteredFines.length === 0 ? (
              <div className="py-space-2xl px-space-md text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-space-md">
                  <span className="material-symbols-outlined text-[32px]">receipt_long</span>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold">
                  Không tìm thấy khoản phí nào
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mt-1">
                  Không có bản ghi phí phạt nào phù hợp với điều kiện tìm kiếm hoặc bạn chưa có khoản nợ nào.
                </p>
                {(searchTerm || statusFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                    className="mt-space-md text-sm text-secondary font-medium hover:underline"
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/30">
                {filteredFines.map((item) => (
                  <div
                    key={item.id}
                    className="p-space-md md:p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md hover:bg-surface-container-lowest/80 transition-colors"
                  >
                    {/* Left: Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                          {item.id}
                        </span>
                        {item.status === "Chưa thanh toán" && (
                          <Badge variant="danger" size="sm">
                            Chưa thanh toán
                          </Badge>
                        )}
                        {item.status === "Đã thanh toán" && (
                          <Badge variant="success" size="sm">
                            Đã thanh toán
                          </Badge>
                        )}
                        {item.status === "Đang xử lý" && (
                          <Badge variant="warning" size="sm">
                            Đang xử lý
                          </Badge>
                        )}
                        <span className="text-xs text-on-surface-variant">
                          Ngày lập: <span className="font-medium text-on-surface">{item.issueDate}</span>
                        </span>
                      </div>

                      <div>
                        <h4 className="font-title-md text-title-md text-primary font-semibold hover:text-secondary transition-colors">
                          {item.bookTitle}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant mt-1">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-secondary">info</span>
                            Lý do: <strong className="text-on-surface font-semibold">{item.reason}</strong>
                          </span>
                          {item.calculationDetail && (
                            <span className="text-on-surface-variant">
                              Chi tiết: {item.calculationDetail}
                            </span>
                          )}
                          {item.loanId && (
                            <span>Phiếu mượn: <span className="font-mono text-primary font-medium">{item.loanId}</span></span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount & Actions */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-outline-variant/20">
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-on-surface-variant block">Số tiền phí:</span>
                        <span className={`font-title-lg text-title-lg font-bold ${
                          item.status === "Chưa thanh toán" ? "text-[#DC2626]" : "text-primary"
                        }`}>
                          {item.amount.toLocaleString()} <span className="text-xs font-normal">VNĐ</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFineDetail(item)}
                          className="text-xs"
                        >
                          Chi tiết
                        </Button>

                        {item.status === "Chưa thanh toán" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedFineForPay(item)}
                            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs"
                          >
                            <span className="material-symbols-outlined text-[16px]">credit_card</span>
                            <span>Thanh toán</span>
                          </Button>
                        )}

                        {item.bookId && (
                          <Link
                            href={`/tra-cuu/${item.bookId}`}
                            className="p-1.5 text-on-surface-variant hover:text-secondary rounded-lg hover:bg-surface-container-high transition-colors"
                            title="Xem trang tài liệu"
                          >
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Payment History & Policy Grid */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-xl grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Payment History List (2 cols) */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-space-lg">
            <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
              <div>
                <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[24px]">history_edu</span>
                  <span>Lịch Sử Giao Dịch & Biên Lai Điện Tử</span>
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Các khoản thanh toán đã hoàn tất đối soát và cấp hóa đơn hợp lệ
                </p>
              </div>
              <Badge variant="success" size="sm">
                {payments.length} Đã quyết toán
              </Badge>
            </div>

            {payments.length === 0 ? (
              <div className="py-space-xl text-center text-on-surface-variant text-sm">
                Chưa có giao dịch thanh toán nào được ghi nhận.
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/20 mt-space-xs">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary bg-surface-container-high px-2 py-0.5 rounded">
                          {p.id}
                        </span>
                        <Badge variant="success" size="sm">
                          {p.status}
                        </Badge>
                        <span className="text-xs text-on-surface-variant">{p.paymentDate}</span>
                      </div>
                      <p className="text-sm font-medium text-primary line-clamp-1">
                        {p.bookTitle || p.fineReason}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                        <span>Phương thức: <strong className="text-on-surface">{p.paymentMethod}</strong></span>
                        {p.receiptCode && (
                          <span>Biên lai: <span className="font-mono text-secondary font-medium">{p.receiptCode}</span></span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
                      <span className="font-title-md text-title-md font-bold text-[#16A34A]">
                        +{p.amount.toLocaleString()} đ
                      </span>
                      <button
                        onClick={() => setSelectedReceipt(p)}
                        className="px-2.5 py-1 text-xs text-secondary hover:bg-secondary/10 rounded-lg border border-secondary/30 font-medium transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">receipt</span>
                        <span>Biên lai</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Library Fine Policy & Instructions (1 col) */}
          <div className="space-y-space-md">
            <div className="bg-surface-container-low rounded-2xl border border-outline-variant/40 p-space-lg">
              <h3 className="font-title-md text-title-md text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D97706] text-[22px]">policy</span>
                <span>Quy Định & Biểu Phí Phạt</span>
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Theo Quy chế Hoạt động Thư viện Đại học ban hành 2026:
              </p>

              <div className="mt-4 space-y-3 text-xs text-on-surface-variant">
                <div className="p-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">schedule</span>
                  <div>
                    <strong className="text-on-surface block font-semibold">Trễ hạn sách thông thường:</strong>
                    <span>5.000 VNĐ / ngày / cuốn sách</span>
                  </div>
                </div>

                <div className="p-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#D97706] text-[18px] shrink-0 mt-0.5">auto_stories</span>
                  <div>
                    <strong className="text-on-surface block font-semibold">Giáo trình đặc biệt & Giới hạn:</strong>
                    <span>10.000 VNĐ / ngày / cuốn</span>
                  </div>
                </div>

                <div className="p-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#DC2626] text-[18px] shrink-0 mt-0.5">warning</span>
                  <div>
                    <strong className="text-on-surface block font-semibold">Hư hỏng hoặc Thất lạc:</strong>
                    <span>Bồi hoàn 100% giá bìa + Phí xử lý kỹ thuật 20.000 VNĐ</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong className="font-semibold block mb-1">Lưu ý quan trọng:</strong>
                Bạn đọc có khoản nợ quá hạn chưa thanh toán sẽ tạm thời không thể thực hiện thao tác gia hạn hoặc đăng ký mượn tài liệu mới.
              </div>
            </div>

            {/* Direct Support */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-space-md flex items-center justify-between">
              <div>
                <span className="text-xs text-on-surface-variant block">Cần khiếu nại hoặc hỗ trợ nộp phí?</span>
                <span className="text-sm font-bold text-primary">Quầy Dịch vụ Độc giả - Tầng 1</span>
              </div>
              <Link
                href="/the-thu-vien"
                className="text-xs text-secondary font-semibold hover:underline"
              >
                Hotline Thư viện
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* MODAL: Thanh toán 1 khoản phí (Mô phỏng) */}
      {selectedFineForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#DC2626]">credit_card</span>
                <span>Thanh Toán Khoản Phí</span>
              </h3>
              <button
                onClick={() => setSelectedFineForPay(null)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-surface-container-low rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Mã khoản phí:</span>
                  <span className="font-mono font-bold text-primary">{selectedFineForPay.id}</span>
                </div>
                <div className="font-semibold text-primary">{selectedFineForPay.bookTitle}</div>
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Lý do:</span>
                  <span className="text-on-surface">{selectedFineForPay.reason} ({selectedFineForPay.calculationDetail})</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-outline-variant/30 text-[#DC2626]">
                  <span>Số tiền thanh toán:</span>
                  <span>{selectedFineForPay.amount.toLocaleString()} VNĐ</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Chọn phương thức thanh toán (Mô phỏng):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "Chuyển khoản QR", label: "Chuyển khoản QR", icon: "qr_code_2" },
                    { id: "Cổng VNPAY", label: "Cổng VNPAY", icon: "account_balance" },
                    { id: "UniPay Thẻ SV", label: "Thẻ SV UniPay", icon: "badge" },
                    { id: "Quầy Lưu hành", label: "Tại Quầy Lưu hành", icon: "store" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(method.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                        selectedPaymentMethod === method.id
                          ? "border-secondary bg-secondary/10 text-secondary font-bold ring-2 ring-secondary/20"
                          : "border-outline-variant/50 hover:bg-surface-container-low text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{method.icon}</span>
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedPaymentMethod === "Chuyển khoản QR" && (
                <div className="p-3 bg-surface-container-low rounded-xl text-center space-y-2 border border-outline-variant/30">
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg border flex items-center justify-center">
                    <span className="material-symbols-outlined text-[80px] text-primary">qr_code_scanner</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-mono">
                    Nội dung CK: <strong className="text-primary">{selectedFineForPay.id} 2024001</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-space-xs border-t border-outline-variant/30">
              <Button variant="outline" size="sm" onClick={() => setSelectedFineForPay(null)}>
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmSinglePayment}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Xác nhận nộp phí (Mô phỏng)</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Thanh toán toàn bộ nợ */}
      {isPayAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#DC2626]">payments</span>
                <span>Tất Toán Toàn Bộ Khoản Nợ</span>
              </h3>
              <button
                onClick={() => setIsPayAllModalOpen(false)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-50/60 border border-red-200/60 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Số lượng khoản phí:</span>
                  <span className="font-bold text-primary">{unpaidFines.length} khoản</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#DC2626] pt-1 border-t border-red-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span>{totalUnpaidAmount.toLocaleString()} VNĐ</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Kênh thanh toán (Mô phỏng):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "Chuyển khoản QR", label: "Chuyển khoản QR", icon: "qr_code_2" },
                    { id: "Cổng VNPAY", label: "Cổng VNPAY", icon: "account_balance" },
                    { id: "UniPay Thẻ SV", label: "Thẻ SV UniPay", icon: "badge" },
                    { id: "Quầy Lưu hành", label: "Tại Quầy Lưu hành", icon: "store" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(method.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                        selectedPaymentMethod === method.id
                          ? "border-secondary bg-secondary/10 text-secondary font-bold ring-2 ring-secondary/20"
                          : "border-outline-variant/50 hover:bg-surface-container-low text-on-surface"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{method.icon}</span>
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-space-xs border-t border-outline-variant/30">
              <Button variant="outline" size="sm" onClick={() => setIsPayAllModalOpen(false)}>
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmPayAll}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Xác nhận tất toán ({totalUnpaidAmount.toLocaleString()} đ)</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Chi tiết khoản phí */}
      {selectedFineDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-space-lg space-y-space-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">receipt_long</span>
                <span>Chi Tiết Khoản Phí</span>
              </h3>
              <button
                onClick={() => setSelectedFineDetail(null)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Mã khoản phí:</span>
                <span className="font-mono font-bold text-primary">{selectedFineDetail.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Tài liệu liên quan:</span>
                <span className="font-medium text-primary text-right max-w-[220px] line-clamp-2">
                  {selectedFineDetail.bookTitle}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Mã phiếu mượn:</span>
                <span className="font-mono font-medium">{selectedFineDetail.loanId || "—"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Mã vạch tài liệu:</span>
                <span className="font-mono font-medium">{selectedFineDetail.barcode || "—"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Lý do phát sinh:</span>
                <span className="font-bold text-on-surface">{selectedFineDetail.reason}</span>
              </div>
              {selectedFineDetail.overdueDays && (
                <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Số ngày quá hạn:</span>
                  <span className="font-bold text-[#DC2626]">{selectedFineDetail.overdueDays} ngày</span>
                </div>
              )}
              {selectedFineDetail.calculationDetail && (
                <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                  <span className="text-on-surface-variant">Cách thức tính:</span>
                  <span className="text-on-surface font-medium">{selectedFineDetail.calculationDetail}</span>
                </div>
              )}
              <div className="flex justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Cơ sở ghi nhận:</span>
                <span className="text-on-surface">{selectedFineDetail.campus || "Cơ sở 1"}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold text-primary">
                <span>Tổng số tiền:</span>
                <span className="text-base text-[#DC2626]">{selectedFineDetail.amount.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-space-xs border-t border-outline-variant/30">
              <Button variant="primary" size="sm" onClick={() => setSelectedFineDetail(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Xem biên lai điện tử */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-space-lg space-y-space-md">
            <div className="text-center pb-space-sm border-b border-outline-variant/30">
              <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-primary font-bold">
                Biên Lai Thu Phí Điện Tử
              </h3>
              <p className="text-xs text-on-surface-variant font-mono">
                Số: {selectedReceipt.receiptCode || selectedReceipt.id}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Đơn vị thu:</span>
                <span className="font-medium text-primary">Thư viện Trung tâm ĐHQG</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Thời gian thanh toán:</span>
                <span className="font-medium text-on-surface">{selectedReceipt.paymentDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Khoản phí:</span>
                <span className="font-medium text-on-surface">{selectedReceipt.fineReason}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Phương thức:</span>
                <span className="font-medium text-on-surface">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-bold text-primary">
                <span>Số tiền đã thu:</span>
                <span className="text-[#16A34A]">{selectedReceipt.amount.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="p-2.5 bg-surface-container-low rounded-xl text-center text-xs text-on-surface-variant">
              Biên lai điện tử có giá trị đối soát và giải phóng nghĩa vụ mượn sách.
            </div>

            <div className="flex items-center justify-end gap-2 pt-space-xs border-t border-outline-variant/30">
              <Button variant="primary" size="sm" onClick={() => setSelectedReceipt(null)}>
                Đóng biên lai
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
