"use client"

import {
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type FAQItem = {
  question: string
  answer: string
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Como funciona a confecção sob medida?",
    answer:
      "Após a confirmação do pedido, nossa equipe entrará em contato para solicitar as medidas detalhadas (altura, tórax, cintura, etc.) e um guia em vídeo de como tirá-las corretamente para garantir o ajuste perfeito.",
  },
  {
    question: "Qual o prazo médio de entrega?",
    answer:
      "Por ser um trabalho artesanal e personalizado, o prazo médio é de 45 a 60 dias úteis, dependendo da complexidade do traje e da nossa fila de produção atual.",
  },
  {
    question: "A armadura é resistente a impactos?",
    answer:
      "Nossos trajes são destinados a cosplay e exibição. Embora sejam feitos com materiais duráveis (resina de alta resistência ou PVC expandido), não devem ser usados para proteção real ou combate.",
  },
  {
    question: "Posso solicitar alterações no design?",
    answer:
      "Sim! Como cada peça é feita do zero, podemos discutir variações de cores, desgaste (battle damage) ou pequenas modificações estruturais durante a fase de planejamento.",
  },
]

export default function FAQSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex sm:flex-row sm:items-start gap-6 mb-14">
        <div className="p-4 bg-purple-600/10 rounded-2xl">
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
      <Accordion
        type="single"
        collapsible
        className="space-y-4"
      >
        {FAQ_DATA.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-zinc-800 rounded-2xl bg-zinc-900/40 backdrop-blur-sm px-6"
          >
            <AccordionTrigger className="text-left text-base sm:text-lg font-bold text-zinc-200 hover:text-purple-400 transition-colors">
              {item.question}
            </AccordionTrigger>

            <AccordionContent className="text-zinc-400 leading-relaxed text-sm sm:text-base pb-6">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
