import { Hero } from "@/components/Hero";
import { sanityFetch } from "@/sanity/lib/live";
import { SUITS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  // this is a test only
  const data = await sanityFetch({query:SUITS_QUERY})
  console.log(data);
  
  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <Hero />
    </div>
  );
}
