"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Badge } from "@/components/ui";
import { loginApi } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modals & Feedback State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const normalizedInput = email.trim();

    if (!normalizedInput || !password) {
      setError("Vui lòng nhập đầy đủ Email/Mã sinh viên và Mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginApi({
        identifier: normalizedInput,
        password,
      });

      login(res.data.user, res.data.accessToken, remember);

      setTimeout(() => {
        router.push("/");
      }, 150);
    } catch (err: any) {
      console.error("Lỗi đăng nhập:", err);
      setError(err?.message || "Email/Mã độc giả hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.");
      setLoading(false);
    }
  }

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setToastMessage(
        `Đã gửi hướng dẫn khôi phục mật khẩu tới địa chỉ ${forgotEmail}. Vui lòng kiểm tra hộp thư.`
      );
      setIsForgotModalOpen(false);
      setForgotSubmitted(false);
      setForgotEmail("");
      setTimeout(() => setToastMessage(null), 5000);
    }, 800);
  };


  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Header */}
      <header className="h-20 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center px-4 sm:px-8 lg:px-12 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              UL
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-primary block leading-tight">
                UniLibrary
              </span>
              <span className="text-[10px] tracking-widest text-on-surface-variant uppercase font-medium">
                Cổng Tri Thức Đại Học Quốc Gia
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-on-surface-variant hover:text-secondary flex items-center gap-1.5 transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Về trang chủ</span>
          </Link>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full mt-4">
          <div className="p-4 bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="material-symbols-outlined text-[#16A34A] text-[20px]">
                check_circle
              </span>
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#166534] hover:opacity-70 p-1"
              aria-label="Đóng thông báo"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-5xl w-full bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left Column: Academic Branding & Value Proposition (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary via-[#043366] to-secondary text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cổng Xác Thực Bạn Đọc 2026</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Kho Tri Thức Số & Dịch Vụ Nghiên Cứu Học Thuật
                </h2>
                <p className="mt-3 text-sm text-blue-100/90 leading-relaxed">
                  Truy cập tức thì hơn 50.000+ sách chuyên khảo, bài báo Scopus/WoS, cơ sở dữ liệu quốc tế và dịch vụ mượn trả thông minh.
                </p>
              </div>

              {/* Value Highlights */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-200">
                      menu_book
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">OPAC & Tài Liệu Điện Tử</h3>
                    <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                      Đọc trực tuyến luận án, sách số và toàn văn cơ sở dữ liệu quốc tế.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-200">
                      badge
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Thẻ Thư Viện Định Danh Số</h3>
                    <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                      Gia hạn sách từ xa, theo dõi hàng đợi và lịch sử mượn trả minh bạch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-200">
                      meeting_room
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Đặt Không Gian Học Tập</h3>
                    <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                      Giữ chỗ phòng thảo luận nhóm, phòng nghiên cứu chuyên sâu 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Institutional Seal */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-200">
              <span>Đại học Quốc gia</span>
              <span className="font-mono">UniLibrary Portal</span>
            </div>
          </div>

          {/* Right Column: Login Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest">
            <div>
              {/* Form Title */}
              <div className="mb-6">
                <Badge variant="primary" size="sm" className="mb-2">
                  Xác thực Độc giả
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                  Đăng nhập Hệ thống
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Sử dụng tài khoản thư viện số hoặc mã số sinh viên/học viên.
                </p>
              </div>

              {/* Main Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email / Patron Code Field */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-xs font-semibold text-on-surface mb-1.5"
                  >
                    Email hoặc Mã số độc giả / MSSV <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="login-email"
                      type="text"
                      autoComplete="username"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@university.edu.vn hoặc UL-202488"
                      className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-10 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      account_circle
                    </span>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-on-surface"
                    >
                      Mật khẩu truy cập <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs font-medium text-secondary hover:underline transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu thư viện"
                      className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-10 pr-10 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      lock
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me Option */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary/20 accent-secondary"
                    />
                    <span>Duy trì đăng nhập trên thiết bị này</span>
                  </label>
                </div>

                {/* Error Banner */}
                {error && (
                  <div
                    role="alert"
                    className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-fade-in"
                  >
                    <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0 mt-0.5">
                      error
                    </span>
                    <span className="leading-relaxed">{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    disabled={loading}
                    className="h-11 text-xs sm:text-sm font-semibold shadow-md"
                  >
                    {loading ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">login</span>
                    )}
                    <span>{loading ? "Đang xác thực tài khoản..." : "Đăng nhập UniLibrary"}</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Bottom Register Switcher */}
            <div className="pt-6 mt-6 border-t border-outline-variant/30 text-center">
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Bạn chưa có tài khoản thư viện?{" "}
                <Link
                  href="/register"
                  className="font-bold text-secondary hover:underline transition-colors"
                >
                  Đăng ký thẻ mới ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-on-surface-variant border-t border-outline-variant/20 bg-surface">
        <p>© 2026 UniLibrary · Cổng tri thức Đại học Quốc gia · Hệ thống quản lý thư viện số</p>
      </footer>

      {/* MODAL: Quên Mật Khẩu (Mock UI) */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <h3 className="font-title-lg text-title-lg text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">lock_reset</span>
                <span>Khôi Phục Mật Khẩu</span>
              </h3>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="text-on-surface-variant hover:text-primary p-1"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Nhập địa chỉ email trường học đã đăng ký để nhận liên kết thiết lập lại mật khẩu hoặc liên hệ trực tiếp Bộ phận Dịch vụ Độc giả.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Email sinh viên / học viên
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@university.edu.vn"
                  className="w-full h-10 rounded-xl border border-outline-variant px-3 text-xs text-on-surface outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl text-[11px] text-blue-900 space-y-1">
                <strong className="font-semibold block">Hỗ trợ khôi phục trực tiếp:</strong>
                <p>• Quầy Dịch vụ Độc giả - Tầng 1 Thư viện trung tâm</p>
                <p>• Hotline hỗ trợ kỹ thuật: (028) 3724 2160 (Ext: 1402)</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsForgotModalOpen(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={forgotSubmitted}
                >
                  {forgotSubmitted ? (
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      progress_activity
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  )}
                  <span>{forgotSubmitted ? "Đang xử lý..." : "Gửi yêu cầu khôi phục"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}