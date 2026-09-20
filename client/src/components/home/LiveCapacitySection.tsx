"use client";

import React from "react";

export const LiveCapacitySection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="rounded-xl bg-primary text-on-primary p-space-lg lg:p-space-xl shadow-md">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg mb-space-lg">
            <div>
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#16A34A]"></span>
                </span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary-fixed">
                  Trực tiếp thời gian thực • Cập nhật lúc 10:45
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary-fixed font-bold">
                Tình Trạng Vận Hành & Công Suất Không Gian
              </h2>
            </div>
            <div className="flex items-center gap-space-md flex-wrap">
              <div className="flex items-center gap-space-xs rounded-lg bg-primary-container px-space-md py-space-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[20px]">check_circle</span>
                <span className="font-body-sm text-body-sm text-on-primary">RFID Trả sách tự động 24/7: Sẵn sàng</span>
              </div>
              <div className="flex items-center gap-space-xs rounded-lg bg-primary-container px-space-md py-space-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[20px]">wifi</span>
                <span className="font-body-sm text-body-sm text-on-primary">Mạng Eduroam: 1.2 Gbps</span>
              </div>
            </div>
          </div>

          {/* Occupancy Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-xl">
            <div className="rounded-lg bg-primary-container/60 p-space-md border border-primary-container">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-title-sm text-title-sm text-primary-fixed">Khu Tự học Tầng 2 & 3</span>
                <span className="font-title-sm text-title-sm text-[#FEF3C7]">68% công suất</span>
              </div>
              <div className="w-full bg-primary-container rounded-full h-2.5 overflow-hidden">
                <div className="bg-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: "68%" }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container mt-space-xs">
                Còn khoảng 85 chỗ ngồi yên tĩnh
              </p>
            </div>

            <div className="rounded-lg bg-primary-container/60 p-space-md border border-primary-container">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-title-sm text-title-sm text-primary-fixed">Phòng Đọc Đa phương tiện Tầng 1</span>
                <span className="font-title-sm text-title-sm text-[#DCFCE7]">42% công suất</span>
              </div>
              <div className="w-full bg-primary-container rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#16A34A] h-2.5 rounded-full transition-all duration-500" style={{ width: "42%" }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container mt-space-xs">
                Còn 34 máy tính tra cứu học thuật
              </p>
            </div>

            <div className="rounded-lg bg-primary-container/60 p-space-md border border-primary-container">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-title-sm text-title-sm text-primary-fixed">Khu Thảo luận Mở & Cafe Học tập</span>
                <span className="font-title-sm text-title-sm text-secondary-fixed">81% công suất</span>
              </div>
              <div className="w-full bg-primary-container rounded-full h-2.5 overflow-hidden">
                <div className="bg-secondary-fixed-dim h-2.5 rounded-full transition-all duration-500" style={{ width: "81%" }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container mt-space-xs">
                Sắp đạt ngưỡng tối đa trong giờ nghỉ
              </p>
            </div>
          </div>

          {/* Metric Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg pt-space-lg border-t border-primary-container">
            <div>
              <span className="font-headline-display text-headline-display text-primary-fixed block font-bold">1.2M+</span>
              <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider block">
                Tài liệu số & Sách in
              </span>
            </div>
            <div>
              <span className="font-headline-display text-headline-display text-primary-fixed block font-bold">48.000+</span>
              <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider block">
                Bạn đọc thường xuyên
              </span>
            </div>
            <div>
              <span className="font-headline-display text-headline-display text-primary-fixed block font-bold">240+</span>
              <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider block">
                Đối tác CSDL quốc tế
              </span>
            </div>
            <div>
              <span className="font-headline-display text-headline-display text-[#16A34A] block font-bold">99.8%</span>
              <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider block">
                Thời gian sẵn sàng máy chủ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
