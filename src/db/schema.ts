import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  primaryKey,
  json,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  dateofbirth: varchar("dateofbirth"),
  gender: varchar("gender"),
  age: varchar("age"),
  bloudgroup: varchar("bloudgroup"),
  primarylanguage: varchar("primarylanguage"),
  emergencycontact: varchar("emergencycontact"),
  address: varchar("address"),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

export type User = typeof users.$inferSelect;

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  question1: varchar("question1").notNull(),
  question2: varchar("question2").notNull(),
  question3: varchar("question3").notNull(),
  question4: varchar("question4").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

export type Question = typeof questions.$inferSelect;

export const open_ai_responses = pgTable("open_ai_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  question_id: uuid("question_id")
    .notNull()
    .references(() => questions.id),
  response: json("response").notNull(),
  created_at: timestamp("created_at")
    .default(sql`NOW()`)
    .notNull(),
});

export type OpenAiResponse = typeof open_ai_responses.$inferSelect;
