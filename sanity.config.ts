'use client'

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {ptBRLocale} from '@sanity/locale-pt-br'

import {dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

const RESTRICTED_TYPES = ['order', 'review', 'schedule']
const BLOCKED_CREATION = ['order', 'review', 'schedule', 'about', 'customSuit']

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema: {
    ...schema,
    templates: (templates) =>
      templates.map((t) =>
        t.schemaType === 'schedule'
          ? {...t, value: {_id: 'schedule', _type: 'schedule', isOpen: true}}
          : t,
      ),
  },
  plugins: [
    ptBRLocale(),
    structureTool({structure}),
  ],
  studio: {
    components: {
      navbar: () => null,
    },
  },
  document: {
    actions: (prev, {schemaType}) => {
      if (RESTRICTED_TYPES.includes(schemaType)) {
        return prev.filter(
          (action) => action.action !== 'delete' && action.action !== 'duplicate',
        )
      }
      return prev
    },
    newDocumentOptions: (prev) =>
      prev.filter((opt) => !BLOCKED_CREATION.includes(opt.templateId)),
  },
})
