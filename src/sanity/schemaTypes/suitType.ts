import { defineField, defineType } from 'sanity'

export const suitType = defineType({
  name: 'suit',
  title: 'Trajes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do produto',
      type: 'string',
      description: 'Ex: Homem Aranha',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'name' },
      description: 'homem-aranha',
      validation: (Rule) => Rule.required(),
    }),
    // --- LISTA DE VERSÕES COM DADOS INDEPENDENTES ---
    defineField({
      name: 'versions',
      title: 'Versões Disponíveis',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'object',
          name: 'version',
          fields: [
            { 
              name: 'versionName', 
              title: 'Nome da Versão', 
              type: 'string', 
              description: 'Ex: Tasm 2',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'versionSlug', 
              title: 'URL (Slug da versão)', 
              type: 'slug', 
              options: { source: 'versionName' },
              description: 'Ex: tasm-2',
              validation: (Rule) => Rule.required(), 
            },
            { 
              name: 'price', 
              title: 'Preço desta Versão', 
              type: 'number' ,
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'fullDescription', 
              title: 'Descrição Completa da Versão', 
              type: 'array', 
              of: [{ type: 'block' }],
              description: 'Detalhes específicos como composição do tecido, forro, etc.',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'images', 
              title: 'Galeria de Fotos', 
              type: 'array', 
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule) => Rule.required(), 
            },
          ],
          preview: {
            select: {
              title: 'versionName',
              subtitle: 'price',
              media: 'images.0.asset'
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title,
                subtitle: subtitle ? `R$ ${subtitle}` : 'Sem preço',
                media: media
              }
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'versions.0.versionName',
      media: 'versions.0.images.0.asset'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? 'Sem versão',
        media,
      }
    }
  }
})