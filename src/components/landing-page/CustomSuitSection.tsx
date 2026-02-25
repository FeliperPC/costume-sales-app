"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Hammer } from "lucide-react";
import { CUSTOM_SUIT_QUERY_RESULT } from "@/sanity/types";
import BadgeComponent from "../BadgeComponent";

export function CustomSuitSection({
  customSuitData,
}: {
  customSuitData: CUSTOM_SUIT_QUERY_RESULT;
}) {
  const {image,title,badge,description,callToAction} = customSuitData
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-zinc-950">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="space-y-8 order-2 md:order-1">
            <BadgeComponent value={badge} />
            <h2 className="uppercase text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              {title}
            </h2>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>

          <Button
            size="lg"
            asChild
            className="uppercase mt-20 w-full lg:w-auto bg-purple-600 hover:bg-purple-700 py-7 rounded-xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-purple-900/20"
          >
            <Link href={"/pedido"}>
              <Hammer className="size-5" /> {callToAction}
            </Link>
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative order-1 md:order-2">
          <div className="absolute -inset-6 bg-yellow-500/5 blur-[80px] rounded-full" />

          <Card className="p-0 relative overflow-hidden rounded-3xl border-zinc-800 bg-zinc-900 group">
            <Image
              src={image.asset.url}
              alt="Processo de Artesania Cosmaker"
              width={800}
              height={1000}
              className="w-full h-full object-cover lg:grayscale brightness-80 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </Card>
        </div>
      </div>
    </section>
  );
}
