"use client";

import React from "react";
import { ServiceCardItem } from "@/types/library";

const mockServices: ServiceCardItem[] = [
  {
    id: "1",
    title: "Mượn / Gia hạn trực tuyến",
    description: "Hiện có 3 tài liệu đang mượn. Kiểm tra tình trạng, nộp phí quá hạn và gia hạn nhanh chỉ trong 1 thao tác.",
    icon: "autorenew",
    badge: "1 cuốn sắp hạn",
    badgeColor: "bg-[#FEF3C7] text-[#92400E]",
    detail: "Deep Learning (Goodfellow)",
    detailStatus: "Còn 2 ngày",
    detailStatusColor: "text-[#DC2626]",
    actionText: "Gia hạn tài liệu ngay",
  },
  {
    id: "2",
    title: "Đặt phòng nghiên cứu & thảo luận",
    description: "Phòng cách âm nhóm (4-12 người), trang bị màn hình thông minh 75 inch và bảng trắng chuyên dụng.",
    icon: "meeting_room",
    badge: "12/16 phòng trống",
    badgeColor: "bg-[#DCFCE7] text-[#166534]",
    detail: "Tầng 3 • Phòng A3.04 (8 chỗ)",
    detailStatus: "Trống từ 14:00",
    detailStatusColor: "text-[#16A34A]",
    actionText: "Xem lịch & giữ chỗ",
  },
  {
    id: "3",
    title: "Hỗ trợ Nghiên cứu & Trích dẫn",
    description: "Hướng dẫn chuẩn trích dẫn APA 7, IEEE, MLA. Hỗ trợ tài khoản kiểm tra độ trùng lặp nội dung Turnitin và iThenticate.",
    icon: "format_quote",
    badge: "Học thuật 1:1",
    badgeColor: "bg-surface-container-high text-primary",
    detail: "Turnitin Check ID: Có sẵn 3 slot",
    detailStatus: "Miễn phí",
    detailStatusColor: "text-secondary",
    actionText: "Đặt lịch tư vấn thủ thư",
  },
  {
    id: "4",
    title: "Thư viện số Liên Đại học",
    description: "Mượn tài liệu in liên thư viện (ILL) và chia sẻ kho học liệu điện tử độc quyền từ khối Đại học Quốc gia và ĐH Bách Khoa.",
    icon: "hub",
    badge: "Mạng lưới 18 ĐH",
    badgeColor: "bg-surface-container-high text-primary",
    detail: "Thời gian giao sách: 24 - 48h",
    detailStatus: "Toàn quốc",
    detailStatusColor: "text-[#16A34A]",
    actionText: "Yêu cầu mượn liên trường",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="w-full py-space-xl bg-surface" id="dat-phong">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider block mb-space-xs">
              Cổng Tiện Ích Độc Giả
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Dịch Vụ Nổi Bật & Thao Tác Trực Tuyến
            </h2>
          </div>
          <a href="#services" className="inline-flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm mt-space-sm md:mt-0">
            <span>Xem biểu phí & toàn bộ dịch vụ</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {mockServices.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container text-primary">
                    <span className="material-symbols-outlined text-[26px]">{srv.icon}</span>
                  </div>
                  <span className={`rounded-full px-space-sm py-0.5 font-label-sm text-label-sm font-semibold ${srv.badgeColor}`}>
                    {srv.badge}
                  </span>
                </div>
                <h3 className="font-title-lg text-title-lg text-primary mb-space-xs font-bold">
                  {srv.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  {srv.description}
                </p>

                <div className="bg-surface-container-low rounded-lg p-space-sm mb-space-md">
                  <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                    <span className="truncate pr-2 font-medium">{srv.detail}</span>
                    <span className={`font-semibold text-xs whitespace-nowrap ${srv.detailStatusColor}`}>
                      {srv.detailStatus}
                    </span>
                  </div>
                </div>
              </div>

              <a href="#action" className="inline-flex items-center justify-between text-secondary hover:text-primary font-title-sm text-title-sm pt-space-xs group">
                <span>{srv.actionText}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
