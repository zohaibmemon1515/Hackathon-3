import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { Order } from './order'
import user from './user'




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Order, user],
}
