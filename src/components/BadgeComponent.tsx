import { Badge } from "./ui/badge";

export default function BadgeComponent({ value }: { value: string }) {
  return (
    <Badge
      variant="outline"
      className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-xs font-bold uppercase mb-6"
    >
      {value}
    </Badge>
  );
}
