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
import {
  SUIT_BY_SLUG_QUERY_RESULT,
  SUIT_VERSIONS_MENU_QUERY_RESULT,
} from "@/sanity/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import FAQSection from "./FAQSection";

export default function SuitDetails({
  product,
  versions,
  reopenScheduleDate,
}: {
  product: SUIT_BY_SLUG_QUERY_RESULT;
  versions: SUIT_VERSIONS_MENU_QUERY_RESULT;
  reopenScheduleDate?: string | null;
}) {
  const searchParams = useSearchParams();
  const version = searchParams.get("v");

  const router = useRouter();
  const pathname = usePathname();

  const [selectedVersion, setSelectedVersion] = useState<string | null>(
    version,
  );

  const [currentImage, setCurrentImage] = useState(
    product.version.images[0].asset.url,
  );
  let formatedDate = "";
  if (reopenScheduleDate) {
    formatedDate = formatDate(reopenScheduleDate);
  }
  useEffect(() => {
    setSelectedVersion(version);
    setCurrentImage(product.version.images[0].asset.url);
  }, [version]);

  function handleChangeVersion(versionName: string) {
    if (versionName == selectedVersion) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());

    params.set("v", versionName);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }
  return (
    <div className="pt-24 pb-20 bg-background text-foreground min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <Link href={"/trajes"}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar ao Portfólio
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <Card className="p-0 overflow-hidden border-border bg-card">
              <CardContent className="p-0 aspect-[4/5] relative">
                <Image
                  src={currentImage!!!}
                  alt={product.name!!!}
                  fill
                  className="object-cover"
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {product.version.images.slice(0, 4).map((img, i) => (
                <Card
                  key={i}
                  className="p-0 overflow-hidden border-border bg-card cursor-pointer opacity-70 hover:opacity-100 transition"
                  onClick={() => setCurrentImage(img.asset.url)}
                >
                  <CardContent className="aspect-square relative">
                    <Image
                      src={img.asset.url || ""}
                      alt={`${img.asset._id}-${i}`}
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
              {product.name} - {product.version.versionName}
            </h1>

            <div className="flex flex-col gap-4 mb-8">
              <div className="text-3xl text-primary font-bold">
                R$ {product.version.price}
              </div>
              {formatedDate.length ? (
                <Badge
                  variant="outline"
                  className="w-fit bg-yellow-500/10 text-yellow-500 border-yellow-500/30 uppercase font-bold"
                >
                  Agenda fechada para encomendas até {formatedDate}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="w-fit bg-green-500/10 text-green-500 border-green-500/30 uppercase font-bold"
                >
                  Disponível para Encomenda
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {product.version.fullDescription[0].children[0].text}
            </p>

            {/* Variants */}
            <Card className="bg-card border-border mb-8 p-0">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2 uppercase tracking-tight text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  Versões Disponíveis
                </h3>

                <div className="flex flex-wrap gap-2">
                  {versions.map((v) => (
                    <Button
                      key={v._key}
                      variant="secondary"
                      size="sm"
                      className={cn(
                        "bg-muted hover:bg-primary rounded-lg text-sm font-medium transition-colors text-foreground",
                        selectedVersion == v.versionSlug && "bg-primary",
                      )}
                      onClick={() => handleChangeVersion(v.versionSlug)}
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
                asChild
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 py-7 rounded-xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20"
              >
                <Link href={`/pedido/${product.slug}/${selectedVersion}`}>
                  <ShoppingCart className="mr-3 size-5 " />
                  FAZER ENCOMENDA
                </Link>
              </Button>

              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground uppercase font-bold tracking-widest">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} /> Exclusivo
                </span>
                <span className="flex items-center gap-1">
                  <Ruler size={14} /> Sob Medida
                </span>
                <span className="flex items-center gap-1">
                  <Camera size={14} /> Fotos Reais
                </span>
              </div>
            </div>
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
}
