import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <Card className="bg-transparent p-1 border-none shadow-none md:col-span-2 ring-0">
          <div className="flex items-center gap-2 mb-6">
            <Logo />
          </div>

          <p className="text-muted-foreground max-w-sm mb-8">
            Referência mundial em produção de cosplays de alto nível.
            Cada detalhe é planejado para que você se sinta o próprio personagem.
          </p>

          <div className="flex gap-4">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-card hover:bg-primary transition-colors"
              asChild
            >
              <Link href="https://www.instagram.com/pinda.studio/" target="_blank">
                <Instagram size={18} className="text-muted-foreground hover:text-foreground" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Oficina */}
        <Card className="bg-transparent border-0 shadow-none p-1 ring-0">
          <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-sm">
            Oficina
          </h4>

          <p className="text-muted-foreground text-sm mb-4">
            Rua dos Heróis, 1234
            <br />
            São Paulo, SP - Brasil
          </p>

          <Link
            href="mailto:spiderpinda@hotmail.com"
            className="text-primary font-bold hover:underlinnpe"
          >
            spiderpinda@hotmail.com
          </Link>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <Separator className="bg-card" />
        <div className="text-center text-xs text-muted-foreground/60 pt-8">
          © 2026 Pinda Studio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
