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
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { source: 'name' },
      description: 'homem-aranha',
    }),
    // --- LISTA DE VERSÕES COM DADOS INDEPENDENTES ---
    defineField({
      name: 'versions',
      title: 'Versões Disponíveis',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'version',
          fields: [
            { 
              name: 'versionName', 
              title: 'Nome da Versão', 
              type: 'string', 
              description: 'Ex: Tasm 2' 
            },
            { 
              name: 'price', 
              title: 'Preço desta Versão', 
              type: 'number' 
            },
            { 
              name: 'fullDescription', 
              title: 'Descrição Completa da Versão', 
              type: 'array', 
              of: [{ type: 'block' }],
              description: 'Detalhes específicos como composição do tecido, forro, etc.'
            },
            { 
              name: 'images', 
              title: 'Galeria de Fotos', 
              type: 'array', 
              of: [{ type: 'image', options: { hotspot: true } }] 
            },
          ],
          preview: {
            select: {
              title: 'versionName',
              subtitle: 'price',
              media: 'images.0'
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
})