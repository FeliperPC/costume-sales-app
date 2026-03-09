import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid">
      <div className="p-4 bg-background text-foreground border-b border-primary/30">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeftIcon className="size-4" />
            Voltar para Home
          </Link>
        </Button>
      </div>
      {children}
    </div>
  );
}
