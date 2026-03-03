import { defineType, defineField } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Encomendas",
  type: "document",
  groups: [
    { name: "order", title: "Produto" },
    { name: "customer", title: "Cliente", default: true },
    { name: "measurements", title: "Medidas" },
    { name: "address", title: "Endereço" },
    { name: "details", title: "Observações" },
  ],
  fields: [
    // ========================
    // ORDER
    // ========================
    defineField({
      name: "productName",
      title: "Produto",
      type: "string",
      group: "order",
      hidden: ({ document }) => !document?.productName,
      readOnly: true,
    }),
    defineField({
      name: "productVersion",
      title: "Versão",
      type: "string",
      group: "order",
      hidden: ({ document }) => !document?.productVersion,
      readOnly: true,
    }),
    // ========================
    // CUSTOMER
    // ========================
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      group: "customer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "customer",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "cellphone",
      title: "Contato",
      type: "string",
      group: "customer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Gênero",
      type: "string",
      options: {
        list: [
          { title: "Masculino", value: "masculino" },
          { title: "Feminino", value: "feminino" },
          { title: "Outro", value: "outro" },
        ],
      },
      group: "customer",
      validation: (Rule) => Rule.required(),
    }),

    // ========================
    // BODY INFO
    // ========================
    defineField({
      name: "height",
      title: "Altura (cm)",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "weight",
      title: "Peso (kg)",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "shoeSize",
      title: "Tamanho do calçado",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),

    // ========================
    // MEASUREMENTS
    // ========================
    defineField({
      name: "chest",
      title: "Tórax",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "waist",
      title: "Cintura",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hip",
      title: "Quadril",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thigh",
      title: "Coxa",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "knee",
      title: "Joelho",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "calf",
      title: "Panturrilha",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "biceps",
      title: "Bíceps",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "forearm",
      title: "Antebraço",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "wrist",
      title: "Pulso",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "neck",
      title: "Pescoço (Circunferência)",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "palm_circumference",
      title: "Palma da Mão (Circunferência)",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "hand_length",
      title: "Comprimento da Mão",
      type: "number",
      group: "measurements",
      validation: (Rule) => Rule.required().min(0),
    }),

    // ========================
    // ADDRESS
    // ========================
    defineField({
      name: "street",
      title: "Rua",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Número",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "complement",
      title: "Complemento",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "district",
      title: "Bairro",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Cidade",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "Estado",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zipCode",
      title: "CEP",
      type: "string",
      group: "address",
      validation: (Rule) => Rule.required(),
    }),

    // ========================
    // ORDER DETAILS
    // ========================
    defineField({
      name: "deadline",
      title: "Data desejada",
      type: "date",
      group: "details",
      hidden: ({ document }) => !document?.deadline,
    }),
    defineField({
      name: "notes",
      title: "Observações",
      type: "text",
      group: "details",
      hidden: ({ document }) => !document?.notes,
    }),

    defineField({
      name: "referenceImages",
      title: "Imagens de referência",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      group: "details",
      hidden: ({ document }) => !document?.referenceImages,
    }),
  ],
  preview: {
    select: {
      title: "name",
      createdAt: "_createdAt",
      productName: "productName",
    },
    prepare({ title, createdAt, productName }) {
      return {
        title: `${title} • ${productName ?? "Personalizado"}`,
        subtitle: `Criado em ${new Date(createdAt).toLocaleDateString("pt-BR")}`,
      };
    },
  },
});
