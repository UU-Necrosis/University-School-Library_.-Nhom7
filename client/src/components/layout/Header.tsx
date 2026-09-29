"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PatronInfo } from "@/types/library";

interface HeaderProps {
  patron?: PatronInfo;
}

export const Header: React.FC<HeaderProps> = ({ patron }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"VN" | "EN">("VN");
  const [quickSearch, setQuickSearch] = useState("");
  const [user, setUser] = useState<{ name: string; code: string; email: string } | null>(null);

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

  const handleLogout = () => {
    localStorage.removeItem("unilibrary_user");
    sessionStorage.removeItem("unilibrary_user");
    setUser(null);
    window.location.href = "/";
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    router.push(`/tra-cuu?q=${encodeURIComponent(quickSearch)}`);
  };

  const displayName = user?.name || patron?.name || "Lê Hoàng Nam";
  const displayCode = user?.code || patron?.code || "UL-202488";
  const isLoggedIn = Boolean(user || patron);

  const menuCategories = [
    { label: "Trang chủ", href: "/", hasSubmenu: false },
    { label: "Cơ sở dữ liệu học thuật", href: "/co-so-du-lieu", hasSubmenu: true },
    { label: "Tra cứu tài liệu", href: "/tra-cuu", hasSubmenu: true },
    { label: "Đặt lịch nghiên cứu", href: "/dat-phong", hasSubmenu: true },
    { label: "Dịch vụ thư viện", href: "/dich-vu", hasSubmenu: true },
    { label: "Tập huấn & Hội thảo", href: "/huong-dan", hasSubmenu: true },
    { label: "Hướng dẫn & Quy chế", href: "/huong-dan", hasSubmenu: true },
    { label: "Hỗ trợ", href: "/dich-vu", hasSubmenu: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Utility Bar */}
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

      {/* HEADER ROW 1: [ LOGO UNILIBRARY ]  [ 🔍 THANH TÌM KIẾM ]  [ UTILITIES ] */}
      <div className="border-b border-surface-container/60 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin py-2.5 flex items-center justify-between gap-space-md">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-space-sm shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xtt5UFB8KebbgoazL8IZZcSSUODaJugSSzhopNrQG4iQCc3f3giMN2liuTW15bHCcFxoYZIdsbeNMfmARdv9IF8G_5YGofBaxwOi8xjzzKM6ShAfmvxnoRNK3HFLzh0-0JnAt2LiVvNRM-Y7Qtv-SpRwmtLc-Rv-7Xh0-xvnmu_54uXtkU1GLqiekvcNhQvUl50RhtDMx-e6Vj76EAzvonGICDUeviGiMt6lmkcfIfywHPtdsv4Kl23A"
              alt="UniLibrary Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                UniLibrary
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Academic Digital Resource Center
              </span>
            </div>
          </Link>

          {/* Center: Google-style rounded-full search bar (ON SAME ROW AS LOGO) */}
          <div className="flex-1 max-w-2xl mx-space-md hidden sm:block">
            <form
              onSubmit={handleQuickSearchSubmit}
              className="relative flex items-center w-full shadow-sm hover:shadow-md transition-shadow rounded-full border border-surface-container-high bg-surface-container-low/70 hover:bg-surface-container-lowest focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/30 focus-within:border-secondary transition-all"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] pl-4 pr-2 select-none">
                search
              </span>
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Tìm kiếm tài liệu, sách, ISBN, DOI..."
                className="w-full bg-transparent py-2.5 pr-4 text-on-surface text-body-md placeholder:text-on-surface-variant/70 focus:outline-none"
              />
              <button
                type="button"
                title="Tìm bằng giọng nói"
                className="mr-2 text-on-surface-variant hover:text-primary p-1.5 rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
              <button
                type="submit"
                className="bg-secondary hover:bg-primary text-on-secondary text-title-sm px-4 py-1.5 rounded-full mr-1.5 transition-colors whitespace-nowrap"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* Right: Thẻ thư viện số + Avatar User Dropdown */}
          <div className="flex items-center gap-space-md shrink-0">
            <Link
              href="/the-thu-vien"
              className="hidden md:inline-flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm px-space-md py-space-sm rounded-lg border border-surface-container-high/60 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
              <span>Thẻ thư viện số</span>
            </Link>

            {isLoggedIn ? (
              <div className="group relative cursor-pointer flex items-center gap-space-sm pl-space-sm border-l border-surface-container-high py-1">
                <div className="hidden md:flex flex-col text-right leading-tight select-none">
                  <span className="font-title-sm text-title-sm text-on-surface group-hover:text-secondary transition-colors font-semibold">
                    {displayName}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {displayCode}
                  </span>
                </div>
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WQtfg8DOZtKVEsnC9X7eu3Ri2GvNTitE9U9Lz-eF-fyl2iQF_P97I3EXs1bP7do8rx-a0iALSUg4U0rgd0H6dHyqqhyhApuM0APsrC1dLfHe-t2Jc9YaAD1CN1Wij-MQXlbWb3qqkSTrWRzm8tprDoNNyZQLHN_g7ZMrzagNciQYM7uvb3gqQu0TYEHxlhUCNfLlDlAsOu0DREshc1UytHCbTuU0Nnmz_PgFkVMvAFclxW0G54BfUd3HQ"
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-secondary/40 transition-all"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-white"></span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary group-hover:rotate-180 transition-transform duration-200">
                  expand_more
                </span>

                {/* Profile Popup Menu Dropdown Card */}
                <div className="group-hover:opacity-100 group-hover:visible opacity-0 invisible group-hover:translate-y-0 translate-y-1 transition-all duration-200 absolute right-0 top-full pt-2 w-80 z-50">
                  <div className="bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high overflow-hidden text-left">
                    <div className="p-space-md bg-gradient-to-br from-surface-container-low to-surface-container/40 border-b border-surface-container">
                      <div className="flex items-start gap-space-sm">
                        <img
                          src="https://lh3.googleusercontent.com/aida/AEtjO1WQtfg8DOZtKVEsnC9X7eu3Ri2GvNTitE9U9Lz-eF-fyl2iQF_P97I3EXs1bP7do8rx-a0iALSUg4U0rgd0H6dHyqqhyhApuM0APsrC1dLfHe-t2Jc9YaAD1CN1Wij-MQXlbWb3qqkSTrWRzm8tprDoNNyZQLHN_g7ZMrzagNciQYM7uvb3gqQu0TYEHxlhUCNfLlDlAsOu0DREshc1UytHCbTuU0Nnmz_PgFkVMvAFclxW0G54BfUd3HQ"
                          alt="Avatar"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                        />
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
                            Mã: {displayCode} • ĐHQG-HCM
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
                        className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-secondary">bookmark</span>
                          <span>Sách đã lưu & Bộ sưu tập</span>
                        </div>
                        <span className="rounded-full bg-surface-container-high text-primary font-semibold text-[10px] px-2 py-0.5">
                          12
                        </span>
                      </Link>

                      <Link
                        href="/the-thu-vien"
                        className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-secondary">menu_book</span>
                          <span>Tài liệu đang mượn & Gia hạn</span>
                        </div>
                        <span className="rounded bg-[#FEF3C7] text-[#92400E] font-semibold text-[10px] px-1.5 py-0.5">
                          Gia hạn
                        </span>
                      </Link>

                      <Link
                        href="/tra-cuu"
                        className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                            history_edu
                          </span>
                          <span>Lịch sử tra cứu & Trích dẫn</span>
                        </div>
                      </Link>

                      <Link
                        href="/dat-phong"
                        className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-secondary">meeting_room</span>
                          <span>Lịch đặt phòng & Tiện ích</span>
                        </div>
                        <span className="rounded bg-[#DCFCE7] text-[#166534] font-semibold text-[10px] px-1.5 py-0.5">
                          14:00 hôm nay
                        </span>
                      </Link>

                      <Link
                        href="/dich-vu"
                        className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                            swap_horiz
                          </span>
                          <span>Yêu cầu mượn liên trường (ILL)</span>
                        </div>
                      </Link>

                      <Link
                        href="/huong-dan"
                        className="flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-colors border-t border-surface-container/60 mt-1 pt-2"
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-[18px] text-tertiary-container">vpn_key</span>
                          <span>Cài đặt tài khoản & EZproxy</span>
                        </div>
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                          chevron_right
                        </span>
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
              </div>
            ) : (
              <div className="flex items-center gap-space-xs pl-space-sm border-l border-surface-container-high">
                <Link
                  href="/login"
                  className="px-space-md py-2 rounded-lg text-title-sm font-semibold text-primary hover:bg-surface-container transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-space-md py-2 rounded-lg text-title-sm font-semibold bg-primary text-on-primary hover:bg-primary-container transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HEADER ROW 2: [ ☰ ] SEPARATE DEDICATED ROW BENEATH LOGO + SEARCH */}
      <div className="bg-surface-container-lowest shadow-sm border-b border-surface-container/50">
        <div className="max-w-7xl mx-auto px-space-md lg:px-margin py-1.5 flex items-center justify-between">
          <div className="relative group">
            <button
              id="hamburger-menu-toggle"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-primary hover:text-secondary hover:bg-surface-container-low px-3 py-1.5 rounded-lg border border-surface-container-high transition-all text-title-sm font-semibold cursor-pointer"
              aria-label="Menu điều hướng"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
              <span>☰ Danh mục Menu</span>
            </button>

            {/* Vertical Dropdown List (Single column line-by-line with > chevrons) */}
            <div
              className={`transition-all duration-200 absolute left-0 top-full pt-1 w-72 z-50 ${
                menuOpen
                  ? "opacity-100 visible translate-y-0"
                  : "group-hover:opacity-100 group-hover:visible opacity-0 invisible group-hover:translate-y-0 translate-y-1"
              }`}
            >
              <div className="bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high py-1 text-left overflow-hidden">
                {menuCategories.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-space-md py-2.5 font-title-sm text-title-sm border-b border-surface-container/60 last:border-0 transition-colors ${
                      pathname === item.href
                        ? "text-primary bg-surface-container-low font-semibold"
                        : "text-on-surface hover:bg-surface-container-low hover:text-secondary"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasSubmenu && (
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                        chevron_right
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick link tags for desktop */}
          <div className="hidden lg:flex items-center gap-space-md text-body-sm text-on-surface-variant">
            <Link href="/co-so-du-lieu" className="hover:text-primary transition-colors">
              Cơ sở dữ liệu
            </Link>
            <span className="text-outline-variant/40">•</span>
            <Link href="/tra-cuu" className="hover:text-primary transition-colors">
              Tra cứu sách
            </Link>
            <span className="text-outline-variant/40">•</span>
            <Link href="/dat-phong" className="hover:text-primary transition-colors">
              Đặt phòng
            </Link>
            <span className="text-outline-variant/40">•</span>
            <Link href="/dich-vu" className="hover:text-primary transition-colors">
              Dịch vụ thư thư
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
