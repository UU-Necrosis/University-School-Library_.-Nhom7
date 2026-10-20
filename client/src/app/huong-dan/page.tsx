"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui";

interface GuideStep {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  icon: string;
  badge: string;
  details: string[];
  tips: string;
  ctaText?: string;
  ctaHref?: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Cách Tìm Sách (Tra Cứu OPAC)",
    shortDesc: "Truy xuất danh mục học thuật bằng từ khóa, nhan đề, tác giả, mã DDC hoặc ký hiệu xếp giá Call Number.",
    icon: "search",
    badge: "Tra cứu trực tuyến 24/7",
    details: [
      "Nhập nhan đề, tên tác giả, chuyên ngành hoặc từ khóa vào thanh tìm kiếm trên trang chủ hoặc trang Tra cứu OPAC.",
      "Sử dụng bộ lọc phân vùng: Tìm theo Sách in, Ebook PDF, Luận án Tiến sĩ hoặc Tạp chí nghiên cứu Scopus.",
      "Kiểm tra vị trí kệ thực tế: Xem chính xác Tầng, Phòng đọc, Dãy kệ và Ký hiệu xếp giá (ví dụ: HB 137 .N573K 2024).",
      "Xem số lượng bản sao có sẵn trên kệ (Real-time Availability) tại Cơ sở 1 hoặc Cơ sở 2.",
    ],
    tips: "Mẹo: Bạn có thể tìm nhanh sách theo thể loại ở mục 'Danh mục sách' hoặc tìm theo học giả ở mục 'Tác giả' tại menu bên trái.",
    ctaText: "Đến trang Tra cứu OPAC",
    ctaHref: "/tra-cuu",
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Cách Đặt Sách & Đăng Ký Giữ Chỗ (FIFO Queue)",
    shortDesc: "Chủ động giữ chỗ tài liệu trước khi đến thư viện hoặc xếp hàng tự động khi sách chuyên ngành đang mượn hết.",
    icon: "bookmark_add",
    badge: "Hàng đợi tự động",
    details: [
      "Truy cập mục 'Đặt sách' ở menu trái hoặc bấm 'Đặt trước' ngay trên trang chi tiết sách.",
      "Trường hợp sách hết bản in trên kệ (Available = 0): Hệ thống tự động ghi danh bạn vào hàng đợi ưu tiên FIFO (Vị trí #1, #2...).",
      "Chọn địa điểm nhận sách: Cơ sở 1 (Khuôn viên Trung tâm) hoặc Cơ sở 2 (Khu Công nghệ Cao).",
      "Xác nhận yêu cầu: Theo dõi trạng thái đặt trước và vị trí hàng đợi bất kỳ lúc nào tại mục 'Đặt trước của tôi' trong popup tài khoản avatar.",
    ],
    tips: "Lưu ý: Nếu sách đang có sẵn trên kệ, bạn có thể đến mượn trực tiếp tại thư viện mà không bắt buộc phải đặt trước.",
    ctaText: "Mở trang Đặt sách",
    ctaHref: "/dat-sach",
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Cách Nhận Sách Đã Giữ Chỗ",
    shortDesc: "Nhận thông báo mời lấy tài liệu và thời hạn giữ chỗ 48 giờ tại quầy lưu thông thư viện.",
    icon: "inventory_2",
    badge: "Giữ chỗ tối đa 48 giờ",
    details: [
      "Khi có độc giả khác hoàn trả sách, hệ thống tự động gán bản sao sang trạng thái 'Sẵn sàng nhận' (RESERVED) cho người đứng đầu hàng đợi.",
      "Hệ thống gửi thông báo giữ chỗ kèm thời hạn cụ thể (tối đa 48 giờ kể từ khi thông báo).",
      "Độc giả đến Quầy Lưu thông tại cơ sở đã chọn, mở ứng dụng và xuất trình Thẻ Thư viện Số (mã QR/RFID).",
      "Thủ thư quét mã thẻ và bàn giao sách đã được lưu giữ sẵn.",
    ],
    tips: "Quan trọng: Sau 48 giờ nếu độc giả không đến nhận, hệ thống sẽ tự động hủy giữ chỗ và chuyển quyền ưu tiên cho độc giả tiếp theo trong hàng đợi.",
    ctaText: "Kiểm tra Đặt trước của tôi",
    ctaHref: "/the-thu-vien/dat-truoc",
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Quy Trình Mượn Sách Tại Quầy",
    shortDesc: "Thủ tục mượn tài liệu nhanh chóng bằng Thẻ Thư viện số định danh và mã Barcode/RFID cá biệt.",
    icon: "badge",
    badge: "Thẻ số định danh",
    details: [
      "Lấy sách từ kệ tài liệu hoặc từ bàn giữ chỗ đặt trước mang đến Quầy Lưu thông.",
      "Xuất trình Thẻ Thư viện số trên điện thoại cho thủ thư.",
      "Hệ thống tự động kiểm tra điều kiện: Thẻ còn hạn, số lượng sách đang mượn chưa vượt hạn mức (Sinh viên: 5 cuốn, Cao học: 8 cuốn, Giảng viên: 12 cuốn) và không nợ phạt quá hạn trên 50.000đ.",
      "Thủ thư quét mã Barcode/RFID cá biệt của từng cuốn sách, hoàn tất lập phiếu mượn và cập nhật hạn trả.",
    ],
    tips: "Bạn có thể kiểm tra danh sách sách đang mượn và ngày đến hạn tại mục 'Sách đang mượn' trong popup avatar.",
    ctaText: "Xem Thẻ thư viện số",
    ctaHref: "/the-thu-vien",
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Cách Gia Hạn Sách Trực Tuyến (Online Renewal)",
    shortDesc: "Tự động gia hạn thời hạn mượn thêm 14 ngày trực tiếp trên website mà không cần mang sách đến quầy.",
    icon: "autorenew",
    badge: "Thêm 14 ngày/lần",
    details: [
      "Đăng nhập tài khoản, bấm vào Avatar góc phải và chọn 'Sách đang mượn và gia hạn'.",
      "Tìm cuốn sách cần gia hạn và bấm nút 'Gia hạn' trước ngày đến hạn trả.",
      "Điều kiện gia hạn trực tuyến: Sách chưa bị quá hạn, tổng số lần gia hạn chưa quá 2 lần (đối với Sinh viên / Cao học), và đầu sách đó KHÔNG có ai đang đợi trong Hàng đợi Đặt trước (No Holds).",
      "Hệ thống ngay lập tức cộng thêm 14 ngày vào thời hạn trả mới và hiển thị thông báo xác nhận thành công.",
    ],
    tips: "Nếu sách đã quá hạn hoặc có người khác đặt trước, hệ thống sẽ từ chối gia hạn online. Bạn vui lòng mang sách đến quầy để làm thủ tục hoàn trả.",
    ctaText: "Đến trang Gia hạn sách",
    ctaHref: "/the-thu-vien",
  },
  {
    id: "step-6",
    stepNumber: "06",
    title: "Quy Trình Trả Sách & Xử Lý Quá Hạn",
    shortDesc: "Hoàn trả tài liệu tại quầy, kiểm tra bản in và nộp phí quá hạn minh bạch nếu trả chậm.",
    icon: "assignment_return",
    badge: "Phạt 5.000đ/ngày/cuốn",
    details: [
      "Mang tài liệu đến Quầy Lưu thông tại Cơ sở 1 hoặc Cơ sở 2 (hoặc thả vào Hòm trả sách 24/7 ngoài giờ mở cửa).",
      "Thủ thư quét mã bản sao Barcode/RFID để cập nhật sách về trạng thái 'Có sẵn' (AVAILABLE) hoặc gán cho người đặt trước kế tiếp.",
      "Nếu trả trễ hạn: Hệ thống tự động tính tiền phạt theo công thức: Tiền phạt = Số ngày trễ × 5.000đ/ngày/cuốn (Giảng viên: 2.000đ/ngày/cuốn).",
      "Thanh toán phí phạt: Nộp trực tiếp tiền mặt tại quầy lưu thông hoặc quét mã QR thanh toán trực tuyến qua cổng điện tử.",
    ],
    tips: "Nếu tài liệu bị thất lạc hoặc hư hỏng trang sách: Bồi thường 100% giá trị sách theo quy định cộng 30.000đ chi phí nghiệp vụ biên mục lại.",
    ctaText: "Xem Quy định chi tiết",
    ctaHref: "/quy-dinh",
  },
];

export default function GuideDirectoryPage() {
  const [activeStepId, setActiveStepId] = useState<string>("step-1");

  const currentStep = GUIDE_STEPS.find((s) => s.id === activeStepId) || GUIDE_STEPS[0];

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
                { label: "Hướng dẫn sử dụng thư viện" },
              ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-wider font-semibold">
                  Quy Trình Vận Hành & Hỗ Trợ Độc Giả Toàn Diện
                </span>
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Hướng Dẫn Khai Thác & Mượn Trả Tài Liệu
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Cẩm nang chi tiết 6 bước từ tra cứu, đặt sách, nhận sách, mượn tại quầy, gia hạn online đến trả sách và xử lý vi phạm quá hạn chuẩn theo hệ thống UniLibrary.
                </p>
              </div>

              <Link
                href="/quy-dinh"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-title-sm text-title-sm transition-colors shrink-0 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <span>Xem Quy định & Hạn mức</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6 Steps Navigation & Content */}
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg">
          {/* Steps Horizontal Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-space-lg">
            {GUIDE_STEPS.map((step) => {
              const isActive = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? "bg-surface-container-low border-secondary shadow-md ring-2 ring-secondary/30"
                      : "bg-surface-container-lowest border-surface-container-high hover:border-secondary/40 hover:bg-surface-container/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                        isActive ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-primary"
                      }`}
                    >
                      Bước {step.stepNumber}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isActive ? "text-secondary" : "text-on-surface-variant"
                      }`}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <h4 className={`font-title-sm text-xs font-bold line-clamp-2 ${isActive ? "text-primary" : "text-on-surface"}`}>
                    {step.title.replace(/^Cách |^Quy Trình /i, "")}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Content Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 border border-surface-container-high shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-container">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-[28px]">{currentStep.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-secondary bg-secondary-fixed px-2.5 py-0.5 rounded-full">
                      BƯỚC {currentStep.stepNumber}
                    </span>
                    <span className="text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                      {currentStep.badge}
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-xl lg:text-2xl text-primary font-bold">
                    {currentStep.title}
                  </h2>
                  <p className="font-body-md text-on-surface-variant text-sm mt-1">
                    {currentStep.shortDesc}
                  </p>
                </div>
              </div>

              {currentStep.ctaHref && currentStep.ctaText && (
                <Link
                  href={currentStep.ctaHref}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-secondary hover:bg-primary text-on-secondary font-title-sm text-title-sm font-semibold transition-colors shrink-0 shadow-xs"
                >
                  <span>{currentStep.ctaText}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              )}
            </div>

            {/* Step Checkpoints List */}
            <div className="py-6 space-y-4">
              <h3 className="font-title-md text-title-md text-primary font-bold">
                Các bước thực hiện chi tiết:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStep.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface-container-low/50 border border-surface-container flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-on-surface leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip Box */}
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] flex items-start gap-3 text-sm">
              <span className="material-symbols-outlined text-[22px] text-[#2563EB] shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <div>
                <strong className="block font-semibold mb-0.5">Lưu ý nghiệp vụ:</strong>
                <p className="text-xs leading-relaxed">{currentStep.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
