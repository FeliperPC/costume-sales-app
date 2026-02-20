import { defineField, defineType } from "sanity"

export const aboutType = defineType({
  name: "about",
  title: "Sobre Nós",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título Principal",
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
      title: "Imagem Principal",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Qualidades / Diferenciais",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Qualidade",
          fields: [
            defineField({
              name: "icon",
              title: "Ícone (lucide name)",
              type: "string",
              description:
                "Nome do ícone do lucide-react. Ex: Scissors, Ruler, ShieldCheck",
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
              title: "Descrição",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "icon",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
})