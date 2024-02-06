import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    password: varchar('password').notNull(),
    created_at: timestamp('created_at').default(sql`NOW()`).notNull(),
});

export type User = typeof users.$inferSelect;
