import { Hero } from "@/components/Hero";
import Navbar from "@/components/NavBar";
import Header from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <Hero />
    </div>
  );
}
