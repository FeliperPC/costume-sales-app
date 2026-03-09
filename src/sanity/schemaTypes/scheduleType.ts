import { defineField, defineType } from "sanity";

// Singleton
export const scheduleType = defineType({
  name: "schedule",
  title: "Disponibilidade de Agenda",
  type: "document",
  fields: [
    // 1. Switch principal
    defineField({
      name: "isOpen",
      title: "Agenda Aberta?",
      type: "boolean",
      initialValue: true,
      description:
        "Ativado: Exibe 'Disponível para encomenda'. Desativado: Mostra ao cliente a data prevista de reabertura.",
    }),

    // 2. Data única de reabertura
    defineField({
      name: "reopenDate",
      title: "Data de Reabertura",
      type: "date",
      hidden: ({ document }) => document?.isOpen === true,
      description:
        "Informe a data prevista para reabertura da agenda.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.isOpen === false && !value) {
            return "Você precisa informar a data de reabertura quando a agenda estiver fechada.";
          }
          return true;
        }),
    }),
  ],
   preview: {
    select: {
      isOpen: "isOpen",
      reopenDate: "reopenDate",
    },
    prepare({ isOpen, reopenDate }) {
      return {
        title: isOpen ? "Agenda Aberta" : "Agenda Fechada",
        subtitle: isOpen
          ? "Disponível para encomendas"
          : `Reabre em: ${reopenDate}`,
      };
    },
  },
});
