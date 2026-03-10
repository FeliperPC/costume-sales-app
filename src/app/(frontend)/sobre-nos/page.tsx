import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import IconInfo from "@/components/IconInfo";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BadgeComponent from "@/components/BadgeComponent";

export default async function AboutUs() {
  const { data: aboutData } = await sanityFetch({ query: ABOUT_QUERY });
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-24 bg-background text-foreground min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* TEXTO */}
          <div className="order-2 md:order-1 space-y-6 sm:space-y-8">
            <BadgeComponent value={aboutData.badge}/>

            <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              {aboutData.title}
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              {aboutData.description}
            </p>

            {/* FEATURES */}
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              {aboutData?.features?.map((feature) => {
                const IconComponent = Icons[feature.icon as keyof typeof Icons] as LucideIcon;
              return(
                  <IconInfo key={feature.title} title={feature.title} icon={IconComponent} description={feature.description} />
              )})}
            </div>
          </div>

          {/* IMAGEM */}
          <div className="relative order-1 lg:order-2 mb-8 md:mb-0 mt-10 md:mt-none">
            <div className="absolute -inset-4 sm:-inset-6 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border shadow-2xl">
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
