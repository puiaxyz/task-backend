import { customSchema } from "./custom-schema.ts";
import { integer,timestamp,serial,index } from "drizzle-orm/pg-core";
import { menuItem } from "./menu.ts";
import { users } from "./user.ts";


export const cart = customSchema.table('cart', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  menuItemId: integer('menu_id').notNull().references(() => menuItem.id),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
  userIdIdx: index('cart_user_id_idx').on(table.userId),
}))