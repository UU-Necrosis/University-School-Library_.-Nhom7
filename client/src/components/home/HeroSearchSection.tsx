"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PatronInfo, SearchScope } from "@/types/library";

interface HeroSearchSectionProps {
  patron?: PatronInfo;
}

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({ patron }) => {
  const router = useRouter();
  const [activeScope, setActiveScope] = useState<SearchScope>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldScope, setFieldScope] = useState("anywhere");

  const patronData = patron || {
    name: "Lê Hoàng Nam",
    code: "UL-202488",
    role: "Học viên Cao học • K.31",
    department: "Khoa Khoa học & Kỹ thuật Thông tin",
    ssoConnected: true,
    activeLoans: 3,
    maxLoans: 8,
  };

  const placeholders: Record<SearchScope, string> = {
    all: "Nhập tên sách, tác giả, ISBN, DOI hoặc từ khóa chuyên ngành...",
    books: "Tìm giáo trình, sách chuyên khảo, vị trí kệ sách và mã xếp giá...",
    journals: "Nhập tên bài báo, tác giả, số ISSN, DOI hoặc tạp chí Scopus/ISI...",
    theses: "Tìm luận án tiến sĩ, luận văn thạc sĩ, khóa luận tốt nghiệp theo chuyên ngành...",
    databases: "Tìm kiếm cơ sở dữ liệu IEEE, ScienceDirect, Springer, JSTOR...",
  };

  const trendingKeywords = [
    "Trí tuệ nhân tạo (AI)",
    "Kinh tế lượng tử",
    "Biến đổi khí hậu ĐBSCL",
    "Chất bán dẫn & Vi mạch",
    "Blockchain",
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
        {/* Patron Authenticated Status Banner */}
        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="font-title-sm text-title-sm text-primary font-bold">
                  Chào buổi sáng, {patronData.name}
                </span>
                <span className="rounded-full bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  {patronData.role}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Mã độc giả: <span className="font-semibold text-on-surface">{patronData.code}</span> |{" "}
                {patronData.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs rounded-lg bg-[#DCFCE7] px-space-md py-1.5 text-[#166534] font-semibold text-xs border border-green-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]"></span>
              </span>
              <span className="font-title-sm text-title-sm">SSO Proxy Đã kết nối</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px] text-secondary">book</span>
              <span>
                Đang mượn: <strong className="text-primary">{patronData.activeLoans}</strong>/
                {patronData.maxLoans} cuốn
              </span>
            </div>
          </div>
        </div>

        {/* Hero Headline & Scholarly Positioning */}
        <div className="max-w-3xl mb-space-lg text-left">
          <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-space-md py-1 text-primary mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">local_library</span>
            <span className="font-label-md text-label-md uppercase tracking-wide font-semibold">
              Trung tâm Học liệu & Thư viện Nghiên cứu
            </span>
          </div>
          <h1 className="font-headline-display text-headline-display text-primary tracking-tight mb-space-sm font-semibold">
            Cổng Tri Thức & Tài Nguyên Nghiên Cứu Đại Học UniLibrary
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Khám phá hơn 1.200.000 đầu sách in, luận văn tiến sĩ, tạp chí Scopus/ISI và nguồn tài nguyên mở
            chất lượng cao phục vụ đào tạo và nghiên cứu chuẩn quốc tế.
          </p>
        </div>

        {/* Master Unified Scholarly Search Box */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-md border border-outline-variant/30">
          {/* Scope Segmented Controls */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm">
            {[
              { key: "all", label: "Tất cả tài nguyên" },
              { key: "books", label: "Sách in & Giáo trình" },
              { key: "journals", label: "Bài báo & Tạp chí khoa học" },
              { key: "theses", label: "Luận văn - Luận án" },
              { key: "databases", label: "Cơ sở dữ liệu số" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveScope(tab.key as SearchScope)}
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
