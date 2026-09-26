
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

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    // 1. Kiểm tra họ tên
    if (name.trim().length < 2) {
      setError("Vui lòng nhập họ và tên hợp lệ.");
      return;
    }

    // 2. Kiểm tra mã sinh viên
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setError("Vui lòng nhập mã sinh viên hoặc mã học viên.");
      return;
    }

    // 3. Kiểm tra email đầy đủ
    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!normalizedEmail) {
      setError("Vui lòng nhập email.");
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setError(
        "Email chưa đầy đủ. Vui lòng nhập thêm đuôi email, ví dụ @gmail.com hoặc @st.uedu.vn."
      );
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setError(
        "Email không hợp lệ. Vui lòng kiểm tra lại địa chỉ email và phần đuôi."
      );
      return;
    }

    // 4. Kiểm tra mật khẩu mạnh
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/;

    if (!strongPassword.test(password)) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
      return;
    }

    // 5. Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      // 6. Lấy danh sách tài khoản
      const accounts: Account[] = JSON.parse(
        localStorage.getItem("unilibrary_accounts") || "[]"
      );

      // 7. Kiểm tra tài khoản trùng
      const exists = accounts.some(
        (account) =>
          account.email.toLowerCase() === normalizedEmail ||
          account.code.toUpperCase() === normalizedCode
      );

      if (exists) {
        setError(
          "Email hoặc mã sinh viên đã được đăng ký."
        );
        return;
      }

      // 8. Tạo tài khoản
      const newAccount: Account = {
        name: name.trim(),
        code: normalizedCode,
        email: normalizedEmail,
        password,
      };

      accounts.push(newAccount);

      // 9. Lưu vào localStorage
      localStorage.setItem(
        "unilibrary_accounts",
        JSON.stringify(accounts)
      );

      // 10. Thông báo thành công
      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 1200);

    } catch {
      setError(
        "Không thể tạo tài khoản. Vui lòng thử lại."
      );
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

      {/* Register form */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
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
                >
                  <circle cx="9" cy="8" r="4" />
                  <path d="M2 21v-2a7 7 0 0 1 14 0v2" />
                  <path d="M19 8v6M16 11h6" />
                </svg>
              </div>

              <p className="text-sm font-semibold text-blue-700 mb-2">
                THÀNH VIÊN UNILIBRARY
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Tạo tài khoản
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Đăng ký để khám phá kho tri thức và tài nguyên học thuật.
              </p>
            </div>

            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >
              {/* Họ và tên */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Họ và tên
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Nguyễn Văn A"
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Mã sinh viên */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Mã sinh viên / học viên
                </label>

                <input
                  id="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                  placeholder="VD: UL-202488"
                  className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              
                {/* Email */}
                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                    Email
                    </label>

                    <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com hoặc name@st.uedu.vn"
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                    Vui lòng nhập đầy đủ địa chỉ email, bao gồm phần đuôi
                    như @gmail.com hoặc email trường học.
                    </p>
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
                    type={
                      showPassword ? "text" : "password"
                    }
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Nhập mật khẩu "
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Ẩn mật khẩu"
                        : "Hiện mật khẩu"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-700"
                  >
                    {showPassword ? (
                      /* Eye off */
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-5 h-5"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a14 14 0 0 1-3.1 3.8M6.2 6.2C3.9 7.8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 3-.5" />
                      </svg>
                    ) : (
                      /* Eye */
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-5 h-5"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                </p>
              </div>

              {/* Xác nhận mật khẩu */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Xác nhận mật khẩu
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Nhập lại mật khẩu"
                    className="w-full h-12 rounded-xl border border-slate-200 px-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Ẩn mật khẩu xác nhận"
                        : "Hiện mật khẩu xác nhận"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-700"
                  >
                    {showConfirmPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-5 h-5"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a14 14 0 0 1-3.1 3.8M6.2 6.2C3.9 7.8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 3-.5" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-5 h-5"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
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

              {/* Thông báo thành công */}
              {success && (
                <div
                  role="status"
                  className="rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700"
                >
                  Đăng ký thành công! Đang chuyển đến trang đăng nhập...
                </div>
              )}

              {/* Nút đăng ký */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#0b4b91] hover:bg-[#08396f] text-white font-semibold shadow-md transition"
              >
                Đăng ký tài khoản
              </button>
            </form>

            {/* Đường phân cách */}
            <div className="relative my-6">
              <div className="border-t border-slate-200" />

              <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-3 text-xs text-slate-400">
                HOẶC
              </span>
            </div>

            {/* Chuyển đến đăng nhập */}
            <p className="text-center text-sm text-slate-600">
              Bạn đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-bold text-blue-700 hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            © 2026 UniLibrary · Cổng tri thức Đại học Quốc gia
          </p>
        </div>
      </section>
    </main>
  );
}