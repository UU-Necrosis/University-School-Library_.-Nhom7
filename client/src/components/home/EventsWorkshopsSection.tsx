"use client";

import React from "react";
import { EventItem } from "@/types/library";

const mockEvents: EventItem[] = [
  {
    id: "e1",
    month: "THÁNG 10",
    day: "24",
    dayOfWeek: "14:00 - 16:30 | Thứ 5",
    time: "14:00 - 16:30",
    title: "Workshop: Khai thác CSDL IEEE Xplore hiệu quả trong nghiên cứu Kỹ thuật & CNTT",
    description: "Báo cáo viên: Chuyên gia đào tạo IEEE khu vực Đông Nam Á. Phương pháp xây dựng chuỗi truy vấn phức hợp và xuất trích dẫn tự động.",
    location: "Hội trường Thư viện Tầng 4 • Cơ sở Trung tâm",
    tags: ["Miễn phí 100%", "Trực tiếp & Hybrid"],
    spotsLeft: "Còn 24 chỗ trống",
    actionText: "Đăng ký tham gia",
  },
  {
    id: "e2",
    month: "THÁNG 10",
    day: "26",
    dayOfWeek: "09:00 - 11:30 | Thứ 7",
    time: "09:00 - 11:30",
    title: "Khóa đào tạo: Sử dụng Zotero & Mendeley quản lý trích dẫn luận văn tốt nghiệp",
    description: "Thực hành chuẩn hóa thư mục tham khảo theo chuẩn APA 7th, IEEE, và Chicago. Tích hợp trực tiếp vào MS Word và LaTeX Overleaf.",
    location: "Phòng máy tính Lab 2 (Tầng 1 Thư viện)",
    tags: ["Cấp chứng nhận", "Thực hành Lab"],
    spotsLeft: "Chỉ còn 6 máy trống",
    actionText: "Đăng ký tham gia",
  },
  {
    id: "e3",
    month: "THÁNG 10",
    day: "28",
    dayOfWeek: "28/10 - 02/11 (08:00 - 18:00)",
    time: "08:00 - 18:00",
    title: "Triển lãm Sách Chuyên đề: Đổi mới Sáng tạo, ESG & Khởi nghiệp Công nghệ Xanh",
    description: "Trưng bày 500+ ấn bản quý hiếm và sách chuyên khảo mới nhất từ các nhà xuất bản quốc tế về phát triển bền vững và trí tuệ nhân tạo xanh.",
    location: "Sảnh chính Tầng trệt • Toàn thể bạn đọc",
    tags: ["Triển lãm mở", "Tự do tham quan"],
    spotsLeft: "Không cần đăng ký trước",
    actionText: "Xem danh mục sách",
  },
];

export const EventsWorkshopsSection: React.FC = () => {
  return (
    <section className="w-full py-space-xl bg-surface" id="huong-dan">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider block mb-space-xs">
              Nâng Cao Năng Lực Học Thuật
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Lớp Tập Huấn Kỹ Năng Thông Tin & Sự Kiện
            </h2>
          </div>
          <a
            href="#all-events"
            className="inline-flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm mt-space-sm md:mt-0"
          >
            <span>Xem toàn bộ lịch hội thảo tháng 10 & 11</span>
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {mockEvents.map((evt) => (
            <div
              key={evt.id}
              className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30"
            >
              <div>
                {/* Date tile & Tags */}
                <div className="flex items-start gap-space-md mb-space-md">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-primary text-on-primary shrink-0">
                    <span className="font-label-sm text-label-sm text-secondary-fixed uppercase font-bold tracking-wider">
                      {evt.month}
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold leading-none">
                      {evt.day}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap mb-1">
                      {evt.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-[#DCFCE7] text-[#166534] px-space-xs py-0.5 font-label-sm text-label-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {evt.dayOfWeek}
                    </span>
                  </div>
                </div>

                <h3 className="font-title-lg text-title-lg text-primary mb-space-xs hover:text-secondary transition-colors cursor-pointer font-bold">
                  {evt.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  {evt.description}
                </p>

                <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-md">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  <span>{evt.location}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-space-sm border-t border-surface-container flex items-center justify-between">
                <span
                  className={`font-label-sm text-label-sm font-semibold ${
                    evt.spotsLeft.includes("Chỉ còn") ? "text-[#DC2626]" : "text-on-surface-variant"
                  }`}
                >
                  {evt.spotsLeft}
                </span>

                {evt.id === "e3" ? (
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-space-xs text-secondary hover:text-primary font-title-sm text-title-sm"
                  >
                    <span>{evt.actionText}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert(`Đã ghi nhận đăng ký sự kiện: ${evt.title}`)}
                    className="inline-flex items-center gap-space-xs bg-secondary hover:bg-primary text-on-secondary px-space-md py-1.5 rounded-lg font-title-sm text-title-sm transition-colors"
                  >
                    <span>{evt.actionText}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
