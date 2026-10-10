"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PatronInfo } from "@/types/library";

interface HeaderProps {
  patron?: PatronInfo;
}

export const Header: React.FC<HeaderProps> = ({ patron }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"VN" | "EN">("VN");
  const [user, setUser] = useState<{ name: string; code: string; email: string; unit: string } | null>(null);
  const [quickSearch, setQuickSearch] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("unilibrary_user") || sessionStorage.getItem("unilibrary_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("unilibrary_user");
    sessionStorage.removeItem("unilibrary_user");
    setUser(null);
    window.location.href = "/";
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      router.push(`/tra-cuu?q=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  const displayName = user?.name || patron?.name || "Lê Hoàng Nam";
  const displayCode = user?.code || patron?.code || "UL-202488";
    const displayUnit = user?.unit || (patron as { unit?: string } | undefined)?.unit || "ĐHQG-HCM";
  const isLoggedIn = Boolean(user || patron);

  const navLinks = [
    { label: "Trang chủ", href: "/", icon: "home" },
    { label: "Tra cứu & Danh mục", href: "/tra-cuu", icon: "search" },
    { label: "Cơ sở dữ liệu số", href: "/co-so-du-lieu", icon: "database" },
    { label: "Đặt phòng & Tiện ích", href: "/dat-phong", icon: "meeting_room" },
    { label: "Dịch vụ Nghiên cứu", href: "/dich-vu", icon: "handshake" },
    { label: "Hướng dẫn & Quy định", href: "/huong-dan", icon: "gavel" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-on-primary py-1 px-space-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-label-sm text-label-sm">
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs text-secondary-fixed">
              <span className="material-symbols-outlined text-[14px]">campaign</span>
              <span>Thông báo: Kéo dài mượn sách kỳ thi học kỳ 2</span>
            </div>
            <div className="hidden md:flex items-center gap-space-xs text-on-primary-container">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Giờ mở cửa: T2 - T7 (07:30 - 21:00)</span>
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

      {/* Main Header Row: Hamburger Drawer Button + Logo + Google-style Search Bar + User Utilities */}
      <div className="border-b border-surface-container/60 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin py-2.5 flex items-center justify-between gap-space-md">
          {/* Left: Drawer Toggle Button & Brand Logo */}
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center justify-center p-2 rounded-lg text-primary hover:text-secondary hover:bg-surface-container transition-all cursor-pointer"
              type="button"
              aria-label="Menu điều hướng"
            >
              <span className="material-symbols-outlined text-[24px]">
                {drawerOpen ? "close" : "menu"}
              </span>
            </button>

            <Link href="/" className="flex items-center gap-space-sm shrink-0">
              <div className="relative h-10 w-10 flex items-center justify-center bg-primary text-on-primary rounded-xl font-bold text-xl shadow-sm">
                UL
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                  UniLibrary
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Academic Digital Resource Center
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Google-style rounded-full search bar */}
          <div className="flex-1 max-w-2xl mx-space-md hidden sm:block">
            <form
              onSubmit={handleQuickSearch}
              className="relative flex items-center w-full shadow-sm hover:shadow-md transition-shadow rounded-full border border-surface-container-high bg-surface-container-low/70 hover:bg-surface-container-lowest focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/30 focus-within:border-secondary transition-all"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] pl-4 pr-2 select-none">
                search
              </span>
              <input
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full bg-transparent py-2.5 pr-4 text-on-surface text-body-md placeholder:text-on-surface-variant/70 focus:outline-none"
                placeholder="Tìm kiếm tài liệu, sách, ISBN, DOI..."
                type="text"
              />
              <button
                className="mr-2 text-on-surface-variant hover:text-primary p-1.5 rounded-full hover:bg-surface-container transition-colors"
                title="Tìm bằng giọng nói"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
              <button
                className="bg-secondary hover:bg-primary text-on-secondary text-title-sm font-semibold px-4 py-1.5 rounded-full mr-1.5 transition-colors whitespace-nowrap"
                type="submit"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* Right: Thẻ thư viện số + Patron Profile Card */}
          <div className="flex items-center gap-space-md shrink-0">
            <Link
              href="/the-thu-vien"
              className="hidden md:inline-flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm px-space-md py-space-sm rounded-lg border border-surface-container-high/60 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
              <span>Thẻ thư viện số</span>
            </Link>

            {isLoggedIn ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="Tài khoản độc giả"
                  className="cursor-pointer flex items-center gap-space-sm pl-space-sm border-l border-surface-container-high py-1 focus:outline-none"
                >
                  <div className="hidden md:flex flex-col text-right leading-tight select-none">
                    <span className="font-title-sm text-title-sm text-on-surface group-hover:text-secondary transition-colors">
                      {displayName}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {displayCode}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center font-bold text-sm ring-2 ring-primary/20">
                      {displayName.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180 text-primary" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Profile Popup Dropdown Card */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-80 z-50">
                    <div className="bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high overflow-hidden text-left">
                      <div className="p-space-md bg-gradient-to-br from-surface-container-low to-surface-container/40 border-b border-surface-container">
                        <div className="flex items-start gap-space-sm">
                          <div className="w-12 h-12 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center font-bold text-base shrink-0 ring-2 ring-primary/20">
                            {displayName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="font-title-sm text-title-sm text-primary font-bold truncate">
                                {displayName}
                              </h4>
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] text-[#166534] px-2 py-0.5 text-[10px] font-semibold shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                                RFID Hợp lệ
                              </span>
                            </div>
                            <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5">
                              Học viên Cao học • K31
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px] truncate">
                              Mã: {displayCode} • {displayUnit}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 mt-space-sm pt-space-xs border-t border-surface-container-high/60 text-center">
                          <div className="bg-surface-container-lowest/80 rounded-lg p-1.5">
                            <span className="block font-title-sm text-title-sm font-bold text-primary">03</span>
                            <span className="block text-[10px] leading-tight text-on-surface-variant">Đang mượn</span>
                            <span className="block text-[9px] text-[#DC2626] font-medium leading-none mt-0.5">1 sắp hạn</span>
                          </div>
                          <div className="bg-surface-container-lowest/80 rounded-lg p-1.5">
                            <span className="block font-title-sm text-title-sm font-bold text-primary">12</span>
                            <span className="block text-[10px] leading-tight text-on-surface-variant">Đã lưu</span>
                            <span className="block text-[9px] text-secondary font-medium leading-none mt-0.5">Tài liệu</span>
                          </div>
                          <div className="bg-surface-container-lowest/80 rounded-lg p-1.5">
                            <span className="block font-title-sm text-title-sm font-bold text-primary">01</span>
                            <span className="block text-[10px] leading-tight text-on-surface-variant">Giữ chỗ</span>
                            <span className="block text-[9px] text-[#16A34A] font-medium leading-none mt-0.5">Chờ lấy</span>
                          </div>
                        </div>
                      </div>

                      <div className="py-1.5 px-1 font-body-sm text-body-sm">
                        <Link
                          href="/the-thu-vien"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
                            <span>Tài liệu đang mượn & Gia hạn</span>
                          </div>
                          <span className="rounded bg-[#FEF3C7] text-[#92400E] font-semibold text-[10px] px-1.5 py-0.5">Gia hạn</span>
                        </Link>
                        <Link
                          href="/dat-phong"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[18px] text-secondary">meeting_room</span>
                            <span>Lịch đặt phòng & Tiện ích</span>
                          </div>
                          <span className="rounded bg-[#DCFCE7] text-[#166534] font-semibold text-[10px] px-1.5 py-0.5">14:00 hôm nay</span>
                        </Link>
                        <Link
                          href="/dich-vu"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">swap_horiz</span>
                            <span>Yêu cầu mượn liên trường (ILL)</span>
                          </div>
                        </Link>
                      </div>

                      <div className="p-space-xs bg-surface-container-low/70 border-t border-surface-container">
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-space-xs w-full py-1.5 rounded-lg text-[#DC2626] hover:bg-red-50 font-title-sm text-title-sm text-xs transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">logout</span>
                          <span>Đăng xuất tài khoản</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-space-xs pl-space-sm border-l border-surface-container-high">
                <Link
                  href="/login"
                  className="px-space-md py-1.5 rounded-lg text-title-sm font-semibold text-primary hover:bg-surface-container transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-space-md py-1.5 rounded-lg text-title-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Hamburger Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 top-[108px] z-40 flex">
          <div className="w-80 h-[calc(100vh-108px)] bg-surface-container-lowest shadow-2xl border-r border-surface-container-high py-2 text-left overflow-y-auto">
            <div className="px-space-md py-space-sm border-b border-surface-container/60 mb-1">
              <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
                Danh mục dịch vụ & tài nguyên
              </span>
            </div>

            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between px-space-md py-3 font-title-sm text-title-sm border-b border-surface-container/60 transition-colors ${
                    isActive
                      ? "text-secondary bg-surface-container-low font-bold"
                      : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">&gt;</span>
                </Link>
              );
            })}
          </div>
          <div
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-primary/20 backdrop-blur-sm cursor-pointer"
          ></div>
        </div>
      )}
    </header>
  );
};
