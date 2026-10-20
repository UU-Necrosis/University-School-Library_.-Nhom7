"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSearchSection } from "@/components/home/HeroSearchSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { LiveCapacitySection } from "@/components/home/LiveCapacitySection";
import { CuratedResourcesSection } from "@/components/home/CuratedResourcesSection";
import { AskLibrarianSection } from "@/components/home/AskLibrarianSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="w-full pt-32 flex-1">
        <HeroSearchSection />
        <ServicesSection />
        <LiveCapacitySection />
        <CuratedResourcesSection />
        <AskLibrarianSection />
      </main>

      <Footer />
    </div>
  );
}
