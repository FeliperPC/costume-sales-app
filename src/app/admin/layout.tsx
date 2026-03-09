import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="border-b border-primary/30 bg-[#13141b]">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-black bg-clip-text text-foreground">
              PINDA
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                .STUDIO
              </span>
              <span className="ml-1">®</span>
            </span>

            <div className="h-6 w-px bg-border" />

            <span className="text-sm font-medium text-muted-foreground">
              Painel Administrativo
            </span>
          </div>

          <Button asChild variant="ghost" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" />
              Voltar para o site
            </Link>
          </Button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
