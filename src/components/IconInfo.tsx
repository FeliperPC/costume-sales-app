import { Icon, LucideIcon } from "lucide-react";

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
      <div className="p-2 sm:p-3 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/20 shrink-0">
        <Icon className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </div>
      <div>
        <h3 className="font-semibold text-white uppercase text-sm sm:text-base md:text-lg mb-1">
          {title}
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
