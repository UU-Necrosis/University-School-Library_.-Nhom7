"use client";

import React, { useState, use } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { BookItem } from "@/types/library";

const mockDetailedBooks: Record<string, BookItem> = {
  "1": {
    id: "1",
    title: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    author: "GS.TS. Nguyễn Văn An, ThS. Trần Minh Đức",
    year: 2024,
    publisher: "NXB Đại học Quốc gia TP.HCM",
    callNumber: "HB 137 .N573K 2024",
    isbn: "978-604-73-9821-4",
    identifier: "DDC: 330.0151 .HB137",
    ddcCode: "330.01 (Kinh tế lượng & Mô hình toán)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    location: "Tầng 3 • Khu Sách Chuyên ngành Kinh tế • Kệ E-04",
    department: "Khoa Kinh tế & QTKD",
    language: "Tiếng Việt (Tóm tắt tiếng Anh)",
    pageCount: 486,
    description:
      "Tài liệu nghiên cứu chuyên sâu về các mô hình xác suất lượng tử áp dụng trong định giá phái sinh, dự báo biến động thị trường chứng khoán và quản trị rủi ro tài chính định lượng trong kỷ nguyên số.",
    tableOfContents: [
      "Chương 1: Không gian Hilbert và Cơ học Lượng tử trong Kinh tế",
      "Chương 2: Mô hình Black-Scholes Lượng tử & Định giá Quyền chọn",
      "Chương 3: Xử lý Bất đối xứng Thông tin trên Thị trường Tài chính",
      "Chương 4: Thuật toán Tối ưu Danh mục Đầu tư Lượng tử",
      "Chương 5: Thực nghiệm trên Thị trường Chứng khoán Việt Nam",
    ],
    copies: [
      {
        barcode: "UL-BK-202401-A",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Khu Sách Kinh tế • Kệ E-04",
        callNumber: "HB 137 .N573K 2024 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-202401-B",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Khu Sách Kinh tế • Kệ E-04",
        callNumber: "HB 137 .N573K 2024 c.2",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-202401-C",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 2 • Phòng Học liệu Sau Đại học",
        callNumber: "HB 137 .N573K 2024 c.3",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-202401-D",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Khu Sách Kinh tế • Kệ E-04",
        callNumber: "HB 137 .N573K 2024 c.4",
        status: "Đang mượn",
        dueDate: "20/10/2026",
      },
      {
        barcode: "UL-BK-202401-E",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Lưu Chiểu Đặc biệt (Đọc tại chỗ)",
        callNumber: "HB 137 .N573K 2024 c.5 (Ref)",
        status: "Bảo quản",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Quantum Computing & Information Theory for Academic Research",
    author: "Prof. David Vance, Dr. Elena Rostova",
    year: 2023,
    publisher: "Cambridge University Press",
    callNumber: "QA 76.88 .V36 2023",
    isbn: "978-1-108-49210-2",
    identifier: "DOI: 10.1017/9781108492102",
    ddcCode: "004.1 (Máy tính lượng tử & Lý thuyết thông tin)",
    format: "Open Access",
    type: "Open Access",
    available: true,
    totalCopies: 1,
    availableCopies: 1,
    location: "Cơ sở dữ liệu số • Toàn văn PDF (Open Access)",
    department: "Khoa CNTT & Viện Công nghệ Tiên tiến",
    language: "Tiếng Anh (English)",
    pageCount: 612,
    description:
      "A comprehensive textbook covering fundamental principles of quantum bits, quantum gates, error correction codes, and quantum communication protocols for postgraduate researchers.",
    tableOfContents: [
      "Chapter 1: Qubits and Quantum State Spaces",
      "Chapter 2: Quantum Algorithms (Shor & Grover)",
      "Chapter 3: Quantum Error Mitigation & Fault Tolerance",
      "Chapter 4: Quantum Cryptography & QKD Systems",
      "Chapter 5: Physical Implementations & Quantum Hardware",
    ],
    copies: [
      {
        barcode: "UL-OA-2023-99",
        campus: "Thư viện Số Toàn văn (Digital Repository)",
        location: "Hệ thống Máy chủ Lưu trữ ĐHQG",
        callNumber: "QA 76.88 .V36 2023 [PDF]",
        status: "Có sẵn",
      },
    ],
  },
  "3": {
    id: "3",
    title: "Mô hình Máy học & Trí tuệ Nhân tạo trong Phân tích Dữ liệu Chuỗi thời gian",
    author: "PGS.TS. Lê Hoàng Nam",
    year: 2024,
    publisher: "NXB Bách Khoa",
    callNumber: "Q335 .L402M 2024",
    isbn: "978-604-95-1234-5",
    identifier: "DDC: 006.31 .Q335",
    ddcCode: "006.3 (Trí tuệ nhân tạo & Machine Learning)",
    format: "Ebook PDF",
    type: "Ebook PDF",
    available: true,
    totalCopies: 10,
    availableCopies: 8,
    location: "Thư viện số UniLibrary Proxy & Phòng Đọc Lab AI",
    department: "Khoa Khoa học & Kỹ thuật Máy tính",
    language: "Tiếng Việt",
    pageCount: 520,
    description:
      "Giáo trình chuẩn hóa về mạng nơ-ron hồi quy RNN, LSTM, Transformer và các mô hình Foundation Models ứng dụng trong xử lý dữ liệu cảm biến IoT, chuỗi tài chính và khí tượng học.",
    tableOfContents: [
      "Chương 1: Cơ sở Toán học của Học máy",
      "Chương 2: Kiến trúc Deep Learning cho Dữ liệu Tuần tự",
      "Chương 3: Attention Mechanism và Mô hình Transformer",
      "Chương 4: Tinh chỉnh (Fine-tuning) & Triển khai Production",
    ],
    copies: [
      {
        barcode: "UL-EB-2024-08",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Thực hành Máy tính Tầng 1",
        callNumber: "Q335 .L402M 2024 (eBook)",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-2024-44",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Khu Giáo trình CNTT",
        callNumber: "Q335 .L402M 2024 c.1",
        status: "Có sẵn",
      },
    ],
  },
  "4": {
    id: "4",
    title: "Nghiên cứu Tác động của Biến đổi Khí hậu đến Đồng bằng Sông Cửu Long",
    author: "TS. Phạm Quốc Hùng",
    year: 2022,
    publisher: "Đại học Quốc gia Hà Nội",
    callNumber: "QC 903 .P43 2022",
    isbn: "Luận án Tiến sĩ • LA-2022-88",
    identifier: "LVTS: 2022.LA.088",
    ddcCode: "551.6 (Khí tượng học & Biến đổi môi trường)",
    format: "Luận án TS",
    type: "Luận án Tiến sĩ",
    available: false,
    totalCopies: 2,
    availableCopies: 0,
    location: "Phòng Bảo quản Tài liệu Đặt trước • Tầng 4",
    department: "Khoa Môi trường & Tài nguyên",
    language: "Tiếng Việt",
    pageCount: 310,
    description:
      "Công trình luận án tiến sĩ phân tích đa kịch bản xâm nhập mặn, sạt lở bờ sông và đề xuất giải pháp thích ứng sinh kế bền vững cho 13 tỉnh thành ĐBSCL giai đoạn 2025 - 2050.",
    tableOfContents: [
      "Chương 1: Tổng quan Nghiên cứu Biến đổi Khí hậu Lưu vực Sông Mekong",
      "Chương 2: Mô phỏng Thủy lực & Lan truyền Độ mặn 2D",
      "Chương 3: Đánh giá Tính dễ bị Tổn thương của Nông nghiệp",
      "Chương 4: Đề xuất Mô hình Thích ứng Sinh kế Dựa vào Hệ sinh thái",
    ],
    copies: [
      {
        barcode: "UL-TS-2022-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Lưu trữ Luận án Tầng 4",
        callNumber: "QC 903 .P43 2022 c.1",
        status: "Đang mượn",
        dueDate: "18/10/2026",
      },
      {
        barcode: "UL-TS-2022-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Lưu trữ Luận án Tầng 4",
        callNumber: "QC 903 .P43 2022 c.2",
        status: "Đã đặt trước",
        dueDate: "Chờ độc giả lấy sách",
      },
    ],
  },
  "b1": {
    id: "b1",
    title: "Artificial Intelligence: A Modern Approach (4th Global Ed.)",
    author: "Stuart Russell, Peter Norvig • 2024",
    year: 2024,
    publisher: "Pearson Education",
    callNumber: "QA 76.73 .P98 2024",
    isbn: "978-0134610993",
    identifier: "DDC: QA76.73 .P98 2024",
    ddcCode: "006.3 (AI Foundations)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 5,
    availableCopies: 4,
    location: "Tầng 2 • Khu Sách CNTT • Kệ DDC 006",
    department: "Khoa CNTT",
    language: "Tiếng Anh (English)",
    pageCount: 1152,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdEmaKpoZx_6Xxbfgjsgj5ej6xqkLApHgwR8nf-dDXOIVS4hzQvCqFQYkHlWgDmEhQuUAgcHZjBXLAhzcBbO3NslpqTX1Exeqz50sJAAwyrWJZuegorg-emLSv38hQEmn1Q0ISieUcOGhMC9oWG1QnzuksAeVzb74v1gZpMWWCrZ-EiOfPOTxZx5ZUJxEIZEz1UMyJLaFGiAFZ_UhBjbZhX4rurOd6q9VVXGLQMWkyMoinnEo_BUwC",
    description:
      "The authoritative textbook on artificial intelligence, offering the most comprehensive and up-to-date introduction to the theory and practice of AI, search algorithms, multi-agent systems, and deep learning.",
    copies: [
      {
        barcode: "UL-AI-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ DDC 006",
        callNumber: "QA 76.73 .P98 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-AI-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ DDC 006",
        callNumber: "QA 76.73 .P98 c.2",
        status: "Có sẵn",
      },
      {
        barcode: "UL-AI-03",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Kệ Sách Quốc tế",
        callNumber: "QA 76.73 .P98 c.3",
        status: "Có sẵn",
      },
    ],
  },
  "b2": {
    id: "b2",
    title: "Kinh Tế Lượng Ứng Dụng Trong Phân Tích Chuỗi Thời Gian",
    author: "GS.TS. Trần Đình Hưng • 2024",
    year: 2024,
    publisher: "NXB Kinh Tế TP.HCM",
    callNumber: "HB 139 .T73 2024",
    isbn: "978-604-922-110-3",
    identifier: "DOI: 10.1016/j.econ.2024",
    ddcCode: "330.015195 (Kinh tế lượng)",
    format: "Open Access",
    type: "Open Access",
    available: true,
    totalCopies: 1,
    availableCopies: 1,
    location: "Cơ sở dữ liệu số • Toàn văn PDF",
    department: "Khoa Kinh tế & QTKD",
    language: "Tiếng Việt",
    pageCount: 390,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcLFUd4eKRQalDw9P4qCohZDe7DyK1GfdCYjCYo9p_I8udLbQ43ye1In-lRgH1yjwrr2oo_qCYXA2PNFCwkXaRaOWJxwl95F-YEyxEnj9haYigWOzlITPu0fMAF4XyDcZD6Ql07z3kQ3NEfpbmYogO5IBvPu9HResBYRz6y8VxrWWlEBhIB0jkjjsAnpXeBZrsHxm3VjMD78DJ3B7LeP6R-cypTVZdzlMrjGRin5r_AEye_WN7IxNg",
    description:
      "Nghiên cứu ứng dụng các chuỗi thời gian phi tuyến, mô hình ARCH/GARCH và vector autoregression (VAR) trong phân tích thị trường tài chính và kinh tế vĩ mô.",
    copies: [
      {
        barcode: "UL-OA-KTL-01",
        campus: "Kho Tài nguyên Mở ĐHQG",
        location: "Truy cập trực tuyến 24/7",
        callNumber: "DOI: 10.1016/j.econ.2024",
        status: "Có sẵn",
      },
    ],
  },
  "b3": {
    id: "b3",
    title: "Nghiên Cứu Vật Liệu Bán Dẫn 2D Thế Hệ Mới Ứng Dụng Trong Quang Điện Tử",
    author: "TS. Vũ Minh Châu (HD: GS. Lê Văn Bách) • 2024",
    year: 2024,
    publisher: "Viện Vật lý Ứng dụng - ĐHQG",
    callNumber: "QC 611.8 .V83 2024",
    isbn: "LVTS: 2024.LA.042",
    identifier: "LVTS: 2024.LA.042",
    ddcCode: "621.38152 (Bán dẫn & Quang điện tử)",
    format: "Luận án TS",
    type: "Luận án Tiến sĩ",
    available: true,
    totalCopies: 2,
    availableCopies: 1,
    location: "Phòng Lưu trữ Luận án Tầng 4 & Bản số",
    department: "Viện Vật lý Ứng dụng",
    language: "Tiếng Việt",
    pageCount: 280,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr3K0IOzRKlXDQSpXDOEnvCPNliUgogzQeAfQb6YNQsDDkY9MGiO_v_ZRWdU8WtBSTu7dHsK3o1-0zRG6xFOqeqgt2pIPOUEvSdztq3tJjVVwgSKRgZV-XQ8h3kiR82MbvDwBijY4qz-0_LMTChgwifZtCjw5lre27wf9GvkWCrtvVO392zvfMqTNajpjkb457695CMV__GOlk1gIFCRCOjIKkZvQYDO9LdKIXIeOZFXa6VR3U2CRL",
    description:
      "Chế tạo và khảo sát tính chất quang-điện của vật liệu graphene và MoS2 hai chiều ứng dụng cho cảm biến quang phổ và tế bào quang điện hiệu suất cao.",
    copies: [
      {
        barcode: "UL-TS-2024-42",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Luận án Tầng 4",
        callNumber: "QC 611.8 .V83 2024",
        status: "Có sẵn",
      },
    ],
  },
  "b4": {
    id: "b4",
    title: "Quy Hoạch Lưới Điện Thông Minh & Tích Hợp Năng Lượng Tái Tạo",
    author: "PGS.TS. Nguyễn Văn Thịnh • 2023",
    year: 2023,
    publisher: "NXB Đại học Quốc gia",
    callNumber: "TK 1005 .C55 2023",
    isbn: "978-604-88-2199-0",
    identifier: "DDC: TK1005 .C55 2023",
    ddcCode: "621.31 (Kỹ thuật điện)",
    format: "Sách in",
    type: "Tạp chí Scopus",
    available: false,
    totalCopies: 3,
    availableCopies: 0,
    location: "Kho Mượn Giáo trình Tầng 3",
    department: "Khoa Điện - Điện tử",
    language: "Tiếng Việt",
    pageCount: 420,
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBizkQ6A22e9fKWLQqrAjf16ReDOrf946f4c8jTtXTGqhpJlyqbu7CGSDEqamY6JJeY54uCDugAmxLtmBdj5exImC5yO5AMQKuk3-uG9-c4ZjzX71oKi8IvhAbjmyHFJLSpSDlzFZ0Ta4uNEXIX09A43YqXDfLYGIqmUPXSoxaLvFW0zCYR8M-xUceHh0CQNWBW96l9FL1mut9Qs4VVyHRJZ-9db_4sikxbmXo6kuYSkqcEm1Vsgopq",
    description:
      "Phân tích ổn định hệ thống điện khi tích hợp nguồn năng lượng gió và điện mặt trời quy mô lớn, ứng dụng microgrid và điều độ thông minh.",
    copies: [
      {
        barcode: "UL-EE-2023-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Kệ Điện - Điện tử",
        callNumber: "TK 1005 .C55 c.1",
        status: "Đang mượn",
        dueDate: "28/10/2026",
      },
      {
        barcode: "UL-EE-2023-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Kệ Điện - Điện tử",
        callNumber: "TK 1005 .C55 c.2",
        status: "Đang mượn",
        dueDate: "02/11/2026",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const bookId = resolvedParams.id;
  const book = mockDetailedBooks[bookId] || mockDetailedBooks["1"];

  const [activeTab, setActiveTab] = useState<"copies" | "toc" | "cite">("copies");
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isUnavailable = !book.available || (book.availableCopies !== undefined && book.availableCopies <= 0);

  const handleConfirmBorrow = () => {
    setBorrowModalOpen(false);
    setSuccessToast(`Đã gửi yêu cầu giữ sách "${book.title}" thành công! Vui lòng đến quầy lưu hành trong 48h.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleConfirmReserve = () => {
    setReserveModalOpen(false);
    setSuccessToast(`Đã thêm bạn vào hàng đợi đặt trước số #01 cho cuốn "${book.title}". Hệ thống sẽ thông báo khi có sách trả.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1 pb-space-xl">
        {/* Breadcrumb Header */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-md px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Tra cứu OPAC", href: "/tra-cuu" },
                { label: book.title },
              ]}
            />
          </div>
        </section>

        {/* Success Toast */}
        {successToast && (
          <div className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-md">
            <div className="p-space-md bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-space-xs font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[22px]">check_circle</span>
                <span>{successToast}</span>
              </div>
              <button onClick={() => setSuccessToast(null)} className="text-[#166534] hover:opacity-70">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Book Detail Section */}
        <section className="max-w-7xl mx-auto px-space-md lg:px-margin mt-space-lg grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
          {/* Left Column: Book Cover & Quick Action Card */}
          <div className="lg:col-span-1 space-y-space-md">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/40 shadow-sm text-center">
              {/* Cover */}
              <div className="relative w-48 h-64 mx-auto rounded-xl bg-surface-container-high overflow-hidden shadow-md flex items-center justify-center p-2 mb-space-md border border-outline-variant/30">
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[54px] mb-2 text-secondary">menu_book</span>
                    <span className="font-title-sm text-title-sm font-bold uppercase">{book.format || "Tài liệu in"}</span>
                  </div>
                )}
                <span className="absolute top-2 left-2">
                  <Badge variant={book.format === "Open Access" ? "tertiary" : "dark"} size="sm">
                    {book.type || book.format}
                  </Badge>
                </span>
              </div>

              {/* Status Pill */}
              <div className="mb-space-md">
                <Badge
                  variant={isUnavailable ? "danger" : "success"}
                  size="md"
                  dot
                  pulse={!isUnavailable}
                >
                  {isUnavailable
                    ? "Tạm thời hết bản khả dụng"
                    : `Sẵn sàng phục vụ (${book.availableCopies || 1}/${book.totalCopies || 1} bản)`}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="space-y-space-xs">
                {book.format === "Open Access" || book.format === "Ebook PDF" ? (
                  <Button variant="secondary" size="lg" fullWidth icon="download_for_offline">
                    Đọc toàn văn PDF trực tuyến
                  </Button>
                ) : isUnavailable ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    icon="event_seat"
                    onClick={() => setReserveModalOpen(true)}
                  >
                    Đặt trước (Hàng đợi giữ chỗ)
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    icon="bookmark_add"
                    onClick={() => setBorrowModalOpen(true)}
                  >
                    Đặt mượn tài liệu này
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={isBookmarked ? "bookmark_added" : "bookmark"}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? "Đã lưu vào danh mục của tôi" : "Lưu vào danh mục cá nhân"}
                </Button>
              </div>

              {/* DDC & Call Number Callout */}
              <div className="mt-space-md pt-space-md border-t border-outline-variant/30 text-left space-y-1.5 font-label-sm text-label-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant font-medium">Mã xếp giá (Call No):</span>
                  <span className="font-mono font-bold text-primary">{book.callNumber}</span>
                </div>
                {book.ddcCode && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Phân loại DDC:</span>
                    <span className="font-mono text-secondary font-semibold">{book.ddcCode}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-on-surface-variant font-medium">Mã ISBN / DOI:</span>
                  <span className="font-mono text-on-surface">{book.isbn || book.identifier}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata, Description, Copies & Tabs */}
          <div className="lg:col-span-2 space-y-space-md">
            {/* Header Info */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg border border-outline-variant/40 shadow-sm space-y-space-sm">
              <div className="flex items-center gap-space-xs flex-wrap">
                <Badge variant="primary" size="sm">
                  {book.department || "Khoa Khoa học Tổng hợp"}
                </Badge>
                <span className="text-xs text-on-surface-variant font-mono">Xuất bản năm {book.year}</span>
              </div>

              <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                {book.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xs pt-1 text-body-md text-on-surface-variant">
                <p>
                  Tác giả chính: <strong className="text-on-surface">{book.author}</strong>
                </p>
                <p>
                  Nhà xuất bản: <strong className="text-on-surface">{book.publisher || "NXB Đại học Quốc gia"}</strong>
                </p>
                <p>
                  Ngôn ngữ: <strong className="text-on-surface">{book.language || "Tiếng Việt"}</strong>
                </p>
                <p>
                  Số trang: <strong className="text-on-surface">{book.pageCount || 450} trang</strong>
                </p>
              </div>

              {/* Description */}
              {book.description && (
                <div className="pt-space-sm border-t border-outline-variant/30">
                  <h3 className="font-title-sm text-title-sm text-primary font-bold mb-1">Tóm tắt nội dung</h3>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">{book.description}</p>
                </div>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
              <div className="flex border-b border-outline-variant/30 bg-surface-container-low/60 px-space-md">
                <button
                  onClick={() => setActiveTab("copies")}
                  className={`py-3 px-space-md font-title-sm text-title-sm border-b-2 font-semibold transition-colors ${
                    activeTab === "copies"
                      ? "border-secondary text-secondary bg-surface-container-lowest"
                      : "border-transparent text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                    <span>Danh sách bản sao ({book.copies?.length || 1})</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("toc")}
                  className={`py-3 px-space-md font-title-sm text-title-sm border-b-2 font-semibold transition-colors ${
                    activeTab === "toc"
                      ? "border-secondary text-secondary bg-surface-container-lowest"
                      : "border-transparent text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">list_alt</span>
                    <span>Mục lục chi tiết</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("cite")}
                  className={`py-3 px-space-md font-title-sm text-title-sm border-b-2 font-semibold transition-colors ${
                    activeTab === "cite"
                      ? "border-secondary text-secondary bg-surface-container-lowest"
                      : "border-transparent text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">format_quote</span>
                    <span>Trích dẫn học thuật</span>
                  </span>
                </button>
              </div>

              {/* Tab 1: Physical Copies List */}
              {activeTab === "copies" && (
                <div className="p-space-md overflow-x-auto">
                  <table className="w-full text-left border-collapse text-body-sm text-body-sm">
                    <thead>
                      <tr className="bg-surface-container-low text-xs font-mono font-semibold text-on-surface-variant uppercase border-b border-outline-variant/30">
                        <th className="p-space-sm">Mã bản sao</th>
                        <th className="p-space-sm">Cơ sở & Vị trí kệ</th>
                        <th className="p-space-sm">Ký hiệu phân loại</th>
                        <th className="p-space-sm">Tình trạng</th>
                        <th className="p-space-sm text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {book.copies && book.copies.length > 0 ? (
                        book.copies.map((copy) => (
                          <tr key={copy.barcode} className="hover:bg-surface-container-low/40 transition-colors">
                            <td className="p-space-sm font-mono font-bold text-primary text-xs">{copy.barcode}</td>
                            <td className="p-space-sm">
                              <p className="font-semibold text-on-surface">{copy.campus}</p>
                              <p className="text-on-surface-variant text-[11px] flex items-center gap-1 mt-0.5">
                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                {copy.location}
                              </p>
                            </td>
                            <td className="p-space-sm font-mono text-xs">{copy.callNumber}</td>
                            <td className="p-space-sm">
                              <Badge
                                variant={
                                  copy.status === "Có sẵn"
                                    ? "success"
                                    : copy.status === "Đang mượn"
                                    ? "danger"
                                    : copy.status === "Đã đặt trước"
                                    ? "warning"
                                    : "neutral"
                                }
                                size="sm"
                              >
                                {copy.status}
                              </Badge>
                              {copy.dueDate && (
                                <span className="block text-[10px] text-on-surface-variant font-mono mt-0.5">
                                  Hạn: {copy.dueDate}
                                </span>
                              )}
                            </td>
                            <td className="p-space-sm text-right">
                              {copy.status === "Có sẵn" ? (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setBorrowModalOpen(true)}
                                >
                                  Mượn
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setReserveModalOpen(true)}
                                >
                                  Đặt trước
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-space-lg text-center text-on-surface-variant">
                            Không tìm thấy bản sao vật lý. Vui lòng tham khảo tài liệu số.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: Table of Contents */}
              {activeTab === "toc" && (
                <div className="p-space-lg space-y-space-sm">
                  <h4 className="font-title-sm text-title-sm text-primary font-bold">Mục lục sơ lược</h4>
                  <ul className="space-y-2">
                    {(book.tableOfContents || [
                      "Phần 1: Giới thiệu & Khái niệm nền tảng",
                      "Phần 2: Phương pháp luận & Khung phân tích",
                      "Phần 3: Kết quả thực nghiệm & Nghiên cứu điển hình",
                      "Phần 4: Kết luận & Hướng phát triển tương lai",
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-body-md text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-secondary mt-1">article</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 3: Academic Citation */}
              {activeTab === "cite" && (
                <div className="p-space-lg space-y-space-md">
                  <h4 className="font-title-sm text-title-sm text-primary font-bold">Định dạng trích dẫn chuẩn</h4>
                  
                  <div className="p-space-md bg-surface-container-low rounded-lg border border-outline-variant/30 space-y-1">
                    <span className="font-label-sm text-label-sm font-bold text-secondary uppercase">APA 7th Edition</span>
                    <p className="font-mono text-xs text-on-surface">
                      {book.author} ({book.year}). <em>{book.title}</em>. {book.publisher || "ĐHQG-HCM"}.
                    </p>
                  </div>

                  <div className="p-space-md bg-surface-container-low rounded-lg border border-outline-variant/30 space-y-1">
                    <span className="font-label-sm text-label-sm font-bold text-secondary uppercase">IEEE Format</span>
                    <p className="font-mono text-xs text-on-surface">
                      {book.author}, "{book.title}," {book.publisher || "ĐHQG-HCM"}, {book.year}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Modal: Đặt mượn sách */}
        {borrowModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-outline-variant/40">
              <button
                onClick={() => setBorrowModalOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-[24px] text-secondary">bookmark_added</span>
                <h3 className="font-headline-sm text-headline-sm font-bold">Xác nhận Yêu cầu Mượn sách</h3>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-xl text-body-sm text-body-sm space-y-1">
                <p>
                  Tên tài liệu: <strong className="text-primary">{book.title}</strong>
                </p>
                <p>
                  Thời hạn mượn: <strong>14 ngày</strong> (Học viên Sau ĐH: 30 ngày)
                </p>
                <p>
                  Cơ sở nhận: <strong>Cơ sở 1 (Khuôn viên Trung tâm)</strong>
                </p>
              </div>

              <p className="text-xs text-on-surface-variant">
                Sau khi gửi yêu cầu, sách sẽ được thủ thư giữ tại Quầy Lưu hành trong vòng <strong>48 giờ</strong>. Vui lòng xuất trình Thẻ Thư viện số để nhận tài liệu.
              </p>

              <div className="pt-2 flex justify-end gap-space-xs">
                <Button variant="outline" size="md" onClick={() => setBorrowModalOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button variant="secondary" size="md" onClick={handleConfirmBorrow}>
                  Xác nhận đặt mượn
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Đặt trước (Reserve Queue) */}
        {reserveModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-outline-variant/40">
              <button
                onClick={() => setReserveModalOpen(false)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-[24px] text-amber-600">event_seat</span>
                <h3 className="font-headline-sm text-headline-sm font-bold">Đăng ký Hàng đợi Đặt trước (Hold)</h3>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-xl text-body-sm text-body-sm space-y-1">
                <p>
                  Tên tài liệu: <strong className="text-primary">{book.title}</strong>
                </p>
                <p>
                  Tình trạng hiện tại: <span className="text-[#DC2626] font-semibold">Tất cả các bản đang được mượn</span>
                </p>
                <p>
                  Thứ tự hàng đợi của bạn: <strong className="text-secondary">#01 (Tiếp theo)</strong>
                </p>
              </div>

              <p className="text-xs text-on-surface-variant">
                Khi có độc giả hoàn trả bản sao, hệ thống sẽ tự động khóa sách trong <strong>3 ngày</strong> và gửi thông báo khẩn qua Email sinh viên cho bạn.
              </p>

              <div className="pt-2 flex justify-end gap-space-xs">
                <Button variant="outline" size="md" onClick={() => setReserveModalOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button variant="secondary" size="md" onClick={handleConfirmReserve}>
                  Xác nhận vào hàng đợi
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
