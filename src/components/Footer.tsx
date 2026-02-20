import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <Card className="bg-transparent border-0 shadow-none p-0 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Logo />
          </div>

          <p className="text-gray-500 max-w-sm mb-8">
            Referência mundial em produção de cosplays de alto nível.
            Cada detalhe é planejado para que você se sinta o próprio personagem.
          </p>

          <div className="flex gap-4">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-zinc-900 hover:bg-purple-600 transition-colors"
              asChild
            >
              <Link href="https://www.instagram.com/pinda.studio/" target="_blank">
                <Instagram size={18} className="text-gray-400 hover:text-white" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Oficina */}
        <Card className="bg-transparent border-0 shadow-none p-0">
          <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
            Oficina
          </h4>

          <p className="text-gray-500 text-sm mb-4">
            Rua dos Heróis, 1234
            <br />
            São Paulo, SP - Brasil
          </p>

          <Link
            href="mailto:contato@nexuscosplay.com"
            className="text-purple-400 font-bold hover:underlinnpe"
          >
            contato@nexuscosplay.com
          </Link>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <Separator className="bg-zinc-900" />
        <div className="text-center text-xs text-gray-600 pt-8">
          © 2026 Pinda Studio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}