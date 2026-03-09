import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.documentTypeListItem('suit').title('Trajes'),
      S.documentTypeListItem('order').title('Encomendas'),
      S.documentTypeListItem('review').title('Avaliações'),
      S.divider(),
      S.listItem()
        .title('Agenda')
        .id('schedule')
        .child(
          S.document()
            .schemaType('schedule')
            .documentId('schedule'),
        ),
    ])
