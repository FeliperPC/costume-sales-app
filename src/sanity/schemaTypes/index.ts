import { type SchemaTypeDefinition } from 'sanity'
import { suitType } from './suitType'
import { reviewType } from './reviewType'
import { scheduleType } from './scheduleType'
import { aboutType } from './aboutType'
import { customSuitType } from './customSuitType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [suitType, reviewType, scheduleType, aboutType, customSuitType],
}
