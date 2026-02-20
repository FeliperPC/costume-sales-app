"use client";

import { HelpCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    question: "Posso pagar parcelado?",
    answer:
      "Sim! O pagamento pode ser dividido de 2x até 4x. É necessário que a última parcela seja quitada até o mês da entrega do seu traje. O envio é realizado somente após a confirmação do pagamento total, mesmo nos casos de parcelamento.",
  },
  {
    question: "Este valor inclui o frete?",
    answer:
      "Não. O valor informado corresponde exclusivamente ao produto. O custo do frete é calculado à parte e é de responsabilidade do cliente.",
  },
  {
    question: "Qual o prazo médio de entrega?",
    answer:
      "Por ser um trabalho artesanal e personalizado, o prazo médio é de 45 a 60 dias úteis, dependendo da complexidade do traje e da nossa fila de produção atual.",
  },
  {
    question: "Os trajes são completos? O que está incluso?",
    answer:
      "Sim. Os trajes são completos e prontos para uso, incluindo todas as partes que compõem a fantasia em si — seja modelo com ou sem máscara (como faceshell, quando aplicável ao traje). Não estão inclusos apenas equipamentos ou acessórios externos que não fazem parte direta da vestimenta, como props, armas cenográficas ou itens adicionais.",
  },
  {
    question: "Posso solicitar alterações no design?",
    answer:
      "Sim! Como cada peça é feita do zero, podemos discutir variações de cores, desgaste (battle damage) ou pequenas modificações estruturais durante a fase de planejamento.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex sm:flex-row sm:items-start gap-6 mb-14 items-center">
        <div className="p-4 bg-purple-600/10 rounded-2xl flex items-center">
          <HelpCircle className="text-purple-500" size={28} />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Perguntas Comuns
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base">
            Tudo o que você precisa saber antes de encomendar seu traje
          </p>
        </div>
      </header>

      {/* Accordion */}
      <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
        {FAQ_DATA.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="
        border border-zinc-800
        rounded-xl sm:rounded-2xl
        bg-zinc-900/40 backdrop-blur-sm
        px-4 sm:px-6
      "
          >
            <AccordionTrigger
              className="
          text-left
          text-sm sm:text-base md:text-lg
          font-semibold
          text-zinc-200
          hover:text-purple-400
          transition-colors
          py-4
        "
            >
              {item.question}
            </AccordionTrigger>

            <AccordionContent
              className="
          text-zinc-400
          leading-relaxed
          text-sm sm:text-base
          pb-4 sm:pb-6
        "
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
