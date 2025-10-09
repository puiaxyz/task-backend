import { boolean, index, integer, serial, text, timestamp } from "drizzle-orm/pg-core";
import { customSchema } from "./custom-schema.ts";

export const menu = customSchema.table('menu', {
  id: serial('id').primaryKey(),
  sh
  name: text('name').notNull(),
  stock :boolean('stock').notNull(),
  price: integer('price').notNull(),
  active :boolean('active').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
  nameIdx: index('menu_name_idx').on(table.name),
  priceIdx: index('menu_price_idx').on(table.price),
}))
