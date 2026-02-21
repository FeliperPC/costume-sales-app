import { defineField, defineType } from "sanity"

export const customSuitType = defineType({
  name: "customSuit",
  title: "Traje Personalizado",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Palavra distintivo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição Principal",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "callToAction",
      title: "Informação botão",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
})