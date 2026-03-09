import { LucideIcon } from "lucide-react";

export default function IconInfo({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 sm:gap-4 items-start">
      <div className="p-2 sm:p-3 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20 shrink-0">
        <Icon className="text-primary w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground uppercase text-sm sm:text-base md:text-lg mb-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
