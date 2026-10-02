"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb, Badge, Button } from "@/components/ui";
import { RoomItem } from "@/types/library";

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
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/", icon: "home" },
                { label: "Đặt phòng & Tiện ích" },
              ]}
            />

            <div className="flex flex-col gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                Hệ thống Đặt phòng Nhóm, Cabin Tự học & Tiện ích Học thuật
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Đặt trước không gian thảo luận nhóm, phòng seminar hiện đại và cabin nghiên cứu cá nhân yên tĩnh dành cho sinh viên, học viên cao học & giảng viên ĐHQG.
              </p>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-space-xs overflow-x-auto pt-space-xs border-b border-outline-variant/30">
              <Link
                href="/dat-phong"
                className="px-space-md py-2 font-title-sm text-title-sm text-secondary font-bold border-b-2 border-secondary bg-surface-container-lowest/60 rounded-t-lg"
              >
                Không gian & Tiện ích khả dụng
              </Link>
              <Link
                href="/dat-phong/lich-su"
                className="px-space-md py-2 font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent flex items-center gap-1.5"
              >
                <span>Lịch sử đặt phòng</span>
                <span className="px-1.5 py-0.5 text-xs font-semibold bg-secondary/10 text-secondary rounded-full">
                  4
                </span>
              </Link>
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
              <Badge variant="success" dot size="md">
                Trống ({mockRooms.filter((r) => r.status === "Trống").length})
              </Badge>
              <Badge variant="warning" dot size="md">
                Đang có người ({mockRooms.filter((r) => r.status !== "Trống").length})
              </Badge>
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
                    <Badge
                      variant={
                        room.status === "Trống"
                          ? "success"
                          : room.status === "Đang sử dụng"
                          ? "warning"
                          : "neutral"
                      }
                      size="sm"
                    >
                      {room.status}
                    </Badge>
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
                  <Button
                    variant="secondary"
                    size="md"
                    icon="event_available"
                    onClick={() => setSelectedRoom(room)}
                  >
                    Đặt phòng này
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal Booking Form */}
        {selectedRoom && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-2xl max-w-lg w-full p-space-lg space-y-space-md relative border border-outline-variant/40">
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Xác nhận đặt: {selectedRoom.name}
              </h3>
              <p className="text-sm text-on-surface-variant">
                Vị trí: {selectedRoom.floor} • Sức chứa: {selectedRoom.capacity}
              </p>

              {successMsg ? (
                <div className="p-4 bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534] rounded-lg text-center font-medium">
                  🎉 Đặt phòng thành công! Mã xác nhận đã gửi về email sinh viên của bạn.
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} className="space-y-space-md">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Ngày đặt phòng</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full h-11 px-3 border border-outline-variant rounded-md text-sm font-medium bg-transparent focus:outline-none focus:border-secondary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Khung giờ sử dụng</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full h-11 px-3 border border-outline-variant rounded-md text-sm font-medium bg-transparent focus:outline-none focus:border-secondary"
                    >
                      <option value="08:00 - 10:00">08:00 - 10:00 (Ca Sáng 1)</option>
                      <option value="10:00 - 12:00">10:00 - 12:00 (Ca Sáng 2)</option>
                      <option value="13:30 - 15:30">13:30 - 15:30 (Ca Chiều 1)</option>
                      <option value="15:30 - 17:30">15:30 - 17:30 (Ca Chiều 2)</option>
                      <option value="18:00 - 20:30">18:00 - 20:30 (Ca Tối)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-space-xs">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => setSelectedRoom(null)}
                    >
                      Hủy bỏ
                    </Button>
                    <Button type="submit" variant="secondary" size="md">
                      Xác nhận đăng ký
                    </Button>
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
