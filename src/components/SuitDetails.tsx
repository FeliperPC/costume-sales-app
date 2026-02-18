"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Info,
  ShoppingCart,
  ShieldCheck,
  Ruler,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { GET_SUIT_BY_SLUG_QUERY_RESULT } from "@/sanity/types";

export default function SuitDetails({
  data,
}: {
  data: GET_SUIT_BY_SLUG_QUERY_RESULT;
}) {
  console.log(data);
  
  return (
    <div className="pt-24 pb-20 bg-zinc-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-zinc-400 hover:text-white"
        >
          <Link href={"/trajes"}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar ao Portfólio
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-zinc-800 bg-zinc-900">
              <CardContent className="p-0 aspect-[4/5] relative">
                <Image
                  src={data?.versions[0].images[0].asset?.url || ""}
                  alt={data?.name!!!}
                  fill
                  className="object-cover"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {data?.versions[0].images.slice(0, 4).map((img, i) => (
                <Card
                  key={i}
                  className="overflow-hidden border-zinc-800 bg-zinc-900 cursor-pointer opacity-70 hover:opacity-100 transition"
                >
                  <CardContent className="p-0 aspect-square relative">
                    <Image
                      src={img.asset?.url || ""}
                      alt={`${img.asset?.metadata}-${i}`}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              {data?.name}
            </h1>

            <div className="flex flex-col gap-4 mb-8">
              <div className="text-3xl text-purple-400 font-bold">
                {data?.versions[0].price}
              </div>

              <Badge
                variant="outline"
                className="w-fit bg-green-500/10 text-green-500 border-green-500/30 uppercase tracking-widest"
              >
                Disponível para Encomenda
              </Badge>
            </div>

            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {data?.versions[0].fullDescription[0].children[0].text || ""}
            </p>

            {/* Variants */}
            <Card className="bg-zinc-900 border-zinc-800 mb-8">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2 uppercase tracking-tight text-sm text-zinc-300">
                  <Info className="h-4 w-4" />
                  Versões Disponíveis
                </h3>

                <div className="flex flex-wrap gap-2">
                  {data?.versions.map((v) => (
                    <Button
                      key={v._key}
                      variant="secondary"
                      size="sm"
                      className="hover:bg-purple-600 hover:text-white"
                    >
                      {v.versionName}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700 text-lg font-bold shadow-lg shadow-purple-900/20"
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                FAZER ENCOMENDA
              </Button>

              <div className="flex items-center justify-center gap-6 text-xs text-zinc-500 uppercase font-bold tracking-widest">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} /> Compra Segura
                </span>
                <span className="flex items-center gap-1">
                  <Ruler size={14} /> Sob Medida
                </span>
                <span className="flex items-center gap-1">
                  <Camera size={14} /> Fotos Inclusas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
