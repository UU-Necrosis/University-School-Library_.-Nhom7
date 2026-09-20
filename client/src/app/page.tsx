"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSearchSection } from "@/components/home/HeroSearchSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { LiveCapacitySection } from "@/components/home/LiveCapacitySection";
import { CuratedResourcesSection } from "@/components/home/CuratedResourcesSection";
import { DatabasesDirectorySection } from "@/components/home/DatabasesDirectorySection";
import { EventsWorkshopsSection } from "@/components/home/EventsWorkshopsSection";
import { AskLibrarianSection } from "@/components/home/AskLibrarianSection";
import { PatronInfo } from "@/types/library";

const mockPatron: PatronInfo = {
  name: "Lê Hoàng Nam",
  code: "UL-202488",
  role: "Học viên Cao học • K.31",
  department: "Khoa Khoa học & Kỹ thuật Thông tin",
  ssoConnected: true,
  activeLoans: 3,
  maxLoans: 8,
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header patron={mockPatron} />

      <main className="w-full pt-28 flex-1">
        <HeroSearchSection patron={mockPatron} />
        <ServicesSection />
        <LiveCapacitySection />
        <CuratedResourcesSection />
        <DatabasesDirectorySection />
        <EventsWorkshopsSection />
        <AskLibrarianSection />
      </main>

      <Footer />
    </div>
  );
}
