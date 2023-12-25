import { relations } from "drizzle-orm";
import { serial, varchar, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { transactions } from "./transactionSchema";
import { bios } from "./bioSchema";

// Defining the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 50 }),
  email: varchar("email", { length: 50 }),
  password: text("password").notNull(),
});

// Defining the user Relations
export const userRelations = relations(users, ({ many, one }) => ({
  transactions: many(transactions),
  bio: one(bios, {
    fields: [users.id],
    references: [bios.userId],
  }),
}));
