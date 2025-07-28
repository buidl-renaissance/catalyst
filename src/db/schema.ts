import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Email subscriptions table
export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull().unique().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  source: text("source").notNull().default("website"), // website, workshop, event, etc.
  status: text("status").notNull().default("active"), // active, unsubscribed, bounced
});

// Pitches table
export const pitches = sqliteTable("pitches", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull().unique().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  transcript: text("transcript").notNull(),
  audioUrl: text("audio_url"),
  tags: text("tags"), // JSON string of tags
  status: text("status").notNull().default("draft"), // draft, published, archived
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
