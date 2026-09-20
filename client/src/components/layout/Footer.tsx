"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary text-on-primary mt-space-xl pt-space-xl pb-space-lg">
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-xl">
          {/* Column 1 */}
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary-fixed">UniLibrary</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Hệ thống Thư viện số & Trung tâm Học liệu phục vụ cộng đồng học thuật, nghiên cứu sinh, giảng viên và sinh viên các trường thành viên.
            </p>
            <div className="pt-space-xs">
              <span className="font-label-md text-label-md text-secondary-fixed block mb-space-xs uppercase tracking-wider">
                Liên kết viện trường
              </span>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Đại học Quốc gia - Viện Nghiên cứu Đào tạo Sau Đại học
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-primary-fixed block">
              Cơ sở dữ liệu học thuật
            </span>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a href="#csdl" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Cơ sở dữ liệu IEEE Xplore
                </a>
              </li>
              <li>
                <a href="#csdl" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Springer Nature Journals
                </a>
              </li>
              <li>
                <a href="#csdl" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Elsevier ScienceDirect
                </a>
              </li>
              <li>
                <a href="#csdl" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Scopus & Web of Science
                </a>
              </li>
              <li>
                <a href="#csdl" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Thư viện Luận văn & Đồ án tốt nghiệp
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-primary-fixed block">
              Giờ phục vụ các cơ sở
            </span>
            <div className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <div>
                <p className="font-title-sm text-title-sm text-on-primary">Cơ sở 1 (Khuôn viên Trung tâm)</p>
                <p>Thứ 2 - Thứ 7: 07:30 - 21:00</p>
                <p>Chủ nhật: 08:00 - 17:00 (Phòng tự học)</p>
              </div>
              <div className="pt-space-xs">
                <p className="font-title-sm text-title-sm text-on-primary">Cơ sở 2 (Khu Công nghệ Cao)</p>
                <p>Thứ 2 - Thứ 6: 08:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-primary-fixed block">
              Hỗ trợ bạn đọc
            </span>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a href="#ask" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  Thủ thư trực tuyến (Live Chat)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">quiz</span>
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  Quy chế mượn trả & gia hạn sách
                </a>
              </li>
              <li>
                <a href="mailto:library@university.edu.vn" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  Email hỗ trợ: library@university.edu.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-container/80 pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-primary-container">
          <div>Bản quyền © 2025 UniLibrary System. Tất cả các quyền được bảo lưu.</div>
          <div className="flex items-center gap-space-lg">
            <a href="#privacy" className="hover:text-on-primary transition-colors">
              Chính sách quyền riêng tư
            </a>
            <a href="#terms" className="hover:text-on-primary transition-colors">
              Điều khoản sử dụng tài nguyên số
            </a>
            <a href="#accessibility" className="hover:text-on-primary transition-colors">
              Khả năng tiếp cận
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
