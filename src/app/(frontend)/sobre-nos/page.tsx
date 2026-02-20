import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import * as Icons from "lucide-react";
import { ReactNode } from "react";

export default async function AboutUs() {
  const { data: aboutData } = await sanityFetch({ query: ABOUT_QUERY });
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-24 bg-zinc-950 text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* TEXTO */}
          <div className="order-2 md:order-1 space-y-6 sm:space-y-8">
            <Badge
              variant="outline"
              className="uppercase tracking-widest text-[10px] sm:text-xs border-purple-500/40 text-purple-400"
            >
              Nossa História
            </Badge>

            <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              {aboutData.title}
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              {aboutData.description}
            </p>

            {/* FEATURES */}
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              {aboutData?.features?.map((feature, index) => {
                const Icon = Icons[
                  feature.icon as keyof typeof Icons
                ] as React.ComponentType<any>;

                return (
                  <div key={feature.title ?? index}>
                    <div className="flex gap-3 sm:gap-4 items-start">
                      {/* Ícone */}
                      <div className="p-2 sm:p-3 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/20 shrink-0">
                        {Icon && (
                          <Icon className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        )}
                      </div>

                      {/* Texto */}
                      <div>
                        <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg mb-1">
                          {feature.title}
                        </h3>

                        <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IMAGEM */}
          <div className="relative order-1 lg:order-2 mb-8 md:mb-0 mt-10 md:mt-none">
            <div className="absolute -inset-4 sm:-inset-6 bg-purple-500/10 blur-3xl rounded-full"></div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-zinc-800 shadow-2xl">
              <Image
                src={aboutData.image.asset.url}
                alt="Pinda em ação"
                width={1200}
                height={800}
                className="w-full h-auto object-cover md:grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
