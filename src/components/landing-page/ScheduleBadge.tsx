"use client";

import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function ScheduleBadge({reopenDate}:{reopenDate:string}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const formatedDate = formatDate(reopenDate)

  return (
    <div className="relative w-full z-[2]">
      {/* Glow externo */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />

      {/* Card shadcn */}
      <Card className="p-4 relative flex flex-row items-center gap-4 bg-zinc-900/90 backdrop-blur-xl border-white/10 rounded-2xl shadow-2xl">
        {/* Ícone */}
        <div className="shrink-0 w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
          <AlertCircle size={18} className="text-purple-400" />
        </div>

        {/* Texto */}
        <div className="flex-1">
          <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-white mb-1">
            Agenda fechada
          </h4>
          <p className="text-[11px] text-zinc-400 leading-tight font-medium">
            Não estamos recebendo mais encomendas até o dia {formatedDate}
          </p>
        </div>

        {/* Botão fechar shadcn */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsVisible(false)}
          className="h-8 w-8 text-zinc-500 hover:bg-zinc-100/10 hover:text-white"
        >
          <X size={16} />
        </Button>
      </Card>
    </div>
  );
}
