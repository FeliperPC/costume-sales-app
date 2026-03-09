import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { REVIEWERS_QUERY } from "@/sanity/lib/queries";

export default async function Testimonials() {
  const { data } = await sanityFetch({ query: REVIEWERS_QUERY });

  return (
    <section className="py-24 bg-card/30 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-foreground uppercase tracking-tighter">
            Da Fantasia à Realidade
          </h2>
          <p className="text-muted-foreground">
            Mais Que Cosplay. Uma Experiência Completa! Confira o depoimento de quem já transformou o sonho em realidade.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((rev, i) => (
            <Card
              key={i}
              className="group bg-card border-border overflow-hidden rounded-3xl transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 p-0"
            >
              {/* Image */}
              <div className="relative aspect-4/5 overflow-hidden w-full">
                <Image
                  src={rev.image?.asset?.url || ""}
                  alt={rev.name || ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, star) => (
                    <Star
                      key={star}
                      size={14}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  &quot;{rev.clientReview?.[0]?.children?.[0]?.text ?? ""}&quot;
                </p>

                <div className="pt-4 border-t border-border">
                  <span className="font-bold text-foreground text-sm uppercase tracking-widest">
                    {rev.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
