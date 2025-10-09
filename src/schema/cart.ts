import { customSchema } from "./custom-schema.ts";
import { integer,timestamp,serial,index } from "drizzle-orm/pg-core";


export const cart = customSchema.table('cart', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  menuId: integer('menu_id').notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
  userIdIdx: index('cart_user_id_idx').on(table.userId),
}))