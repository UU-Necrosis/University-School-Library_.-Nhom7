# TIÊU CHUẨN KIẾN TRÚC & CÔNG NGHỆ DỰ ÁN (PROJECT ARCHITECTURE & RULES)

---

## 1. Tổng Quan Tech Stack (Technology Stack)

| Thành phần | Công nghệ / Thư viện | Mô tả |
| :--- | :--- | :--- |
| **Frontend** | `Next.js` (App Router / Pages Router), `React`, `TypeScript` | Giao diện người dùng, Server-Side Rendering (SSR) / Static Site Generation (SSG) / Client Component |
| **UI & Styling** | `Tailwind CSS`, Reusable UI Components | Thiết kế giao diện theo quy chuẩn Academic Clarity cố định tại [design.md](file:///c:/Users/Lenovo/University-School-Library_.-Nhom7/design.md) |
| **Backend / API** | `NestJS`, `Node.js`, `TypeScript` | Xử lý nghiệp vụ (Business Logic), RESTful API / GraphQL, Modular Architecture |
| **Database** | `PostgreSQL` | Cơ sở dữ liệu quan hệ (Relational Database) |
| **ORM** | `Prisma` | Quản lý schema, migrations, type-safe database queries |
| **Authentication & Authorization** | `JWT` + `RBAC` (Role-Based Access Control) | Phân quyền người dùng theo vai trò: `USER`, `ADMIN`, `STAFF` (mở rộng theo dự án) |

---

## 2. Mô Hình Kiến Trúc & Luồng Dữ Liệu (Architecture & Data Flow)

### Luồng xử lý tổng thể:
```
[ Client / Browser ]
        │
        ▼
[ Frontend: Next.js (React + Tailwind CSS) ]
        │  (HTTP / REST API Requests kèm JWT Token)
        ▼
[ Backend: NestJS API ]
   ├── Controller (Nhận request & validate DTO)
   ├── Guards (AuthGuard JWT + RolesGuard RBAC)
   ├── Service (Xử lý toàn bộ Business Logic)
   └── Prisma Service (Tương tác Database)
        │
        ▼
[ ORM: Prisma Client ]
        │
        ▼
[ Database: PostgreSQL ]
```

### Nguyên tắc luồng xử lý:
1. **Frontend (Next.js)**: Chỉ phụ trách hiển thị, tương tác người dùng, gọi API và quản lý state phía client.
2. **Backend (NestJS)**: Toàn bộ nghiệp vụ (business logic), tính toán, kiểm tra dữ liệu và bảo mật bắt buộc phải được xử lý tập trung tại NestJS Services.
3. **ORM (Prisma)**: Cầu nối duy nhất giữa NestJS và PostgreSQL, đảm bảo tính toàn vẹn và type-safety của dữ liệu.
4. **PostgreSQL**: Lưu trữ dữ liệu chuẩn hóa, quan hệ chặt chẽ.

---

## 3. Xác Thực & Phân Quyền (Auth & RBAC)

### Cơ chế:
- **Authentication**: Sử dụng **JSON Web Token (JWT)** gồm `AccessToken` (thời hạn ngắn) và `RefreshToken` (lưu trữ an toàn).
- **Authorization**: **RBAC (Role-Based Access Control)** kết hợp Custom Decorators và Guards trong NestJS.

### Danh sách Roles mặc định:
- `USER` / `STUDENT` / `MEMBER`: Người dùng thông thường (xem thông tin, mượn sách, đăng ký dịch vụ cá nhân).
- `STAFF` / `LIBRARIAN`: Nhân viên quản lý (duyệt yêu cầu, cập nhật trạng thái sách, xử lý nghiệp vụ hàng ngày).
- `ADMIN`: Quản trị viên hệ thống (toàn quyền quản lý người dùng, cấu hình hệ thống, phân quyền, báo cáo thống kê).

### Triển khai trong NestJS:
- Sử dụng `@UseGuards(JwtAuthGuard, RolesGuard)`
- Gán quyền trên controller/endpoint bằng `@Roles(Role.ADMIN, Role.STAFF)`

---

## 4. Quy Ước Cấu Trúc Thư Mục (Folder Structure Convention)

```
project-root/
├── client/                     # Frontend (Next.js + Tailwind CSS)
│   ├── src/
│   │   ├── app/                # Next.js App Router (pages, layouts)
│   │   ├── components/         # Reusable UI components (Button, Modal, Table, Form, ...)
│   │   │   └── ui/
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── services/ / lib/    # API calling services (Axios / Fetch instance)
│   │   ├── types/              # Frontend TypeScript types / interfaces
│   │   └── styles/             # Global CSS, Tailwind configurations
│   ├── package.json
│   └── tailwind.config.ts
│
├── server/                     # Backend (NestJS + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma Database Schema
│   │   └── migrations/         # Database migrations
│   ├── src/
│   │   ├── common/             # Filters, Interceptors, Decorators, Guards
│   │   │   ├── guards/         # JwtAuthGuard, RolesGuard
│   │   │   ├── decorators/     # CurrentUser, Roles
│   │   │   └── exceptions/     # Custom HTTP Exceptions
│   │   ├── modules/            # Domain modules (Clean & Modular)
│   │   │   ├── auth/           # Login, Register, JWT, Token Management
│   │   │   ├── users/          # Quản lý người dùng, phân quyền
│   │   │   └── [features]/     # Module chức năng theo từng bài toán (e.g., books, loans, ...)
│   │   │       ├── dto/        # Data Transfer Objects (Validation với class-validator)
│   │   │       ├── entities/   # Model / Types
│   │   │       ├── *.controller.ts
│   │   │       ├── *.service.ts
│   │   │       └── *.module.ts
│   │   ├── prisma/             # Prisma Service & Prisma Module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── .env
│
├── design.md                   # Hệ thống màu sắc & Design System cố định
└── rules.md                    # Tài liệu quy chuẩn này
```

---

## 5. Quy Tắc Lập Trình & Coding Standards

### Frontend (Next.js + Tailwind CSS):
- **Tái sử dụng Component**: Không viết lặp lại mã UI (như Button, Input, Modal, Table, Badge). Mọi thành phần giao diện chung phải nằm trong thư mục `components/ui`.
- **Styling**: Sử dụng **Tailwind CSS**. Hạn chế viết CSS inline hoặc custom style rời rạc nếu Tailwind có sẵn utility class.
- **Type-Safety**: Khai báo Interface / Type rõ ràng cho tất cả props, state và response từ API.
- **Quản lý Token**: Lưu trữ JWT token an toàn (HttpOnly Cookies hoặc quản lý tập trung qua interceptor/context).

### Backend (NestJS + Prisma):
- **Validation**: Bắt buộc dùng `DTO (Data Transfer Object)` kết hợp `class-validator` và `ValidationPipe` toàn cục cho tất cả API payload.
- **Clean Architecture**:
  - `Controller`: Chỉ nhận request, điều hướng qua Service, trả về response.
  - `Service`: Chứa toàn bộ logic nghiệp vụ, gọi Prisma Client.
  - Tuyệt đối không query trực tiếp trong Controller.
- **Response Chuẩn**: Đảm bảo định dạng phản hồi API nhất quán:
  ```json
  {
    "statusCode": 200,
    "message": "Thành công",
    "data": { ... }
  }
  ```
- **Error Handling**: Bắt lỗi tập trung bằng `HttpExceptionFilter`.

### Cơ sở dữ liệu (Prisma & PostgreSQL):
- Tên bảng: Số ít hoặc số nhiều có quy tắc (thống nhất `PascalCase` cho Model Prisma và `snake_case` hoặc `camelCase` cho Database table/column).
- Luôn tạo migration (`npx prisma migrate dev --name <ten_migration>`) khi thay đổi schema.
- Thêm index cho các trường thường xuyên tìm kiếm, lọc hoặc khóa ngoại.

---

## 6. Biến Môi Trường (Environment Variables Template)

### Backend (`server/.env`):
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/db_name?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_SECRET="your-refresh-jwt-secret-key"
JWT_REFRESH_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000"
```

### Frontend (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

*Tài liệu này đóng vai trò là kim chỉ nam cố định cho toàn bộ quy trình thiết kế, triển khai và bảo trì dự án.*
