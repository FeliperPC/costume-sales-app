"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HatGlasses } from "lucide-react";
import Link from "next/link";
import heroBackground from "../../../public/heroBackground.jpg";
import { ScheduleBadge } from "./ScheduleBadge";
import BadgeComponent from "../BadgeComponent";

export default function HeroSection({
  reopenDate,
}: {
  reopenDate?: string | null;
}) {
  return (
    <header className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden gap-20">
      {reopenDate && (
        <div className="px-8">
          <ScheduleBadge reopenDate={reopenDate} />
        </div>
      )}
      <>
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackground}
            alt="Cosplay background"
            fill
            priority
            className="object-cover opacity-40 grayscale-[50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <BadgeComponent value="Elite Cosmaker" />
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none">
              DÊ VIDA AO SEU <br />
              <span className="text-primary">PERSONAGEM</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Somos especialistas em transformar fantasia em realidade.
            Criamos armaduras, trajes e acessórios com acabamento de alta qualidade, 
            disponíveis em tamanhos padronizados ou sob medida.
            </p>

            <Button
              size="lg"
              asChild
              className="uppercase w-86 bg-primary hover:bg-primary/90 py-7 rounded-xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20"
            >
              <Link href={"/trajes"}>
              <HatGlasses className="size-5" /> Ver Catálogo
              </Link>
            </Button>
          </div>
        </div>
      </>
    </header>
  );
}
