import { defineField, defineType } from "sanity";


// Singleton
export const scheduleType = defineType({
  name: "schedule",
  title: "Disponibilidade de Agenda",
  type: "document",
  fields: [
    // 1. O Interruptor (Switch)
    defineField({
      name: "isOpen",
      title: "Agenda Aberta?",
      type: "boolean",
      initialValue: true,
      description: "Ativado: Exibe 'Disponível para encomenda'. Desativado: Mostra ao cliente a data prevista para o retorno da agenda.",
    }),
    // 2. O Range de Datas (Só aparece se isOpen for FALSE)
    defineField({
      name: "availabilityRange",
      title: "Período de Disponibilidade",
      type: "object",
      // A mágica acontece aqui:
      hidden: ({ document }) => document?.isOpen === true, 
      fields: [
        { name: "from", title: "De", type: "date" },
        { name: "to", title: "Até", type: "date" },
      ],
      options: {
        columns: 2, // Deixa os campos lado a lado
      },
    }),
  ],
});