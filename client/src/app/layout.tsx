import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniLibrary - Cổng Tri Thức & Tài Nguyên Nghiên Cứu Đại Học",
  description: "Hệ thống Thư viện số & Trung tâm Học liệu Đại học Quốc gia. Khám phá hơn 1.200.000 đầu sách in, luận văn tiến sĩ, tạp chí Scopus/ISI và cơ sở dữ liệu số.",
  keywords: "UniLibrary, Thư viện đại học, Cổng tri thức, Scopus, IEEE Xplore, Luận văn tiến sĩ, Sách in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
