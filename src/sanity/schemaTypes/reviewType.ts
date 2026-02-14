import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Avaliações",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do cliente",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientReview", // camelCase é o padrão sugerido
      title: "Avaliação",
      type: "array", // O tipo correto para texto rico é array de blocks
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image", // "image" no singular é mais intuitivo se for apenas uma foto
      title: "Foto do Cliente",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  // Isso ajuda a identificar a avaliação na lista do painel lateral
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});