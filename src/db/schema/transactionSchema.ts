import { relations } from "drizzle-orm";
import { serial, varchar, integer, pgEnum } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const typeEnum = pgEnum("type", ["deposit", "withdraw"]);

// Defining the Transactions Table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey().notNull(),
  desc: varchar("desc", { length: 256 }),
  amount: integer("amount"),
  type: typeEnum("type").default("withdraw"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Defining the Transaction Relations
export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}));
