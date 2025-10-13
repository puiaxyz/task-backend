import { boolean, index, numeric, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { customSchema } from "./custom-schema.ts";

export const vendor = customSchema.table('vendor', {
  id: serial('id').primaryKey(),
  name: varchar('name',{length:50}).notNull(),
  email: varchar('email',{length:50}),
  phone: text('phone'),
  imageUrl: text('image_url'),
  latitude: numeric('latitude',{precision:10,scale:8}),
  longitude: numeric('longitude',{precision:10,scale:8}),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  pincode: varchar('pincode',{length:10}),
  active: boolean('active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
  nameIdx: index('vendor_name_idx').on(table.name),
}))