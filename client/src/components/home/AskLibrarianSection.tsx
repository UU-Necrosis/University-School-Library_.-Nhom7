"use client";

import React from "react";

export const AskLibrarianSection: React.FC = () => {
  return (
    <section className="w-full py-space-xl bg-surface-container-low" id="dich-vu">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="rounded-xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-md border-l-4 border-primary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-center">
            {/* Main Prompt */}
            <div className="lg:col-span-2 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container px-space-md py-1 text-primary">
                <span className="material-symbols-outlined text-[18px] text-secondary">support_agent</span>
                <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                  Góc Thủ Thư Chuyên Ngành • Nghiên Cứu Viên
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-primary">
                Bạn Cần Tìm Kiếm Tài Liệu Chuyên Sâu Hoặc Xây Dựng Tổng Quan Tài Liệu?
              </h2>

              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Đội ngũ thủ thư chuyên ngành sẵn sàng hỗ trợ độc giả thiết lập chiến lược tìm kiếm thông tin khoa học, xác minh chỉ mục tạp chí Scopus/ISI và tra cứu liên kết tài liệu hiếm theo yêu cầu.
              </p>

              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <button
                  type="button"
                  onClick={() => alert("Đang kết nối đến Thủ thư trực tuyến...")}
                  className="inline-flex items-center gap-space-xs bg-primary hover:bg-secondary text-on-primary px-space-lg py-3 rounded-lg font-title-sm text-title-sm shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Chat trực tuyến với Thủ thư ngay</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("Mở ứng dụng đặt lịch hẹn 1:1 với thủ thư chuyên ngành.")}
                  className="inline-flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-primary px-space-lg py-3 rounded-lg font-title-sm text-title-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">event_available</span>
                  <span>Đặt lịch hẹn tư vấn 1:1</span>
                </button>

                <a
                  href="mailto:library@university.edu.vn"
                  className="inline-flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                  <span>Gửi email yêu cầu tài liệu</span>
                </a>
              </div>
            </div>

            {/* Academic Consultation Feature Card */}
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30">
              <h3 className="font-title-lg text-title-lg text-primary mb-space-sm flex items-center gap-space-xs font-bold">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <span>Dịch vụ hỗ trợ trực tiếp</span>
              </h3>

              <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Thẩm định bài báo vào danh mục tạp chí uy tín Scopus / SCIE.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Xuất báo cáo chỉ số trích dẫn tác giả (H-index, i10-index).</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Kiểm tra đạo văn Turnitin cho luận văn thạc sĩ, tiến sĩ.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Cung cấp toàn văn bài báo khoa học qua mạng lưới ILL quốc tế.</span>
                </li>
              </ul>

              <div className="mt-space-md pt-space-sm border-t border-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                Thời gian phản hồi cam kết: <strong className="text-primary">Dưới 60 phút</strong> trong giờ hành chính.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
