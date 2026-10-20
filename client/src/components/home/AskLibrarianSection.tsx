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
                Bạn Cần Hỗ Trợ Tra Cứu, Mượn Trả Sách Hoặc Đặt Trước Tài Liệu?
              </h2>

              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Đội ngũ thủ thư sẵn sàng hỗ trợ bạn đọc tìm kiếm sách giáo trình, tài liệu chuyên ngành, hướng dẫn thủ tục mượn trả và giải đáp các quy định của thư viện.
              </p>

              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <a
                  href="/danh-muc"
                  className="inline-flex items-center gap-space-xs bg-primary hover:bg-secondary text-on-primary px-space-lg py-3 rounded-lg font-title-sm text-title-sm shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  <span>Tra cứu danh mục sách</span>
                </a>

                <a
                  href="/huong-dan"
                  className="inline-flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-primary px-space-lg py-3 rounded-lg font-title-sm text-title-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  <span>Xem hướng dẫn mượn sách</span>
                </a>

                <a
                  href="/quy-dinh"
                  className="inline-flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                  <span>Quy định thư viện</span>
                </a>
              </div>
            </div>

            {/* Academic Consultation Feature Card */}
            <div className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30">
              <h3 className="font-title-lg text-title-lg text-primary mb-space-sm flex items-center gap-space-xs font-bold">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <span>Dịch vụ hỗ trợ độc giả</span>
              </h3>

              <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Hướng dẫn tìm kiếm tài liệu theo ngành học và môn học.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Hỗ trợ thủ tục cấp thẻ, kích hoạt tài khoản mượn sách.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Giải quyết các trường hợp gia hạn, đặt trước và mượn liên cơ sở.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">check</span>
                  <span>Tiếp nhận đề xuất bổ sung đầu sách mới từ giảng viên và sinh viên.</span>
                </li>
              </ul>

              <div className="mt-space-md pt-space-sm border-t border-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                Bàn hỗ trợ trực tiếp tại sảnh tầng 1 hoặc qua email: <strong className="text-primary">library@university.edu.vn</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
