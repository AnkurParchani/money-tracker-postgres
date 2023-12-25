import { relations } from "drizzle-orm";
import { serial, varchar, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./userSchema";

// Defining the Bio Table
export const bios = pgTable("bios", {
  id: serial("id").primaryKey().notNull(),
  bio: varchar("bio", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// Defining the relation
export const bioRelations = relations(bios, ({ one }) => ({
  user: one(users, {
    fields: [bios.userId],
    references: [users.id],
  }),
}));
