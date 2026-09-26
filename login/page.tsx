
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Account = {
  name: string;
  code: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      // Lấy danh sách tài khoản đã đăng ký
      const accounts: Account[] = JSON.parse(
        localStorage.getItem("unilibrary_accounts") || "[]"
      );

      // Tìm tài khoản khớp email và mật khẩu
      const account = accounts.find(
        (item) =>
          item.email.trim().toLowerCase() === normalizedEmail &&
          item.password === password
      );

      if (!account) {
        setError("Email hoặc mật khẩu không chính xác.");
        setLoading(false);
        return;
      }

      // Thông tin người dùng lưu trong phiên đăng nhập
      const user = {
        name: account.name,
        code: account.code,
        email: account.email,
      };

      // Xóa phiên cũ để tránh lưu đồng thời hai nơi
      localStorage.removeItem("unilibrary_user");
      sessionStorage.removeItem("unilibrary_user");

      // Ghi nhớ đăng nhập hoặc chỉ đăng nhập trong phiên hiện tại
      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("unilibrary_user", JSON.stringify(user));

      // Đăng nhập thành công
      router.push("/");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Không thể đăng nhập. Vui lòng thử lại.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fc] flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#082f63] text-white flex items-center justify-center font-bold text-xl">
            UL
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#082f63]">
              UniLibrary
            </h1>

            <p className="text-xs tracking-wider text-slate-500">
              ĐẠI HỌC QUỐC GIA
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="ml-auto text-sm text-slate-600 hover:text-blue-700"
        >
          ← Về trang chủ
        </Link>
      </header>

      {/* Login form */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-7 md:p-10">
            {/* Tiêu đề */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="w-8 h-8 text-[#0b4b91]"
                  aria-hidden="true"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  <circle cx="12" cy="15" r="1" />
                  <path d="M12 16v2" />
                </svg>
              </div>

              <p className="text-sm font-semibold text-blue-700 mb-2">
                CHÀO MỪNG BẠN TRỞ LẠI
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Đăng nhập
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Đăng nhập để sử dụng các dịch vụ thư viện số.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email hoặc email sinh viên
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu.vn"
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Mật khẩu */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Mật khẩu
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 pr-20 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-700"
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              {/* Ghi nhớ đăng nhập */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-blue-700"
                  />

                  Ghi nhớ đăng nhập
                </label>

                <span className="text-slate-400 text-xs">
                  Quên mật khẩu?
                </span>
              </div>

              {/* Thông báo lỗi */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Nút đăng nhập */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#0b4b91] hover:bg-[#08396f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold shadow-md transition"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            {/* Đường phân cách */}
            <div className="relative my-6">
              <div className="border-t border-slate-200" />

              <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-3 text-xs text-slate-400">
                HOẶC
              </span>
            </div>

            {/* Đăng ký */}
            <p className="text-center text-sm text-slate-600">
              Bạn chưa có tài khoản?{" "}

              <Link
                href="/register"
                className="font-bold text-blue-700 hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-6">
            © 2026 UniLibrary · Cổng tri thức Đại học Quốc gia
          </p>
        </div>
      </section>
    </main>
  );
}