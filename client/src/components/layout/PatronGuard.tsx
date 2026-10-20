"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Breadcrumb } from "@/components/ui";

interface PatronGuardProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export const PatronGuard: React.FC<PatronGuardProps> = ({
  children,
  pageTitle = "Thẻ Thư Viện Số & Quản Lý Độc Giả",
}) => {
  const { user, authStatus } = useAuth();
  const pathname = usePathname();

  if (authStatus === "loading") {
    return (
      <div className="max-w-7xl mx-auto px-space-md lg:px-margin py-space-xl space-y-space-lg animate-pulse">
        <div className="h-6 w-48 bg-surface-container-high rounded-md"></div>
        <div className="h-10 w-96 bg-surface-container-high rounded-lg"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg pt-space-md">
          <div className="h-64 bg-surface-container-low rounded-2xl"></div>
          <div className="lg:col-span-2 h-64 bg-surface-container-low rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (authStatus === "unauthenticated" || !user) {
    const redirectUrl = `/login?redirect=${encodeURIComponent(pathname || "/the-thu-vien")}`;

    return (
      <div className="max-w-4xl mx-auto px-space-md lg:px-margin py-space-xl">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/", icon: "home" },
            { label: pageTitle },
          ]}
        />

        <div className="mt-space-lg rounded-2xl bg-surface-container-lowest p-space-xl border border-outline-variant/40 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-high/60 mx-auto flex items-center justify-center text-primary mb-space-md">
            <span className="material-symbols-outlined text-[32px]">lock</span>
          </div>

          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Yêu Cầu Đăng Nhập Tài Khoản Độc Giả
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mt-2">
            Bạn cần đăng nhập bằng Mã sinh viên / học viên hoặc tài khoản độc giả đã cấp để xem thẻ thư viện số, kiểm tra hạn mượn, gia hạn sách và theo dõi lịch sử.
          </p>

          <div className="mt-space-lg flex flex-col sm:flex-row items-center justify-center gap-space-sm">
            <Link
              href={redirectUrl}
              className="w-full sm:w-auto px-space-xl py-3 rounded-xl bg-primary hover:bg-secondary text-on-primary font-title-sm text-title-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>Đăng nhập ngay</span>
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto px-space-xl py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>Đăng ký thẻ độc giả</span>
            </Link>
          </div>

          <div className="mt-space-xl pt-space-lg border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-3 gap-space-md text-left text-xs text-on-surface-variant">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">badge</span>
              <div>
                <strong className="text-on-surface block">Thẻ số định danh</strong>
                Mã vạch và QR cá nhân để mượn trả tại quầy và cổng tự động.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">autorenew</span>
              <div>
                <strong className="text-on-surface block">Gia hạn trực tuyến</strong>
                Chủ động gia hạn sách thêm 7 ngày trước khi đến hạn trả.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">bookmark</span>
              <div>
                <strong className="text-on-surface block">Tủ sách & Đặt trước</strong>
                Theo dõi sách đã lưu và nhận thông báo khi sách về quầy.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
