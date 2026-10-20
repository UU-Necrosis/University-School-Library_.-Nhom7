"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PatronInfo } from "@/types/library";
import { CATEGORIES, getSavedBookIds } from "@/data/catalog";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  patron?: PatronInfo;
}

export const Header: React.FC<HeaderProps> = ({ patron }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { authStatus, user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [currentLang, setCurrentLang] = useState<"VN" | "EN">("VN");
  const [quickSearch, setQuickSearch] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      setSavedCount(getSavedBookIds().length);
    } catch {
      setSavedCount(0);
    }

    const handleSavedChange = () => {
      try {
        setSavedCount(getSavedBookIds().length);
      } catch {
        setSavedCount(0);
      }
    };
    window.addEventListener("unilibrary_saved_changed", handleSavedChange);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("unilibrary_saved_changed", handleSavedChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setProfileDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    router.push("/login");
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      router.push(`/tra-cuu?q=${encodeURIComponent(quickSearch.trim())}`);
    }
  };

  const isLoggedIn = authStatus === "authenticated" && Boolean(user);
  const displayName = user?.name || "";
  const displayCode = user?.code || "";

  const isCategoryActive = pathname.startsWith("/danh-muc");
  const isAuthorActive = pathname.startsWith("/tac-gia");
  const isReserveActive = pathname.startsWith("/dat-sach");
  const isGuideActive = pathname.startsWith("/huong-dan");
  const isRulesActive = pathname.startsWith("/quy-dinh");

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
            <Link href="/huong-dan" className="hover:underline text-on-primary hidden sm:inline">
              Cổng Hướng dẫn & Dịch vụ
            </Link>
            <span className="text-outline-variant/40 hidden sm:inline">|</span>
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

      {/* Main Header Row: Left Menu Drawer Button + Brand Logo + Search + Profile Avatar */}
      <div className="border-b border-surface-container/60 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin py-2.5 flex items-center justify-between gap-space-md">
          {/* Left: Drawer Toggle Button & Brand Logo */}
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center justify-center p-2 rounded-xl text-primary hover:text-secondary hover:bg-surface-container transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none"
              type="button"
              aria-label="Mở menu danh mục bên trái"
              aria-expanded={drawerOpen}
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

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl mx-space-md hidden sm:block">
            <form
              onSubmit={handleQuickSearch}
              className="relative flex items-center w-full shadow-xs hover:shadow-sm transition-shadow rounded-full border border-surface-container-high bg-surface-container-low/70 hover:bg-surface-container-lowest focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/30 focus-within:border-secondary transition-all"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] pl-4 pr-2 select-none">
                search
              </span>
              <input
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full bg-transparent py-2.5 pr-4 text-on-surface text-body-md placeholder:text-on-surface-variant/70 focus:outline-none"
                placeholder="Tìm nhan đề sách, tác giả, ký hiệu DDC, ISBN..."
                type="text"
              />
              <button
                className="bg-secondary hover:bg-primary text-on-secondary text-title-sm font-semibold px-4 py-1.5 rounded-full mr-1.5 transition-colors whitespace-nowrap"
                type="submit"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* Right: Quick Links & Avatar Profile Dropdown */}
          <div className="flex items-center gap-space-md shrink-0">
            {/* Bookmark button representing "Sách đã lưu" */}
            <Link
              href="/the-thu-vien/da-luu"
              aria-label="Sách đã lưu"
              title="Sách đã lưu"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl text-primary hover:text-secondary bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">bookmark</span>
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {savedCount}
                </span>
              )}
            </Link>

            {authStatus === "loading" ? (
              <div className="flex items-center gap-2 pl-space-sm border-l border-surface-container-high">
                <div className="w-20 h-8 rounded-xl bg-surface-container-high/40 animate-pulse" />
              </div>
            ) : isLoggedIn ? (
              <div ref={dropdownRef} className="relative flex items-center gap-1 pl-space-sm border-l border-surface-container-high">
                {/* 1. Click Avatar / Info to navigate directly to Account Information */}
                <Link
                  href="/the-thu-vien"
                  aria-label={`Trang tài khoản của ${displayName}`}
                  title="Thông tin tài khoản độc giả"
                  className="flex items-center gap-space-sm py-1 rounded-lg hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
                >
                  <div className="hidden md:flex flex-col text-right leading-tight select-none">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold hover:text-secondary transition-colors">
                      {displayName}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      {displayCode}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary/20">
                      {displayName ? displayName.trim().split(" ").slice(-1)[0]?.slice(0, 2).toUpperCase() : "UL"}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>
                  </div>
                </Link>

                {/* 2. Separate chevron arrow button to open/close popup */}
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="Mở menu tiện ích tài khoản"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                  className="p-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180 text-primary" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Avatar Profile Popup Card (No repeated name or ID) */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-72 max-w-[90vw] z-50 animate-scale-in">
                    <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high overflow-hidden text-left p-2">
                      {/* Quick Counters: Sạch sẽ, không lặp lại avatar / tên / mã */}
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-low/60 rounded-xl mb-1.5 text-center">
                        <Link
                          href="/the-thu-vien"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="bg-surface-container-lowest hover:bg-surface-container rounded-lg p-1.5 transition-colors"
                        >
                          <span className="block font-title-sm text-title-sm font-bold text-primary">0</span>
                          <span className="block text-[10px] leading-tight text-on-surface-variant">Đang mượn</span>
                          <span className="block text-[9px] text-on-surface-variant font-semibold leading-none mt-0.5">Sách</span>
                        </Link>
                        <Link
                          href="/the-thu-vien/dat-truoc"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="bg-surface-container-lowest hover:bg-surface-container rounded-lg p-1.5 transition-colors"
                        >
                          <span className="block font-title-sm text-title-sm font-bold text-primary">0</span>
                          <span className="block text-[10px] leading-tight text-on-surface-variant">Đặt trước</span>
                          <span className="block text-[9px] text-[#16A34A] font-semibold leading-none mt-0.5">Yêu cầu</span>
                        </Link>
                        <Link
                          href="/the-thu-vien/da-luu"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="bg-surface-container-lowest hover:bg-surface-container rounded-lg p-1.5 transition-colors"
                        >
                          <span className="block font-title-sm text-title-sm font-bold text-primary">{savedCount}</span>
                          <span className="block text-[10px] leading-tight text-on-surface-variant">Đã lưu</span>
                          <span className="block text-[9px] text-secondary font-semibold leading-none mt-0.5">Tài liệu</span>
                        </Link>
                      </div>

                      {/* Personal Navigation Items */}
                      <div className="space-y-0.5 font-body-sm text-body-sm">
                        <Link
                          href="/the-thu-vien"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-[18px] text-secondary">autorenew</span>
                            <span className="font-medium text-xs">Sách đang mượn và gia hạn</span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                        </Link>

                        <Link
                          href="/the-thu-vien/dat-truoc"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-[18px] text-secondary">event_seat</span>
                            <span className="font-medium text-xs">Đặt trước của tôi</span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                        </Link>

                        <Link
                          href="/the-thu-vien/da-luu"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-[18px] text-secondary">bookmark</span>
                            <span className="font-medium text-xs">Sách đã lưu</span>
                          </div>
                          <span className="text-xs font-semibold text-on-surface-variant">
                            {savedCount}
                          </span>
                        </Link>

                        <Link
                          href="/the-thu-vien/lich-su"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-[18px] text-secondary">history</span>
                            <span className="font-medium text-xs">Lịch sử mượn trả</span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
                        </Link>
                      </div>

                      {/* Logout Action */}
                      <div className="pt-1.5 mt-1 border-t border-surface-container">
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-space-xs w-full py-2 rounded-xl text-[#DC2626] hover:bg-red-50 font-title-sm text-title-sm text-xs transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">logout</span>
                          <span>Đăng xuất</span>
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
                  className="px-space-md py-1.5 rounded-xl text-title-sm font-semibold text-primary hover:bg-surface-container transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-space-md py-1.5 rounded-xl text-title-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-xs"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Left Navigation Drawer: EXACTLY 5 ITEMS */}
      {drawerOpen && (
        <div className="fixed inset-0 top-[88px] sm:top-[96px] z-40 flex">
          {/* Left Panel */}
          <div
            ref={drawerRef}
            className="w-80 max-w-[85vw] h-full bg-surface-container-lowest shadow-2xl border-r border-surface-container-high flex flex-col justify-between overflow-y-auto animate-slide-right"
          >
            <div>
              <div className="px-space-md py-3.5 border-b border-surface-container/80 bg-surface-container-low/60 flex items-center justify-between">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
                  Menu Điều Hướng Thư Viện
                </span>
                <span className="text-[11px] text-on-surface-variant font-medium">5 mục chính</span>
              </div>

              <nav className="flex flex-col py-2" aria-label="Menu chính bên trái">
                {/* 1. Danh mục sách (Accordion xổ/thu gọn) */}
                <div className="border-b border-surface-container/60">
                  <div
                    className={`flex items-center justify-between px-space-md py-3 font-title-sm text-title-sm cursor-pointer transition-colors ${
                      isCategoryActive
                        ? "text-secondary bg-surface-container-low font-bold border-l-4 border-l-secondary"
                        : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                    }`}
                  >
                    <Link
                      href="/danh-muc"
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-3 flex-1"
                    >
                      <span className={`material-symbols-outlined text-[20px] ${isCategoryActive ? "text-secondary" : "text-on-surface-variant"}`}>
                        category
                      </span>
                      <span>1. Danh mục sách</span>
                    </Link>

                    {/* Accordion Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoriesExpanded(!categoriesExpanded);
                      }}
                      aria-expanded={categoriesExpanded}
                      aria-label={categoriesExpanded ? "Thu gọn thể loại sách" : "Mở rộng thể loại sách"}
                      className="p-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-transform"
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                          categoriesExpanded ? "rotate-180 text-secondary" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                  </div>

                  {/* Sub-categories dropdown list */}
                  {categoriesExpanded && (
                    <div className="bg-surface-container-low/40 pl-6 pr-2 py-1.5 space-y-0.5 border-t border-surface-container/40">
                      <Link
                        href="/danh-muc"
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          pathname === "/danh-muc"
                            ? "font-bold text-secondary bg-surface-container"
                            : "text-on-surface hover:bg-surface-container hover:text-secondary"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">view_list</span>
                          <span>Tất cả thể loại</span>
                        </span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </Link>

                      {CATEGORIES.map((cat) => {
                        const isCurrentCat = pathname === `/danh-muc/${cat.slug}`;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/danh-muc/${cat.slug}`}
                            onClick={() => setDrawerOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                              isCurrentCat
                                ? "font-bold text-secondary bg-surface-container"
                                : "text-on-surface hover:bg-surface-container hover:text-secondary"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                              <span>{cat.name}</span>
                            </span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Tác giả */}
                <Link
                  href="/tac-gia"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between px-space-md py-3 font-title-sm text-title-sm border-b border-surface-container/60 transition-colors ${
                    isAuthorActive
                      ? "text-secondary bg-surface-container-low font-bold border-l-4 border-l-secondary"
                      : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isAuthorActive ? "text-secondary" : "text-on-surface-variant"}`}>
                      groups
                    </span>
                    <span>2. Tác giả</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    chevron_right
                  </span>
                </Link>

                {/* 3. Đặt sách */}
                <Link
                  href="/dat-sach"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between px-space-md py-3 font-title-sm text-title-sm border-b border-surface-container/60 transition-colors ${
                    isReserveActive
                      ? "text-secondary bg-surface-container-low font-bold border-l-4 border-l-secondary"
                      : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isReserveActive ? "text-secondary" : "text-on-surface-variant"}`}>
                      bookmark_add
                    </span>
                    <span>3. Đặt sách</span>
                  </span>
                  <span className="rounded-full bg-secondary-fixed text-secondary px-2 py-0.5 text-[10px] font-bold">
                    FIFO Hold
                  </span>
                </Link>

                {/* 4. Hướng dẫn */}
                <Link
                  href="/huong-dan"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between px-space-md py-3 font-title-sm text-title-sm border-b border-surface-container/60 transition-colors ${
                    isGuideActive
                      ? "text-secondary bg-surface-container-low font-bold border-l-4 border-l-secondary"
                      : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isGuideActive ? "text-secondary" : "text-on-surface-variant"}`}>
                      help_center
                    </span>
                    <span>4. Hướng dẫn</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    chevron_right
                  </span>
                </Link>

                {/* 5. Quy định */}
                <Link
                  href="/quy-dinh"
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center justify-between px-space-md py-3 font-title-sm text-title-sm border-b border-surface-container/60 transition-colors ${
                    isRulesActive
                      ? "text-secondary bg-surface-container-low font-bold border-l-4 border-l-secondary"
                      : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${isRulesActive ? "text-secondary" : "text-on-surface-variant"}`}>
                      gavel
                    </span>
                    <span>5. Quy định</span>
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    chevron_right
                  </span>
                </Link>
              </nav>
            </div>

            {/* Quick Support inside Drawer Footer */}
            <div className="p-space-md border-t border-surface-container bg-surface-container-low/50">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
                <span>Hỗ trợ: (028) 3724 2160 (Ext 1240)</span>
              </div>
              <p className="font-body-sm text-[11px] text-on-surface-variant/80">
                Trung tâm Học liệu & Thư viện UniLibrary
              </p>
            </div>
          </div>

          {/* Backdrop Overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-primary/40 backdrop-blur-xs cursor-pointer transition-opacity"
            aria-label="Đóng menu điều hướng"
          />
        </div>
      )}
    </header>
  );
};
