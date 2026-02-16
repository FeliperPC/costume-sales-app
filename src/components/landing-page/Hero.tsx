"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import heroBackground from "../../assets/heroBackground.avif"

interface HeroProps {
  onCatalogClick?: () => void;
}

export function Hero() {
  return (
    <header className="relative h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBackground}
          alt="Cosplay background"
          fill
          priority
          className="object-cover opacity-40 grayscale-[50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-zinc-950/80 to-zinc-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full mt-20">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            Elite CosplayMaker
          </span>

          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none">
            DÊ VIDA AO SEU <br />
            <span className="text-purple-500">PERSONAGEM.</span>
          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-lg">
            Somos especialistas em transformar fantasia em realidade. Armaduras,
            trajes e acessórios produzidos com as medidas exatas do seu corpo.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 font-bold px-8 py-6 rounded-xl">
              <Link
                href={"/trajes"}
              >
                Ver Catálogo <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
