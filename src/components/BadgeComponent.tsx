import { Badge } from "./ui/badge";

export default function BadgeComponent({ value }: { value: string }) {
  return (
    <Badge
      variant="outline"
      className="px-3 py-3 bg-primary/20 border border-primary/50 rounded-full text-primary text-xs font-bold uppercase mb-6"
    >
      {value}
    </Badge>
  );
}
