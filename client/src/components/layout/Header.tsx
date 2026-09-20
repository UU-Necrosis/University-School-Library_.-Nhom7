"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PatronInfo } from "@/types/library";

interface HeaderProps {
  patron: PatronInfo;
}

export const Header: React.FC<HeaderProps> = ({ patron }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"VN" | "EN">("VN");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Utility Bar */}
      <div className="bg-primary text-on-primary py-1 px-space-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-label-sm text-label-sm">
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>Hotline: 028 3829 xxxx</span>
            </div>
            <div className="hidden sm:flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Giờ mở cửa: T2 - T7 (07:30 - 21:00)</span>
            </div>
            <div className="hidden lg:flex items-center gap-space-xs text-secondary-fixed">
              <span className="material-symbols-outlined text-[14px]">campaign</span>
              <span>Thông báo: Kéo dài mượn sách kỳ thi học kỳ 2</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <a href="#faculty" className="hover:underline text-on-primary">
              Cổng Cán bộ & Giảng viên
            </a>
            <span className="text-outline-variant/40">|</span>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[14px]">language</span>
              <button
                onClick={() => setCurrentLang("VN")}
                className={`font-label-sm text-label-sm ${
                  currentLang === "VN" ? "font-semibold text-secondary-fixed underline" : "opacity-80 hover:opacity-100"
                }`}
              >
                VN
              </button>
              <span className="text-outline-variant/40">/</span>
              <button
                onClick={() => setCurrentLang("EN")}
                className={`font-label-sm text-label-sm ${
                  currentLang === "EN" ? "font-semibold text-secondary-fixed underline" : "opacity-80 hover:opacity-100"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 max-w-7xl mx-auto px-space-md lg:px-margin flex items-center justify-between gap-space-md">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-space-lg">
          <Link href="/" className="flex items-center gap-space-sm">
            <div className="relative h-9 w-9 flex items-center justify-center bg-primary text-on-primary rounded-lg font-bold text-xl">
              UL
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                UniLibrary
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Đại học Quốc gia
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-space-lg h-20">
            <Link
              href="/"
              className="h-full flex items-center transition-colors text-secondary border-b-2 border-secondary font-semibold text-title-sm"
            >
              Trang chủ
            </Link>
            <Link
              href="#tra-cuu"
              className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm h-full flex items-center transition-colors"
            >
              Tra cứu & Danh mục
            </Link>
            <Link
              href="#csdl"
              className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm h-full flex items-center transition-colors"
            >
              Cơ sở dữ liệu số
            </Link>
            <Link
              href="#dat-phong"
              className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm h-full flex items-center transition-colors"
            >
              Đặt phòng & Tiện ích
            </Link>
            <Link
              href="#dich-vu"
              className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm h-full flex items-center transition-colors"
            >
              Dịch vụ Nghiên cứu
            </Link>
            <Link
              href="#huong-dan"
              className="text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm h-full flex items-center transition-colors"
            >
              Hướng dẫn & Quy định
            </Link>
          </nav>
        </div>

        {/* User & Action Bar */}
        <div className="flex items-center gap-space-md">
          <button
            className="hidden md:inline-flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm px-space-md py-space-sm rounded-lg transition-colors"
            title="Mở Thẻ Thư Viện Số"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Thẻ thư viện số</span>
          </button>

          <div className="flex items-center gap-space-sm pl-space-sm border-l border-surface-container-high">
            <div className="hidden md:flex flex-col text-right leading-tight">
              <span className="font-title-sm text-title-sm text-on-surface">{patron.name}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{patron.code}</span>
            </div>
            <button
              aria-label="Tài khoản độc giả"
              className="flex items-center gap-space-xs focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center font-bold text-sm">
                HN
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                expand_more
              </span>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-on-surface focus:outline-none"
            aria-label="Mở menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-t border-surface-container-high px-space-md py-space-lg flex flex-col space-y-space-md shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-title-md text-title-md text-secondary font-semibold"
          >
            Trang chủ
          </Link>
          <Link
            href="#tra-cuu"
            onClick={() => setMobileMenuOpen(false)}
            className="font-title-md text-title-md text-on-surface-variant hover:text-primary"
          >
            Tra cứu & Danh mục
          </Link>
          <Link
            href="#csdl"
            onClick={() => setMobileMenuOpen(false)}
            className="font-title-md text-title-md text-on-surface-variant hover:text-primary"
          >
            Cơ sở dữ liệu số
          </Link>
          <Link
            href="#dat-phong"
            onClick={() => setMobileMenuOpen(false)}
            className="font-title-md text-title-md text-on-surface-variant hover:text-primary"
          >
            Đặt phòng & Tiện ích
          </Link>
          <Link
            href="#dich-vu"
            onClick={() => setMobileMenuOpen(false)}
            className="font-title-md text-title-md text-on-surface-variant hover:text-primary"
          >
            Dịch vụ Nghiên cứu
          </Link>
          <div className="pt-space-md border-t border-surface-container flex justify-between items-center">
            <div>
              <p className="font-title-sm text-title-sm text-on-surface">{patron.name}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{patron.code}</p>
            </div>
            <button className="flex items-center gap-space-xs bg-primary text-on-primary font-title-sm px-space-md py-2 rounded-lg">
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>Thẻ số</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
