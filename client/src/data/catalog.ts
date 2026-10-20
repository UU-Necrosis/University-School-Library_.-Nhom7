import { BookItem } from "@/types/library";

export interface CategoryInfo {
  slug: string;
  name: string;
  icon: string;
  description: string;
  ddcRange: string;
}

export interface AuthorInfo {
  id: string;
  name: string;
  title: string;
  department: string;
  affiliation: string;
  avatar?: string;
  bio: string;
  bookCount: number;
  bookIds: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "kinh-te",
    name: "Kinh tế & Quản trị",
    icon: "trending_up",
    description: "Kinh tế vi mô, vĩ mô, tài chính định lượng, kinh tế lượng, quản trị kinh doanh & chuỗi cung ứng.",
    ddcRange: "DDC: 330 - 339",
  },
  {
    slug: "cong-nghe",
    name: "Công nghệ & Kỹ thuật Máy tính",
    icon: "memory",
    description: "Trí tuệ nhân tạo, khoa học dữ liệu, lập trình hệ thống, an ninh mạng, điện toán đám mây & vi mạch.",
    ddcRange: "DDC: 004 - 006",
  },
  {
    slug: "khoa-hoc",
    name: "Khoa học – Nghiên cứu & Môi trường",
    icon: "science",
    description: "Vật lý bán dẫn, khoa học vật liệu, biến đổi khí hậu, sinh học thực nghiệm và phương pháp nghiên cứu học thuật.",
    ddcRange: "DDC: 500 - 599",
  },
  {
    slug: "van-hoc",
    name: "Văn học & Nghệ thuật",
    icon: "auto_stories",
    description: "Tiểu thuyết kinh điển, phê bình văn học, văn học đương đại, triết học nghệ thuật và tác phẩm văn hóa xã hội.",
    ddcRange: "DDC: 800 - 899",
  },
  {
    slug: "truyen-tranh",
    name: "Truyện tranh & Graphic Novels",
    icon: "palette",
    description: "Truyện tranh khoa học viễn tưởng, graphic novels lịch sử, manga học đường và văn hóa đồ họa hình tượng.",
    ddcRange: "DDC: 741.5",
  },
];

export const CATALOG_BOOKS: (BookItem & { category: string; categoryName: string })[] = [
  // --- KINH TẾ ---
  {
    id: "1",
    title: "Kinh tế học Lượng tử và Ứng dụng trong Tài chính Hiện đại",
    author: "GS.TS. Nguyễn Văn An, ThS. Trần Minh Đức",
    category: "kinh-te",
    categoryName: "Kinh tế & Quản trị",
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
    language: "Tiếng Việt",
    pageCount: 486,
    description:
      "Tài liệu nghiên cứu chuyên sâu về các mô hình xác suất lượng tử áp dụng trong định giá phái sinh, dự báo biến động thị trường tài chính và quản trị rủi ro định lượng.",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
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
    ],
  },
  {
    id: "b2",
    title: "Kinh Tế Lượng Ứng Dụng Trong Phân Tích Chuỗi Thời Gian",
    author: "GS.TS. Trần Đình Hưng",
    category: "kinh-te",
    categoryName: "Kinh tế & Quản trị",
    year: 2024,
    publisher: "NXB Kinh Tế TP.HCM",
    callNumber: "HB 139 .T73 2024",
    isbn: "978-604-92-8812-7",
    identifier: "DOI: 10.1016/j.econ.2024",
    ddcCode: "330.028 (Phương pháp định lượng kinh tế)",
    format: "Open Access",
    type: "Open Access",
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    location: "Tầng 3 • Khu Sách Chuyên ngành Kinh tế • Kệ E-02",
    department: "Khoa Kinh tế & QTKD",
    language: "Tiếng Việt",
    pageCount: 395,
    description:
      "Giáo trình ứng dụng các mô hình ARIMA, GARCH và VAR trong phân tích kinh tế vi mô, chuỗi tài chính và dự báo chỉ số vĩ mô quốc gia.",
    coverImage:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-BK-2024-KT01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Kệ E-02",
        callNumber: "HB 139 .T73 2024 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-2024-KT02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 3 • Kệ E-02",
        callNumber: "HB 139 .T73 2024 c.2",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-2024-KT03",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Kệ K-01",
        callNumber: "HB 139 .T73 2024 c.3",
        status: "Đang mượn",
        dueDate: "25/10/2026",
      },
    ],
  },

  // --- CÔNG NGHỆ ---
  {
    id: "3",
    title: "Mô hình Máy học & Trí tuệ Nhân tạo trong Phân tích Dữ liệu Chuỗi thời gian",
    author: "PGS.TS. Lê Hoàng Nam",
    category: "cong-nghe",
    categoryName: "Công nghệ & Kỹ thuật Máy tính",
    year: 2024,
    publisher: "NXB Bách Khoa",
    callNumber: "Q335 .L402M 2024",
    isbn: "978-604-95-1234-5",
    identifier: "DDC: 006.31 .Q335",
    ddcCode: "006.3 (Trí tuệ nhân tạo & Machine Learning)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 10,
    availableCopies: 8,
    location: "Tầng 2 • Khu Giáo trình CNTT • Kệ C-01",
    department: "Khoa Khoa học & Kỹ thuật Máy tính",
    language: "Tiếng Việt",
    pageCount: 520,
    description:
      "Giáo trình chuẩn hóa về mạng nơ-ron sâu RNN, LSTM, Transformer và Foundation Models ứng dụng trong xử lý dữ liệu cảm biến IoT, chuỗi tài chính và nhận diện mẫu.",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-BK-2024-44",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ C-01",
        callNumber: "Q335 .L402M 2024 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-2024-45",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ C-01",
        callNumber: "Q335 .L402M 2024 c.2",
        status: "Có sẵn",
      },
      {
        barcode: "UL-BK-2024-46",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Kệ IT-04",
        callNumber: "Q335 .L402M 2024 c.3",
        status: "Đang mượn",
        dueDate: "28/10/2026",
      },
    ],
  },
  {
    id: "b1",
    title: "Artificial Intelligence: A Modern Approach (4th Global Ed.)",
    author: "Stuart Russell, Peter Norvig",
    category: "cong-nghe",
    categoryName: "Công nghệ & Kỹ thuật Máy tính",
    year: 2024,
    publisher: "Pearson Education",
    callNumber: "QA 76.73 .P98 2024",
    isbn: "978-0134610993",
    identifier: "DDC: 006.3 .R96 2024",
    ddcCode: "006.3 (Trí tuệ nhân tạo)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 5,
    availableCopies: 4,
    location: "Tầng 2 • Khu Giáo trình Ngoại văn • Kệ C-08",
    department: "Khoa CNTT",
    language: "Tiếng Anh (English)",
    pageCount: 1152,
    description:
      "Tài liệu kinh điển toàn cầu về cấu trúc tác tử thông minh, thuật toán tìm kiếm Heuristic, học tăng cường, thị giác máy tính và đạo đức AI.",
    coverImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-AI-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ C-08",
        callNumber: "QA 76.73 .P98 2024 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-AI-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ C-08",
        callNumber: "QA 76.73 .P98 2024 c.2",
        status: "Có sẵn",
      },
    ],
  },
  {
    id: "b4",
    title: "Quy Hoạch Lưới Điện Thông Minh & Tích Hợp Năng Lượng Tái Tạo",
    author: "PGS.TS. Nguyễn Văn Thịnh",
    category: "cong-nghe",
    categoryName: "Công nghệ & Kỹ thuật Máy tính",
    year: 2023,
    publisher: "NXB Khoa Học & Kỹ Thuật",
    callNumber: "TK 1005 .C55 2023",
    isbn: "978-604-67-1192-3",
    identifier: "DDC: TK1005 .C55 2023",
    ddcCode: "621.31 (Kỹ thuật điện & Lưới điện thông minh)",
    format: "Sách in",
    type: "Sách in",
    available: false,
    totalCopies: 3,
    availableCopies: 0,
    location: "Tầng 2 • Khu Sách Kỹ thuật Điện • Kệ E-12",
    department: "Khoa Điện - Điện tử",
    language: "Tiếng Việt",
    pageCount: 420,
    description:
      "Công trình nghiên cứu ứng dụng SCADA, IoT và các thuật toán tối ưu phân bổ phụ tải trong lưới điện tích hợp điện mặt trời và điện gió quy mô lớn.",
    coverImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-EE-2023-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ E-12",
        callNumber: "TK 1005 .C55 2023 c.1",
        status: "Đang mượn",
        dueDate: "28/10/2026",
      },
      {
        barcode: "UL-EE-2023-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 2 • Kệ E-12",
        callNumber: "TK 1005 .C55 2023 c.2",
        status: "Đang mượn",
        dueDate: "02/11/2026",
      },
      {
        barcode: "UL-EE-2023-03",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Kệ K-02",
        callNumber: "TK 1005 .C55 2023 c.3",
        status: "Đang mượn",
        dueDate: "05/11/2026",
      },
    ],
  },

  // --- KHOA HỌC – NGHIÊN CỨU ---
  {
    id: "4",
    title: "Nghiên cứu Tác động của Biến đổi Khí hậu đến Đồng bằng Sông Cửu Long",
    author: "TS. Phạm Quốc Hùng",
    category: "khoa-hoc",
    categoryName: "Khoa học – Nghiên cứu & Môi trường",
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
      "Công trình luận án tiến sĩ phân tích đa kịch bản xâm nhập mặn, sạt lở bờ sông và giải pháp thích ứng sinh kế bền vững cho 13 tỉnh thành ĐBSCL.",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-TS-2022-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Lưu Chiểu Đặc biệt Tầng 4",
        callNumber: "QC 903 .P43 2022 c.1",
        status: "Đang mượn",
        dueDate: "26/10/2026",
      },
      {
        barcode: "UL-TS-2022-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Phòng Lưu Chiểu Đặc biệt Tầng 4",
        callNumber: "QC 903 .P43 2022 c.2",
        status: "Đã đặt trước",
        dueDate: "28/10/2026",
      },
    ],
  },
  {
    id: "b3",
    title: "Nghiên Cứu Vật Liệu Bán Dẫn 2D Thế Hệ Mới Ứng Dụng Trong Quang Điện Tử",
    author: "TS. Vũ Minh Châu",
    category: "khoa-hoc",
    categoryName: "Khoa học – Nghiên cứu & Môi trường",
    year: 2024,
    publisher: "Viện Vật lý Ứng dụng & NXB ĐHQG",
    callNumber: "QC 611.8 .V82 2024",
    isbn: "978-604-73-9910-5",
    identifier: "LVTS: 2024.LA.042",
    ddcCode: "537.622 (Vật lý chất rắn & Bán dẫn)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 3,
    availableCopies: 2,
    location: "Tầng 4 • Khu Nghiên cứu Vật lý • Kệ P-05",
    department: "Viện Vật lý Ứng dụng",
    language: "Tiếng Việt & Tóm tắt tiếng Anh",
    pageCount: 280,
    description:
      "Nghiên cứu chế tạo màng vật liệu graphene, MoS2 và cấu trúc dị thể Van der Waals thế hệ mới cho các cảm biến quang điện tử siêu nhạy.",
    coverImage:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-TS-2024-42",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 4 • Kệ P-05",
        callNumber: "QC 611.8 .V82 2024 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-TS-2024-43",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 4 • Kệ P-05",
        callNumber: "QC 611.8 .V82 2024 c.2",
        status: "Có sẵn",
      },
    ],
  },
  {
    id: "2",
    title: "Quantum Computing & Information Theory for Academic Research",
    author: "Prof. David Vance, Dr. Elena Rostova",
    category: "khoa-hoc",
    categoryName: "Khoa học – Nghiên cứu & Môi trường",
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
      "Tài liệu toàn diện về nguyên lý qubit, cổng lượng tử, mã sửa sai lượng tử và giao thức truyền thông lượng tử cho học viên sau đại học.",
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
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

  // --- VĂN HỌC ---
  {
    id: "vh-01",
    title: "Rừng Na Uy (Norwegian Wood)",
    author: "Haruki Murakami",
    category: "van-hoc",
    categoryName: "Văn học & Nghệ thuật",
    year: 2022,
    publisher: "NXB Hội Nhà Văn (Bản dịch Trịnh Lữ)",
    callNumber: "PL 856 .U73 N67 2022",
    isbn: "978-604-98-3210-6",
    identifier: "DDC: 895.635 .M972R",
    ddcCode: "895.6 (Văn học Nhật Bản)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    location: "Tầng 1 • Khu Văn học & Nghệ thuật • Kệ VH-03",
    department: "Khoa Ngữ văn & Báo chí",
    language: "Tiếng Việt",
    pageCount: 540,
    description:
      "Kiệt tác văn học kinh điển của Haruki Murakami về tuổi trẻ, nỗi cô đơn, những rung động sâu sắc và hành trình tìm kiếm ý nghĩa cuộc sống tại Tokyo thập niên 1960.",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-VH-2022-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ VH-03",
        callNumber: "PL 856 .U73 N67 2022 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-VH-2022-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ VH-03",
        callNumber: "PL 856 .U73 N67 2022 c.2",
        status: "Có sẵn",
      },
      {
        barcode: "UL-VH-2022-03",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Kệ VH-01",
        callNumber: "PL 856 .U73 N67 2022 c.3",
        status: "Đang mượn",
        dueDate: "29/10/2026",
      },
    ],
  },
  {
    id: "vh-02",
    title: "Những Người Khốn Khổ (Les Misérables - Trọn bộ 3 tập)",
    author: "Victor Hugo",
    category: "van-hoc",
    categoryName: "Văn học & Nghệ thuật",
    year: 2023,
    publisher: "NXB Văn Học",
    callNumber: "PQ 2286 .A1 2023",
    isbn: "978-604-69-8711-2",
    identifier: "DDC: 843.7 .H895N",
    ddcCode: "843 (Tiểu thuyết Pháp thế kỷ 19)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    location: "Tầng 1 • Khu Văn học Kinh điển • Kệ VH-08",
    department: "Khoa Ngữ văn & Báo chí",
    language: "Tiếng Việt",
    pageCount: 1420,
    description:
      "Tác phẩm văn học hiện thực xuất sắc ca ngợi tình yêu thương đồng loại, sự cứu rỗi linh hồn và khát vọng công lý tự do của con người trong xã hội Pháp.",
    coverImage:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-VH-2023-11",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ VH-08",
        callNumber: "PQ 2286 .A1 2023 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-VH-2023-12",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ VH-08",
        callNumber: "PQ 2286 .A1 2023 c.2",
        status: "Đang mượn",
        dueDate: "30/10/2026",
      },
    ],
  },

  // --- TRUYỆN TRANH ---
  {
    id: "tt-01",
    title: "Doraemon Tuyển tập Khoa học Viễn tưởng & Phát minh Tương lai",
    author: "Fujiko F. Fujio",
    category: "truyen-tranh",
    categoryName: "Truyện tranh & Graphic Novels",
    year: 2024,
    publisher: "NXB Kim Đồng",
    callNumber: "PN 6790 .J33 F85 2024",
    isbn: "978-604-2-34501-9",
    identifier: "DDC: 741.5952 .F961D",
    ddcCode: "741.5 (Nghệ thuật Truyện tranh Manga)",
    format: "Sách in",
    type: "Sách in",
    available: true,
    totalCopies: 6,
    availableCopies: 4,
    location: "Tầng 1 • Không gian Đọc Giải trí & Graphic Novels • Kệ TT-01",
    department: "Trung tâm Học liệu & Giải trí Thư viện",
    language: "Tiếng Việt",
    pageCount: 224,
    description:
      "Tuyển tập các câu chuyện khoa học viễn tưởng đặc sắc nhất của Fujiko F. Fujio về du hành thời gian, vật lý lượng tử đơn giản hóa và tư duy bảo vệ môi trường trái đất.",
    coverImage:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-TT-2024-01",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ TT-01",
        callNumber: "PN 6790 .J33 F85 2024 c.1",
        status: "Có sẵn",
      },
      {
        barcode: "UL-TT-2024-02",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ TT-01",
        callNumber: "PN 6790 .J33 F85 2024 c.2",
        status: "Có sẵn",
      },
      {
        barcode: "UL-TT-2024-03",
        campus: "Cơ sở 2 (Khu Công nghệ Cao)",
        location: "Tầng 1 • Kệ TT-02",
        callNumber: "PN 6790 .J33 F85 2024 c.3",
        status: "Có sẵn",
      },
      {
        barcode: "UL-TT-2024-04",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ TT-01",
        callNumber: "PN 6790 .J33 F85 2024 c.4",
        status: "Đang mượn",
        dueDate: "24/10/2026",
      },
    ],
  },
  {
    id: "tt-02",
    title: "Logicomix: Hành Trình Tìm Kiếm Chân Lý Toán Học & Triết Học",
    author: "Apostolos Doxiadis, Christos Papadimitriou",
    category: "truyen-tranh",
    categoryName: "Truyện tranh & Graphic Novels",
    year: 2023,
    publisher: "NXB Trẻ & Bloomsbury Publishing",
    callNumber: "PN 6727 .D69 L64 2023",
    isbn: "978-604-1-22830-1",
    identifier: "DDC: 741.59495 .D752L",
    ddcCode: "741.5 (Graphic Novel Triết học & Toán học)",
    format: "Sách in",
    type: "Sách in",
    available: false,
    totalCopies: 3,
    availableCopies: 0,
    location: "Tầng 1 • Không gian Đọc Giải trí & Graphic Novels • Kệ TT-03",
    department: "Khoa Toán - Tin học",
    language: "Tiếng Việt (Bản dịch có chú giải thuật ngữ)",
    pageCount: 352,
    description:
      "Graphic novel xuất sắc về cuộc đời Bertrand Russell và cuộc đấu tranh trí tuệ vĩ đại nhằm đặt nền móng logic vững chắc cho toàn bộ toán học hiện đại.",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    copies: [
      {
        barcode: "UL-TT-2023-08",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ TT-03",
        callNumber: "PN 6727 .D69 L64 2023 c.1",
        status: "Đang mượn",
        dueDate: "27/10/2026",
      },
      {
        barcode: "UL-TT-2023-09",
        campus: "Cơ sở 1 (Khuôn viên Trung tâm)",
        location: "Tầng 1 • Kệ TT-03",
        callNumber: "PN 6727 .D69 L64 2023 c.2",
        status: "Đang mượn",
        dueDate: "03/11/2026",
      },
    ],
  },
];

export const AUTHORS_LIST: AuthorInfo[] = [
  {
    id: "nguyen-van-an",
    name: "GS.TS. Nguyễn Văn An",
    title: "Giáo sư Kinh tế học Định lượng",
    department: "Khoa Kinh tế & Quản trị Kinh doanh",
    affiliation: "Đại học Quốc gia TP.HCM",
    bio: "Chuyên gia hàng đầu về kinh tế lượng, mô hình hóa rủi ro tài chính lượng tử và chính sách vĩ mô.",
    bookCount: 1,
    bookIds: ["1"],
  },
  {
    id: "tran-dinh-hung",
    name: "GS.TS. Trần Đình Hưng",
    title: "Giáo sư Kinh tế lượng Ứng dụng",
    department: "Khoa Kinh tế & QTKD",
    affiliation: "Đại học Kinh Tế TP.HCM",
    bio: "Nhà nghiên cứu thỉnh giảng tại nhiều viện tài chính quốc tế, chuyên sâu về chuỗi thời gian phi tuyến tính.",
    bookCount: 1,
    bookIds: ["b2"],
  },
  {
    id: "le-hoang-nam",
    name: "PGS.TS. Lê Hoàng Nam",
    title: "Phó Giáo sư Khoa học Dữ liệu & AI",
    department: "Khoa Khoa học & Kỹ thuật Máy tính",
    affiliation: "Trường Đại học Bách Khoa - ĐHQG",
    bio: "Trưởng nhóm nghiên cứu Deep Learning & IoT Lab, tác giả hơn 40 công trình Scopus về chuỗi thời gian.",
    bookCount: 1,
    bookIds: ["3"],
  },
  {
    id: "stuart-russell",
    name: "Stuart Russell & Peter Norvig",
    title: "Giáo sư Khoa học Máy tính",
    department: "UC Berkeley & Google Research",
    affiliation: "Viện Hàn lâm Khoa học Máy tính Quốc tế",
    bio: "Hai nhà khoa học tiên phong đặt nền móng cho giáo dục Trí tuệ Nhân tạo hiện đại trên toàn cầu.",
    bookCount: 1,
    bookIds: ["b1"],
  },
  {
    id: "nguyen-van-thinh",
    name: "PGS.TS. Nguyễn Văn Thịnh",
    title: "Phó Giáo sư Hệ thống Điện & Tự động hóa",
    department: "Khoa Điện - Điện tử",
    affiliation: "Đại học Bách Khoa",
    bio: "Chuyên gia tư vấn lưới điện thông minh, tích hợp năng lượng tái tạo và điều độ hệ thống điện quốc gia.",
    bookCount: 1,
    bookIds: ["b4"],
  },
  {
    id: "pham-quoc-hung",
    name: "TS. Phạm Quốc Hùng",
    title: "Tiến sĩ Khoa học Môi trường",
    department: "Khoa Môi trường & Tài nguyên",
    affiliation: "Viện Môi trường & Phát triển Bền vững",
    bio: "Chủ nhiệm đề tài cấp nhà nước về tác động của biến đổi khí hậu và xâm nhập mặn Đồng bằng Sông Cửu Long.",
    bookCount: 1,
    bookIds: ["4"],
  },
  {
    id: "vu-minh-chau",
    name: "TS. Vũ Minh Châu",
    title: "Tiến sĩ Vật lý Chất rắn & Vật liệu mới",
    department: "Viện Vật lý Ứng dụng",
    affiliation: "ĐHQG-HCM",
    bio: "Nhà nghiên cứu xuất sắc đạt giải thưởng quả cầu vàng khoa học công nghệ trẻ trong lĩnh vực bán dẫn 2D.",
    bookCount: 1,
    bookIds: ["b3"],
  },
  {
    id: "haruki-murakami",
    name: "Haruki Murakami",
    title: "Nhà văn đương đại Nhật Bản",
    department: "Văn học Thế giới",
    affiliation: "Waseda University Alumni",
    bio: "Tác giả nổi tiếng thế giới với phong cách hiện thực huyền ảo, đoạt giải Franz Kafka và Jerusalem Prize.",
    bookCount: 1,
    bookIds: ["vh-01"],
  },
  {
    id: "victor-hugo",
    name: "Victor Hugo",
    title: "Đại văn hào Pháp (1802 - 1885)",
    department: "Văn học Kinh điển Thế giới",
    affiliation: "Viện Hàn lâm Pháp",
    bio: "Cây đại thụ của chủ nghĩa lãng mạn Pháp với các kiệt tác bất hủ về nhân đạo và công lý xã hội.",
    bookCount: 1,
    bookIds: ["vh-02"],
  },
  {
    id: "fujiko-f-fujio",
    name: "Fujiko F. Fujio",
    title: "Họa sĩ Manga Huyền thoại Nhật Bản",
    department: "Văn hóa Nghệ thuật Hình ảnh",
    affiliation: "Nhật Bản",
    bio: "Cha đẻ của biểu tượng văn hóa Doraemon, người truyền cảm hứng khoa học và nhân văn cho nhiều thế hệ độc giả.",
    bookCount: 1,
    bookIds: ["tt-01"],
  },
  {
    id: "apostolos-doxiadis",
    name: "Apostolos Doxiadis & Christos Papadimitriou",
    title: "Nhà văn & Giáo sư Khoa học Máy tính",
    department: "Toán học & Triết học",
    affiliation: "Columbia University / UC Berkeley",
    bio: "Nhóm tác giả tiên phong kết hợp truyện tranh graphic novel với lịch sử triết học và nền tảng toán học.",
    bookCount: 1,
    bookIds: ["tt-02"],
  },
];

// Helper functions
export function getAllBooks() {
  return CATALOG_BOOKS;
}

export function getBookById(id: string) {
  return CATALOG_BOOKS.find((b) => b.id === id);
}

export function getBooksByCategory(categorySlug: string) {
  return CATALOG_BOOKS.filter((b) => b.category === categorySlug);
}

export function getBooksByAuthor(authorName: string) {
  const norm = authorName.toLowerCase().trim();
  return CATALOG_BOOKS.filter((b) => b.author.toLowerCase().includes(norm));
}

export function getAllCategories() {
  return CATEGORIES;
}

export function getAllAuthors() {
  return AUTHORS_LIST;
}

export function searchAuthors(query: string) {
  if (!query.trim()) return AUTHORS_LIST;
  const q = query.toLowerCase().trim();
  return AUTHORS_LIST.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.affiliation.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q)
  );
}

// LocalStorage helpers for saved books
export function getSavedBookIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("unilibrary_saved_books");
    if (raw) return JSON.parse(raw);
    return [];
  } catch {
    return [];
  }
}

export function toggleSavedBook(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ids = getSavedBookIds();
    let updated: string[];
    let isSaved = false;
    if (ids.includes(id)) {
      updated = ids.filter((item) => item !== id);
      isSaved = false;
    } else {
      updated = [...ids, id];
      isSaved = true;
    }
    localStorage.setItem("unilibrary_saved_books", JSON.stringify(updated));
    window.dispatchEvent(new Event("unilibrary_saved_changed"));
    return isSaved;
  } catch {
    return false;
  }
}

export function isBookSaved(id: string): boolean {
  const ids = getSavedBookIds();
  return ids.includes(id);
}
