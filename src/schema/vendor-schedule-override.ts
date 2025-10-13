import { customSchema } from "./custom-schema.ts";
import { integer, serial, timestamp, time, date, index } from "drizzle-orm/pg-core";
import { vendor } from "./vendor.ts";

export const vendorScheduleOverride = customSchema.table('vendor_schedule_override', {
  id: serial('id').primaryKey(),
  vendorId: integer('vendor_id').notNull().references(() => vendor.id),
  date: date('date').notNull(),
  openTime: time('open_time').notNull(),
  closeTime: time('close_time').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
    vendorIdIdx:index('vendor_schedule_override_vendor_id_idx').on(table.vendorId),
}))