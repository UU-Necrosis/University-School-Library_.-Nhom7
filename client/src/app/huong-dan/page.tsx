"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

interface RuleSection {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string[];
}

const mockRules: RuleSection[] = [
  {
    id: "loan-limits",
    category: "Quy định Mượn Trả",
    title: "Hạn mức Mượn Sách & Thời hạn theo Loại Độc giả",
    summary: "Quy định chi tiết số lượng sách in được phép mượn tối đa và thời gian gia hạn.",
    content: [
      "Sinh viên Đại học: Mượn tối đa 5 cuốn / 14 ngày. Được gia hạn 1 lần (+7 ngày).",
      "Học viên Cao học & Nghiên cứu sinh: Mượn tối đa 8 cuốn / 30 ngày. Được gia hạn 2 lần (+14 ngày/lần).",
      "Cán bộ & Giảng viên: Mượn tối đa 15 cuốn / 60 ngày. Hỗ trợ mượn giáo trình lâu dài.",
      "Tài liệu đọc tại chỗ (Nội văn, Từ điển, Luận án): Không áp dụng mượn về nhà.",
    ],
  },
  {
    id: "fines",
    category: "Xử lý Quá hạn & Vi phạm",
    title: "Quy định Phạt Mượn Quá hạn & Bồi thường Sách mất",
    summary: "Mức phí phạt trả sách chậm trễ và quy trình xử lý tài liệu bị hỏng hoặc thất lạc.",
    content: [
      "Phí trả quá hạn sách thông thường: 2.000 VNĐ / 1 cuốn / 1 ngày quá hạn.",
      "Phí trả quá hạn tài liệu đặt trước (Reserve List): 5.000 VNĐ / 1 ngày quá hạn.",
      "Trường hợp làm mất hoặc hỏng sách: Bồi thường 100% giá trị sách hiện hành + Phí xử lý nghiệp vụ 30.000 VNĐ.",
      "Độc giả có khoản phạt quá 50.000 VNĐ sẽ tạm khóa quyền mượn sách đến khi thanh toán xong.",
    ],
  },
  {
    id: "conduct",
    category: "Nội quy Thư viện",
    title: "Quy tắc Ứng xử & Giữ gìn Trật tự Không gian Học tập",
    summary: "Các quy định vệ sinh, trang phục và không gian yên tĩnh trong thư viện.",
    content: [
      "Xuất trình Thẻ Thư viện số hoặc Thẻ Sinh viên khi qua cổng kiểm soát an ninh.",
      "Giữ yên tĩnh tuyệt đối tại Tầng 2 (Quiet Study Area). Chuyển điện thoại sang chế độ rung.",
      "Không mang thức ăn có mùi, nước ngọt vào phòng đọc (chỉ cho phép mang nước lọc đóng chai).",
      "Bảo quản tài sản chung, không gạch chân, viết vẽ hoặc làm rách trang sách.",
    ],
  },
];

export default function LibraryRulesPage() {
  const [activeId, setActiveId] = useState<string | null>("loan-limits");

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        {/* Banner Section */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <nav className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <Link href="/" className="hover:text-secondary flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Hướng dẫn & Quy định Thư viện</span>
            </nav>

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Hướng dẫn Sử dụng & Quy định Vận hành Thư viện
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Cung cấp đầy đủ thông tin về hạn mức mượn trả, giờ mở cửa, quy tắc ứng xử phòng đọc và hướng dẫn khai thác hiệu quả tài nguyên học thuật.
              </p>
            </div>
          </div>
        </section>

        {/* Content Rules Section */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Quick Info Box */}
          <aside className="lg:col-span-1 space-y-space-md">
            <div className="bg-primary text-on-primary rounded-xl p-space-lg space-y-space-md shadow-md">
              <div className="flex items-center gap-space-xs text-secondary-fixed">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
                <h3 className="font-title-lg text-title-lg font-bold">Giờ Phục vụ Trực tiếp</h3>
              </div>
              <div className="space-y-2 text-sm text-primary-fixed">
                <p><strong>Thứ 2 - Thứ 6:</strong> 07:30 - 21:00</p>
                <p><strong>Thứ 7:</strong> 08:00 - 17:00</p>
                <p><strong>Chủ nhật & Ngày lễ:</strong> Nghỉ</p>
                <p className="pt-2 text-xs text-on-primary-container border-t border-primary-container font-mono">
                  * Hệ thống CSDL Số truy cập 24/7
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/40 space-y-space-xs">
              <h3 className="font-title-md text-title-md text-primary font-bold">Hỗ trợ Trực tuyến</h3>
              <p className="text-xs text-on-surface-variant">Giải đáp thắc mắc quy định mượn trả & gia hạn sách:</p>
              <div className="text-sm font-semibold text-secondary space-y-1 pt-1">
                <p>📧 Email: thuvien@vnu.edu.vn</p>
                <p>📞 Hotline: 028 3829 xxxx (Ext 102)</p>
              </div>
            </div>
          </aside>

          {/* Rules Accordion */}
          <div className="lg:col-span-2 space-y-space-md">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Quy chế & Quy định Chi tiết
            </h2>

            <div className="space-y-space-md">
              {mockRules.map((rule) => {
                const isOpen = activeId === rule.id;
                return (
                  <div
                    key={rule.id}
                    className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setActiveId(isOpen ? null : rule.id)}
                      className="w-full p-space-md text-left flex items-center justify-between hover:bg-surface-container-low transition-colors"
                    >
                      <div>
                        <span className="text-xs font-semibold text-secondary uppercase font-mono">
                          {rule.category}
                        </span>
                        <h3 className="font-title-lg text-title-lg text-primary font-bold mt-0.5">
                          {rule.title}
                        </h3>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        {isOpen ? "expand_less" : "expand_more"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-space-md pt-0 border-t border-outline-variant/20 bg-surface-container-lowest space-y-space-xs">
                        <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                          {rule.summary}
                        </p>
                        <ul className="space-y-2 pt-2">
                          {rule.content.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-on-surface">
                              <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">
                                check_circle
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
