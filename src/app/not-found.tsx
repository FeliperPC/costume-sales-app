import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ghost, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-24">
      <Card className="max-w-md w-full bg-card border-border text-center shadow-2xl rounded-2xl">
        <CardContent className="p-10">
          <div className="w-24 h-24 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-8 border border-destructive/30">
            <Ghost size={48} />
          </div>

          <h1 className="text-3xl font-black mb-4 text-foreground">
            PÁGINA NÃO ENCONTRADA
          </h1>

          <p className="text-muted-foreground mb-6">
            O conteúdo que você está tentando acessar não existe ou pode ter
            sido removido.
          </p>

          <p className="text-sm text-muted-foreground mb-8">
            Verifique o endereço digitado ou volte para a loja principal.
          </p>

          <Button asChild className="w-full rounded-xl">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a Loja
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
