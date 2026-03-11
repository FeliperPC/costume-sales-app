import AboutUs from "@/components/landing-page/AboutUs";
import ClientsReview from "@/components/landing-page/ClientsReview";
import CustomSuit from "@/components/landing-page/CustomSuit";
import Hero from "@/components/landing-page/Hero";
import StatsSection from "@/components/landing-page/StatsSection";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="pt-20 bg-background text-foreground min-h-screen">
      <Hero />
      <AboutUs />
      <StatsSection />
      <CustomSuit />
      <Suspense fallback={<div>Loading clients review...</div>}>
        <ClientsReview />
      </Suspense>
    </div>
  );
}
