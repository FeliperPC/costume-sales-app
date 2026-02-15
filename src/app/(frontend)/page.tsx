import FeaturedProducts from "@/components/FeaturedProducts";
import { Hero } from "@/components/Hero";
import { sanityFetch } from "@/sanity/lib/live";
import { SUITS_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <Hero />
      <Suspense fallback={<div>Loading ...</div>}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
