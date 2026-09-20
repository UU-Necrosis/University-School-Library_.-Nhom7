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
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
