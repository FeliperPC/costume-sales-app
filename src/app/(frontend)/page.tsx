import ClientsReview from "@/components/landing-page/ClientsReview";
import CustomSuit from "@/components/landing-page/CustomSuit";
import FeaturedProducts from "@/components/landing-page/FeaturedProducts";
import Hero from "@/components/landing-page/Hero";
import StatsSection from "@/components/landing-page/StatsSection";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">
      <Hero />
      <Suspense fallback={<div>Loading products review ...</div>}>
        <FeaturedProducts />
      </Suspense>
      <StatsSection />
      <CustomSuit />
      <Suspense fallback={<div>Loading clients review...</div>}>
        <ClientsReview />
      </Suspense>
    </div>
  );
}
