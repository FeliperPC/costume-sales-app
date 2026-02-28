import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { CHECK_ORDER } from "@/sanity/lib/queries";

export const revalidate = 0;

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
  }>;
}) {
  const orderId = (await searchParams).orderId;

  if (!orderId) notFound();

  const { data: order } = await sanityFetch({
      query: CHECK_ORDER,
      params: { id: orderId },
    });

  if (!order) notFound();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-24">
      <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 text-center shadow-2xl rounded-2xl">
        <CardContent className="p-10">
          <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/40">
            <ShieldCheck size={48} />
          </div>

          <h1 className="text-3xl font-black mb-4 text-white">
            SOLICITAÇÃO ENVIADA!
          </h1>

          {order.productName ?
            <p className="text-zinc-400 mb-6">
              <span>{order.name}, </span>recebemos seu pedido para o cosplay de{" "}
              <span className="text-white font-bold">
                {order.hero ?? order.productName}
              </span>
              .
            </p>
          :
            <p className="text-zinc-400 mb-6">
              <span>{order.name}, </span>recebemos seu pedido de produto personalizado.
            </p>
          }

          <p className="text-sm text-zinc-500 mb-8">
            Nossa equipe entrará em contato em até 48h para confirmar o
            orçamento final e o prazo de produção.
          </p>

          <div className="text-xs text-zinc-600 mb-6">
            Código do pedido: {order._id}
          </div>

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
