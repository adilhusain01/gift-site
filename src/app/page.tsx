'use client';

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { RecentlyViewed } from "@/components/recently-viewed";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <RecentlyViewed />
      </main>
      <Footer />
    </div>
  );
}
