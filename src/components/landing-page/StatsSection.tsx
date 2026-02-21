"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Scissors, Truck } from "lucide-react";

const stats = [
  {
    value: "+500",
    label: "Cosplays Entregues",
    icon: Truck,
  },
  {
    value: "100%",
    label: "Sob Medida",
    icon: Scissors,
    hasBorder: true,
  },
  {
    value: "+7",
    label: "Anos de Experiência",
    icon: Sparkles,
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-900/30 ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl w-full mx-auto">
        {stats.map(({ hasBorder, value, label, icon }) => {
          const Icon = icon;

          return (
            <div
              key={label}
              className={cn(
                "space-y-2 text-center",
                hasBorder && "sm:border-x sm:border-white/10 sm:px-8"
              )}
            >
              <div className="flex items-center justify-center gap-3">
                <Icon className="size-9 text-purple-400" />

                <p className="text-5xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {value}
                </p>
              </div>

              <p className="text-md md:text-base text-gray-300 font-medium">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}