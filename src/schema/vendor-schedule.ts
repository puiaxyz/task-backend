import { customSchema } from "./custom-schema.ts";
import { integer, serial, timestamp ,time, index} from "drizzle-orm/pg-core";
import { vendor } from "./vendor.ts";

export const vendorSchedule = customSchema.table('vendor_schedule', {
  id: serial('id').primaryKey(),
  vendorId: integer('vendor_id').notNull().references(() => vendor.id),
  dayOfWeek: integer('day_of_week').notNull(),
  openTime: time('open_time').notNull(),
  closeTime: time('close_time').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
    vendorIdDayOfWeekIdx:index('vendor_schedule_vendor_id_day_of_week_idx').on(table.vendorId,table.dayOfWeek),
    vendorDayOfWeekIdx:index('vendor_schedule_day_of_week_idx').on(table.dayOfWeek),
}))