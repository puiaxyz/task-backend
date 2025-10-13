import {  serial, text, timestamp, index } from 'drizzle-orm/pg-core';
import { customSchema } from './custom-schema.ts';

export const users = customSchema.table('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  phone: text('phone').unique().notNull(), 
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
}, (table:any) => ({
  
  phoneIdx: index('users_phone_idx').on(table.phone),
  emailIdx: index('users_email_idx').on(table.email),
}));