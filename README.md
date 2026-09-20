![UniLibrary Screenshot](https://i.postimg.cc/SKc6N9jd/puppet-tea.gif)

![GitHub Release](https://img.shields.io/github/v/release/UU-Necrosis/University-School-Library_.-Nhom7?style=plastic&color=97ca00&link=https%3A%2F%2Fgithub.com%2FUU-Necrosis%2FUniversity-School-Library_.-Nhom7%2Freleases)

# 📚 UniLibrary - Hệ Thống Thư Viện Số & Cổng Tri Thức Đại Học (Academic Portal)

Dự án phát triển Hệ thống Quản lý Thư viện và Cổng Tri thức Nghiên cứu Đại học UniLibrary.

---

## 🎨 Design System & Color Palette
- **Quy chuẩn cố định**: [design.md](design.md)
- **Tiêu chuẩn kiến trúc**: [rules.md](rules.md)

---

## 🚀 Cấu Trúc Dự Án (Project Structure)

```
project-root/
├── client/                     # Frontend (Next.js 15 + React 19 + TypeScript + Tailwind CSS)
│   ├── src/
│   │   ├── app/                # App Router Pages & Layouts
│   │   ├── components/         # Reusable UI & Feature Components
│   │   └── types/              # Library Domain TypeScript Interfaces
│   ├── package.json
│   └── tailwind.config.ts
│
├── docs/                       # Tài liệu tham chiếu UI/UX & Specifications
├── design.md                   # Hệ thống màu sắc & Design System cố định
└── rules.md                    # Tài liệu quy chuẩn kiến trúc
```

---

## 💻 Hướng Dẫn Khởi Chạy Frontend (`client/`)

```bash
cd client
npm install
npm run dev
```

Truy cập giao diện tại: `http://localhost:3000`
