"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui";

export default function LibraryRegulationsPage() {
  const [activeTab, setActiveTab] = useState<"limits" | "conditions" | "reservation" | "overdue">("limits");

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
                { label: "Quy chế & Quy định Thư viện" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                  Chính Sách Lưu Thông & Quản Lý Bản Sao (Circulation Rules)
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Quy Định Mượn Trả & Hạn Mức Độc Giả
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Toàn bộ quy định, hạn mức số lượng sách, thời hạn mượn, chính sách gia hạn, quy chế hàng đợi đặt trước và mức phí phạt quá hạn được ban hành chính thức tại Trung tâm Học liệu & Thư viện UniLibrary.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-on-surface-variant bg-surface-container-lowest px-3 py-2 rounded-xl border border-surface-container-high shrink-0">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <span>Quy chuẩn: <strong className="text-primary font-bold">DacTa & SRS v1.0</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-container/60 mb-space-lg">
            <button
              onClick={() => setActiveTab("limits")}
              className={`px-4 py-2.5 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "limits"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>1. Hạn mức theo nhóm độc giả</span>
            </button>

            <button
              onClick={() => setActiveTab("conditions")}
              className={`px-4 py-2.5 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "conditions"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>2. Điều kiện mượn & Thẻ thư viện</span>
            </button>

            <button
              onClick={() => setActiveTab("reservation")}
              className={`px-4 py-2.5 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "reservation"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">event_seat</span>
              <span>3. Quy định Đặt trước (FIFO)</span>
            </button>

            <button
              onClick={() => setActiveTab("overdue")}
              className={`px-4 py-2.5 rounded-xl font-title-sm text-title-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "overdue"
                  ? "bg-primary text-on-primary font-bold shadow-sm"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span>4. Xử lý Quá hạn & Phí phạt</span>
            </button>
          </div>

          {/* TAB 1: HẠN MỨC ĐỘC GIẢ (US03) */}
          {activeTab === "limits" && (
            <div className="space-y-6">
              <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 border border-surface-container-high shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container mb-6">
                  <div>
                    <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                      Căn cứ tài liệu: US03 & SRS [FR-CIR-01]
                    </span>
                    <h2 className="font-headline-sm text-xl lg:text-2xl text-primary font-bold mt-0.5">
                      Bảng Cấu Hình Hạn Mức Mượn Trả Tiêu Chuẩn (Default Policy Matrix)
                    </h2>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-surface-container-high bg-surface-container-low/70">
                        <th className="py-3.5 px-4 font-bold text-primary">Nhóm Độc Giả (Role)</th>
                        <th className="py-3.5 px-4 font-bold text-primary">Số Sách Tối Đa</th>
                        <th className="py-3.5 px-4 font-bold text-primary">Thời Hạn Mượn</th>
                        <th className="py-3.5 px-4 font-bold text-primary">Số Lần Gia Hạn</th>
                        <th className="py-3.5 px-4 font-bold text-primary">Mức Phạt Trễ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-primary">
                          Sinh viên Đại học (<code className="text-secondary">STUDENT</code>)
                        </td>
                        <td className="py-4 px-4 font-bold text-on-surface">5 cuốn</td>
                        <td className="py-4 px-4 font-medium text-on-surface">14 ngày</td>
                        <td className="py-4 px-4 text-on-surface">
                          <span className="inline-flex items-center gap-1 bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full text-xs font-semibold">
                            2 lần (+14 ngày/lần)
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono font-semibold text-[#DC2626]">
                          5.000 đ/cuốn/ngày
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-primary">
                          Học viên Cao học (<code className="text-secondary">STUDENT/K31</code>)
                        </td>
                        <td className="py-4 px-4 font-bold text-on-surface">8 cuốn</td>
                        <td className="py-4 px-4 font-medium text-on-surface">30 ngày</td>
                        <td className="py-4 px-4 text-on-surface">
                          <span className="inline-flex items-center gap-1 bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full text-xs font-semibold">
                            2 lần (+14 ngày/lần)
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono font-semibold text-[#DC2626]">
                          5.000 đ/cuốn/ngày
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-primary">
                          Giảng viên / Cán bộ (<code className="text-secondary">STAFF/FACULTY</code>)
                        </td>
                        <td className="py-4 px-4 font-bold text-on-surface">12 cuốn</td>
                        <td className="py-4 px-4 font-medium text-on-surface">60 ngày</td>
                        <td className="py-4 px-4 text-on-surface">
                          <span className="inline-flex items-center gap-1 bg-secondary-fixed text-secondary px-2 py-0.5 rounded-full text-xs font-semibold">
                            3 lần (+30 ngày/lần)
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono font-semibold text-[#DC2626]">
                          2.000 đ/cuốn/ngày
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-primary">
                          Thành viên Khách ngoài (<code className="text-secondary">GUEST</code>)
                        </td>
                        <td className="py-4 px-4 font-bold text-on-surface">2 cuốn (Chỉ đọc)</td>
                        <td className="py-4 px-4 font-medium text-on-surface">1 ngày (Trong ngày)</td>
                        <td className="py-4 px-4 text-on-surface-variant text-xs">
                          0 lần (Không gia hạn)
                        </td>
                        <td className="py-4 px-4 font-mono font-semibold text-[#DC2626]">
                          10.000 đ/cuốn/ngày
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-surface-container-low/60 border border-surface-container text-xs text-on-surface-variant leading-relaxed">
                  <strong>Nguyên tắc áp dụng chính sách:</strong> Khi quản trị viên cập nhật cấu hình, quy tắc mới sẽ áp dụng ngay cho các giao dịch mượn mới phát sinh. Các phiếu mượn đang diễn ra vẫn giữ nguyên hạn trả và mức phạt đã ấn định tại thời điểm lập phiếu (Quy tắc BR-POL-01 & BR-POL-02).
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ĐIỀU KIỆN MƯỢN (FR-CIR-01) */}
          {activeTab === "conditions" && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 border border-surface-container-high shadow-sm space-y-6">
              <div className="pb-4 border-b border-surface-container">
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                  Căn cứ tài liệu: SRS [FR-CIR-01] & DacTa UC08
                </span>
                <h2 className="font-headline-sm text-xl lg:text-2xl text-primary font-bold mt-0.5">
                  Điều Kiện Hợp Lệ Khi Lập Phiếu Mượn Sách
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container">
                  <div className="flex items-center gap-2 font-bold text-primary mb-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                    <span>1. Trạng thái Thẻ Độc Giả</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Thẻ thư viện số phải còn hạn sử dụng, đã kích hoạt RFID/Barcode và không bị tạm khóa do vi phạm nội quy thư viện.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container">
                  <div className="flex items-center gap-2 font-bold text-primary mb-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">library_books</span>
                    <span>2. Hạn mức mượn còn lại</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Tổng số sách đang mượn cộng với số sách mượn mới phải nhỏ hơn hoặc bằng hạn mức quy định của nhóm độc giả (ví dụ: Sinh viên tối đa 5 cuốn).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container">
                  <div className="flex items-center gap-2 font-bold text-primary mb-2">
                    <span className="material-symbols-outlined text-[#DC2626] text-[22px]">event_busy</span>
                    <span>3. Không có sách quá hạn</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Độc giả không được có bất kỳ cuốn sách nào đã quá hạn trả mà chưa hoàn trả về thư viện. Toàn bộ sách quá hạn phải được trả trước khi mượn cuốn mới.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container">
                  <div className="flex items-center gap-2 font-bold text-primary mb-2">
                    <span className="material-symbols-outlined text-[#D97706] text-[22px]">payments</span>
                    <span>4. Ngưỡng nợ phí phạt</span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Tổng công nợ phí phạt chưa nộp không được vượt quá <strong>50.000 VNĐ</strong>. Nếu vượt quá, hệ thống sẽ tạm khóa quyền mượn sách đến khi thanh toán xong.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs">
                <strong>Tài liệu không mượn về nhà:</strong> Các tài liệu đọc tại chỗ gồm Sách lưu chiểu đặc biệt, Từ điển chuyên ngành, Luận án tiến sĩ lưu kho và Báo/Tạp chí số hiện hành chỉ phục vụ đọc tại phòng đọc thư viện.
              </div>
            </div>
          )}

          {/* TAB 3: QUY ĐỊNH ĐẶT TRƯỚC (US11 & FR-RES-01, 02) */}
          {activeTab === "reservation" && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 border border-surface-container-high shadow-sm space-y-6">
              <div className="pb-4 border-b border-surface-container">
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                  Căn cứ tài liệu: US11 & SRS [FR-RES-01, 02]
                </span>
                <h2 className="font-headline-sm text-xl lg:text-2xl text-primary font-bold mt-0.5">
                  Quy Định Đặt Trước Sách & Hàng Đợi Ưu Tiên FIFO
                </h2>
              </div>

              <div className="space-y-4 text-sm text-on-surface">
                <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">filter_1</span>
                  <div>
                    <h4 className="font-bold text-primary mb-0.5">Điều kiện cho phép đặt trước:</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      Chỉ cho phép độc giả bấm "Đặt trước" khi toàn bộ bản sao vật lý của đầu sách đó đều đang được người khác mượn (<code>availableCopies = 0</code>). Nếu sách đang còn trên kệ, hệ thống yêu cầu độc giả đến mượn trực tiếp mà không cần đặt trước.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">filter_2</span>
                  <div>
                    <h4 className="font-bold text-primary mb-0.5">Hàng đợi FIFO tự động:</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      Độc giả đăng ký đặt trước được xếp vào hàng đợi ưu tiên theo thứ tự thời gian (First In, First Out). Độc giả có thể theo dõi vị trí hàng đợi (#1, #2...) và ngày dự kiến có sách tại trang "Đặt trước của tôi".
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">filter_3</span>
                  <div>
                    <h4 className="font-bold text-primary mb-0.5">Kích hoạt giữ chỗ & Giới hạn 48 giờ:</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      Ngay khi một bản sao được trả về thư viện, hệ thống tự động gán cuốn sách đó sang trạng thái <code>RESERVED</code> cho người đứng đầu hàng đợi, gửi thông báo và hẹn giữ chỗ tối đa trong <strong>48 giờ</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-surface-container flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">filter_4</span>
                  <div>
                    <h4 className="font-bold text-primary mb-0.5">Tự động hủy khi quá hạn:</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      Sau 48 giờ nếu độc giả không đến nhận sách tại quầy lưu thông, hệ thống sẽ tự động hủy quyền giữ chỗ và tự động chuyển giao tài liệu cho độc giả kế tiếp trong hàng đợi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUÁ HẠN & PHÍ PHẠT (FR-CIR-02, US09) */}
          {activeTab === "overdue" && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 border border-surface-container-high shadow-sm space-y-6">
              <div className="pb-4 border-b border-surface-container">
                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider">
                  Căn cứ tài liệu: SRS [FR-CIR-02] & DacTa UC09, UC14
                </span>
                <h2 className="font-headline-sm text-xl lg:text-2xl text-primary font-bold mt-0.5">
                  Xử Lý Quá Hạn, Phí Phạt & Bồi Thường Tài Liệu
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FEE2E2]/50 border border-[#FECACA] space-y-2">
                  <div className="flex items-center gap-2 text-[#991B1B] font-bold">
                    <span className="material-symbols-outlined text-[22px]">calculate</span>
                    <span>Công thức tính phí quá hạn</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/80 font-mono text-xs text-[#991B1B] font-semibold">
                    Tiền phạt = Số ngày trễ × 5.000 đ/ngày/cuốn
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    Áp dụng cho Sinh viên và Học viên cao học. Đối với Giảng viên và Cán bộ nghiên cứu, mức phạt là 2.000 đ/ngày/cuốn.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined text-secondary text-[22px]">notification_important</span>
                    <span>Cảnh báo trước 2 ngày</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Hệ thống Cron worker tự động quét kho sách hàng đêm lúc 00:00 và gửi Email/Notification nhắc nhở độc giả trước ngày đến hạn 2 ngày để độc giả kịp thời gia hạn hoặc hoàn trả.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined text-secondary text-[22px]">lock</span>
                    <span>Khóa thẻ khi nợ phạt &gt; 50.000đ</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Độc giả có tổng tiền phạt trễ hạn vượt quá 50.000 VNĐ sẽ bị hệ thống tạm khóa quyền mượn sách mới và quyền gia hạn cho đến khi thanh toán xong khoản nợ.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-surface-container space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined text-secondary text-[22px]">menu_book</span>
                    <span>Bồi thường sách hỏng hoặc mất</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Trường hợp làm mất hoặc làm rách, hư hỏng không phục hồi được tài liệu: Bồi thường <strong>100% giá trị sách hiện hành</strong> cộng thêm <strong>30.000 VNĐ</strong> chi phí nghiệp vụ biên mục và dán chip RFID mới.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
