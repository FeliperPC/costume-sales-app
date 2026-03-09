import { sanityFetch } from "@/sanity/lib/live";
import { SUITS_CARD_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { ProductCard } from "../product/ProductCard";

export default async function FeaturedProducts() {
  const {data} = await sanityFetch({query:SUITS_CARD_QUERY})
  return (
    <section className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black mb-2">
              TRAJES DE ELITE
            </h2>
            <p className="text-muted-foreground">
              Trabalhos recentes da nossa oficina.
            </p>
          </div>

          {/* Botão Ver Tudo */}
          <Link
            href="/trajes"
            className="hidden md:block text-primary font-bold hover:underline"
          >
            Ver tudo
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.slice(0,6).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
