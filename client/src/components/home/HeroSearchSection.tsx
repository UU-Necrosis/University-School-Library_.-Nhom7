"use client";

import React, { useState } from "react";
import { PatronInfo, SearchScope } from "@/types/library";

interface HeroSearchSectionProps {
  patron: PatronInfo;
}

export const HeroSearchSection: React.FC<HeroSearchSectionProps> = ({ patron }) => {
  const [activeScope, setActiveScope] = useState<SearchScope>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldScope, setFieldScope] = useState("anywhere");

  const placeholders: Record<SearchScope, string> = {
    all: "Nhập tên sách, tác giả, ISBN, DOI hoặc từ khóa chuyên ngành...",
    books: "Tìm giáo trình, sách chuyên khảo, vị trí kệ sách và mã xếp giá...",
    journals: "Nhập tên bài báo, tác giả, số ISSN, DOI hoặc tạp chí Scopus/ISI...",
    theses: "Tìm luận án tiến sĩ, luận văn thạc sĩ, khóa luận tốt nghiệp theo chuyên ngành...",
    databases: "Tìm kiếm cơ sở dữ liệu IEEE, ScienceDirect, Springer, JSTOR...",
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    alert(`Đang tìm kiếm [Scope: ${activeScope}, Field: ${fieldScope}]: "${searchQuery}"`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface py-space-xl">
      {/* Background Aura */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-10 h-72 w-72 rounded-full bg-tertiary-container/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-space-md lg:px-margin relative">
        {/* Patron Authenticated Status Banner */}
        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="font-title-sm text-title-sm text-primary">
                  Chào buổi sáng, {patron.name}
                </span>
                <span className="rounded-full bg-surface-container-high px-space-xs py-0.5 font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  {patron.role}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Mã độc giả: <span className="font-semibold text-on-surface">{patron.code}</span> | {patron.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs rounded-lg bg-[#DCFCE7] px-space-md py-1.5 text-[#166534]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]"></span>
              </span>
              <span className="font-title-sm text-title-sm">SSO Proxy Đã kết nối</span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px] text-secondary">book</span>
              <span>
                Đang mượn: <strong className="text-primary">{patron.activeLoans}</strong>/{patron.maxLoans} cuốn
              </span>
            </div>
          </div>
        </div>

        {/* Hero Headline & Scholarly Positioning */}
        <div className="max-w-3xl mb-space-lg text-left">
          <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-space-md py-1 text-primary mb-space-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">local_library</span>
            <span className="font-label-md text-label-md uppercase tracking-wide">
              Trung tâm Học liệu & Thư viện Nghiên cứu
            </span>
          </div>
          <h1 className="font-headline-display text-headline-display text-primary tracking-tight mb-space-sm">
            Cổng Tri Thức & Tài Nguyên Nghiên Cứu Đại Học UniLibrary
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Khám phá hơn 1.200.000 đầu sách in, luận văn tiến sĩ, tạp chí Scopus/ISI và nguồn tài nguyên mở chất lượng cao phục vụ đào tạo và nghiên cứu chuẩn quốc tế.
          </p>
        </div>

        {/* Master Unified Scholarly Search Box */}
        <div className="rounded-xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-md">
          {/* Scope Segmented Controls */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm" id="search-scope-tabs">
            {[
              { id: "all", label: "Tất cả tài nguyên" },
              { id: "books", label: "Sách in & Giáo trình" },
              { id: "journals", label: "Bài báo & Tạp chí khoa học" },
              { id: "theses", label: "Luận văn - Luận án" },
              { id: "databases", label: "Cơ sở dữ liệu số" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveScope(tab.id as SearchScope)}
                className={`px-space-md py-space-xs rounded-lg font-title-sm text-title-sm whitespace-nowrap transition-colors ${
                  activeScope === tab.id
                    ? "bg-primary text-on-primary font-semibold"
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
              <span className="material-symbols-outlined text-on-surface-variant text-[22px] mr-space-sm">search</span>
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
                className="h-full bg-secondary hover:bg-primary text-on-secondary px-space-xl py-3 rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-space-xs shadow-sm transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Tìm kiếm tài liệu</span>
              </button>
            </div>
          </form>

          {/* Search Footer & Trending Queries */}
          <div className="mt-space-md pt-space-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm bg-surface-container-lowest">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary-container">trending_up</span>
                Từ khóa học thuật phổ biến:
              </span>
              <div className="flex items-center gap-space-xs flex-wrap">
                {["Trí tuệ nhân tạo", "Kinh tế lượng", "Data Science", "Công nghệ vi mạch bán dẫn", "Biến đổi khí hậu"].map(
                  (kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSearchQuery(kw)}
                      className="rounded-full bg-surface-container-low hover:bg-surface-container px-space-sm py-0.5 font-body-sm text-body-sm text-primary transition-colors"
                    >
                      {kw}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-space-md">
              <a href="#advanced" className="inline-flex items-center gap-space-xs text-secondary hover:text-primary font-title-sm text-title-sm transition-colors">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Tìm kiếm nâng cao</span>
              </a>
              <a href="#history" className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary font-title-sm text-title-sm transition-colors">
                <span className="material-symbols-outlined text-[18px]">history</span>
                <span>Lịch sử tra cứu</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
