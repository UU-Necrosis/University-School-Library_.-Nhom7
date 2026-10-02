"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Badge } from "@/components/ui";
import { Account } from "@/types/library";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAccount, setSuccessAccount] = useState<Account | null>(null);

  // Live password criteria validation
  const passwordCriteria = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUpperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[^A-Za-z0-9\s]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (passwordCriteria.minLength) score += 1;
    if (passwordCriteria.hasUpperLower) score += 1;
    if (passwordCriteria.hasNumber) score += 1;
    if (passwordCriteria.hasSpecial) score += 1;
    return score;
  }, [passwordCriteria]);

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // 1. Kiểm tra họ và tên
    if (name.trim().length < 2) {
      setError("Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).");
      return;
    }

    // 2. Kiểm tra mã sinh viên / độc giả
    const normalizedCode = code.trim().toUpperCase();
    if (!normalizedCode) {
      setError("Vui lòng nhập mã sinh viên, học viên hoặc mã độc giả.");
      return;
    }

    // 3. Kiểm tra email hợp lệ
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!normalizedEmail) {
      setError("Vui lòng nhập địa chỉ email.");
      return;
    }

    if (!normalizedEmail.includes("@")) {
      setError("Email chưa đầy đủ. Vui lòng nhập thêm tên miền email (ví dụ: @university.edu.vn hoặc @gmail.com).");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setError("Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.");
      return;
    }

    // 4. Kiểm tra tiêu chí mật khẩu mạnh
    if (strengthScore < 4) {
      setError("Mật khẩu chưa đạt yêu cầu bảo mật. Vui lòng đảm bảo đầy đủ 4 tiêu chí bên dưới.");
      return;
    }

    // 5. Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp với mật khẩu đã nhập.");
      return;
    }

    // 6. Kiểm tra đồng ý quy chế
    if (!agreeTerms) {
      setError("Vui lòng đồng ý với Quy chế Thư viện & Bảo mật thông tin bạn đọc.");
      return;
    }

    setLoading(true);

    try {
      // 7. Lấy danh sách tài khoản từ localStorage
      const accounts: Account[] = JSON.parse(
        localStorage.getItem("unilibrary_accounts") || "[]"
      );

      // 8. Kiểm tra trùng email hoặc mã sinh viên
      const exists = accounts.some(
        (account) =>
          account.email.toLowerCase() === normalizedEmail ||
          account.code.toUpperCase() === normalizedCode
      );

      if (exists) {
        setError("Email hoặc mã sinh viên/độc giả này đã được đăng ký trên hệ thống.");
        setLoading(false);
        return;
      }

      // 9. Tạo tài khoản mới
      const newAccount: Account = {
        name: name.trim(),
        code: normalizedCode,
        email: normalizedEmail,
        password,
      };

      accounts.push(newAccount);

      // 10. Lưu vào localStorage
      localStorage.setItem("unilibrary_accounts", JSON.stringify(accounts));

      // 11. Bật modal thành công
      setTimeout(() => {
        setLoading(false);
        setSuccessAccount(newAccount);
      }, 500);
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setError("Không thể khởi tạo tài khoản trong phiên này. Vui lòng thử lại.");
      setLoading(false);
    }
  }

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
            href="/login"
            className="text-xs sm:text-sm font-medium text-secondary hover:text-primary flex items-center gap-1.5 transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-container-low"
          >
            <span>Đã có tài khoản?</span>
            <strong className="font-bold underline">Đăng nhập</strong>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-5xl w-full bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
          {/* Left Column: Academic Branding & Member Perks (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary via-[#043366] to-secondary text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Đăng Ký Độc Giả Số 2026</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Gia Nhập Cộng Đồng Học Thuật & Nghiên Cứu UniLibrary
                </h2>
                <p className="mt-3 text-sm text-blue-100/90 leading-relaxed">
                  Kích hoạt hồ sơ bạn đọc để khai thác hơn 50.000+ tài liệu điện tử, cơ sở dữ liệu quốc tế và không gian nghiên cứu chuyên sâu.
                </p>
              </div>

              {/* Value Highlights */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-200">
                      badge
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Thẻ Thư Viện Số Tự Động</h3>
                    <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                      Cấp mã định danh và mã vạch Barcode mượn trả tức thì ngay sau khi đăng ký.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-200">
                      dataset
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Toàn Văn Luận Án & Scopus/WoS</h3>
                    <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                      Đọc và tải tài liệu nghiên cứu chuyên ngành trực tuyến không giới hạn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-200">
                      verified_user
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Chuẩn Hóa Dữ Liệu Học Thuật</h3>
                    <p className="text-[11px] text-blue-200 leading-tight mt-0.5">
                      Đảm bảo quyền lợi mượn sách in và bảo mật thông tin bạn đọc chuẩn ĐHQG.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Institutional Seal */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-200">
              <span>Đại học Quốc gia</span>
              <span className="font-mono">VNU EduID Verified</span>
            </div>
          </div>

          {/* Right Column: Register Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest">
            <div>
              {/* Form Header */}
              <div className="mb-6">
                <Badge variant="primary" size="sm" className="mb-2">
                  Tạo Tài Khoản Mới
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                  Đăng Ký Thẻ Thư Viện
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Nhập đầy đủ thông tin bên dưới để khởi tạo tài khoản bạn đọc UniLibrary.
                </p>
              </div>

              {/* Main Register Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Họ và tên */}
                <div>
                  <label
                    htmlFor="reg-name"
                    className="block text-xs font-semibold text-on-surface mb-1.5"
                  >
                    Họ và tên đầy đủ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="VD: Nguyễn Văn An"
                      className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-10 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      person
                    </span>
                  </div>
                </div>

                {/* Mã sinh viên / độc giả */}
                <div>
                  <label
                    htmlFor="reg-code"
                    className="block text-xs font-semibold text-on-surface mb-1.5"
                  >
                    Mã sinh viên / học viên / mã độc giả <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-code"
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="VD: UL-202488 hoặc MSSV 2024001"
                      className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-10 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      badge
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-xs font-semibold text-on-surface mb-1.5"
                  >
                    Địa chỉ Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@university.edu.vn hoặc name@gmail.com"
                      className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-10 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                      mail
                    </span>
                  </div>
                </div>

                {/* Mật khẩu & Xác nhận mật khẩu (Grid 2 cột trên sm) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mật khẩu */}
                  <div>
                    <label
                      htmlFor="reg-password"
                      className="block text-xs font-semibold text-on-surface mb-1.5"
                    >
                      Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Tối thiểu 8 ký tự"
                        className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-9 pr-9 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                      />
                      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[17px]">
                        lock
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Xác nhận mật khẩu */}
                  <div>
                    <label
                      htmlFor="reg-confirm-password"
                      className="block text-xs font-semibold text-on-surface mb-1.5"
                    >
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        className="w-full h-11 rounded-xl border border-outline-variant bg-surface-container-lowest px-3.5 pl-9 pr-9 text-xs sm:text-sm text-on-surface outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-on-surface-variant/50"
                      />
                      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[17px]">
                        lock_reset
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {showConfirmPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Checklist */}
                {password.length > 0 && (
                  <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-2 text-[11px] animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant font-medium">Độ mạnh mật khẩu:</span>
                      <span
                        className={`font-bold ${
                          strengthScore === 4
                            ? "text-[#16A34A]"
                            : strengthScore >= 2
                            ? "text-[#D97706]"
                            : "text-[#DC2626]"
                        }`}
                      >
                        {strengthScore === 4
                          ? "Mạnh (Đạt chuẩn)"
                          : strengthScore >= 2
                          ? "Trung bình"
                          : "Yếu"}
                      </span>
                    </div>

                    {/* Strength Progress Bar */}
                    <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 h-full rounded-full transition-all ${
                            step <= strengthScore
                              ? strengthScore === 4
                                ? "bg-[#16A34A]"
                                : strengthScore >= 2
                                ? "bg-[#D97706]"
                                : "bg-[#DC2626]"
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Criteria items */}
                    <div className="grid grid-cols-2 gap-1 pt-1 text-on-surface-variant">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`material-symbols-outlined text-[15px] ${
                            passwordCriteria.minLength ? "text-[#16A34A]" : "text-outline-variant"
                          }`}
                        >
                          {passwordCriteria.minLength ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span>Tối thiểu 8 ký tự</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`material-symbols-outlined text-[15px] ${
                            passwordCriteria.hasUpperLower ? "text-[#16A34A]" : "text-outline-variant"
                          }`}
                        >
                          {passwordCriteria.hasUpperLower ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span>Chữ hoa & chữ thường</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`material-symbols-outlined text-[15px] ${
                            passwordCriteria.hasNumber ? "text-[#16A34A]" : "text-outline-variant"
                          }`}
                        >
                          {passwordCriteria.hasNumber ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span>Ít nhất 1 chữ số (0-9)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`material-symbols-outlined text-[15px] ${
                            passwordCriteria.hasSpecial ? "text-[#16A34A]" : "text-outline-variant"
                          }`}
                        >
                          {passwordCriteria.hasSpecial ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <span>Ký tự đặc biệt (!@#...)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary/20 accent-secondary mt-0.5"
                    />
                    <span>
                      Tôi đồng ý với{" "}
                      <span className="text-secondary font-medium">Quy chế Thư viện</span> & Cam kết bảo quản tài liệu học thuật theo quy định.
                    </span>
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
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    )}
                    <span>{loading ? "Đang tạo tài khoản bạn đọc..." : "Đăng ký Thẻ Độc giả"}</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Bottom Login Switcher */}
            <div className="pt-6 mt-6 border-t border-outline-variant/30 text-center">
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Bạn đã có tài khoản thẻ thư viện?{" "}
                <Link
                  href="/login"
                  className="font-bold text-secondary hover:underline transition-colors"
                >
                  Đăng nhập ngay
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

      {/* MODAL: Đăng Ký Thành Công */}
      {successAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 space-y-5 text-center">
            {/* Animated Checkmark */}
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>

            <div>
              <Badge variant="success" size="sm" className="mb-2">
                Khởi tạo thành công
              </Badge>
              <h3 className="font-title-lg text-title-lg text-primary font-bold">
                Chào Mừng Bạn Đến UniLibrary!
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Tài khoản thẻ thư viện số của bạn đã được thiết lập thành công trong phiên demo.
              </p>
            </div>

            {/* Created Account Details Card */}
            <div className="p-4 bg-surface-container-low rounded-2xl text-xs text-left space-y-2 border border-outline-variant/30">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Họ và tên:</span>
                <span className="font-bold text-primary">{successAccount.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Mã số độc giả:</span>
                <span className="font-mono font-bold text-secondary">{successAccount.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Email đăng nhập:</span>
                <span className="font-medium text-on-surface">{successAccount.email}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-outline-variant/20 text-[11px] text-on-surface-variant">
                <span>Trạng thái thẻ:</span>
                <span className="font-semibold text-[#16A34A]">Sẵn sàng kích hoạt</span>
              </div>
            </div>

            <p className="text-[11px] text-on-surface-variant italic">
              Vui lòng chuyển sang trang Đăng nhập để sử dụng tài khoản vừa tạo.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => router.push("/login")}
                className="font-semibold shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Chuyển đến trang Đăng nhập</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}