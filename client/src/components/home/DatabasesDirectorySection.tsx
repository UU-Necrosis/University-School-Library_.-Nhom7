"use client";

import React from "react";
import { DatabaseBadgeItem } from "@/types/library";

const mockDatabases: DatabaseBadgeItem[] = [
  {
    id: "db1",
    name: "Scopus®",
    provider: "Chỉ mục trích dẫn",
    badgeType: "Truy cập ngay",
    url: "#scopus",
  },
  {
    id: "db2",
    name: "Web of Science",
    provider: "Clarivate Analytics",
    badgeType: "Truy cập ngay",
    url: "#wos",
  },
  {
    id: "db3",
    name: "IEEE Xplore",
    provider: "Kỹ thuật & Tin học",
    badgeType: "Toàn văn",
    url: "#ieee",
  },
  {
    id: "db4",
    name: "ScienceDirect",
    provider: "Elsevier B.V.",
    badgeType: "Toàn văn",
    url: "#sciencedirect",
  },
  {
    id: "db5",
    name: "SpringerLink",
    provider: "Springer Nature",
    badgeType: "E-Books & Journal",
    url: "#springer",
  },
  {
    id: "db6",
    name: "WILEY",
    provider: "Online Library",
    badgeType: "Toàn văn",
    url: "#wiley",
  },
  {
    id: "db7",
    name: "Taylor & Francis",
    provider: "Khoa học Xã hội",
    badgeType: "Đăng nhập từ xa",
    url: "#tf",
  },
];

export const DatabasesDirectorySection: React.FC = () => {
  return (
    <section className="w-full py-space-xl bg-surface-container-low" id="csdl">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        {/* Section Header & IP Proxy Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider block mb-space-xs">
              Cơ Sở Dữ Liệu Học Thuật Toàn Cầu
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Cổng Truy Cập Nhà Xuất Bản & Chỉ Mục Scopus / ISI
            </h2>
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm border border-outline-variant/30">
            <span className="material-symbols-outlined text-[20px] text-secondary">vpn_key</span>
            <div className="font-body-sm text-body-sm">
              <span className="text-on-surface font-semibold">Tự động kết nối:</span>
              <span className="text-on-surface-variant"> Nhận diện IP trường ĐHQG TP.HCM</span>
            </div>
          </div>
        </div>

        {/* Publisher Badges Mosaic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-space-md">
          {mockDatabases.map((db) => (
            <a
              key={db.id}
              href={db.url}
              className="flex flex-col items-center justify-center rounded-xl bg-surface-container-lowest p-space-md text-center shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 group"
            >
              <div className="h-10 flex items-center justify-center mb-space-xs text-primary font-bold tracking-tight text-base">
                {db.name}
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">
                {db.provider}
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold mt-space-xs group-hover:underline">
                {db.badgeType}
              </span>
            </a>
          ))}
        </div>

        {/* Off-campus Access Helper Note */}
        <div className="mt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm rounded-lg bg-surface-container p-space-md">
          <div className="flex items-center gap-space-sm text-on-surface font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
            <span>
              Đang làm việc tại nhà hoặc ngoài khuôn viên trường? Sử dụng <strong>VPN ĐHQG</strong> hoặc tài khoản <strong>EZProxy</strong> để đọc bài báo miễn phí.
            </span>
          </div>
          <a
            href="#ezproxy"
            className="inline-flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm whitespace-nowrap"
          >
            <span>Hướng dẫn cài đặt EZProxy</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
};
