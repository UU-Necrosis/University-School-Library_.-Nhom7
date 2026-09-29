"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

interface RoomItem {
  id: string;
  name: string;
  floor: string;
  capacity: string;
  equipment: string[];
  status: "Trống" | "Đang sử dụng" | "Đã đặt trước";
  nextAvailable: string;
  imageIcon: string;
}

const mockRooms: RoomItem[] = [
  {
    id: "r101",
    name: "Phòng Thảo luận Nhóm R-101",
    floor: "Tầng 1 • Khu A",
    capacity: "6 - 8 Người",
    equipment: ["Màn hình TV 65 inch", "Bảng kính tương tác", "Ổ cắm điện đa năng", "Điều hòa 24°C"],
    status: "Trống",
    nextAvailable: "Sẵn sàng ngay",
    imageIcon: "groups",
  },
  {
    id: "r204",
    name: "Phòng Nghiên cứu Chuyên sâu R-204",
    floor: "Tầng 2 • Khu B (Yên tĩnh)",
    capacity: "4 - 6 Người",
    equipment: ["Máy chiếu HD", "Loa trợ giảng", "Bảng từ", "Wifi 6 Tốc độ cao"],
    status: "Đang sử dụng",
    nextAvailable: "Trống từ 15:30 hôm nay",
    imageIcon: "school",
  },
  {
    id: "r308",
    name: "Phòng Hội thảo & Seminar R-308",
    floor: "Tầng 3 • Khu C",
    capacity: "15 - 25 Người",
    equipment: ["Hệ thống âm thanh đa kênh", "2 Màn hình TV 75 inch", "Micro không dây", "Bàn ghế di động"],
    status: "Trống",
    nextAvailable: "Sẵn sàng ngay",
    imageIcon: "co_present",
  },
  {
    id: "cabin05",
    name: "Cabin Học cá nhân Quiet-Pod #05",
    floor: "Tầng 2 • Khu Tự học",
    capacity: "1 Người",
    equipment: ["Bàn học chống mỏi", "Đèn học 3 cấp độ", "Cách âm 95%", "Cổng sạc USB-C"],
    status: "Đã đặt trước",
    nextAvailable: "Trống từ 17:00",
    imageIcon: "person",
  },
];

export default function RoomBookingPage() {
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [bookingDate, setBookingDate] = useState("2026-09-26");
  const [bookingTime, setBookingTime] = useState("14:00 - 16:00");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSelectedRoom(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        {/* Banner Section */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-space-xl px-space-md lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
            <nav className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <Link href="/" className="hover:text-secondary flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang chủ</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-semibold">Đặt phòng Học nhóm & Tiện ích Thư viện</span>
            </nav>

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Hệ thống Đặt phòng Nhóm, Cabin Tự học & Tiện ích Học thuật
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Đặt trước không gian thảo luận nhóm, phòng seminar hiện đại và cabin nghiên cứu cá nhân yên tĩnh dành cho sinh viên, học viên cao học & giảng viên ĐHQG.
              </p>
            </div>
          </div>
        </section>

        {/* Room Grid */}
        <section className="max-w-7xl mx-auto py-space-xl px-space-md lg:px-margin space-y-space-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Danh sách Phòng & Space Khả dụng
            </h2>
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full border border-green-300">
                <span className="w-2 h-2 rounded-full bg-green-600"></span> Trống ({mockRooms.filter(r => r.status === "Trống").length})
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span> Đang có người ({mockRooms.filter(r => r.status !== "Trống").length})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {mockRooms.map((room) => (
              <div
                key={room.id}
                className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/40 hover:border-secondary transition-all shadow-sm flex flex-col justify-between gap-space-md"
              >
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {room.floor}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        room.status === "Trống"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : room.status === "Đang sử dụng"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-slate-100 text-slate-800 border-slate-300"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[28px]">{room.imageIcon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                        {room.name}
                      </h3>
                      <p className="font-title-sm text-title-sm text-secondary font-medium">
                        Sức chứa: {room.capacity}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Trang thiết bị đi kèm:</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {room.equipment.map((item) => (
                        <span key={item} className="px-2 py-0.5 rounded bg-surface-container-low text-xs text-on-surface-variant border border-outline-variant/30">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-space-md border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant font-mono">
                    {room.nextAvailable}
                  </span>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="px-space-lg py-2 rounded-lg bg-secondary text-on-secondary font-title-sm text-title-sm hover:bg-secondary-container transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">event_available</span>
                    <span>Đặt phòng này</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Booking Form */}
        {selectedRoom && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-slate-200">
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Xác nhận đặt: {selectedRoom.name}
              </h3>
              <p className="text-sm text-slate-600">
                Vị trí: {selectedRoom.floor} • Sức chứa: {selectedRoom.capacity}
              </p>

              {successMsg ? (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center font-medium">
                  🎉 Đặt phòng thành công! Mã xác nhận đã gửi về email sinh viên của bạn.
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} className="space-y-space-md">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày đặt phòng</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full h-11 px-3 border border-slate-300 rounded-md text-sm font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Khung giờ sử dụng</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full h-11 px-3 border border-slate-300 rounded-md text-sm font-medium"
                    >
                      <option value="08:00 - 10:00">08:00 - 10:00 (Ca Sáng 1)</option>
                      <option value="10:00 - 12:00">10:00 - 12:00 (Ca Sáng 2)</option>
                      <option value="13:30 - 15:30">13:30 - 15:30 (Ca Chiều 1)</option>
                      <option value="15:30 - 17:30">15:30 - 17:30 (Ca Chiều 2)</option>
                      <option value="18:00 - 20:30">18:00 - 20:30 (Ca Tối)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-space-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedRoom(null)}
                      className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-secondary text-white rounded-md text-sm font-semibold hover:bg-blue-700"
                    >
                      Xác nhận đăng ký
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
