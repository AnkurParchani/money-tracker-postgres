import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 50 }),
	email: varchar("email", { length: 50 }),
});

export const students = pgTable("students", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 50 }),
	rollno: integer("rollno"),
	email: varchar("email", { length: 50 }),
});

export const employee = pgTable("employee", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 50 }),
	rollno: integer("rollno"),
	email: varchar("email", { length: 50 }),
});