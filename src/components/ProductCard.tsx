import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Suit } from "@/sanity/types";

export function ProductCard({ product }: any) {
  const imageUrl = product.versions.images.asset.url;
  return (
    <Link href={`/trajes/${product.slug.current}`} className="group block">
      <Card className="relative aspect-[3/4] rounded-3xl overflow-hidden border-0 bg-transparent shadow-none p-0 cursor-pointer">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {/* Bottom Content */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <h4 className="text-xl font-bold mb-1 text-white">{product.name}</h4>

          <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ver detalhes do projeto
          </p>
        </div>
      </Card>
    </Link>
  );
}
