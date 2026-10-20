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
              <span className="font-headline-sm text-headline-sm text-primary-fixed font-bold">UniLibrary</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Hệ thống Thư viện số & Trung tâm Học liệu phục vụ cộng đồng học thuật, nghiên cứu sinh, giảng viên và sinh viên các trường thành viên.
            </p>
            <div className="pt-space-xs">
              <span className="font-label-md text-label-md text-secondary-fixed block mb-space-xs uppercase tracking-wider font-semibold">
                Liên kết viện trường
              </span>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Đại học Quốc gia - Viện Nghiên cứu Đào tạo Sau Đại học
              </p>
            </div>
          </div>

          {/* Column 2: 5 Core Nav Links */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-primary-fixed block font-bold">
              Danh mục & Điều hướng
            </span>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <li>
                <Link href="/danh-muc" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Danh mục sách & Thể loại DDC
                </Link>
              </li>
              <li>
                <Link href="/tac-gia" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Danh bạ tác giả & Học giả
                </Link>
              </li>
              <li>
                <Link href="/dat-sach" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Tìm & Đặt sách (FIFO Hold)
                </Link>
              </li>
              <li>
                <Link href="/huong-dan" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Hướng dẫn sử dụng 6 bước
                </Link>
              </li>
              <li>
                <Link href="/quy-dinh" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  Quy định mượn trả & Hạn mức
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Campuses */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-primary-fixed block font-bold">
              Giờ phục vụ các cơ sở
            </span>
            <div className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <div>
                <p className="font-title-sm text-title-sm text-on-primary font-semibold">Cơ sở 1 (Khuôn viên Trung tâm)</p>
                <p>Thứ 2 - Thứ 7: 07:30 - 21:00</p>
                <p>Chủ nhật: 08:00 - 17:00 (Phòng tự học)</p>
              </div>
              <div className="pt-space-xs">
                <p className="font-title-sm text-title-sm text-on-primary font-semibold">Cơ sở 2 (Khu Công nghệ Cao)</p>
                <p>Thứ 2 - Thứ 6: 08:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-primary-fixed block font-bold">
              Thông tin liên hệ & Hỗ trợ
            </span>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a href="tel:0283829xxxx" className="hover:text-on-primary transition-colors flex items-center gap-space-xs font-semibold text-secondary-fixed">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  Hotline: 028 3829 xxxx
                </a>
              </li>
              <li>
                <a href="mailto:library@university.edu.vn" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  Email: library@university.edu.vn
                </a>
              </li>
              <li>
                <Link href="/huong-dan" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  Thủ thư trực tuyến & Hướng dẫn
                </Link>
              </li>
              <li>
                <Link href="/quy-dinh" className="hover:text-on-primary transition-colors flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  Quy chế mượn trả & gia hạn sách
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-container/80 pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-primary-container">
          <div>Bản quyền © 2026 UniLibrary System. Tất cả các quyền được bảo lưu.</div>
          <div className="flex items-center gap-space-lg">
            <Link href="/quy-dinh" className="hover:text-on-primary transition-colors">
              Chính sách & Quy định
            </Link>
            <Link href="/huong-dan" className="hover:text-on-primary transition-colors">
              Hướng dẫn độc giả
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
