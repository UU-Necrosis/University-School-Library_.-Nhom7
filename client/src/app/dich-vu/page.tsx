"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Button } from "@/components/ui";
import { ResearchService } from "@/types/library";

const mockServices: ResearchService[] = [
  {
    id: "turnitin",
    title: "Kiểm tra Trùng lặp & Trích dẫn Academic (Turnitin)",
    target: "Nghiên cứu sinh, Học viên & Giảng viên",
    description: "Hỗ trợ rà soát tỉ lệ trùng lặp luận án, bài báo quốc tế Scopus/ISI bằng phần mềm Turnitin Feedback Studio trước khi nộp bảo vệ hoặc gửi nhà xuất bản.",
    features: ["Báo cáo chi tiết chỉ số Similarity Index", "Phân tích trích dẫn chuẩn APA 7th, IEEE, MLA", "Tư vấn sửa lỗi học thuật trong 24h"],
    icon: "fact_check",
  },
  {
    id: "ill",
    title: "Mượn liên Thư viện Quốc tế (ILL & Document Delivery)",
    target: "Toàn thể Độc giả ĐHQG",
    description: "Cung cấp bản sao điện tử (PDF) của các bài báo khoa học, sách chuyên khảo không thuộc kho CSDL hiện có từ hơn 100 thư viện liên kết toàn cầu.",
    features: ["Thời gian đáp ứng: 48 - 72 giờ", "Bản gốc PDF độ nét cao", "Hỗ trợ tài liệu hiếm & bài báo quốc tế"],
    icon: "local_shipping",
  },
  {
    id: "consultation",
    title: "Tư vấn 1-1 với Thủ thư Chuyên ngành (Research Consultation)",
    target: "Nhóm Nghiên cứu & Giảng viên",
    description: "Đặt lịch hẹn trực tiếp với thủ thư chuyên trách từng ngành để xây dựng chiến lược tìm kiếm tài liệu, lựa chọn tạp chí Scopus Q1/Q2 và quản lý trích dẫn EndNote/Zotero.",
    features: ["Thủ thư hỗ trợ chuyên sâu theo ngành", "Hình thức Online qua Zoom hoặc tại Thư viện", "Cung cấp danh mục tài liệu gợi ý"],
    icon: "support_agent",
  },
  {
    id: "isbn-doi",
    title: "Hỗ trợ Đăng ký Mã định danh DOI & Xuất bản Viện trường",
    target: "Tạp chí & Đơn vị Nghiên cứu ĐHQG",
    description: "Gắn mã định danh đối tượng số (DOI Crossref) cho bài báo khoa học, kỷ yếu hội thảo quốc tế và đăng ký lưu chiểu xuất bản đại học.",
    features: ["Chuẩn hóa cấu trúc Metadata Crossref", "Tăng khả năng trích dẫn quốc tế", "Đồng bộ ORCID tác giả"],
    icon: "fingerprint",
  },
];

export default function ResearchServicesPage() {
  const [activeForm, setActiveForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveForm(false);
      setTopic("");
      setNotes("");
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        {/* Banner Section */}
        <section className="bg-tertiary text-on-tertiary py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <Breadcrumb
              variant="tertiary"
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Dịch vụ Nghiên cứu & Hỗ trợ Học thuật" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg font-semibold tracking-tight">
                Dịch vụ Hỗ trợ Nghiên cứu Khoa học & Xuất bản Học thuật
              </h1>
              <p className="font-body-lg text-body-lg text-on-tertiary-container max-w-3xl">
                Đồng hành cùng cộng đồng các nhà khoa học, giảng viên và sinh viên ĐHQG trong suốt vòng đời nghiên cứu — từ tìm kiếm tài liệu đến kiểm tra Turnitin và xuất bản công trình.
              </p>
            </div>
          </div>
        </section>

        {/* Services List Grid */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin space-y-space-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Các Dịch vụ Hỗ trợ Trọng tâm
            </h2>
            <Button
              variant="secondary"
              size="md"
              icon="edit_calendar"
              onClick={() => setActiveForm(true)}
            >
              Gửi yêu cầu hỗ trợ
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {mockServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/40 hover:border-secondary transition-all shadow-sm flex flex-col justify-between gap-space-md"
              >
                <div className="space-y-space-sm">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[28px]">{srv.icon}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider font-mono">
                        Đối tượng: {srv.target}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                        {srv.title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-1 pt-2">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">Đặc điểm dịch vụ:</span>
                    <ul className="space-y-1">
                      {srv.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px] text-[#16A34A]">check_circle</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-on-surface-variant">Thời gian xử lý: 24h - 48h</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary text-secondary hover:bg-secondary/10"
                    onClick={() => setActiveForm(true)}
                  >
                    Đăng ký dịch vụ này
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Consultation Form */}
        {activeForm && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-outline-variant/40">
              <button
                onClick={() => setActiveForm(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Phiếu Đăng ký Dịch vụ Hỗ trợ Nghiên cứu
              </h3>
              <p className="text-sm text-on-surface-variant">
                Thủ thư chuyên trách sẽ liên hệ lại qua Email sinh viên / cán bộ trong vòng 24 giờ làm việc.
              </p>

              {submitted ? (
                <div className="p-4 bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-lg text-center font-medium">
                  ✅ Yêu cầu đã được ghi nhận thành công! Vui lòng kiểm tra email phản hồi.
                </div>
              ) : (
                <form onSubmit={handleSubmitConsultation} className="space-y-space-md">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Email ĐHQG (Email nhận kết quả)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@vnu.edu.vn"
                      className="w-full h-11 px-3 border border-outline-variant rounded-md text-sm font-medium bg-transparent focus:outline-none focus:border-secondary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Tên đề tài / Chủ đề nghiên cứu</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Ví dụ: Kiểm tra Turnitin bài báo Scopus về Machine Learning..."
                      className="w-full h-11 px-3 border border-outline-variant rounded-md text-sm font-medium bg-transparent focus:outline-none focus:border-secondary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Ghi chú cụ thể</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mô tả chi tiết tài liệu cần mượn hoặc yêu cầu hỗ trợ đặc biệt..."
                      className="w-full p-3 border border-outline-variant rounded-md text-sm font-medium bg-transparent focus:outline-none focus:border-secondary"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-space-xs">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => setActiveForm(false)}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" variant="secondary" size="md">
                      Gửi yêu cầu
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
