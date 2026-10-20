"use client";

import React from "react";
import Link from "next/link";
import { ServiceCardItem } from "@/types/library";

const mockServices: (ServiceCardItem & { href: string })[] = [
  {
    id: "1",
    title: "Mượn & Gia hạn trực tuyến",
    description: "Theo dõi tình trạng sách đang mượn, kiểm tra hạn trả và thực hiện gia hạn trực tuyến tiện lợi cho độc giả.",
    icon: "autorenew",
    badge: "Lưu thông số",
    badgeColor: "bg-surface-container-high text-primary",
    detail: "Chính sách mượn trả",
    detailStatus: "Tối đa 2 lần gia hạn",
    detailStatusColor: "text-secondary",
    actionText: "Quản lý sách mượn",
    href: "/the-thu-vien",
  },
  {
    id: "2",
    title: "Đặt trước & Hàng đợi FIFO",
    description: "Tự động xếp hàng ưu tiên khi tài liệu chuyên ngành mượn hết. Giữ chỗ tài liệu tối đa 48 giờ khi sách về.",
    icon: "bookmark_add",
    badge: "Hàng đợi tự động",
    badgeColor: "bg-[#DCFCE7] text-[#166534]",
    detail: "Đăng ký giữ chỗ",
    detailStatus: "48h giữ chỗ",
    detailStatusColor: "text-[#16A34A]",
    actionText: "Tìm & Đặt sách ngay",
    href: "/dat-sach",
  },
  {
    id: "3",
    title: "Danh mục sách & Thể loại DDC",
    description: "Khám phá các đầu sách theo chuyên ngành: Kinh tế, Công nghệ, Khoa học, Văn học và Truyện tranh graphic novels.",
    icon: "category",
    badge: "Chuẩn DDC",
    badgeColor: "bg-surface-container-high text-primary",
    detail: "5 thể loại chính",
    detailStatus: "Cập nhật liên tục",
    detailStatusColor: "text-secondary",
    actionText: "Xem toàn bộ danh mục",
    href: "/danh-muc",
  },
  {
    id: "4",
    title: "Hướng dẫn & Quy chế bạn đọc",
    description: "Tra cứu hạn mức mượn trả theo nhóm độc giả, quy tắc gia hạn và mức phí phạt quá hạn minh bạch.",
    icon: "gavel",
    badge: "Chính sách chuẩn",
    badgeColor: "bg-surface-container-high text-primary",
    detail: "Phân quyền độc giả",
    detailStatus: "Minh bạch",
    detailStatusColor: "text-[#16A34A]",
    actionText: "Xem quy định thư viện",
    href: "/quy-dinh",
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="w-full py-space-xl bg-surface" id="dich-vu-doc-gia">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider block mb-space-xs">
              Cổng Tiện Ích Độc Giả
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Dịch Vụ Lưu Thông & Thao Tác Trực Tuyến
            </h2>
          </div>
          <Link
            href="/huong-dan"
            className="inline-flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm mt-space-sm md:mt-0"
          >
            <span>Xem quy trình & hướng dẫn độc giả</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {mockServices.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-xs hover:shadow-md transition-shadow border border-outline-variant/30"
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
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-space-sm border-t border-surface-container">
                <div className="flex items-center justify-between text-xs mb-space-xs">
                  <span className="text-on-surface-variant font-medium">{srv.detail}</span>
                  <span className={`font-semibold ${srv.detailStatusColor}`}>{srv.detailStatus}</span>
                </div>
                <Link
                  href={srv.href}
                  className="w-full text-center py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm text-xs font-semibold block transition-colors"
                >
                  {srv.actionText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
