import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchScope } from "@/types/library";
import { useAuth } from "@/context/AuthContext";

export const HeroSearchSection: React.FC = () => {
  const router = useRouter();
  const { authStatus, user } = useAuth();
  const [activeScope, setActiveScope] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldScope, setFieldScope] = useState("anywhere");

  const placeholders: Record<string, string> = {
    all: "Nhập nhan đề sách, tên tác giả, ký hiệu DDC, ISBN...",
    cong_nghe: "Tìm sách Công nghệ thông tin, Trí tuệ nhân tạo, Vi mạch...",
    kinh_te: "Tìm giáo trình Kinh tế, Quản trị kinh doanh, Tài chính định lượng...",
    khoa_hoc: "Tìm tài liệu Khoa học vật liệu, Vật lý bán dẫn, Môi trường...",
    van_hoc: "Tìm tác phẩm Văn học, Tiểu thuyết kinh điển, Truyện tranh...",
  };

  const trendingKeywords = [
    "Trí tuệ nhân tạo (AI)",
    "Kinh tế lượng tử",
    "Vật liệu bán dẫn",
    "Biến đổi khí hậu",
    "Rừng Na Uy",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(
      `/tra-cuu?q=${encodeURIComponent(searchQuery.trim())}&scope=${activeScope}&field=${fieldScope}`
    );
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    router.push(`/tra-cuu?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface py-space-xl">
      {/* Background Aura */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-10 h-72 w-72 rounded-full bg-tertiary-container/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-space-md lg:px-margin relative">
        {/* Patron Status Banner: Distinct 3 states */}
        {authStatus === "loading" ? (
          <div className="mb-space-lg bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high/60" />
              <div className="space-y-1.5">
                <div className="w-40 h-4 rounded bg-surface-container-high/60" />
                <div className="w-56 h-3 rounded bg-surface-container-high/40" />
              </div>
            </div>
            <div className="w-24 h-6 rounded bg-surface-container-high/40" />
          </div>
        ) : authStatus === "authenticated" && user ? (
          <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-title-sm text-title-sm text-primary font-bold">
                    Xin chào, {user.name}
                  </span>
                  <span className="rounded-full bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant font-semibold">
                    {user.role === "STUDENT" ? "Độc giả Sinh viên" : user.role}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Mã số độc giả / MSSV: <span className="font-semibold text-on-surface font-mono">{user.code}</span> | {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs rounded-lg bg-[#DCFCE7] px-space-md py-1.5 text-[#166534] font-semibold text-xs border border-green-300">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                <span className="font-title-sm text-title-sm">Thẻ thư viện trực tuyến kích hoạt</span>
              </div>
              <Link
                href="/the-thu-vien"
                className="flex items-center gap-space-xs text-secondary hover:underline font-title-sm text-title-sm font-semibold"
              >
                <span>Vào trang cá nhân</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <div>
                <p className="font-title-sm text-title-sm text-primary font-bold">
                  Hệ thống Mượn Trả & Đặt Sách Trực Tuyến UniLibrary
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Đăng nhập tài khoản bạn đọc để mượn sách, gia hạn và sử dụng đầy đủ tiện ích thư viện.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-xs">
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
                Đăng ký thẻ mới
              </Link>
            </div>
          </div>
        )}

        {/* Hero Headline & Positioning */}
        <div className="max-w-3xl mb-space-lg text-left">
          <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-space-md py-1 text-primary mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">local_library</span>
            <span className="font-label-md text-label-md uppercase tracking-wide font-semibold">
              Trung tâm Học liệu & Thư viện Nghiên cứu
            </span>
          </div>
          <h1 className="font-headline-display text-headline-display text-primary tracking-tight mb-space-sm font-semibold">
            Cổng Tri Thức & Tra Cứu Sách Thư Viện Đại Học
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Tra cứu toàn bộ danh mục tài liệu, giáo trình chuyên ngành, kiểm tra tình trạng sách còn/hết và đăng ký mượn hoặc đặt trước trực tuyến.
          </p>
        </div>

        {/* Master Unified Scholarly Search Box */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-md border border-outline-variant/30">
          {/* Scope Segmented Controls */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm">
            {[
              { key: "all", label: "Tất cả tài liệu" },
              { key: "cong_nghe", label: "Công nghệ & Máy tính" },
              { key: "kinh_te", label: "Kinh tế & Quản trị" },
              { key: "khoa_hoc", label: "Khoa học & Môi trường" },
              { key: "van_hoc", label: "Văn học & Nghệ thuật" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveScope(tab.key)}
                className={`px-space-md py-space-xs rounded-lg font-title-sm text-title-sm whitespace-nowrap transition-colors ${
                  activeScope === tab.key
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Input Bar with Field Scopes & Action */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch gap-space-xs">
            <div className="relative flex-1 flex items-center bg-surface-container-low rounded-lg px-space-md">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px] mr-space-sm">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholders[activeScope]}
                className="w-full bg-transparent py-3.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
              />
              <button
                type="button"
                title="Tìm bằng giọng nói"
                className="hidden sm:inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary font-label-md text-label-md px-space-xs"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            </div>

            <div className="flex items-center gap-space-xs">
              <select
                value={fieldScope}
                onChange={(e) => setFieldScope(e.target.value)}
                className="h-full bg-surface-container-low text-primary font-title-sm text-title-sm px-space-md py-3 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="anywhere">Mọi trường thông tin</option>
                <option value="title">Nhan đề tài liệu</option>
                <option value="author">Tên tác giả / Biên soạn</option>
                <option value="subject">Chủ đề / Từ khóa</option>
                <option value="isbn-issn">Mã ISBN / ISSN / DOI</option>
              </select>

              <button
                type="submit"
                className="h-full bg-secondary hover:bg-primary text-on-secondary px-space-xl py-3 rounded-lg font-title-sm text-title-sm font-semibold flex items-center justify-center gap-space-xs shadow-sm transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Tìm kiếm tài liệu</span>
              </button>
            </div>
          </form>

          {/* Search Footer & Trending Queries */}
          <div className="mt-space-md pt-space-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm bg-surface-container-lowest border-t border-outline-variant/20">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
                Từ khóa học thuật phổ biến:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {trendingKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleKeywordClick(kw)}
                    className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 hover:bg-secondary hover:text-white px-2.5 py-1 rounded-full transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push("/tra-cuu")}
              className="font-title-sm text-title-sm text-secondary hover:underline flex items-center gap-0.5 whitespace-nowrap"
            >
              <span>Tìm kiếm nâng cao & Chỉ mục DDC</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
